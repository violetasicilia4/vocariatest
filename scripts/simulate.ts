import { calcularResultado } from '../src/test/engine/scorer';
import { type UserProfile } from '../src/test/data/profile';

// ─── Seeded PRNG ──────────────────────────────────────────────────────────────

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ─── Weighted random helpers ──────────────────────────────────────────────────

function weightedChoice(
  options: string[],
  weights: number[],
  rng: () => number,
): string {
  const total = weights.reduce((a, b) => a + b, 0);
  let r = rng() * total;
  for (let i = 0; i < options.length; i++) {
    r -= weights[i];
    if (r <= 0) return options[i];
  }
  return options[options.length - 1];
}

function weightedChooseN(
  options: string[],
  weights: number[],
  n: number,
  rng: () => number,
): string[] {
  const chosen: string[] = [];
  const remainingOpts = [...options];
  const remainingWts = [...weights];

  for (let i = 0; i < n && remainingOpts.length > 0; i++) {
    const total = remainingWts.reduce((a, b) => a + b, 0);
    if (total <= 0) break;
    let r = rng() * total;
    let idx = 0;
    for (let j = 0; j < remainingOpts.length; j++) {
      r -= remainingWts[j];
      if (r <= 0) {
        idx = j;
        break;
      }
      idx = j;
    }
    chosen.push(remainingOpts[idx]);
    remainingOpts.splice(idx, 1);
    remainingWts.splice(idx, 1);
  }
  return chosen;
}

// ─── Profile type answer distributions ────────────────────────────────────────

type ProfileDef = {
  sit_1: number[];
  vis_1: number[];
  sca_1: number[];
  sit_2: number[];
  mul_1: number[];
  anti_1: number[];
  vis_2: number[];
  vis_sat: number[];
  xv_impacto: number[];
  sit_4: number[];
  par_2: number[];
  sca_3: number[];
  sit_6: number[];
  xv_liderazgo: number[];
  mul_2: number[];
  sca_4: number[];
  par_3: number[];
  sit_fis: number[];
  sit_8: number[];
  sit_9: number[];
};

const PROFILES: Record<number, ProfileDef> = {
  // 1 — Analítico-Técnico
  1: {
    sit_1:   [70, 20, 5, 5],
    vis_1:   [35, 5, 5, 40, 10, 5],
    sca_1:   [40, 30, 15, 10, 5],
    sit_2:   [30, 50, 10, 10],
    mul_1:   [40, 5, 30, 10, 15, 20, 10, 25],
    anti_1:  [30, 3, 35, 25, 30, 5, 10],
    vis_2:   [35, 15, 5, 30, 10, 5],
    vis_sat: [5, 40, 20, 25, 5, 5],
    xv_impacto: [10, 60, 15, 15],
    sit_4:   [20, 5, 50, 25],
    par_2:   [70, 30],
    sca_3:   [25, 20, 15, 20, 20],
    sit_6:   [50, 25, 10, 15],
    xv_liderazgo: [15, 5, 30, 50],
    mul_2:   [45, 5, 20, 45, 15, 10, 15, 20],
    sca_4:   [5, 10, 20, 25, 40],
    par_3:   [30, 70],
    sit_fis: [45, 10, 35, 10],
    sit_8:   [35, 30, 5, 30],
    sit_9:   [50, 10, 25, 15],
  },
  // 2 — Social-Cuidador
  2: {
    sit_1:   [10, 15, 55, 20],
    vis_1:   [5, 55, 5, 5, 25, 5],
    sca_1:   [5, 10, 25, 35, 25],
    sit_2:   [10, 15, 55, 20],
    mul_1:   [10, 55, 10, 25, 10, 15, 50, 15],
    anti_1:  [15, 40, 10, 35, 30, 40, 20],
    vis_2:   [5, 15, 55, 5, 10, 10],
    vis_sat: [55, 5, 5, 10, 20, 5],
    xv_impacto: [65, 5, 20, 10],
    sit_4:   [15, 35, 10, 40],
    par_2:   [30, 70],
    sca_3:   [5, 15, 20, 35, 25],
    sit_6:   [5, 20, 55, 20],
    xv_liderazgo: [10, 60, 10, 20],
    mul_2:   [10, 55, 15, 10, 20, 15, 20, 10],
    sca_4:   [20, 25, 25, 20, 10],
    par_3:   [40, 60],
    sit_fis: [5, 15, 10, 70],
    sit_8:   [5, 15, 65, 15],
    sit_9:   [5, 60, 20, 15],
  },
  // 3 — Creativo-Expresivo
  3: {
    sit_1:   [15, 35, 10, 40],
    vis_1:   [5, 5, 55, 5, 10, 20],
    sca_1:   [45, 30, 15, 5, 5],
    sit_2:   [10, 30, 20, 40],
    mul_1:   [15, 15, 40, 10, 55, 15, 20, 20],
    anti_1:  [20, 35, 5, 40, 25, 10, 20],
    vis_2:   [10, 5, 10, 5, 60, 10],
    vis_sat: [10, 5, 5, 55, 15, 10],
    xv_impacto: [15, 10, 15, 60],
    sit_4:   [20, 10, 25, 45],
    par_2:   [55, 45],
    sca_3:   [5, 5, 10, 35, 45],
    sit_6:   [25, 30, 15, 30],
    xv_liderazgo: [20, 15, 40, 25],
    mul_2:   [15, 10, 50, 15, 15, 10, 55, 15],
    sca_4:   [5, 10, 15, 25, 45],
    par_3:   [70, 30],
    sit_fis: [15, 15, 10, 60],
    sit_8:   [15, 15, 10, 60],
    sit_9:   [20, 15, 10, 55],
  },
  // 4 — Práctico-Constructor
  4: {
    sit_1:   [15, 55, 10, 20],
    vis_1:   [10, 10, 10, 20, 40, 10],
    sca_1:   [10, 15, 20, 35, 20],
    sit_2:   [15, 50, 15, 20],
    mul_1:   [15, 20, 20, 45, 15, 30, 15, 25],
    anti_1:  [15, 20, 30, 10, 30, 10, 25],
    vis_2:   [10, 50, 10, 10, 10, 10],
    vis_sat: [10, 5, 55, 10, 15, 5],
    xv_impacto: [15, 45, 25, 15],
    sit_4:   [15, 15, 45, 25],
    par_2:   [40, 60],
    sca_3:   [35, 25, 20, 15, 5],
    sit_6:   [20, 30, 25, 25],
    xv_liderazgo: [15, 10, 60, 15],
    mul_2:   [15, 10, 50, 10, 20, 50, 10, 15],
    sca_4:   [15, 20, 25, 20, 20],
    par_3:   [20, 80],
    sit_fis: [10, 55, 20, 15],
    sit_8:   [10, 50, 20, 20],
    sit_9:   [25, 15, 50, 10],
  },
  // 5 — Líder-Orquestador
  5: {
    sit_1:   [15, 25, 20, 40],
    vis_1:   [10, 20, 5, 35, 10, 20],
    sca_1:   [10, 15, 30, 30, 15],
    sit_2:   [20, 35, 15, 30],
    mul_1:   [15, 20, 15, 25, 10, 35, 20, 55],
    anti_1:  [25, 20, 5, 35, 10, 30, 5],
    vis_2:   [25, 40, 10, 10, 5, 10],
    vis_sat: [10, 15, 10, 20, 25, 20],
    xv_impacto: [20, 15, 40, 25],
    sit_4:   [30, 10, 20, 40],
    par_2:   [35, 65],
    sca_3:   [15, 20, 25, 25, 15],
    sit_6:   [10, 20, 20, 50],
    xv_liderazgo: [65, 15, 10, 10],
    mul_2:   [15, 20, 15, 20, 55, 10, 20, 40],
    sca_4:   [10, 15, 30, 25, 20],
    par_3:   [25, 75],
    sit_fis: [15, 20, 25, 40],
    sit_8:   [10, 55, 20, 15],
    sit_9:   [20, 15, 55, 10],
  },
  // 6 — Custodio-Naturaleza
  6: {
    sit_1:   [20, 25, 30, 25],
    vis_1:   [10, 20, 5, 10, 50, 5],
    sca_1:   [5, 10, 20, 35, 30],
    sit_2:   [20, 20, 35, 25],
    mul_1:   [15, 35, 15, 50, 10, 20, 25, 10],
    anti_1:  [10, 25, 30, 5, 30, 5, 30],
    vis_2:   [10, 20, 25, 10, 5, 30],
    vis_sat: [20, 5, 35, 10, 15, 15],
    xv_impacto: [35, 20, 30, 15],
    sit_4:   [15, 30, 30, 25],
    par_2:   [50, 50],
    sca_3:   [10, 20, 30, 25, 15],
    sit_6:   [15, 30, 35, 20],
    xv_liderazgo: [15, 20, 50, 15],
    mul_2:   [10, 25, 20, 10, 10, 55, 15, 10],
    sca_4:   [30, 30, 20, 10, 10],
    par_3:   [25, 75],
    sit_fis: [10, 45, 15, 30],
    sit_8:   [15, 35, 35, 15],
    sit_9:   [15, 35, 30, 20],
  },
  // 7 — Narrador-Comunicador
  7: {
    sit_1:   [20, 10, 25, 45],
    vis_1:   [5, 15, 25, 5, 10, 40],
    sca_1:   [35, 25, 20, 10, 10],
    sit_2:   [10, 20, 25, 45],
    mul_1:   [20, 25, 30, 15, 40, 15, 30, 35],
    anti_1:  [25, 45, 5, 35, 20, 25, 15],
    vis_2:   [10, 5, 20, 10, 40, 15],
    vis_sat: [15, 5, 5, 35, 20, 20],
    xv_impacto: [25, 10, 20, 45],
    sit_4:   [30, 15, 15, 40],
    par_2:   [45, 55],
    sca_3:   [5, 5, 15, 35, 40],
    sit_6:   [20, 25, 25, 30],
    xv_liderazgo: [35, 30, 10, 25],
    mul_2:   [20, 25, 15, 10, 20, 5, 55, 20],
    sca_4:   [5, 10, 20, 30, 35],
    par_3:   [60, 40],
    sit_fis: [10, 5, 10, 75],
    sit_8:   [20, 20, 20, 40],
    sit_9:   [15, 20, 15, 50],
  },
  // 8 — Árbitro-Crítico
  8: {
    sit_1:   [25, 10, 20, 45],
    vis_1:   [15, 20, 5, 20, 10, 30],
    sca_1:   [5, 10, 15, 40, 30],
    sit_2:   [45, 10, 20, 25],
    mul_1:   [20, 30, 10, 45, 10, 20, 20, 30],
    anti_1:  [30, 10, 20, 20, 25, 20, 5],
    vis_2:   [15, 10, 15, 50, 5, 5],
    vis_sat: [15, 10, 10, 10, 10, 45],
    xv_impacto: [20, 40, 10, 30],
    sit_4:   [55, 15, 15, 15],
    par_2:   [55, 45],
    sca_3:   [20, 25, 25, 20, 10],
    sit_6:   [15, 20, 20, 45],
    xv_liderazgo: [20, 15, 15, 50],
    mul_2:   [25, 20, 10, 25, 20, 10, 20, 55],
    sca_4:   [25, 30, 25, 15, 5],
    par_3:   [20, 80],
    sit_fis: [15, 10, 40, 35],
    sit_8:   [20, 40, 20, 20],
    sit_9:   [35, 15, 30, 20],
  },
};

// ─── Option IDs for each question ─────────────────────────────────────────────

const SIT_1_OPTS   = ['a', 'b', 'c', 'd'];
const VIS_1_OPTS   = ['a', 'b', 'c', 'd', 'e', 'f'];
const SCA_1_OPTS   = ['1', '2', '3', '4', '5'];
const SIT_2_OPTS   = ['a', 'b', 'c', 'd'];
const MUL_1_OPTS   = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const ANTI_1_OPTS  = ['sangre', 'matematica', 'exposicion', 'rutina', 'ventas', 'soledad', 'competencia'];
const VIS_2_OPTS   = ['a', 'b', 'c', 'd', 'e', 'f'];
const VIS_SAT_OPTS = ['a', 'b', 'c', 'd', 'e', 'f'];
const XV_IMP_OPTS  = ['a', 'b', 'c', 'd'];
const SIT_4_OPTS   = ['a', 'b', 'c', 'd'];
const PAR_2_OPTS   = ['a', 'b'];
const SCA_3_OPTS   = ['1', '2', '3', '4', '5'];
const SIT_6_OPTS   = ['a', 'b', 'c', 'd'];
const XV_LID_OPTS  = ['a', 'b', 'c', 'd'];
const MUL_2_OPTS   = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const SCA_4_OPTS   = ['1', '2', '3', '4', '5'];
const PAR_3_OPTS   = ['a', 'b'];
const SIT_FIS_OPTS = ['a', 'b', 'c', 'd'];
const SIT_8_OPTS   = ['a', 'b', 'c', 'd'];
const SIT_9_OPTS   = ['a', 'b', 'c', 'd'];

function generateAnswers(
  profileType: number,
  rng: () => number,
): Record<string, string> {
  const p = PROFILES[profileType];

  const pick = (opts: string[], weights: number[]) =>
    weightedChoice(opts, weights, rng);
  const pickN = (opts: string[], weights: number[], n: number) =>
    weightedChooseN(opts, weights, n, rng).join(',');

  return {
    sit_1:   pick(SIT_1_OPTS,   p.sit_1),
    vis_1:   pick(VIS_1_OPTS,   p.vis_1),
    sca_1:   pick(SCA_1_OPTS,   p.sca_1),
    sit_2:   pick(SIT_2_OPTS,   p.sit_2),
    mul_1:   pickN(MUL_1_OPTS,  p.mul_1, 3),
    anti_1:  pickN(ANTI_1_OPTS, p.anti_1, 2),
    vis_2:   pick(VIS_2_OPTS,   p.vis_2),
    vis_sat: pick(VIS_SAT_OPTS, p.vis_sat),
    xv_impacto: pick(XV_IMP_OPTS, p.xv_impacto),
    sit_4:   pick(SIT_4_OPTS,   p.sit_4),
    par_2:   pick(PAR_2_OPTS,   p.par_2),
    sca_3:   pick(SCA_3_OPTS,   p.sca_3),
    sit_6:   pick(SIT_6_OPTS,   p.sit_6),
    xv_liderazgo: pick(XV_LID_OPTS, p.xv_liderazgo),
    mul_2:   pickN(MUL_2_OPTS,  p.mul_2, 3),
    sca_4:   pick(SCA_4_OPTS,   p.sca_4),
    par_3:   pick(PAR_3_OPTS,   p.par_3),
    sit_fis: pick(SIT_FIS_OPTS, p.sit_fis),
    sit_8:   pick(SIT_8_OPTS,   p.sit_8),
    sit_9:   pick(SIT_9_OPTS,   p.sit_9),
  };
}

// ─── Simulation ───────────────────────────────────────────────────────────────

const PROFILE_PROPORTIONS: Array<{ type: number; count: number; label: string }> = [
  { type: 1, count: 2200, label: 'Analítico-Técnico' },
  { type: 2, count: 1800, label: 'Social-Cuidador' },
  { type: 3, count: 1500, label: 'Creativo-Expresivo' },
  { type: 4, count: 1500, label: 'Práctico-Constructor' },
  { type: 5, count: 1200, label: 'Líder-Orquestador' },
  { type: 6, count:  800, label: 'Custodio-Naturaleza' },
  { type: 7, count:  600, label: 'Narrador-Comunicador' },
  { type: 8, count:  400, label: 'Árbitro-Crítico' },
];

const TOTAL = PROFILE_PROPORTIONS.reduce((s, p) => s + p.count, 0);

const profile: UserProfile = {
  nombre: 'Test',
  email: 'test@test.com',
  edad: '18',
  provinciaId: 'CABA',
  movilidad: 'si',
};

const primaryCounts:   Record<string, number> = Object.create(null);
const secondaryCounts: Record<string, number> = Object.create(null);
const comboCounts:     Record<string, number> = Object.create(null);
const confianzaByArq:  Record<string, number[]> = Object.create(null);
const activosTotal:    number[] = [];

let studentIndex = 0;

for (const { type, count } of PROFILE_PROPORTIONS) {
  for (let i = 0; i < count; i++) {
    const seed = 42 + studentIndex;
    const rng = mulberry32(seed);
    const answers = generateAnswers(type, rng);
    const result = calcularResultado(answers, profile);

    const primId = result.primario.id;
    primaryCounts[primId] = (primaryCounts[primId] ?? 0) + 1;

    if (result.secundario) {
      const secId = result.secundario.id;
      secondaryCounts[secId] = (secondaryCounts[secId] ?? 0) + 1;

      const comboKey = [primId, secId].sort().join(' + ');
      comboCounts[comboKey] = (comboCounts[comboKey] ?? 0) + 1;
    }

    if (!confianzaByArq[primId]) confianzaByArq[primId] = [];
    confianzaByArq[primId].push(result.confianza);

    activosTotal.push(result.activos.length);

    studentIndex++;
  }
}

// ─── Report helpers ───────────────────────────────────────────────────────────

function bar(count: number, total: number, width = 20): string {
  const filled = Math.round((count / total) * width);
  return '█'.repeat(filled) + ' '.repeat(width - filled);
}

function pad(s: string, len: number): string {
  return s.padEnd(len, ' ');
}

function rpad(s: string, len: number): string {
  return s.padStart(len, ' ');
}

// ─── Print report ─────────────────────────────────────────────────────────────

const lines: string[] = [];
const out = (s: string) => lines.push(s);

out('');
out('======================================');
out('VOCARIA V2 — SIMULACIÓN 10.000 ESTUDIANTES');
out('======================================');
out('');

// Primary distribution
out('DISTRIBUCIÓN PRIMARIA (arquetipo principal)');
out('─────────────────────────────────────────');
const primarySorted = Object.entries(primaryCounts).sort((a, b) => b[1] - a[1]);
for (const [id, cnt] of primarySorted) {
  const pct = ((cnt / TOTAL) * 100).toFixed(1);
  out(`${pad(id, 14)}  ${bar(cnt, TOTAL)}  ${rpad(String(cnt), 5)}   (${pct}%)`);
}
out('');

// Top 10 combos
out('DISTRIBUCIÓN COMBINACIONES (top 10)');
out('─────────────────────────────────────────');
const comboSorted = Object.entries(comboCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);
for (const [combo, cnt] of comboSorted) {
  const pct = ((cnt / TOTAL) * 100).toFixed(1);
  out(`${pad(combo, 28)}  ${bar(cnt, TOTAL)}  ${rpad(String(cnt), 5)}   (${pct}%)`);
}
out('');

// Average confidence per archetype
out('CONFIANZA PROMEDIO POR ARQUETIPO');
out('─────────────────────────────────────────');
for (const [id, cnt] of primarySorted) {
  const scores = confianzaByArq[id] ?? [];
  const avg = scores.length > 0
    ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1)
    : 'N/A';
  out(`${pad(id, 14)}  ${avg}  (n=${cnt})`);
}
out('');

// Average activos
const avgActivos = (activosTotal.reduce((a, b) => a + b, 0) / activosTotal.length).toFixed(2);
out(`ARQUETIPOS ACTIVOS PROMEDIO: ${avgActivos}`);
out('');

// Secondary distribution
out('ARQUETIPOS MÁS FRECUENTES COMO SECUNDARIO');
out('─────────────────────────────────────────');
const secondarySorted = Object.entries(secondaryCounts).sort((a, b) => b[1] - a[1]);
for (const [id, cnt] of secondarySorted) {
  const pct = ((cnt / TOTAL) * 100).toFixed(1);
  out(`${pad(id, 14)}  ${rpad(String(cnt), 5)}   (${pct}%)`);
}
out('');

const report = lines.join('\n');
console.log(report);

// Save to file
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
writeFileSync(join(__dirname, 'simulation-results.txt'), report, 'utf-8');
console.error('Results saved to scripts/simulation-results.txt');
