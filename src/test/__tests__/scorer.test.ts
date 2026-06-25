import { describe, it, expect } from 'vitest';
import { calcularResultado, type ScoringResult } from '../engine/scorer';
import { QUESTIONS } from '../data/questions';
import { ARQUETIPOS, getArquetipo } from '../data/arquetipos';
import {
  PROFILE,
  mulberry32,
  randomAnswers,
  idealAnswersFor,
  emergenceOf,
} from './helpers';

const ARQ_IDS = ARQUETIPOS.map(a => a.id);

/** Invariantes que TODO resultado válido debe cumplir, pase lo que pase. */
function expectValidResult(result: ScoringResult): void {
  // Siempre hay un primario, y es un arquetipo real del catálogo.
  expect(result.primario).toBeTruthy();
  expect(ARQ_IDS).toContain(result.primario.id);

  // El ranking incluye SIEMPRE los 12 arquetipos, ordenado descendente.
  expect(result.ranking).toHaveLength(ARQUETIPOS.length);
  const ids = new Set(result.ranking.map(r => r.id));
  expect(ids.size).toBe(ARQUETIPOS.length);
  for (let i = 1; i < result.ranking.length; i++) {
    expect(result.ranking[i - 1].score).toBeGreaterThanOrEqual(result.ranking[i].score);
  }
  for (const r of result.ranking) {
    expect(r.score).toBeGreaterThanOrEqual(0);
    expect(r.score).toBeLessThanOrEqual(100);
    expect(Number.isFinite(r.score)).toBe(true);
  }

  // El primario es el tope del ranking.
  expect(result.primario.id).toBe(result.ranking[0].id);

  // Secundario/tercero, si existen, son arquetipos reales y distintos del primario.
  if (result.secundario) {
    expect(ARQ_IDS).toContain(result.secundario.id);
    expect(result.secundario.id).not.toBe(result.primario.id);
  }
  if (result.tercero) {
    expect(ARQ_IDS).toContain(result.tercero.id);
  }

  // Confianza en rango razonable.
  expect(result.confianza).toBeGreaterThanOrEqual(0);
  expect(result.confianza).toBeLessThanOrEqual(100);
  expect(Number.isFinite(result.confianza)).toBe(true);

  // Estructuras presentes y consistentes.
  expect(Array.isArray(result.advertencias)).toBe(true);
  expect(Array.isArray(result.tensiones)).toBe(true);
  expect(Array.isArray(result.activos)).toBe(true);
  expect(result.preferences).toBeTruthy();
  expect(result.vector).toBeTruthy();
}

describe('calcularResultado — caminos extremos', () => {
  it('respuestas vacías → devuelve un resultado válido (no rompe)', () => {
    const result = calcularResultado({}, PROFILE);
    expectValidResult(result);
  });

  it('respuestas incompletas (solo 3 preguntas) → resultado válido + advertencia', () => {
    const partial = { sit_1: 'a', vis_1: 'a', sca_1: '3' };
    const result = calcularResultado(partial, PROFILE);
    expectValidResult(result);
    // Con < 80% respondido el scorer agrega una advertencia de completitud.
    expect(result.advertencias.length).toBeGreaterThan(0);
  });

  it('respuestas con valores inválidos → no rompe, devuelve resultado válido', () => {
    const garbage: Record<string, string> = {
      sit_1: 'opcion_inexistente',
      vis_1: '',
      mul_1: 'x,y,z',
      pregunta_que_no_existe: 'a',
    };
    const result = calcularResultado(garbage, PROFILE);
    expectValidResult(result);
  });

  it('respuesta extrema (siempre la opción "a") → resultado válido', () => {
    const extreme: Record<string, string> = {};
    for (const q of QUESTIONS) extreme[q.id] = q.opciones[0].id;
    const result = calcularResultado(extreme, PROFILE);
    expectValidResult(result);
  });

  it('todas las preguntas en su PRIMERA opción y en su ÚLTIMA opción dan resultados válidos', () => {
    const first: Record<string, string> = {};
    const last: Record<string, string> = {};
    for (const q of QUESTIONS) {
      first[q.id] = q.opciones[0].id;
      last[q.id] = q.opciones[q.opciones.length - 1].id;
    }
    expectValidResult(calcularResultado(first, PROFILE));
    expectValidResult(calcularResultado(last, PROFILE));
  });
});

describe('calcularResultado — robustez sobre población aleatoria', () => {
  it('200 respondedores aleatorios: TODOS los caminos devuelven resultado válido', () => {
    const rng = mulberry32(2024);
    for (let i = 0; i < 200; i++) {
      const result = calcularResultado(randomAnswers(rng), PROFILE);
      expectValidResult(result);
    }
  });

  it('es determinístico: mismas respuestas → mismo arquetipo primario y confianza', () => {
    const rng = mulberry32(42);
    const answers = randomAnswers(rng);
    const a = calcularResultado(answers, PROFILE);
    const b = calcularResultado(answers, PROFILE);
    expect(b.primario.id).toBe(a.primario.id);
    expect(b.confianza).toBe(a.confianza);
    expect(b.ranking.map(r => r.id)).toEqual(a.ranking.map(r => r.id));
  });
});

describe('scoring de arquetipos — identificabilidad', () => {
  it('cada uno de los 12 arquetipos puede ganar con su patrón ideal', () => {
    const rng = mulberry32(777);
    for (const arq of ARQUETIPOS) {
      const ideal = idealAnswersFor(arq.id, rng);
      const result = calcularResultado(ideal, PROFILE);
      expect(
        result.primario.id,
        `El arquetipo "${arq.id}" debería poder ganar con su patrón ideal (ganó "${result.primario.id}")`,
      ).toBe(arq.id);
      // Y su emergencia debe ser sustancial, no marginal.
      expect(emergenceOf(result, arq.id)).toBeGreaterThan(40);
    }
  });
});

describe('empates de arquetipos', () => {
  it('con respuestas neutras (sin scores) el primario sigue siendo un arquetipo válido', () => {
    // anti_1 es la única pregunta cuyas opciones no suman a ningún arquetipo.
    // Forzar solo esa respuesta deja a casi todos empatados en 0.
    const result = calcularResultado({ anti_1: 'rutina,soledad' }, PROFILE);
    expectValidResult(result);
  });

  it('getArquetipo() resuelve todos los ids del ranking', () => {
    const rng = mulberry32(9);
    const result = calcularResultado(randomAnswers(rng), PROFILE);
    for (const r of result.ranking) {
      expect(getArquetipo(r.id)).toBeTruthy();
    }
  });
});
