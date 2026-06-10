import { QUESTIONS } from '../data/questions';
import { ARQUETIPOS, getArquetipo, getCombinacion, type Arquetipo, type Combinacion } from '../data/arquetipos';
import { type UserProfile, PROVINCIAS, getProvinciasDisponibles } from '../data/profile';
import { computeVector, type VectorVocacional } from './signals';
import { emergerArquetipos } from './archetypeEmergence';
import { extractPreferences, type CareerPreferences } from './preferences';
import { detectarTensiones, type Tension } from './tensions';
import { calcularConfianza, type ConfidenceBreakdown } from './confidence';
import { applyAdaptiveAnswers } from './adaptive';

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

  // Adaptive tie-break answers (if the user got an adaptive phase)
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
  if (activos.length >= 3) {
    advertencias.push(
      'Tu perfil es amplio y multidimensional. Hay varias áreas que te interesan genuinamente — el informe completo te ayuda a priorizar.',
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
  };
}
