/**
 * Casos de prueba realistas: 8 personas distintas recorren el flujo completo
 * (núcleo → duelos adaptativos → resultado → carreras) y se imprime qué
 * recibe cada una. Sirve para inspeccionar a ojo si el resultado es
 * coherente y personalizado.
 *
 * Uso: npx tsx scripts/casos.ts
 */

import { calcularResultado } from '../src/test/engine/scorer';
import { recomendar } from '../src/test/engine/recommender';
import { selectAdaptiveQuestions } from '../src/test/engine/adaptive';
import { QUESTIONS } from '../src/test/data/questions';
import { type UserProfile } from '../src/test/data/profile';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

interface Caso {
  nombre: string;
  descripcion: string;
  profile: UserProfile;
  /** Arquetipos afines en orden (para responder los duelos en personaje). */
  afin: string[];
  answers: Record<string, string>;
}

const CASOS: Caso[] = [
  {
    nombre: 'Valentina (17, GBA)',
    descripcion: 'Quiere trabajar ayudando personas de cerca. Empática, paciente, odia la matemática.',
    profile: { nombre: 'Valentina', email: 'v@test.com', edad: '17', provinciaId: 'GBA', movilidad: 'no' },
    afin: ['sanador', 'anfitrion'],
    answers: {
      sit_1: 'c', vis_1: 'b', sca_1: '4', sit_2: 'c', mul_1: 'b,g,d', anti_1: 'matematica,soledad',
      vis_2: 'c', vis_sat: 'a', sit_4: 'b', par_2: 'b', sca_3: '4', sit_6: 'c',
      mul_2: 'b,f,g', sca_4: '2', par_3: 'b', sit_fis: 'd', sit_8: 'c', sit_9: 'b',
    },
  },
  {
    nombre: 'Tomás (19, Córdoba)',
    descripcion: 'De taller: arregla motos, arma cosas. Práctico, concreto, odia exponerse y vender.',
    profile: { nombre: 'Tomás', email: 't@test.com', edad: '19', provinciaId: 'COR', movilidad: 'no' },
    afin: ['constructor', 'custodio'],
    answers: {
      sit_1: 'b', vis_1: 'd', sca_1: '4', sit_2: 'b', mul_1: 'd,f,c', anti_1: 'exposicion,ventas',
      vis_2: 'b', vis_sat: 'c', sit_4: 'c', par_2: 'b', sca_3: '2', sit_6: 'b',
      mul_2: 'c,f,d', sca_4: '2', par_3: 'b', sit_fis: 'b', sit_8: 'b', sit_9: 'c',
    },
  },
  {
    nombre: 'Julieta (18, CABA)',
    descripcion: 'Creativa: dibuja, escribe, hace videos. Necesita expresarse, alérgica a la rutina.',
    profile: { nombre: 'Julieta', email: 'j@test.com', edad: '18', provinciaId: 'CABA', movilidad: 'si' },
    afin: ['artifice', 'narrador'],
    answers: {
      sit_1: 'd', vis_1: 'c', sca_1: '1', sit_2: 'd', mul_1: 'c,e,a', anti_1: 'matematica,rutina',
      vis_2: 'e', vis_sat: 'd', sit_4: 'd', par_2: 'a', sca_3: '5', sit_6: 'b',
      mul_2: 'c,g,a', sca_4: '5', par_3: 'a', sit_fis: 'd', sit_8: 'd', sit_9: 'd',
    },
  },
  {
    nombre: 'Federico (20, Santa Fe)',
    descripcion: 'Le fascinan los datos y los sistemas. Introvertido, riguroso, quiere trabajar tranquilo.',
    profile: { nombre: 'Federico', email: 'f@test.com', edad: '20', provinciaId: 'SF', movilidad: 'nose' },
    afin: ['interprete', 'arquitecto'],
    answers: {
      sit_1: 'a', vis_1: 'd', sca_1: '2', sit_2: 'a', mul_1: 'a,c,f', anti_1: 'sangre,exposicion',
      vis_2: 'd', vis_sat: 'b', sit_4: 'c', par_2: 'a', sca_3: '1', sit_6: 'a',
      mul_2: 'a,d,h', sca_4: '2', par_3: 'b', sit_fis: 'c', sit_8: 'a', sit_9: 'a',
    },
  },
  {
    nombre: 'Martina (22, Mendoza)',
    descripcion: 'Organiza todo: el centro de estudiantes, los viajes, las campañas. Energía social y de mando.',
    profile: { nombre: 'Martina', email: 'm@test.com', edad: '22', provinciaId: 'MZA', movilidad: 'si' },
    afin: ['orquestador', 'catalizador'],
    answers: {
      sit_1: 'c', vis_1: 'f', sca_1: '3', sit_2: 'd', mul_1: 'b,h,g', anti_1: 'rutina,soledad',
      vis_2: 'b', vis_sat: 'e', sit_4: 'd', par_2: 'b', sca_3: '3', sit_6: 'd',
      mul_2: 'e,h,b', sca_4: '3', par_3: 'b', sit_fis: 'd', sit_8: 'b', sit_9: 'c',
    },
  },
  {
    nombre: 'Nico (18, Misiones)',
    descripcion: 'Ama el monte, los animales, estar afuera. Tranquilo, constante, piensa a largo plazo.',
    profile: { nombre: 'Nico', email: 'n@test.com', edad: '18', provinciaId: 'MIS', movilidad: 'no' },
    afin: ['custodio', 'constructor'],
    answers: {
      sit_1: 'b', vis_1: 'e', sca_1: '4', sit_2: 'c', mul_1: 'd,b,a', anti_1: 'exposicion,ventas',
      vis_2: 'f', vis_sat: 'c', sit_4: 'b', par_2: 'a', sca_3: '3', sit_6: 'b',
      mul_2: 'f,b,a', sca_4: '1', par_3: 'b', sit_fis: 'b', sit_8: 'c', sit_9: 'b',
    },
  },
  {
    nombre: 'Agustina (17, Tucumán) — caso AMBIGUO',
    descripcion: 'Le gusta todo un poco: ciencia, gente, crear. Perfil genuinamente indefinido.',
    profile: { nombre: 'Agustina', email: 'a@test.com', edad: '17', provinciaId: 'TUC', movilidad: 'nose' },
    afin: ['descubridor', 'sanador'],
    answers: {
      sit_1: 'a', vis_1: 'b', sca_1: '3', sit_2: 'c', mul_1: 'a,b,e', anti_1: 'ventas,competencia',
      vis_2: 'c', vis_sat: 'b', sit_4: 'b', par_2: 'a', sca_3: '4', sit_6: 'b',
      mul_2: 'a,b,g', sca_4: '3', par_3: 'a', sit_fis: 'a', sit_8: 'c', sit_9: 'd',
    },
  },
  {
    nombre: 'Lautaro (19, Chaco) — caso CAÓTICO',
    descripcion: 'Respondió rápido y contradictorio (autonomía total + estructura total, social + solitario).',
    profile: { nombre: 'Lautaro', email: 'l@test.com', edad: '19', provinciaId: 'CHA', movilidad: 'nose' },
    afin: [],
    answers: {
      sit_1: 'b', vis_1: 'a', sca_1: '1', sit_2: 'c', mul_1: 'd,f,h', anti_1: 'soledad,rutina',
      vis_2: 'e', vis_sat: 'f', sit_4: 'a', par_2: 'b', sca_3: '1', sit_6: 'a',
      mul_2: 'b,e,f', sca_4: '1', par_3: 'a', sit_fis: 'c', sit_8: 'd', sit_9: 'c',
    },
  },
];

// ─── Ejecución ───────────────────────────────────────────────────────────────

const lines: string[] = [];
const out = (s = '') => lines.push(s);

out('═══════════════════════════════════════════════════════════');
out('CASOS DE PRUEBA — FLUJO COMPLETO — ' + new Date().toISOString().slice(0, 10));
out('═══════════════════════════════════════════════════════════');

const resumen: Array<{
  nombre: string; primario: string; secundario: string | null;
  confianza: number; preguntas: number; carreras: string[];
}> = [];

for (const caso of CASOS) {
  out();
  out(`■ ${caso.nombre}`);
  out(`  ${caso.descripcion}`);
  out('  ─────────────────────────────────────────────────────');

  // Núcleo
  const interim = calcularResultado(caso.answers, caso.profile);
  const duelos = selectAdaptiveQuestions(interim.ranking);

  // Responde duelos en personaje (máximo score para su arquetipo afín)
  const answers = { ...caso.answers };
  for (const q of duelos) {
    let elegida = q.opciones[0];
    let mejor = -1;
    for (const op of q.opciones) {
      const s = caso.afin.length > 0
        ? (op.scores?.[caso.afin[0]] ?? 0) * 10 + (op.scores?.[caso.afin[1]] ?? 0)
        : Math.random() * 10; // el caótico responde al azar
      if (s > mejor) { mejor = s; elegida = op; }
    }
    answers[q.id] = elegida.id;
  }

  const final = duelos.length > 0 ? calcularResultado(answers, caso.profile) : interim;
  const carreras = recomendar(final);
  const totalPreguntas = QUESTIONS.length + duelos.length;

  const top3 = final.ranking.slice(0, 3).map(r => `${r.id} (${r.score})`).join('  ·  ');
  out(`  Preguntas: ${QUESTIONS.length} núcleo + ${duelos.length} duelos = ${totalPreguntas}`);
  if (duelos.length > 0) {
    out(`  Duelos elegidos: ${duelos.map(q => q.id.replace('adp_', '')).join(', ')}`);
    const antes = interim.ranking.slice(0, 2).map(r => `${r.id} ${r.score}`).join(' vs ');
    out(`  Disputa al entrar: ${antes}`);
  }
  out(`  Resultado: ${top3}`);
  out(`  Confianza: ${final.confianza}%  ${final.advertencias.length > 0 ? '⚠ ' + final.advertencias.length + ' advertencia(s)' : ''}`);
  out(`  Carreras (top 5 de ${carreras.length}):`);
  for (const c of carreras.slice(0, 5)) {
    const enProv = c.universidadesEnProvincia.length > 0 ? `${c.universidadesEnProvincia.length} univ. en su provincia` : 'sin univ. en su provincia';
    out(`    ${c.tag === 'top' ? '★' : '·'} ${c.titulo}  [fit ${c.fitScore}, ${enProv}]`);
  }

  resumen.push({
    nombre: caso.nombre.split(' ')[0],
    primario: final.primario.id,
    secundario: final.secundario?.id ?? null,
    confianza: final.confianza,
    preguntas: totalPreguntas,
    carreras: carreras.map(c => c.titulo),
  });
}

// ─── Cruce: ¿los resultados se repiten entre casos? ──────────────────────────

out();
out('═══════════════════════════════════════════════════════════');
out('CRUCE ENTRE CASOS');
out('───────────────────────────────────────────────────────────');
out(`  Primarios distintos: ${new Set(resumen.map(r => r.primario)).size} de ${resumen.length} casos`);
out(`  Rango de preguntas: ${Math.min(...resumen.map(r => r.preguntas))}–${Math.max(...resumen.map(r => r.preguntas))}`);
out(`  Rango de confianza: ${Math.min(...resumen.map(r => r.confianza))}%–${Math.max(...resumen.map(r => r.confianza))}%`);
out();
out('  Solapamiento de carreras entre pares de casos (de 8-9 recomendadas):');
for (let i = 0; i < resumen.length; i++) {
  for (let j = i + 1; j < resumen.length; j++) {
    const setI = new Set(resumen[i].carreras);
    const comunes = resumen[j].carreras.filter(c => setI.has(c)).length;
    if (comunes >= 4) {
      out(`    ⚠ ${resumen[i].nombre} y ${resumen[j].nombre}: ${comunes} carreras en común`);
    }
  }
}
const pares = resumen.length * (resumen.length - 1) / 2;
let totalComunes = 0;
for (let i = 0; i < resumen.length; i++) {
  for (let j = i + 1; j < resumen.length; j++) {
    const setI = new Set(resumen[i].carreras);
    totalComunes += resumen[j].carreras.filter(c => setI.has(c)).length;
  }
}
out(`    Promedio general: ${(totalComunes / pares).toFixed(1)} carreras en común por par de casos`);
out();
out('═══════════════════════════════════════════════════════════');

const report = lines.join('\n');
console.log(report);

const __dirname = dirname(fileURLToPath(import.meta.url));
writeFileSync(join(__dirname, 'casos-results.txt'), report, 'utf-8');
console.error('Guardado en scripts/casos-results.txt');
