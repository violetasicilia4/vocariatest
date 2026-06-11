/**
 * Validación de la fase adaptativa.
 *
 * Simula la población mixta (igual que diagnose.ts) recorriendo el flujo
 * completo: núcleo → selección adaptativa → respuestas de desempate → scoring
 * final. Compara contra el flujo sin fase adaptativa:
 *
 *   - ACTIVACIÓN:    % de usuarios que reciben duelos y cuántos en promedio.
 *   - PRECISIÓN:     en usuarios "tipo puro con ruido" (verdad conocida),
 *                    % cuyo arquetipo final coincide con el verdadero.
 *   - RESOLUCIÓN:    brecha top1-top2 y confianza, antes vs después.
 *   - SENSIBILIDAD:  % de cambios de arquetipo al alterar UNA respuesta núcleo.
 *
 * Uso: npx tsx scripts/diagnose-adaptive.ts
 */

import { calcularResultado } from '../src/test/engine/scorer';
import { selectAdaptiveQuestions } from '../src/test/engine/adaptive';
import { QUESTIONS, type Question } from '../src/test/data/questions';
import { ARQUETIPOS } from '../src/test/data/arquetipos';
import { type UserProfile } from '../src/test/data/profile';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// ─── Infra compartida con diagnose.ts ────────────────────────────────────────

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

function randomCoreAnswers(rng: () => number): Record<string, string> {
  const answers: Record<string, string> = {};
  for (const q of QUESTIONS) {
    const values = ANSWER_VALUES[q.id];
    answers[q.id] = values[Math.floor(rng() * values.length)];
  }
  return answers;
}

const PROFILE: UserProfile = {
  nombre: 'Sim', email: 'sim@test.com', edad: '18', provinciaId: 'CABA', movilidad: 'si',
};

// Patrones ideales por arquetipo (misma búsqueda greedy que diagnose.ts)
function emergenceOf(ranking: Array<{ id: string; score: number }>, arqId: string): number {
  return ranking.find(r => r.id === arqId)?.score ?? 0;
}

function idealAnswersFor(arqId: string, rng: () => number): Record<string, string> {
  const objective = (answers: Record<string, string>): [number, number] => {
    const r = calcularResultado(answers, PROFILE);
    const target = emergenceOf(r.ranking, arqId);
    const rival = Math.max(...r.ranking.filter(x => x.id !== arqId).map(x => x.score), 0);
    return [target - rival, target];
  };
  const better = (a: [number, number], b: [number, number]) =>
    a[0] > b[0] || (a[0] === b[0] && a[1] > b[1]);

  let globalBest: Record<string, string> | null = null;
  let globalScore: [number, number] = [-Infinity, -Infinity];
  for (let restart = 0; restart < 25; restart++) {
    const answers = randomCoreAnswers(rng);
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
  return globalBest!;
}

// ─── Respuesta simulada a la fase adaptativa ─────────────────────────────────

/**
 * Cómo responde un usuario los duelos: si tiene arquetipo "verdadero",
 * elige la opción que más lo favorece (con 25% de ruido); si es aleatorio,
 * elige al azar.
 */
function answerAdaptive(
  qs: Question[],
  trueArq: string | null,
  rng: () => number,
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const q of qs) {
    if (trueArq === null || rng() < 0.25) {
      out[q.id] = q.opciones[Math.floor(rng() * q.opciones.length)].id;
      continue;
    }
    let best = q.opciones[0];
    let bestScore = -1;
    for (const op of q.opciones) {
      const s = op.scores?.[trueArq] ?? 0;
      if (s > bestScore) {
        bestScore = s;
        best = op;
      }
    }
    out[q.id] = best.id;
  }
  return out;
}

/** Flujo completo de un usuario: núcleo → duelos → resultado final. */
function runFullFlow(
  coreAnswers: Record<string, string>,
  trueArq: string | null,
  rng: () => number,
) {
  const interim = calcularResultado(coreAnswers, PROFILE);
  const adaptive = selectAdaptiveQuestions(interim.ranking);
  const adaptiveAnswers = answerAdaptive(adaptive, trueArq, rng);
  const finalAnswers = { ...coreAnswers, ...adaptiveAnswers };
  const final = adaptive.length > 0 ? calcularResultado(finalAnswers, PROFILE) : interim;
  return { interim, final, adaptiveCount: adaptive.length, finalAnswers };
}

// ─── Simulación ──────────────────────────────────────────────────────────────

const lines: string[] = [];
const out = (s = '') => lines.push(s);
const pct = (n: number, total: number) => ((n / total) * 100).toFixed(1) + '%';
const avg = (arr: number[]) => (arr.reduce((a, b) => a + b, 0) / Math.max(arr.length, 1));

out('═══════════════════════════════════════════════════════════');
out('VALIDACIÓN FASE ADAPTATIVA — ' + new Date().toISOString().slice(0, 10));
out('═══════════════════════════════════════════════════════════');
out();

const setupRng = mulberry32(777);
const ideals: Record<string, Record<string, string>> = Object.create(null);
for (const arq of ARQUETIPOS) ideals[arq.id] = idealAnswersFor(arq.id, setupRng);

function noisyAnswers(ideal: Record<string, string>, fidelity: number, rng: () => number) {
  const answers: Record<string, string> = {};
  for (const q of QUESTIONS) {
    answers[q.id] = rng() < fidelity
      ? ideal[q.id]
      : ANSWER_VALUES[q.id][Math.floor(rng() * ANSWER_VALUES[q.id].length)];
  }
  return answers;
}

const N = 10_000;
const rng = mulberry32(5678);
const arqIds = ARQUETIPOS.map(a => a.id);

let triggered = 0;
const adaptiveCounts: number[] = [];
let accSin = 0, accCon = 0, totalConVerdad = 0;
const gapBefore: number[] = [], gapAfter: number[] = [];
const confBefore: number[] = [], confAfter: number[] = [];
let primaryChangedByAdaptive = 0;
const users: Array<{ core: Record<string, string>; trueArq: string | null }> = [];

for (let i = 0; i < N; i++) {
  const isTyped = i < N * 0.6;
  const trueArq = isTyped ? arqIds[i % arqIds.length] : null;
  const core = isTyped ? noisyAnswers(ideals[trueArq!], 0.6, rng) : randomCoreAnswers(rng);
  users.push({ core, trueArq });

  const { interim, final, adaptiveCount } = runFullFlow(core, trueArq, rng);

  if (adaptiveCount > 0) {
    triggered++;
    adaptiveCounts.push(adaptiveCount);
    gapBefore.push(interim.ranking[0].score - (interim.ranking[1]?.score ?? 0));
    gapAfter.push(final.ranking[0].score - (final.ranking[1]?.score ?? 0));
    confBefore.push(interim.confianza);
    confAfter.push(final.confianza);
    if (final.primario.id !== interim.primario.id) primaryChangedByAdaptive++;
  }

  if (trueArq) {
    totalConVerdad++;
    if (interim.primario.id === trueArq) accSin++;
    if (final.primario.id === trueArq) accCon++;
  }
}

out('1) ACTIVACIÓN');
out('───────────────────────────────────────────────────────────');
out(`  Usuarios que reciben fase adaptativa: ${pct(triggered, N)}`);
out(`  Duelos promedio cuando se activa: ${avg(adaptiveCounts).toFixed(1)} preguntas`);
out(`  Largo del test: 18 preguntas (${pct(N - triggered, N)} de usuarios) / ${18 + Math.round(avg(adaptiveCounts))} (${pct(triggered, N)})`);
out();

out('2) PRECISIÓN (usuarios tipo puro con ruido, verdad conocida)');
out('───────────────────────────────────────────────────────────');
out(`  Arquetipo correcto SIN fase adaptativa: ${pct(accSin, totalConVerdad)}`);
out(`  Arquetipo correcto CON fase adaptativa: ${pct(accCon, totalConVerdad)}`);
out();

out('3) RESOLUCIÓN DE LA DISPUTA (solo usuarios con fase adaptativa)');
out('───────────────────────────────────────────────────────────');
out(`  Brecha top1-top2:  ${avg(gapBefore).toFixed(1)} → ${avg(gapAfter).toFixed(1)} puntos`);
out(`  Confianza:         ${avg(confBefore).toFixed(1)}% → ${avg(confAfter).toFixed(1)}%`);
out(`  La fase adaptativa cambió el arquetipo primario en: ${pct(primaryChangedByAdaptive, triggered)} de los casos activados`);
out();

// ─── Sensibilidad con flujo completo ─────────────────────────────────────────

out('4) SENSIBILIDAD (cambiar UNA respuesta núcleo, 2.000 muestras)');
out('───────────────────────────────────────────────────────────');
{
  const sRng = mulberry32(9999);
  const SAMPLE = 2000;
  let flipsSin = 0, flipsCon = 0;
  let flipsConTyped = 0, typedTrials = 0;
  for (let i = 0; i < SAMPLE; i++) {
    const { core, trueArq } = users[Math.floor(sRng() * users.length)];
    const q = QUESTIONS[Math.floor(sRng() * QUESTIONS.length)];
    const alternatives = ANSWER_VALUES[q.id].filter(v => v !== core[q.id]);
    if (alternatives.length === 0) continue;
    const mutated = { ...core, [q.id]: alternatives[Math.floor(sRng() * alternatives.length)] };

    // Sin fase adaptativa
    const sinBase = calcularResultado(core, PROFILE);
    const sinMut = calcularResultado(mutated, PROFILE);
    if (sinBase.primario.id !== sinMut.primario.id) flipsSin++;

    // Con fase adaptativa (mismo rng derivado para responder duelos)
    const aRng1 = mulberry32(1000 + i);
    const aRng2 = mulberry32(1000 + i);
    const conBase = runFullFlow(core, trueArq, aRng1);
    const conMut = runFullFlow(mutated, trueArq, aRng2);
    const flipped = conBase.final.primario.id !== conMut.final.primario.id;
    if (flipped) flipsCon++;
    if (trueArq) {
      typedTrials++;
      if (flipped) flipsConTyped++;
    }
  }
  out(`  Cambia el arquetipo SIN adaptativa: ${pct(flipsSin, SAMPLE)}`);
  out(`  Cambia el arquetipo CON adaptativa: ${pct(flipsCon, SAMPLE)}`);
  out(`  CON adaptativa, solo usuarios con perfil real: ${pct(flipsConTyped, typedTrials)}`);
}
out();
out('═══════════════════════════════════════════════════════════');

const report = lines.join('\n');
console.log(report);

const __dirname = dirname(fileURLToPath(import.meta.url));
writeFileSync(join(__dirname, 'adaptive-results.txt'), report, 'utf-8');
console.error('Guardado en scripts/adaptive-results.txt');
