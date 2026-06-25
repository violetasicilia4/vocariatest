import { describe, it, expect } from 'vitest';
import { calcularResultado } from '../engine/scorer';
import { recomendar, type CarreraRecomendada } from '../engine/recommender';
import { ARQUETIPOS } from '../data/arquetipos';
import {
  PROFILE,
  mulberry32,
  randomAnswers,
  noisyAnswers,
  idealAnswersFor,
} from './helpers';

/** Invariantes de una recomendación válida. */
function expectValidRecommendations(carreras: CarreraRecomendada[]): void {
  expect(Array.isArray(carreras)).toBe(true);
  // Máximo de 9 (8 + 1 sorpresa) por diseño.
  expect(carreras.length).toBeLessThanOrEqual(9);
  const ids = new Set<string>();
  for (const c of carreras) {
    expect(c.id).toBeTruthy();
    expect(c.titulo).toBeTruthy();
    expect(c.fitScore).toBeGreaterThanOrEqual(0);
    expect(c.fitScore).toBeLessThanOrEqual(100);
    expect(['top', 'alternativa', 'sorpresa']).toContain(c.tag);
    expect(c.razon).toBeTruthy(); // siempre hay una explicación
    ids.add(c.id);
  }
  // Sin carreras duplicadas.
  expect(ids.size).toBe(carreras.length);
}

describe('recomendar — robustez', () => {
  it('respuestas vacías (sin datos suficientes) → no rompe; devuelve un array', () => {
    const result = calcularResultado({}, PROFILE);
    const carreras = recomendar(result);
    expectValidRecommendations(carreras);
  });

  it('200 perfiles aleatorios: todas las recomendaciones son válidas', () => {
    const rng = mulberry32(123);
    for (let i = 0; i < 200; i++) {
      const result = calcularResultado(randomAnswers(rng), PROFILE);
      expectValidRecommendations(recomendar(result));
    }
  });

  it('un perfil definido recibe varias carreras recomendadas', () => {
    const rng = mulberry32(55);
    const ideal = idealAnswersFor('arquitecto', rng);
    const result = calcularResultado(ideal, PROFILE);
    const carreras = recomendar(result);
    expect(carreras.length).toBeGreaterThan(3);
    // Hay al menos una marcada como cabeza de ranking.
    expect(carreras.some(c => c.tag === 'top')).toBe(true);
  });
});

describe('recomendar — diversidad', () => {
  it('respeta el tope de 3 carreras por macroárea y 2 por familia', () => {
    const rng = mulberry32(2025);
    for (let i = 0; i < 50; i++) {
      const result = calcularResultado(randomAnswers(rng), PROFILE);
      const carreras = recomendar(result);
      const porMacro: Record<string, number> = {};
      const porFamilia: Record<string, number> = {};
      for (const c of carreras) {
        if (c.tag === 'sorpresa') continue; // la sorpresa es excepción deliberada
        porMacro[c.macroArea] = (porMacro[c.macroArea] ?? 0) + 1;
        porFamilia[c.familia] = (porFamilia[c.familia] ?? 0) + 1;
      }
      for (const n of Object.values(porMacro)) expect(n).toBeLessThanOrEqual(3);
      for (const n of Object.values(porFamilia)) expect(n).toBeLessThanOrEqual(2);
    }
  });

  it('la población no recibe siempre la misma carrera #1 (diversidad global)', () => {
    const rng = mulberry32(5678);
    const ideals: Record<string, Record<string, string>> = {};
    const setupRng = mulberry32(777);
    for (const arq of ARQUETIPOS) ideals[arq.id] = idealAnswersFor(arq.id, setupRng);

    const arqIds = ARQUETIPOS.map(a => a.id);
    const topCareers = new Set<string>();
    const N = 300;
    for (let i = 0; i < N; i++) {
      const answers = noisyAnswers(ideals[arqIds[i % arqIds.length]], 0.6, rng);
      const result = calcularResultado(answers, PROFILE);
      const carreras = recomendar(result);
      if (carreras[0]) topCareers.add(carreras[0].titulo);
    }
    // Con 12 arquetipos distintos esperamos bastantes carreras #1 diferentes.
    expect(topCareers.size).toBeGreaterThanOrEqual(8);
  });
});
