import { QUESTIONS } from '../data/questions';
import { ARQUETIPOS, getArquetipo, getCombinacion, type Arquetipo, type Combinacion } from '../data/arquetipos';
import { type UserProfile, PROVINCIAS, getProvinciasDisponibles } from '../data/profile';
import { normalizePct } from './techo';
import { extractPreferences, type CareerPreferences } from './preferences';
import { detectarTensiones, type Tension } from './tensions';
import { calcularConfianza, type ConfidenceBreakdown } from './confidence';

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
}

const ANTIPATRON_PENALTIES: Record<string, Partial<Record<string, number>>> = {
  sangre:      { sanador: -30, descubridor: -8 },
  matematica:  { interprete: -30, arquitecto: -20, descubridor: -15 },
  exposicion:  { catalizador: -20, anfitrion: -30, narrador: -15 },
  rutina:      { arbitro: -15, custodio: -10 },
  ventas:      { orquestador: -15, anfitrion: -10 },
  soledad:     { arquitecto: -20, descubridor: -15, interprete: -15 },
  competencia: { orquestador: -10 },
};

function acumularScores(answers: Record<string, string>): Record<string, number> {
  const raw: Record<string, number> = {};
  for (const arq of ARQUETIPOS) raw[arq.id] = 0;

  for (const q of QUESTIONS) {
    const answerId = answers[q.id];
    if (!answerId) continue;

    const ids = q.tipo === 'multiselect'
      ? answerId.split(',').filter(Boolean)
      : [answerId];

    for (const selectedId of ids) {
      const opcion = q.opciones.find(o => o.id === selectedId);
      if (!opcion?.scores) continue;
      for (const [arquetipoId, pts] of Object.entries(opcion.scores)) {
        if (arquetipoId in raw) raw[arquetipoId] += pts;
      }
    }
  }

  // Apply antipattern penalties
  const antiRaw = answers['anti_1'];
  if (antiRaw) {
    for (const antiId of antiRaw.split(',').filter(Boolean)) {
      const penalties = ANTIPATRON_PENALTIES[antiId];
      if (!penalties) continue;
      for (const [id, pts] of Object.entries(penalties)) {
        if (id in raw) raw[id] = Math.max(0, raw[id] + pts);
      }
    }
  }

  return raw;
}

export function calcularResultado(
  answers: Record<string, string>,
  profile: UserProfile,
): ScoringResult {
  const raw = acumularScores(answers);

  // Use TECHO-based normalisation instead of maxScore-relative pct
  const ranking: ArquetipoScore[] = ARQUETIPOS
    .map(arq => ({
      id: arq.id,
      score: raw[arq.id],
      pct: Math.round(normalizePct(raw[arq.id], arq.id)),
    }))
    .sort((a, b) => b.score - a.score);

  const top = ranking[0];
  const umbral = top.score * 0.5;
  const activos = ranking.filter(a => a.score >= umbral && a.score > 0);

  const primario = getArquetipo(ranking[0].id)!;
  const secundario = activos.length >= 2 ? getArquetipo(activos[1].id)! : null;
  const tercero = activos.length >= 3 ? getArquetipo(activos[2].id)! : null;

  const combinacion = secundario
    ? getCombinacion(primario.id, secundario.id) ?? null
    : null;

  // Confidence using the new robust formula
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
  };
}
