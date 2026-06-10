/**
 * Genera la tabla de calibración de señales (src/test/engine/signalCalibration.ts).
 *
 * Simula 20.000 respondedores aleatorios y calcula los percentiles empíricos
 * de cada una de las 37 señales. El motor de emergencia usa esa tabla para
 * transformar cada señal a "percentil poblacional" antes de aplicar las
 * reglas de arquetipos, de modo que un umbral de 70 signifique lo mismo
 * ("top 30% de la población") para todas las señales.
 *
 * Correr de nuevo si cambian las preguntas o el mapeo de señales:
 *   npx tsx scripts/calibrate.ts
 */

import { computeVector, type VectorVocacional } from '../src/test/engine/signals';
import { QUESTIONS } from '../src/test/data/questions';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function combinations<T>(arr: T[], k: number): T[][] {
  if (k === 0) return [[]];
  if (arr.length < k) return [];
  const [first, ...rest] = arr;
  return combinations(rest, k - 1).map(c => [first, ...c]).concat(combinations(rest, k));
}

const ANSWER_VALUES: Record<string, string[]> = Object.create(null);
for (const q of QUESTIONS) {
  const ids = q.opciones.map(o => o.id);
  ANSWER_VALUES[q.id] = q.tipo === 'multiselect'
    ? combinations(ids, q.maxSelect ?? 2).map(c => c.join(','))
    : ids;
}

const N = 20_000;
const rng = mulberry32(20260610);
const samples: Record<string, number[]> = Object.create(null);

for (let i = 0; i < N; i++) {
  const answers: Record<string, string> = {};
  for (const q of QUESTIONS) {
    const values = ANSWER_VALUES[q.id];
    answers[q.id] = values[Math.floor(rng() * values.length)];
  }
  const vector = computeVector(answers);
  for (const [sig, val] of Object.entries(vector)) {
    (samples[sig] ??= []).push(val as number);
  }
}

// Percentiles 0..100 por señal
const table: Record<string, number[]> = Object.create(null);
for (const [sig, vals] of Object.entries(samples)) {
  vals.sort((a, b) => a - b);
  const breakpoints: number[] = [];
  for (let p = 0; p <= 100; p++) {
    breakpoints.push(vals[Math.min(vals.length - 1, Math.floor((p / 100) * vals.length))]);
  }
  table[sig] = breakpoints;
}

const signalOrder = Object.keys(samples) as (keyof VectorVocacional)[];

const fileLines: string[] = [];
fileLines.push('/**');
fileLines.push(' * Calibración empírica de señales — GENERADO por scripts/calibrate.ts');
fileLines.push(` * Base: ${N.toLocaleString('es-AR')} respondedores aleatorios, semilla 20260610.`);
fileLines.push(' * Para cada señal: valores en los percentiles 0..100 de la población.');
fileLines.push(' * NO editar a mano — regenerar con: npx tsx scripts/calibrate.ts');
fileLines.push(' */');
fileLines.push('');
fileLines.push("import type { VectorVocacional } from './signals';");
fileLines.push('');
fileLines.push('export const SIGNAL_PERCENTILES: Record<keyof VectorVocacional, number[]> = {');
for (const sig of signalOrder) {
  fileLines.push(`  ${sig}: [${table[sig].join(', ')}],`);
}
fileLines.push('};');
fileLines.push('');
fileLines.push('/**');
fileLines.push(' * Percentil poblacional (0-100) de un valor de señal.');
fileLines.push(' * Señales sin varianza en la población devuelven 50 (neutras).');
fileLines.push(' */');
fileLines.push('export function signalPercentile(signal: keyof VectorVocacional, value: number): number {');
fileLines.push('  const bp = SIGNAL_PERCENTILES[signal];');
fileLines.push('  if (!bp || bp[0] === bp[100]) return 50;');
fileLines.push('  if (value <= bp[0]) return 0;');
fileLines.push('  if (value >= bp[100]) return 100;');
fileLines.push('  let lo = 0;');
fileLines.push('  let hi = 100;');
fileLines.push('  while (lo < hi) {');
fileLines.push('    const mid = (lo + hi) >> 1;');
fileLines.push('    if (bp[mid] < value) lo = mid + 1;');
fileLines.push('    else hi = mid;');
fileLines.push('  }');
fileLines.push('  // lo = primer percentil cuyo breakpoint alcanza el valor');
fileLines.push('  return lo;');
fileLines.push('}');
fileLines.push('');

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, '..', 'src', 'test', 'engine', 'signalCalibration.ts');
writeFileSync(outPath, fileLines.join('\n'), 'utf-8');
console.log(`Calibración escrita en ${outPath}`);

// Resumen para inspección rápida
for (const sig of signalOrder) {
  const bp = table[sig];
  console.log(
    `${sig.padEnd(28)} p10=${String(bp[10]).padStart(4)} p50=${String(bp[50]).padStart(4)} p75=${String(bp[75]).padStart(4)} p90=${String(bp[90]).padStart(4)} max=${String(bp[100]).padStart(4)}`,
  );
}
