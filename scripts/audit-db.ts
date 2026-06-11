/**
 * Auditoría de la base de carreras (db.ts) contra el motor.
 *
 * Detecta:
 *   1. Familias usadas en la DB sin firma en FAMILIA_FIRMA → fit 0, carrera irrecomendable.
 *   2. MacroÁreas de la DB que ningún arquetipo cubre → carreras inalcanzables por el gate.
 *   3. Títulos duplicados (tras normalizar variantes de género/grado).
 *   4. Posibles familias mal asignadas (heurísticas por palabras clave del título).
 *
 * Uso: npx tsx scripts/audit-db.ts
 */

import { CARRERAS_DB } from '../src/test/data/db';
import { FAMILIA_FIRMA } from '../src/test/engine/familySignatures';
import { ARQUETIPOS } from '../src/test/data/arquetipos';

const lines: string[] = [];
const out = (s = '') => lines.push(s);

out('═══════════════════════════════════════════════════════════');
out(`AUDITORÍA DE LA BASE DE CARRERAS — ${CARRERAS_DB.length} entradas`);
out('═══════════════════════════════════════════════════════════');

// ── 1. Familias sin firma ────────────────────────────────────────────────────
out();
out('1) FAMILIAS EN LA DB SIN FIRMA (fit = 0, NUNCA se recomiendan)');
out('───────────────────────────────────────────────────────────');
const familiasDB = new Map<string, number>();
for (const c of CARRERAS_DB) familiasDB.set(c.familia, (familiasDB.get(c.familia) ?? 0) + 1);
let huerfanas = 0;
for (const [familia, count] of [...familiasDB.entries()].sort((a, b) => b[1] - a[1])) {
  if (!FAMILIA_FIRMA[familia]) {
    out(`  ⚠ "${familia}" — ${count} carreras sin posibilidad de recomendarse`);
    huerfanas += count;
  }
}
out(huerfanas === 0 ? '  ✓ Todas las familias tienen firma' : `  TOTAL: ${huerfanas} carreras irrecomendables`);

// ── 2. MacroÁreas fuera del gate de arquetipos ───────────────────────────────
out();
out('2) MACROÁREAS QUE NINGÚN ARQUETIPO CUBRE (carreras inalcanzables)');
out('───────────────────────────────────────────────────────────');
const macroCubiertas = new Set<string>();
for (const arq of ARQUETIPOS) for (const m of arq.macroareas) macroCubiertas.add(m);
const macroDB = new Map<string, number>();
for (const c of CARRERAS_DB) macroDB.set(c.macroArea, (macroDB.get(c.macroArea) ?? 0) + 1);
let inalcanzables = 0;
for (const [macro, count] of [...macroDB.entries()].sort((a, b) => b[1] - a[1])) {
  if (!macroCubiertas.has(macro)) {
    out(`  ⚠ "${macro}" — ${count} carreras fuera del alcance de todo arquetipo`);
    inalcanzables += count;
  }
}
out(inalcanzables === 0 ? '  ✓ Todas las macroáreas están cubiertas' : `  TOTAL: ${inalcanzables} carreras inalcanzables`);

// ── 3. Duplicados por título normalizado ─────────────────────────────────────
out();
out('3) TÍTULOS DUPLICADOS (variantes del mismo título)');
out('───────────────────────────────────────────────────────────');
function normTitulo(titulo: string): string {
  let t = titulo.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/\/a\b/g, '').replace(/\s+/g, ' ').trim();
  for (const p of ['licenciado en ', 'licenciada en ', 'licenciatura en ', 'medico ', 'medica ']) {
    if (t.startsWith(p) && t.length > p.length) { t = t.slice(p.length); break; }
  }
  return t;
}
const porNorm = new Map<string, string[]>();
for (const c of CARRERAS_DB) {
  const k = normTitulo(c.titulo);
  porNorm.set(k, [...(porNorm.get(k) ?? []), c.titulo]);
}
let dups = 0;
for (const [, titulos] of porNorm) {
  if (new Set(titulos).size > 1) {
    out(`  · ${[...new Set(titulos)].join('  ≈  ')}`);
    dups++;
  }
}
out(dups === 0 ? '  ✓ Sin duplicados (el recomendador ya los dedupe en runtime)' : `  TOTAL: ${dups} grupos (dedupe en runtime ya los maneja)`);

// ── 4. Heurísticas de familia mal asignada ───────────────────────────────────
out();
out('4) POSIBLES FAMILIAS MAL ASIGNADAS (heurísticas por título)');
out('───────────────────────────────────────────────────────────');
// patrón en el título → familias esperadas (si la actual no está, se marca)
const REGLAS: Array<{ patron: RegExp; esperadas: string[]; etiqueta: string }> = [
  { patron: /ingenier/i, etiqueta: 'Ingeniería',
    esperadas: ['Bioingeniería', 'Civil, obras e infraestructura', 'Mecánica, electromecánica y mecatrónica',
      'Electrónica, electricidad y telecomunicaciones', 'Energía, petróleo y naval', 'Industrial, procesos y logística',
      'Ingenierías generales', 'Software, sistemas e informática', 'Datos, IA, estadística y matemática',
      'Química, alimentos y procesos', 'Agronomía, agro y producción', 'Ambiente, biodiversidad y recursos naturales',
      'Videojuegos y simulación', 'Arquitectura, urbanismo y obra', 'Logística y operaciones'] },
  { patron: /psicolog/i, etiqueta: 'Psicología', esperadas: ['Psicología', 'Profesorados, pedagogía y gestión educativa', 'RRHH y desarrollo organizacional'] },
  { patron: /psicopedagog/i, etiqueta: 'Psicopedagogía', esperadas: ['Psicopedagogía'] },
  { patron: /enfermer/i, etiqueta: 'Enfermería', esperadas: ['Enfermería'] },
  { patron: /abogac|abogado|derecho|notari|escriban/i, etiqueta: 'Derecho', esperadas: ['Derecho, notariado y bienes'] },
  { patron: /contador|contabil/i, etiqueta: 'Contabilidad', esperadas: ['Contabilidad, auditoría e impuestos'] },
  { patron: /veterinar/i, etiqueta: 'Veterinaria', esperadas: ['Veterinaria y salud animal'] },
  { patron: /odontolog/i, etiqueta: 'Odontología', esperadas: ['Odontología'] },
  { patron: /nutricion/i, etiqueta: 'Nutrición', esperadas: ['Nutrición'] },
  { patron: /agronom|agropecuar/i, etiqueta: 'Agro', esperadas: ['Agronomía, agro y producción'] },
  { patron: /ambient|ecolog|biodiversidad/i, etiqueta: 'Ambiente', esperadas: ['Ambiente, biodiversidad y recursos naturales', 'Biología, genética y biotecnología', 'Agronomía, agro y producción'] },
  { patron: /profesor|profesorado|docencia|educacion(?! fisica)/i, etiqueta: 'Educación',
    esperadas: ['Profesorados, pedagogía y gestión educativa', 'Educación física y deporte', 'Psicopedagogía',
      'Filosofía, historia y humanidades', 'Idiomas, traducción y letras', 'Arte, música, teatro y audiovisual',
      'Física, ciencias básicas y aplicadas', 'Química', 'Biología, genética y biotecnología',
      'Datos, IA, estadística y matemática', 'Psicología', 'Teología y religión'] },
  { patron: /medicina|medico/i, etiqueta: 'Medicina', esperadas: ['Medicina y atención clínica', 'Veterinaria y salud animal', 'Técnicas y servicios de salud'] },
  { patron: /turismo|hoteler|gastronom/i, etiqueta: 'Turismo', esperadas: ['Turismo, hotelería y gastronomía', 'Turismo, hotelería, eventos y gastronomía'] },
  { patron: /diseno|diseñ/i, etiqueta: 'Diseño',
    esperadas: ['Diseño gráfico, industrial y digital', 'Arte, música, teatro y audiovisual', 'Arquitectura, urbanismo y obra', 'Videojuegos y simulación', 'Comunicación y medios digitales'] },
  { patron: /sistemas|informatic|software|programacion|computacion/i, etiqueta: 'Software',
    esperadas: ['Software, sistemas e informática', 'Datos, IA, estadística y matemática', 'Videojuegos y simulación', 'Electrónica, electricidad y telecomunicaciones'] },
];

let sospechosas = 0;
for (const c of CARRERAS_DB) {
  for (const regla of REGLAS) {
    if (regla.patron.test(c.titulo) && !regla.esperadas.includes(c.familia)) {
      out(`  ? [${regla.etiqueta}] "${c.titulo}" → familia actual: "${c.familia}"`);
      sospechosas++;
      break;
    }
  }
}
out(sospechosas === 0 ? '  ✓ Sin sospechas según heurísticas' : `  TOTAL: ${sospechosas} para revisar`);

out();
out('═══════════════════════════════════════════════════════════');
console.log(lines.join('\n'));
