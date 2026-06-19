import { QUESTIONS } from '../data/questions';
import { ARQUETIPOS, getArquetipo, getCombinacion, type Arquetipo, type Combinacion } from '../data/arquetipos';
import { type UserProfile, PROVINCIAS, getProvinciasDisponibles } from '../data/profile';
import { computeVector, type VectorVocacional } from './signals';
import { emergerArquetipos } from './archetypeEmergence';
import { extractPreferences, type CareerPreferences } from './preferences';
import { detectarTensiones, type Tension } from './tensions';
import { calcularConfianza, type ConfidenceBreakdown } from './confidence';
import { applyAdaptiveAnswers, contestedArchetypes, isAdaptiveQuestion } from './adaptive';

export interface ArquetipoScore {
  id: string;
  score: number;
  pct: number;
}

export interface Contexto {
  provincia?: string;
  provinciasDisponibles: string[];
  movilidad: 'si' | 'no' | 'nose';
}

/** Registro de la fase adaptativa: qué arquetipos estaban peleados y cuántos duelos hubo. */
export interface DisputaResuelta {
  entre: string[]; // ids de arquetipos en disputa al terminar el núcleo
  duelos: number;  // preguntas de precisión respondidas
}

export interface ScoringResult {
  ranking: ArquetipoScore[];
  activos: ArquetipoScore[];
  primario: Arquetipo;
  secundario: Arquetipo | null;
  tercero: Arquetipo | null;
  combinacion: Combinacion | null;
  confianza: number;
  confianzaBreakdown: ConfidenceBreakdown;
  advertencias: string[];
  tensiones: Tension[];
  preferences: CareerPreferences;
  antipatrones: string[];
  contexto: Contexto;
  vector: VectorVocacional;
  disputaResuelta: DisputaResuelta | null;
}

export function calcularResultado(
  answers: Record<string, string>,
  profile: UserProfile,
): ScoringResult {
  // Build latent signal vector
  const vector = computeVector(answers);

  // Derive archetype emergence scores
  const arquetiposEmergentes = emergerArquetipos(vector);

  // Build ranking from emergence scores (0-100 already)
  let ranking: ArquetipoScore[] = arquetiposEmergentes
    .map(e => ({
      id: e.id,
      score: e.emergencia,
      pct: e.emergencia,
    }))
    .sort((a, b) => b.score - a.score);

  // Ensure all 12 archetypes appear in ranking (fill missing with 0)
  const rankingIds = new Set(ranking.map(r => r.id));
  for (const arq of ARQUETIPOS) {
    if (!rankingIds.has(arq.id)) {
      ranking.push({ id: arq.id, score: 0, pct: 0 });
    }
  }

  // Adaptive tie-break answers (if the user got an adaptive phase).
  // Capture the pre-adaptive dispute so the result screen can narrate it.
  const duelosRespondidos = Object.keys(answers).filter(
    id => isAdaptiveQuestion(id) && answers[id],
  ).length;
  let disputaResuelta: DisputaResuelta | null = null;
  if (duelosRespondidos > 0) {
    const enDisputa = contestedArchetypes(ranking);
    if (enDisputa.length >= 2) {
      disputaResuelta = { entre: enDisputa, duelos: duelosRespondidos };
    }
  }
  ranking = applyAdaptiveAnswers(ranking, answers);

  const top = ranking[0];
  const umbral = top.score * 0.4; // 40% of top — richer secondary set than V1
  const activos = ranking.filter(a => a.score >= umbral && a.score > 0);

  const primario = getArquetipo(ranking[0].id)!;
  const secundario = activos.length >= 2 ? getArquetipo(activos[1].id)! : null;
  const tercero = activos.length >= 3 ? getArquetipo(activos[2].id)! : null;

  const combinacion = secundario
    ? getCombinacion(primario.id, secundario.id) ?? null
    : null;

  // Confidence — uses ranking[0].pct and ranking[1].pct (emergence scores, 0-100)
  const confianzaBreakdown = calcularConfianza(ranking, answers, QUESTIONS.length);
  const confianza = confianzaBreakdown.score;

  // Preferences
  const preferences = extractPreferences(answers);

  // Antipattern list for tensions
  const antiRaw = answers['anti_1'] ?? '';
  const antipatrones = antiRaw.split(',').filter(Boolean);

  // Tensions
  const tensiones = detectarTensiones(ranking, preferences, antipatrones);

  const advertencias: string[] = [];
  // "Perfil amplio" solo cuando DE VERDAD lo es: 3+ arquetipos cerca del top
  // (>= 60% del puntaje máximo). Antes se disparaba con `activos.length >= 3`,
  // pero `activos` usa un umbral laxo (40% del top) y el promedio es ~4,6
  // arquetipos activos — la nota le aparecía a casi todos, y encima empujaba al
  // pago. Ahora es informativa y se reserva para los perfiles genuinamente anchos.
  const perfilesCercaDelTop = ranking.filter(a => a.score >= top.score * 0.6 && a.score > 0).length;
  if (perfilesCercaDelTop >= 3) {
    advertencias.push(
      'Tu perfil es genuinamente amplio: varias orientaciones te representan con fuerza parecida. No es un problema — es información para elegir con criterio.',
    );
  }
  const respondidas = QUESTIONS.filter(q => answers[q.id]).length;
  if (respondidas < QUESTIONS.length * 0.8) {
    advertencias.push(
      'Respondiste algunas preguntas sin completar el test. Más respuestas mejoran la precisión del resultado.',
    );
  }

  const provinciaInfo = PROVINCIAS.find(p => p.id === profile.provinciaId);
  const contexto: Contexto = {
    provincia: provinciaInfo?.dbName,
    provinciasDisponibles: getProvinciasDisponibles(profile),
    movilidad: profile.movilidad,
  };

  return {
    ranking,
    activos,
    primario,
    secundario,
    tercero,
    combinacion,
    confianza,
    confianzaBreakdown,
    advertencias,
    tensiones,
    preferences,
    antipatrones,
    contexto,
    vector,
    disputaResuelta,
  };
}
