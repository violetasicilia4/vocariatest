import { QUESTIONS, type DimensionScores } from '../data/questions';
import { ARQUETIPOS, type Arquetipo } from '../data/arquetipos';

export interface RawScores {
  R: number; I: number; A: number; S: number; E: number; C: number;
  autonomia: number; seguridad: number; impacto: number;
  riesgo: number; rutina: number; equipo: number;
}

export interface NormalizedProfile {
  R: number; I: number; A: number; S: number; E: number; C: number;
  autonomia: number; seguridad: number; impacto: number;
  riesgo: number; rutina: number; equipo: number;
}

export interface ScoringResult {
  profile: NormalizedProfile;
  confianza: number; // 0-100
  arquetipoId: string;
  arquetipoSecundarioId: string | null;
  arquetipoPrimario: Arquetipo;
  arquetipoSecundario: Arquetipo | null;
  esPerfilMixto: boolean;
  advertencias: string[];
  needsAdaptive: boolean;
}

const DIMENSIONS: (keyof RawScores)[] = ['R', 'I', 'A', 'S', 'E', 'C'];

function cosineSimilarity(a: number[], b: number[]): number {
  const dot = a.reduce((sum, v, i) => sum + v * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, v) => sum + v * v, 0));
  const magB = Math.sqrt(b.reduce((sum, v) => sum + v * v, 0));
  if (magA === 0 || magB === 0) return 0;
  return dot / (magA * magB);
}

function accumulate(answers: Record<string, string>): RawScores {
  const raw: RawScores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0, autonomia: 0, seguridad: 0, impacto: 0, riesgo: 0, rutina: 0, equipo: 0 };
  const counts: Record<keyof RawScores, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0, autonomia: 0, seguridad: 0, impacto: 0, riesgo: 0, rutina: 0, equipo: 0 };

  for (const q of QUESTIONS) {
    if (q.bloque === 'contexto' || q.bloque === 'autoconocimiento') continue;
    const answerId = answers[q.id];
    if (!answerId) continue;
    const opcion = q.opciones.find(o => o.id === answerId);
    if (!opcion?.scores) continue;
    for (const [dim, val] of Object.entries(opcion.scores) as [keyof RawScores, number][]) {
      raw[dim] += val;
      counts[dim] += 1;
    }
  }
  return raw;
}

function normalize(raw: RawScores, answers: Record<string, string>): NormalizedProfile {
  // Count how many scored questions were answered
  const answeredCount = QUESTIONS.filter(
    q => q.bloque !== 'contexto' && q.bloque !== 'autoconocimiento' && answers[q.id]
  ).length;

  // Max possible score per dimension ≈ 10 pts × answeredCount (rough upper bound)
  const scale = Math.max(answeredCount * 10, 1);

  const clamp = (v: number) => Math.min(100, Math.max(0, Math.round((v / scale) * 100)));

  return {
    R: clamp(raw.R), I: clamp(raw.I), A: clamp(raw.A),
    S: clamp(raw.S), E: clamp(raw.E), C: clamp(raw.C),
    autonomia: clamp(raw.autonomia), seguridad: clamp(raw.seguridad),
    impacto: clamp(raw.impacto), riesgo: clamp(raw.riesgo),
    rutina: clamp(raw.rutina), equipo: clamp(raw.equipo),
  };
}

function detectAquiescencia(answers: Record<string, string>): boolean {
  const scaleQuestions = QUESTIONS.filter(q => q.tipo === 'scale' && answers[q.id]);
  const midCount = scaleQuestions.filter(q => answers[q.id] === '3').length;
  return scaleQuestions.length >= 4 && midCount / scaleQuestions.length > 0.7;
}

function detectPerfilPlano(profile: NormalizedProfile): boolean {
  const riasec = [profile.R, profile.I, profile.A, profile.S, profile.E, profile.C];
  const max = Math.max(...riasec);
  const min = Math.min(...riasec);
  return max - min < 20;
}

function matchArquetipos(profile: NormalizedProfile): { id: string; score: number }[] {
  const riasecVector = [profile.R, profile.I, profile.A, profile.S, profile.E, profile.C];

  return ARQUETIPOS
    .map(arq => {
      const arqVector = [arq.perfil.R, arq.perfil.I, arq.perfil.A, arq.perfil.S, arq.perfil.E, arq.perfil.C];
      const sim = cosineSimilarity(riasecVector, arqVector);

      // Bonus for motivation alignment
      const motBonus =
        Math.abs(profile.autonomia - arq.motivacion.autonomia) < 25 ? 0.03 : 0;
      const impBonus =
        Math.abs(profile.impacto - arq.motivacion.impacto) < 25 ? 0.03 : 0;

      return { id: arq.id, score: sim + motBonus + impBonus };
    })
    .sort((a, b) => b.score - a.score);
}

export function calcularResultado(answers: Record<string, string>): ScoringResult {
  const raw = accumulate(answers);
  const profile = normalize(raw, answers);
  const ranked = matchArquetipos(profile);

  const primario = ranked[0];
  const secundario = ranked[1];
  const esPerfilMixto = secundario.score > primario.score * 0.88;

  const advertencias: string[] = [];
  let confianza = 85;

  if (detectAquiescencia(answers)) {
    confianza -= 20;
    advertencias.push('Tus respuestas en escala fueron muy centrales. Esto puede afectar la precisión del perfil.');
  }

  if (detectPerfilPlano(profile)) {
    confianza -= 15;
    advertencias.push('Tu perfil muestra varias dimensiones similares. El resultado es orientativo — hay más de una carrera que puede funcionarte.');
  }

  const answeredScored = QUESTIONS.filter(
    q => q.bloque !== 'contexto' && q.bloque !== 'autoconocimiento' && answers[q.id]
  ).length;
  const totalScored = QUESTIONS.filter(
    q => q.bloque !== 'contexto' && q.bloque !== 'autoconocimiento' && q.bloque !== 'adaptativa'
  ).length;
  if (answeredScored < totalScored * 0.8) {
    confianza -= 10;
  }

  // Pressure external flag
  const presionExternal = answers['auto_2'] === 'si_fuerte';
  if (presionExternal) {
    advertencias.push('Detectamos que hay expectativas externas sobre tu elección. Leé el informe con esa variable en mente.');
  }

  // Need adaptive questions?
  const top2diff = primario.score - secundario.score;
  const needsAdaptive = top2diff < 0.08;

  const arquetipoObj = ARQUETIPOS.find(a => a.id === primario.id)!;
  const arquetipoSecObj = esPerfilMixto ? ARQUETIPOS.find(a => a.id === secundario.id)! : null;

  return {
    profile,
    confianza: Math.max(40, Math.min(100, confianza)),
    arquetipoId: primario.id,
    arquetipoSecundarioId: esPerfilMixto ? secundario.id : null,
    arquetipoPrimario: arquetipoObj,
    arquetipoSecundario: arquetipoSecObj ?? null,
    esPerfilMixto,
    advertencias,
    needsAdaptive,
  };
}
