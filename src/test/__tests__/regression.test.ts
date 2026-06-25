/**
 * Regresión estadística del motor vocacional.
 *
 * No valida un resultado puntual sino PROPIEDADES de la población: que ningún
 * arquetipo domine o desaparezca, que el recomendador dé diversidad, que el
 * resultado no sea frágil ante cambios chicos y que todo termine en tiempo
 * razonable (sin loops infinitos). Es la red de seguridad de futuros cambios
 * en la calibración. Versión liviana de scripts/diagnose.ts.
 */
import { describe, it, expect } from 'vitest';
import { calcularResultado } from '../engine/scorer';
import { recomendar } from '../engine/recommender';
import { selectAdaptiveQuestions } from '../engine/adaptive';
import { QUESTIONS } from '../data/questions';
import { ARQUETIPOS } from '../data/arquetipos';
import {
  PROFILE,
  mulberry32,
  randomAnswers,
  noisyAnswers,
  idealAnswersFor,
  ANSWER_VALUES,
} from './helpers';

const ARQ_IDS = ARQUETIPOS.map(a => a.id);

describe('regresión: distribución de arquetipos', () => {
  it('ningún arquetipo domina ni desaparece sobre 3000 respuestas aleatorias', () => {
    const N = 3000;
    const rng = mulberry32(1234);
    const counts: Record<string, number> = Object.create(null);
    for (const id of ARQ_IDS) counts[id] = 0;

    for (let i = 0; i < N; i++) {
      const result = calcularResultado(randomAnswers(rng), PROFILE);
      counts[result.primario.id]++;
    }

    // Neutral sería 1/12 ≈ 8,3%. Toleramos sesgo pero no patología:
    // ningún arquetipo gana > 18% ni queda por debajo de 1,5%.
    for (const id of ARQ_IDS) {
      const pct = (counts[id] / N) * 100;
      expect(pct, `${id} aparece como primario en ${pct.toFixed(1)}% (esperado ~8,3%)`).toBeLessThan(18);
      expect(pct, `${id} casi nunca gana (${pct.toFixed(1)}%)`).toBeGreaterThan(1.5);
    }
  });
});

describe('regresión: diversidad del recomendador', () => {
  it('una población mixta no recibe siempre el mismo set de carreras', () => {
    const setupRng = mulberry32(777);
    const ideals: Record<string, Record<string, string>> = {};
    for (const arq of ARQUETIPOS) ideals[arq.id] = idealAnswersFor(arq.id, setupRng);

    const rng = mulberry32(5678);
    const N = 600;
    const topCareers = new Set<string>();
    const careerSets = new Set<string>();
    let totalCareers = 0;

    for (let i = 0; i < N; i++) {
      const answers =
        i < N * 0.6
          ? noisyAnswers(ideals[ARQ_IDS[i % ARQ_IDS.length]], 0.6, rng)
          : randomAnswers(rng);
      const carreras = recomendar(calcularResultado(answers, PROFILE));
      totalCareers += carreras.length;
      if (carreras[0]) topCareers.add(carreras[0].titulo);
      careerSets.add(carreras.map(c => c.id).sort().join('|'));
    }

    // Diversidad real: muchas carreras #1 distintas y muchos sets distintos.
    expect(topCareers.size).toBeGreaterThanOrEqual(12);
    expect(careerSets.size).toBeGreaterThanOrEqual(40);
    // En promedio el recomendador devuelve un puñado de carreras (no vacío).
    expect(totalCareers / N).toBeGreaterThan(3);
  });
});

describe('regresión: estabilidad ante cambios chicos', () => {
  it('cambiar UNA respuesta rara vez destruye el resultado; siempre sigue válido', () => {
    const rng = mulberry32(9999);
    const N = 500;
    let flips = 0;

    for (let i = 0; i < N; i++) {
      const answers = randomAnswers(rng);
      const base = calcularResultado(answers, PROFILE);

      const q = QUESTIONS[Math.floor(rng() * QUESTIONS.length)];
      const alternatives = ANSWER_VALUES[q.id].filter(v => v !== answers[q.id]);
      if (alternatives.length === 0) continue;
      const mutated = { ...answers, [q.id]: alternatives[Math.floor(rng() * alternatives.length)] };
      const after = calcularResultado(mutated, PROFILE);

      // El resultado mutado SIEMPRE es válido (no rompe).
      expect(ARQ_IDS).toContain(after.primario.id);
      expect(after.ranking).toHaveLength(ARQUETIPOS.length);

      if (after.primario.id !== base.primario.id) flips++;
    }

    // Sobre respuestas 100% aleatorias (caso más inestable posible) el arquetipo
    // primario no debería cambiar en más de la mitad de las mutaciones.
    expect(flips / N).toBeLessThan(0.5);
  });
});

describe('regresión: terminación (sin loops infinitos)', () => {
  it('el flujo completo (núcleo → adaptativa → resultado) termina rápido en 1000 corridas', () => {
    const rng = mulberry32(31415);
    const start = Date.now();
    const MAX_MS = 20_000;

    for (let i = 0; i < 1000; i++) {
      const core = randomAnswers(rng);
      const interim = calcularResultado(core, PROFILE);
      const adaptive = selectAdaptiveQuestions(interim.ranking);
      // La fase adaptativa nunca pide más de 5 preguntas (cota dura del motor).
      expect(adaptive.length).toBeLessThanOrEqual(5);

      const adaptiveAnswers: Record<string, string> = {};
      for (const q of adaptive) adaptiveAnswers[q.id] = q.opciones[0].id;
      const final = calcularResultado({ ...core, ...adaptiveAnswers }, PROFILE);
      expect(ARQ_IDS).toContain(final.primario.id);
    }

    expect(Date.now() - start, 'el flujo completo tardó demasiado').toBeLessThan(MAX_MS);
  });
});
