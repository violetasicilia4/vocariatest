/**
 * Utilidades compartidas por los tests del motor vocacional.
 *
 * Reproducen (en chico) la generación de respuestas de scripts/diagnose.ts:
 * PRNG con semilla (reproducible), enumeración de respuestas válidas por
 * pregunta y búsqueda greedy del patrón "ideal" para cada arquetipo.
 */
import { calcularResultado, type ScoringResult } from '../engine/scorer';
import { QUESTIONS } from '../data/questions';
import type { UserProfile } from '../data/profile';

/** PRNG determinístico con semilla (mismo que los scripts de diagnóstico). */
export function mulberry32(seed: number): () => number {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const PROFILE: UserProfile = {
  nombre: 'Sim',
  email: 'sim@test.com',
  edad: '18',
  provinciaId: 'CABA',
  movilidad: 'si',
};

/** Combinaciones de tamaño k (para preguntas multiselect). */
function combinations<T>(arr: T[], k: number): T[][] {
  if (k === 0) return [[]];
  if (arr.length < k) return [];
  const [first, ...rest] = arr;
  return combinations(rest, k - 1)
    .map(c => [first, ...c])
    .concat(combinations(rest, k));
}

/** Valores de respuesta posibles para una pregunta (multiselect → combos). */
function answerValues(q: (typeof QUESTIONS)[number]): string[] {
  const ids = q.opciones.map(o => o.id);
  if (q.tipo === 'multiselect') {
    return combinations(ids, q.maxSelect ?? 2).map(c => c.join(','));
  }
  return ids;
}

export const ANSWER_VALUES: Record<string, string[]> = Object.create(null);
for (const q of QUESTIONS) ANSWER_VALUES[q.id] = answerValues(q);

/** Respuestas 100% aleatorias (todas las preguntas respondidas). */
export function randomAnswers(rng: () => number): Record<string, string> {
  const answers: Record<string, string> = {};
  for (const q of QUESTIONS) {
    const values = ANSWER_VALUES[q.id];
    answers[q.id] = values[Math.floor(rng() * values.length)];
  }
  return answers;
}

/** Responde con el patrón `ideal` con probabilidad `fidelity`, al azar el resto. */
export function noisyAnswers(
  ideal: Record<string, string>,
  fidelity: number,
  rng: () => number,
): Record<string, string> {
  const answers: Record<string, string> = {};
  for (const q of QUESTIONS) {
    if (rng() < fidelity) {
      answers[q.id] = ideal[q.id];
    } else {
      const values = ANSWER_VALUES[q.id];
      answers[q.id] = values[Math.floor(rng() * values.length)];
    }
  }
  return answers;
}

export function emergenceOf(result: ScoringResult, arqId: string): number {
  return result.ranking.find(r => r.id === arqId)?.score ?? 0;
}

/**
 * Busca (greedy, con reinicios) el patrón de respuestas que más hace emerger a
 * un arquetipo. Misma estrategia que diagnose.ts pero con menos reinicios para
 * mantener el test rápido.
 */
export function idealAnswersFor(
  arqId: string,
  rng: () => number,
  restarts = 12,
): Record<string, string> {
  const objective = (answers: Record<string, string>): [number, number] => {
    const result = calcularResultado(answers, PROFILE);
    const target = emergenceOf(result, arqId);
    const bestRival = Math.max(
      ...result.ranking.filter(r => r.id !== arqId).map(r => r.score),
      0,
    );
    return [target - bestRival, target];
  };
  const better = (a: [number, number], b: [number, number]) =>
    a[0] > b[0] || (a[0] === b[0] && a[1] > b[1]);

  let globalBest: Record<string, string> | null = null;
  let globalScore: [number, number] = [-Infinity, -Infinity];

  for (let restart = 0; restart < restarts; restart++) {
    const answers = randomAnswers(rng);
    let current = objective(answers);
    for (let pass = 0; pass < 3; pass++) {
      for (const q of QUESTIONS) {
        for (const value of ANSWER_VALUES[q.id]) {
          if (value === answers[q.id]) continue;
          const prev = answers[q.id];
          answers[q.id] = value;
          const score = objective(answers);
          if (better(score, current)) current = score;
          else answers[q.id] = prev;
        }
      }
    }
    if (better(current, globalScore)) {
      globalScore = current;
      globalBest = { ...answers };
    }
  }

  return globalBest ?? randomAnswers(rng);
}
