/**
 * Diagnóstico del motor vocacional V2.
 *
 * Corre 5 análisis contra el motor real (sin mocks):
 *   1. SESGO ESTRUCTURAL  — respuestas 100% aleatorias: ¿qué arquetipos gana el motor "por construcción"?
 *   2. IDENTIFICABILIDAD  — ¿existe algún patrón de respuestas que haga ganar a cada uno de los 12 arquetipos?
 *   3. REPETICIÓN         — sobre una población mixta: ¿cuántas carreras distintas recomienda? ¿todos reciben lo mismo?
 *   4. CONFIANZA          — distribución real del % de confianza.
 *   5. SENSIBILIDAD       — cambiar UNA respuesta al azar: ¿con qué frecuencia cambia el arquetipo primario?
 *
 * Uso: npm run diagnose   (o: npx tsx scripts/diagnose.ts)
 *
 * Terminación: todos los bucles tienen cota fija (N_RANDOM, N_MIX, restarts) —
 * no hay recursión sin fondo ni `while(true)`. Corre en ~20 s en una laptop.
 * Imprime progreso por stderr para que se note que avanza (no está colgado).
 */

import { calcularResultado, type ScoringResult } from '../src/test/engine/scorer';
import { recomendar } from '../src/test/engine/recommender';
import { QUESTIONS } from '../src/test/data/questions';
import { ARQUETIPOS } from '../src/test/data/arquetipos';
import { type UserProfile } from '../src/test/data/profile';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// ─── PRNG con semilla (reproducible) ─────────────────────────────────────────

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const PROFILE: UserProfile = {
  nombre: 'Sim',
  email: 'sim@test.com',
  edad: '18',
  provinciaId: 'CABA',
  movilidad: 'si',
};

// ─── Generación de respuestas ────────────────────────────────────────────────

/** Todas las combinaciones de tamaño k (para multiselect). */
function combinations<T>(arr: T[], k: number): T[][] {
  if (k === 0) return [[]];
  if (arr.length < k) return [];
  const [first, ...rest] = arr;
  const withFirst = combinations(rest, k - 1).map(c => [first, ...c]);
  return withFirst.concat(combinations(rest, k));
}

/** Valores posibles de respuesta para una pregunta (multiselect → combos). */
function answerValues(q: (typeof QUESTIONS)[number]): string[] {
  const ids = q.opciones.map(o => o.id);
  if (q.tipo === 'multiselect') {
    const k = q.maxSelect ?? 2;
    return combinations(ids, k).map(c => c.join(','));
  }
  return ids;
}

const ANSWER_VALUES: Record<string, string[]> = Object.create(null);
for (const q of QUESTIONS) ANSWER_VALUES[q.id] = answerValues(q);

function randomAnswers(rng: () => number): Record<string, string> {
  const answers: Record<string, string> = {};
  for (const q of QUESTIONS) {
    const values = ANSWER_VALUES[q.id];
    answers[q.id] = values[Math.floor(rng() * values.length)];
  }
  return answers;
}

// ─── 2. Identificabilidad: búsqueda greedy del patrón ideal por arquetipo ────

function emergenceOf(result: ScoringResult, arqId: string): number {
  return result.ranking.find(r => r.id === arqId)?.score ?? 0;
}

/**
 * Busca el patrón de respuestas que maximiza la emergencia de un arquetipo.
 * Optimización por coordenadas con 25 reinicios aleatorios (la superficie
 * tiene mesetas en 0 por los thresholds de las reglas, así que un solo
 * arranque puede quedarse atascado). Desempate: minimizar al mejor rival.
 */
function idealAnswersFor(arqId: string, rng: () => number): { answers: Record<string, string>; result: ScoringResult } {
  const objective = (answers: Record<string, string>): [number, number] => {
    const result = calcularResultado(answers, PROFILE);
    const target = emergenceOf(result, arqId);
    const bestRival = Math.max(...result.ranking.filter(r => r.id !== arqId).map(r => r.score), 0);
    // Primero ganar (margen sobre el mejor rival), después intensidad propia.
    return [target - bestRival, target];
  };
  const better = (a: [number, number], b: [number, number]) =>
    a[0] > b[0] || (a[0] === b[0] && a[1] > b[1]);

  let globalBest: Record<string, string> | null = null;
  let globalScore: [number, number] = [-1, -Infinity];

  for (let restart = 0; restart < 25; restart++) {
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

  return { answers: globalBest!, result: calcularResultado(globalBest!, PROFILE) };
}

// ─── Población mixta: ideales con ruido + aleatorios ─────────────────────────

/** Responde como el ideal de un arquetipo con prob. `fidelity`, al azar el resto. */
function noisyAnswers(
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

// ─── Helpers de reporte ──────────────────────────────────────────────────────

const lines: string[] = [];
const out = (s = '') => lines.push(s);
const pad = (s: string, n: number) => s.padEnd(n, ' ');
const rpad = (s: string, n: number) => s.padStart(n, ' ');
const bar = (count: number, total: number, width = 24) => {
  const filled = Math.round((count / total) * width);
  return '█'.repeat(filled) + '·'.repeat(width - filled);
};
const pct = (n: number, total: number) => ((n / total) * 100).toFixed(1) + '%';

function printDistribution(counts: Record<string, number>, total: number) {
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  for (const [id, cnt] of sorted) {
    out(`  ${pad(id, 14)} ${bar(cnt, total)} ${rpad(String(cnt), 6)}  (${pct(cnt, total)})`);
  }
  for (const arq of ARQUETIPOS) {
    if (!counts[arq.id]) out(`  ${pad(arq.id, 14)} ${bar(0, total)} ${rpad('0', 6)}  (0.0%)  ⚠️ NUNCA GANA`);
  }
}

// ═════════════════════════════════════════════════════════════════════════════
// 1. SESGO ESTRUCTURAL — 10.000 respondedores 100% aleatorios
// ═════════════════════════════════════════════════════════════════════════════

out('═══════════════════════════════════════════════════════════');
out('DIAGNÓSTICO DEL MOTOR VOCACIONAL — ' + new Date().toISOString().slice(0, 10));
out('═══════════════════════════════════════════════════════════');
out();
out('1) SESGO ESTRUCTURAL (10.000 respuestas 100% aleatorias)');
out('   Si el motor fuera neutral, cada arquetipo ganaría ~8,3%.');
out('   Desvíos grandes = el motor favorece/castiga por construcción.');
out('───────────────────────────────────────────────────────────');

const N_RANDOM = 10_000;
const randomPrimary: Record<string, number> = Object.create(null);
{
  const rng = mulberry32(1234);
  for (let i = 0; i < N_RANDOM; i++) {
    const result = calcularResultado(randomAnswers(rng), PROFILE);
    randomPrimary[result.primario.id] = (randomPrimary[result.primario.id] ?? 0) + 1;
  }
}
printDistribution(randomPrimary, N_RANDOM);
out();

// ═════════════════════════════════════════════════════════════════════════════
// 2. IDENTIFICABILIDAD — ¿cada arquetipo puede ganar?
// ═════════════════════════════════════════════════════════════════════════════

out('2) IDENTIFICABILIDAD (patrón óptimo por arquetipo, búsqueda greedy)');
out('   Para cada arquetipo: el mejor patrón de respuestas posible.');
out('   "rank" = posición que alcanza en su propio patrón ideal (1 = gana).');
out('───────────────────────────────────────────────────────────');

const ideals: Record<string, Record<string, string>> = Object.create(null);
const idealRng = mulberry32(777);
let idealIdx = 0;
for (const arq of ARQUETIPOS) {
  console.error(`  [progreso] búsqueda ideal ${++idealIdx}/${ARQUETIPOS.length} (${arq.id})…`);
  const { answers, result } = idealAnswersFor(arq.id, idealRng);
  ideals[arq.id] = answers;
  const rank = result.ranking.findIndex(r => r.id === arq.id) + 1;
  const score = emergenceOf(result, arq.id);
  const winner = result.primario.id;
  const flag = rank === 1 ? 'OK' : `⚠️ NO IDENTIFICABLE (gana ${winner})`;
  out(
    `  ${pad(arq.id, 14)} emergencia=${rpad(String(score), 3)}  rank=${rank}  ` +
    `confianza=${result.confianza}%  ${flag}`,
  );
}
out();

// ═════════════════════════════════════════════════════════════════════════════
// 3 + 4. POBLACIÓN MIXTA — repetición de carreras y confianza
// ═════════════════════════════════════════════════════════════════════════════

out('3) REPETICIÓN DE RESULTADOS (población mixta de 10.000)');
out('   60% "tipos puros con ruido" (fidelidad 0,6) + 40% aleatorios.');
out('   Mide si el test le repite las mismas carreras a todo el mundo.');
out('───────────────────────────────────────────────────────────');

const N_MIX = 10_000;
const mixPrimary: Record<string, number> = Object.create(null);
const topCareerCounts: Record<string, number> = Object.create(null);
const careerSetCounts: Record<string, number> = Object.create(null);
const careerAppearance: Record<string, number> = Object.create(null);
const confidences: number[] = [];
const mixResults: { answers: Record<string, string>; result: ScoringResult }[] = [];
{
  const rng = mulberry32(5678);
  const arqIds = ARQUETIPOS.map(a => a.id);
  for (let i = 0; i < N_MIX; i++) {
    if (i % 2500 === 0) console.error(`  [progreso] población mixta ${i}/${N_MIX}…`);
    const answers =
      i < N_MIX * 0.6
        ? noisyAnswers(ideals[arqIds[i % arqIds.length]], 0.6, rng)
        : randomAnswers(rng);
    const result = calcularResultado(answers, PROFILE);
    mixResults.push({ answers, result });
    mixPrimary[result.primario.id] = (mixPrimary[result.primario.id] ?? 0) + 1;
    confidences.push(result.confianza);

    const carreras = recomendar(result);
    if (carreras.length > 0) {
      const top = carreras[0].titulo;
      topCareerCounts[top] = (topCareerCounts[top] ?? 0) + 1;
    }
    const setKey = carreras.map(c => c.id).sort().join('|');
    careerSetCounts[setKey] = (careerSetCounts[setKey] ?? 0) + 1;
    for (const c of carreras) careerAppearance[c.titulo] = (careerAppearance[c.titulo] ?? 0) + 1;
  }
}

out('  Arquetipo primario en población mixta:');
printDistribution(mixPrimary, N_MIX);
out();

const topSorted = Object.entries(topCareerCounts).sort((a, b) => b[1] - a[1]);
out(`  Carreras distintas como recomendación #1 (top): ${topSorted.length}`);
out('  Top 10 carreras más repetidas como #1:');
for (const [titulo, cnt] of topSorted.slice(0, 10)) {
  out(`    ${pad(titulo.slice(0, 44), 46)} ${rpad(String(cnt), 5)}  (${pct(cnt, N_MIX)})`);
}
out();

const setSorted = Object.entries(careerSetCounts).sort((a, b) => b[1] - a[1]);
out(`  Sets de 8-9 carreras DISTINTOS entre 10.000 usuarios: ${setSorted.length}`);
out(`  El set más común se repite: ${setSorted[0][1]} veces (${pct(setSorted[0][1], N_MIX)})`);
const top5Sets = setSorted.slice(0, 5).reduce((s, [, c]) => s + c, 0);
out(`  Los 5 sets más comunes cubren: ${pct(top5Sets, N_MIX)} de los usuarios`);
out(`  Carreras del catálogo que aparecen al menos una vez: ${Object.keys(careerAppearance).length}`);
out();

out('4) DISTRIBUCIÓN DE CONFIANZA (población mixta)');
out('   El rango teórico es 45–97%. Si todo cae arriba de 85%, el número');
out('   no informa nada (siempre "muy seguro").');
out('───────────────────────────────────────────────────────────');
{
  const buckets: Record<string, number> = {
    '45-54': 0, '55-64': 0, '65-74': 0, '75-84': 0, '85-94': 0, '95-97': 0,
  };
  for (const c of confidences) {
    if (c < 55) buckets['45-54']++;
    else if (c < 65) buckets['55-64']++;
    else if (c < 75) buckets['65-74']++;
    else if (c < 85) buckets['75-84']++;
    else if (c < 95) buckets['85-94']++;
    else buckets['95-97']++;
  }
  for (const [range, cnt] of Object.entries(buckets)) {
    out(`  ${pad(range, 7)} ${bar(cnt, N_MIX)} ${rpad(String(cnt), 6)}  (${pct(cnt, N_MIX)})`);
  }
  const avg = confidences.reduce((a, b) => a + b, 0) / confidences.length;
  out(`  Promedio: ${avg.toFixed(1)}%  |  Mín: ${Math.min(...confidences)}%  |  Máx: ${Math.max(...confidences)}%`);
}
out();

// ═════════════════════════════════════════════════════════════════════════════
// 5. SENSIBILIDAD — cambiar UNA respuesta
// ═════════════════════════════════════════════════════════════════════════════

out('5) SENSIBILIDAD (2.000 usuarios de la población mixta)');
out('   Se cambia UNA respuesta al azar por otra opción de esa pregunta.');
out('   % alto = resultado frágil; depende demasiado de respuestas sueltas.');
out('───────────────────────────────────────────────────────────');
{
  const rng = mulberry32(9999);
  let primaryFlips = 0;
  let topCareerFlips = 0;
  const flipsByQuestion: Record<string, { flips: number; trials: number }> = Object.create(null);
  const SAMPLE = 2000;
  for (let i = 0; i < SAMPLE; i++) {
    const { answers, result } = mixResults[Math.floor(rng() * mixResults.length)];
    const q = QUESTIONS[Math.floor(rng() * QUESTIONS.length)];
    const values = ANSWER_VALUES[q.id].filter(v => v !== answers[q.id]);
    if (values.length === 0) continue;
    const mutated = { ...answers, [q.id]: values[Math.floor(rng() * values.length)] };
    const newResult = calcularResultado(mutated, PROFILE);

    if (!flipsByQuestion[q.id]) flipsByQuestion[q.id] = { flips: 0, trials: 0 };
    flipsByQuestion[q.id].trials++;
    if (newResult.primario.id !== result.primario.id) {
      primaryFlips++;
      flipsByQuestion[q.id].flips++;
    }
    const oldTop = recomendar(result)[0]?.titulo;
    const newTop = recomendar(newResult)[0]?.titulo;
    if (oldTop !== newTop) topCareerFlips++;
  }
  out(`  Cambia el ARQUETIPO PRIMARIO: ${pct(primaryFlips, SAMPLE)} de las veces`);
  out(`  Cambia la CARRERA #1:        ${pct(topCareerFlips, SAMPLE)} de las veces`);
  out();
  out('  Preguntas más decisivas (% de flips de arquetipo al cambiarlas):');
  const qSorted = Object.entries(flipsByQuestion)
    .map(([id, { flips, trials }]) => ({ id, rate: trials > 0 ? flips / trials : 0, trials }))
    .sort((a, b) => b.rate - a.rate);
  for (const { id, rate, trials } of qSorted.slice(0, 6)) {
    out(`    ${pad(id, 10)} ${(rate * 100).toFixed(0)}%  (n=${trials})`);
  }
}
out();
out('═══════════════════════════════════════════════════════════');

const report = lines.join('\n');
console.log(report);

const __dirname = dirname(fileURLToPath(import.meta.url));
writeFileSync(join(__dirname, 'diagnostic-results.txt'), report, 'utf-8');
console.error('Guardado en scripts/diagnostic-results.txt');
