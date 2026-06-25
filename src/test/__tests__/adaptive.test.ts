import { describe, it, expect } from 'vitest';
import {
  selectAdaptiveQuestions,
  contestedArchetypes,
  applyAdaptiveAnswers,
  isAdaptiveQuestion,
  type RankingEntry,
} from '../engine/adaptive';
import { ADAPTIVE_QUESTIONS } from '../data/adaptiveQuestions';

describe('selección adaptativa de preguntas', () => {
  it('un ganador claro NO dispara fase adaptativa', () => {
    const ranking: RankingEntry[] = [
      { id: 'arquitecto', score: 90, pct: 90 },
      { id: 'constructor', score: 40, pct: 40 },
      { id: 'sanador', score: 20, pct: 20 },
    ];
    expect(contestedArchetypes(ranking).length).toBeLessThan(2);
    expect(selectAdaptiveQuestions(ranking)).toEqual([]);
  });

  it('arquetipos peleados disparan duelos, acotados a un máximo de 5', () => {
    const ranking: RankingEntry[] = [
      { id: 'arquitecto', score: 80, pct: 80 },
      { id: 'constructor', score: 75, pct: 75 },
      { id: 'interprete', score: 72, pct: 72 },
      { id: 'orquestador', score: 70, pct: 70 },
    ];
    const contested = contestedArchetypes(ranking);
    expect(contested.length).toBeGreaterThanOrEqual(2);
    const qs = selectAdaptiveQuestions(ranking);
    expect(qs.length).toBeGreaterThan(0);
    expect(qs.length).toBeLessThanOrEqual(5);
    // No repite preguntas.
    expect(new Set(qs.map(q => q.id)).size).toBe(qs.length);
    // Todas las elegidas son del banco adaptativo.
    for (const q of qs) expect(isAdaptiveQuestion(q.id)).toBe(true);
  });

  it('un ranking vacío no rompe la selección', () => {
    expect(contestedArchetypes([])).toEqual([]);
    expect(selectAdaptiveQuestions([])).toEqual([]);
  });
});

describe('aplicación de respuestas adaptativas', () => {
  const baseRanking: RankingEntry[] = [
    { id: 'arquitecto', score: 78, pct: 78 },
    { id: 'constructor', score: 76, pct: 76 },
  ];

  it('sin respuestas adaptativas el ranking queda igual', () => {
    const out = applyAdaptiveAnswers(baseRanking, { sit_1: 'a' });
    expect(out).toEqual(baseRanking);
  });

  it('los puntos de desempate reordenan y se mantienen en rango 0–100', () => {
    // Buscamos una pregunta adaptativa que favorezca a constructor sobre arquitecto.
    // Acceso por corchetes a propósito: `.constructor` colisiona con
    // Object.prototype.constructor y TS lo tiparía como Function.
    const q = ADAPTIVE_QUESTIONS.find(q =>
      q.opciones.some(o => (o.scores?.['constructor'] ?? 0) > (o.scores?.['arquitecto'] ?? 0)),
    );
    expect(q, 'debe existir una pregunta que discrimine constructor').toBeTruthy();
    const opcion = q!.opciones
      .slice()
      .sort((a, b) => (b.scores?.['constructor'] ?? 0) - (a.scores?.['constructor'] ?? 0))[0];

    const out = applyAdaptiveAnswers(baseRanking, { [q!.id]: opcion.id });
    for (const r of out) {
      expect(r.score).toBeGreaterThanOrEqual(0);
      expect(r.score).toBeLessThanOrEqual(100);
    }
    // El ranking sigue ordenado de mayor a menor.
    for (let i = 1; i < out.length; i++) {
      expect(out[i - 1].score).toBeGreaterThanOrEqual(out[i].score);
    }
  });

  it('ignora respuestas a preguntas que no son adaptativas', () => {
    const out = applyAdaptiveAnswers(baseRanking, { sit_1: 'a', vis_1: 'b' });
    expect(out).toEqual(baseRanking);
  });
});
