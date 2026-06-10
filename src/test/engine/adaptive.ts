/**
 * V2 Engine — Fase adaptativa (preguntas de desempate).
 *
 * Tras las 18 preguntas núcleo se calcula un ranking interino. Si los
 * arquetipos punteros quedaron peleados, se eligen del banco las preguntas
 * que mejor discriminan esos pares ("duelos") y las respuestas suman puntos
 * de desempate directamente sobre la emergencia — sin tocar el vector de
 * señales, para no invalidar la calibración por percentiles.
 */

import type { Question } from '../data/questions';
import { ADAPTIVE_QUESTIONS } from '../data/adaptiveQuestions';

export interface RankingEntry {
  id: string;
  score: number;
  pct: number;
}

/** Brecha (en puntos de emergencia) bajo la cual dos arquetipos se consideran en disputa. */
const CONTESTED_GAP = 15;
/** Máximo de arquetipos en disputa a considerar. */
const MAX_CONTESTED = 4;
/** Máximo de preguntas adaptativas por usuario. */
const MAX_QUESTIONS = 5;
/**
 * Escala de los puntos de desempate. Con 5 duelos consistentes un arquetipo
 * suma como máximo 8 * 5 * 1.0 = 40 puntos: suficiente para resolver una
 * disputa (gap < 15) pero no para destronar a un ganador claro, que nunca
 * entra en fase adaptativa.
 */
const ADAPTIVE_SCALE = 1.0;

const ADAPTIVE_BY_ID: Record<string, Question> = Object.create(null);
for (const q of ADAPTIVE_QUESTIONS) ADAPTIVE_BY_ID[q.id] = q;

export function isAdaptiveQuestion(questionId: string): boolean {
  return questionId in ADAPTIVE_BY_ID;
}

// ---------------------------------------------------------------------------
// Selección de preguntas
// ---------------------------------------------------------------------------

/** Arquetipos en disputa: el top y los que quedaron a menos de CONTESTED_GAP. */
export function contestedArchetypes(ranking: RankingEntry[]): string[] {
  if (ranking.length === 0) return [];
  const top = ranking[0].score;
  return ranking
    .filter(r => r.score > 0 && top - r.score < CONTESTED_GAP)
    .slice(0, MAX_CONTESTED)
    .map(r => r.id);
}

/**
 * Poder de discriminación de una pregunta para un par de arquetipos:
 * necesita una opción que favorezca a A sobre B y otra que favorezca a B
 * sobre A; si falta alguna de las dos, no discrimina (0).
 */
function discrimination(q: Question, a: string, b: string): number {
  let bestA = 0;
  let bestB = 0;
  for (const op of q.opciones) {
    const sA = op.scores?.[a] ?? 0;
    const sB = op.scores?.[b] ?? 0;
    bestA = Math.max(bestA, sA - sB);
    bestB = Math.max(bestB, sB - sA);
  }
  return bestA > 0 && bestB > 0 ? bestA + bestB : 0;
}

/**
 * Elige las preguntas de desempate para un ranking interino.
 * Devuelve [] si hay un ganador claro (no hace falta fase adaptativa).
 */
export function selectAdaptiveQuestions(ranking: RankingEntry[]): Question[] {
  const contested = contestedArchetypes(ranking);
  if (contested.length < 2) return [];

  // Pares en disputa, ponderados por cercanía (los más peleados pesan más).
  const scoreById: Record<string, number> = Object.create(null);
  for (const r of ranking) scoreById[r.id] = r.score;
  const pairs: Array<{ a: string; b: string; weight: number }> = [];
  for (let i = 0; i < contested.length; i++) {
    for (let j = i + 1; j < contested.length; j++) {
      const gap = Math.abs(scoreById[contested[i]] - scoreById[contested[j]]);
      pairs.push({ a: contested[i], b: contested[j], weight: 1 / (1 + gap) });
    }
  }

  // Greedy: cada pregunta aporta su discriminación sobre los pares aún no
  // cubiertos del todo; la cobertura repetida de un par rinde la mitad.
  const selected: Question[] = [];
  const coverage: Record<string, number> = Object.create(null);
  const remaining = [...ADAPTIVE_QUESTIONS];

  while (selected.length < MAX_QUESTIONS && remaining.length > 0) {
    let bestIdx = -1;
    let bestGain = 0;
    for (let i = 0; i < remaining.length; i++) {
      let gain = 0;
      for (const { a, b, weight } of pairs) {
        const d = discrimination(remaining[i], a, b);
        if (d <= 0) continue;
        const seen = coverage[a + '|' + b] ?? 0;
        gain += d * weight / (1 + seen);
      }
      if (gain > bestGain) {
        bestGain = gain;
        bestIdx = i;
      }
    }
    if (bestIdx < 0) break; // ninguna pregunta restante aporta

    const [q] = remaining.splice(bestIdx, 1);
    selected.push(q);
    for (const { a, b } of pairs) {
      if (discrimination(q, a, b) > 0) {
        coverage[a + '|' + b] = (coverage[a + '|' + b] ?? 0) + 1;
      }
    }
  }

  return selected;
}

// ---------------------------------------------------------------------------
// Aplicación de respuestas adaptativas al ranking
// ---------------------------------------------------------------------------

/**
 * Suma los puntos de desempate de las respuestas adaptativas presentes en
 * `answers` y devuelve el ranking re-ordenado. Las respuestas a preguntas
 * núcleo se ignoran acá (ya están en la emergencia).
 */
export function applyAdaptiveAnswers(
  ranking: RankingEntry[],
  answers: Record<string, string>,
): RankingEntry[] {
  const bonus: Record<string, number> = Object.create(null);

  for (const [qId, value] of Object.entries(answers)) {
    const q = ADAPTIVE_BY_ID[qId];
    if (!q || !value) continue;
    const opcion = q.opciones.find(o => o.id === value);
    if (!opcion?.scores) continue;
    for (const [arqId, pts] of Object.entries(opcion.scores)) {
      bonus[arqId] = (bonus[arqId] ?? 0) + pts * ADAPTIVE_SCALE;
    }
  }

  if (Object.keys(bonus).length === 0) return ranking;

  return ranking
    .map(r => {
      const adjusted = Math.min(100, Math.round(r.score + (bonus[r.id] ?? 0)));
      return { ...r, score: adjusted, pct: adjusted };
    })
    .sort((a, b) => b.score - a.score);
}
