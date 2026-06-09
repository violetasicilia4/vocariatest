import { CARRERAS_DB, type CarreraEntry, type UniversidadEntry } from '../data/db';
import { getSalarioByMacroArea, type SalarioFamilia } from '../data/salarios';
import { ARQUETIPOS, getArquetipo } from '../data/arquetipos';
import { computeFamilyFit } from './familySignatures';
import { explicarCarrera } from './explainability';
import type { ScoringResult } from './scorer';

export interface CarreraRecomendada {
  id: string;
  titulo: string;
  macroArea: string;
  familia: string;
  duracion: string | null;
  universidadesTotal: number;
  universidadesEnProvincia: UniversidadEntry[];
  salario: SalarioFamilia | null;
  tag: 'top' | 'alternativa' | 'sorpresa';
  arquetipoOrigen: string;
  fitScore: number;
  razon: string;
  alerta: string | null;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function parseDuracionAnios(duracion: string | undefined | null): number | null {
  if (!duracion) return null;
  const m = duracion.match(/^(\d+(?:\.\d+)?)\s*años?/i);
  return m ? parseFloat(m[1]) : null;
}

function duracionCompatible(entry: CarreraEntry, preferencia?: string): boolean {
  if (!preferencia || preferencia === 'nose') return true;
  const anios = entry.universidades
    .map(u => parseDuracionAnios(u.duracion))
    .find((a): a is number => a !== null);
  if (anios == null) return true;
  if (preferencia === 'corta') return anios <= 3;
  if (preferencia === 'media') return anios > 3 && anios <= 5;
  if (preferencia === 'larga') return anios >= 5;
  return true;
}

function filtrarUniversidadesPorProvincia(
  entry: CarreraEntry,
  provinciasDisponibles: string[],
): UniversidadEntry[] {
  if (provinciasDisponibles.length === 0) return entry.universidades.slice(0, 6);
  const set = new Set(provinciasDisponibles);
  return entry.universidades.filter(u => set.has(u.provincia)).slice(0, 6);
}

function getDuracionDisplay(entry: CarreraEntry): string | null {
  const duraciones = entry.universidades
    .map(u => u.duracion)
    .filter(Boolean) as string[];
  if (duraciones.length === 0) return null;
  const freq: Record<string, number> = {};
  for (const d of duraciones) freq[d] = (freq[d] ?? 0) + 1;
  return Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0];
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

// ---------------------------------------------------------------------------
// Archetype → macro-area lookup (built from ARQUETIPOS data)
// ---------------------------------------------------------------------------

const ARCHETYPE_MACROAREAS: Record<string, string[]> = {};
for (const arq of ARQUETIPOS) {
  ARCHETYPE_MACROAREAS[arq.id] = arq.macroareas;
}

// ---------------------------------------------------------------------------
// Scoring algorithm
// ---------------------------------------------------------------------------

/**
 * Compute a preference bonus (0–10) for a career family based on preferences.
 * Uses a lightweight mapping of which dimensions align with which families.
 */
function computePreferenceBonus(
  familia: string,
  prefs: ScoringResult['preferences'],
): number {
  const dimMap: Record<string, Array<keyof typeof prefs>> = {
    "Software sistemas e informática":     ['datos', 'ideas'],
    "Datos IA estadística y matemática":   ['datos', 'teoria'],
    "Psicología":                          ['personas', 'impactoSocial'],
    "Medicina y atención clínica":         ['personas', 'impactoSocial'],
    "Arte música teatro y audiovisual":    ['creatividad', 'autonomia'],
    "Diseño gráfico industrial y digital": ['creatividad', 'ideas'],
    "Administración gestión y negocios":   ['liderazgo', 'estructura'],
    "Marketing publicidad y ventas":       ['liderazgo', 'creatividad'],
    "Economía finanzas y banca":           ['datos', 'ingresos'],
    "Contabilidad auditoría e impuestos":  ['estructura', 'datos'],
    "Educación física y deporte":          ['personas', 'impactoSocial'],
    "RRHH y desarrollo organizacional":    ['personas', 'liderazgo'],
    "Gobierno política y RRII":            ['liderazgo', 'impactoSocial'],
    "Civil obras e infraestructura":       ['objetos', 'practica'],
    "Mecánica electromecánica y mecatrónica": ['objetos', 'practica'],
    "Agronomía agro y producción":         ['objetos', 'practica'],
    "Ambiente biodiversidad y recursos naturales": ['impactoSocial', 'teoria'],
    "Biología genética y biotecnología":   ['teoria', 'datos'],
    "Química":                             ['teoria', 'datos'],
    "Comunicación y medios digitales":     ['creatividad', 'personas'],
    "Periodismo y redacción":              ['ideas', 'personas'],
    "Filosofía historia y humanidades":    ['ideas', 'teoria'],
    "Idiomas traducción y letras":         ['ideas', 'creatividad'],
    "Turismo hotelería y gastronomía":     ['personas', 'creatividad'],
    "Turismo hotelería eventos y gastronomía": ['personas', 'creatividad'],
    "Videojuegos y simulación":            ['creatividad', 'ideas'],
  };

  const dims = dimMap[familia];
  if (!dims || dims.length === 0) return 0;

  const avg = dims.reduce((sum, d) => sum + prefs[d], 0) / dims.length;
  // Scale: 0-100 average → 0-10 bonus
  return clamp(avg / 10, 0, 10);
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export function recomendar(result: ScoringResult): CarreraRecomendada[] {
  const { activos, primario, secundario, tercero, contexto, preferences, antipatrones, vector } = result;

  // ── Step 1: MacroArea gate — only macroareas covered by at least one ACTIVE archetype ──
  const macroAreasActivas = new Set<string>();
  for (const activo of activos) {
    const arquetipoData =
      primario.id === activo.id ? primario
      : secundario?.id === activo.id ? secundario
      : tercero?.id === activo.id ? tercero
      : null;
    if (arquetipoData) {
      for (const macro of arquetipoData.macroareas) {
        macroAreasActivas.add(macro);
      }
    }
  }

  // ── Step 2–4: Score each career using vector-based family fit ───────────
  const scored = CARRERAS_DB
    .filter(entry => macroAreasActivas.has(entry.macroArea))
    .map(entry => {
      // Step 2: Family fit via signature cosine similarity (0-100)
      const familyFit = computeFamilyFit(vector, entry.familia);

      // Step 3: Province bonus
      const univsEnProv = filtrarUniversidadesPorProvincia(entry, contexto.provinciasDisponibles);
      const disponibleEnProv = univsEnProv.length > 0;
      const provBonus = disponibleEnProv ? 15 : 0;

      // Step 4: Preference bonus (subtle, 0–10)
      const prefBonus = computePreferenceBonus(entry.familia, preferences);

      // Step 5: Total
      const careerScore = familyFit * 0.75 + provBonus + prefBonus;

      return { entry, careerScore, univsEnProv, disponibleEnProv };
    })
    .sort((a, b) => b.careerScore - a.careerScore);

  // Normalize careerScore to fitScore (0–100)
  const maxCareerScore = Math.max(...scored.map(s => s.careerScore), 1);

  // ── Diversity: max 3 per macroArea ────────────────────────────────────────
  const resultado: CarreraRecomendada[] = [];
  const macroUsada: Record<string, number> = {};
  const titulosUsados = new Set<string>();


  for (const { entry, careerScore, univsEnProv, disponibleEnProv } of scored) {
    if (resultado.length >= 8) break;
    if (titulosUsados.has(entry.titulo)) continue;

    const count = macroUsada[entry.macroArea] ?? 0;
    if (count >= 3) continue;

    macroUsada[entry.macroArea] = count + 1;
    titulosUsados.add(entry.titulo);

    // Determine origin archetype
    let origenId = primario.id;
    for (const activo of activos) {
      const arquetipoData =
        primario.id === activo.id ? primario
        : secundario?.id === activo.id ? secundario
        : tercero?.id === activo.id ? tercero
        : null;
      if (arquetipoData?.macroareas.includes(entry.macroArea)) {
        origenId = activo.id;
        break;
      }
    }

    const fitScore = Math.round((careerScore / maxCareerScore) * 100);
    const origenArquetipo = getArquetipo(origenId);
    const secundarioArquetipo = secundario ? { id: secundario.id, nombre: secundario.nombre } : null;

    const explicacion = explicarCarrera(
      { titulo: entry.titulo, familia: entry.familia, macroArea: entry.macroArea },
      { id: primario.id, nombre: primario.nombre },
      secundarioArquetipo,
      preferences,
      antipatrones,
      disponibleEnProv,
    );

    resultado.push({
      id: entry.id,
      titulo: entry.titulo,
      macroArea: entry.macroArea,
      familia: entry.familia,
      duracion: getDuracionDisplay(entry),
      universidadesTotal: entry.universidades.length,
      universidadesEnProvincia: univsEnProv,
      salario: getSalarioByMacroArea(entry.macroArea) ?? null,
      tag: 'alternativa',
      arquetipoOrigen: origenId,
      fitScore: explicacion.fitScore > 0 ? explicacion.fitScore : fitScore,
      razon: explicacion.razon,
      alerta: explicacion.alerta,
    });
  }

  // ── Sorpresa: carrera de macroárea no representada aún ───────────────────
  const macroEnResultado = new Set(resultado.map(r => r.macroArea));
  const sorpresaCandidata = scored.find(
    ({ entry }) =>
      !macroEnResultado.has(entry.macroArea) &&
      macroAreasActivas.has(entry.macroArea) &&
      !titulosUsados.has(entry.titulo),
  );

  if (sorpresaCandidata && resultado.length < 9) {
    const { entry, careerScore, univsEnProv, disponibleEnProv } = sorpresaCandidata;
    const fitScore = Math.round((careerScore / maxCareerScore) * 100);
    const explicacion = explicarCarrera(
      { titulo: entry.titulo, familia: entry.familia, macroArea: entry.macroArea },
      { id: primario.id, nombre: primario.nombre },
      secundario ? { id: secundario.id, nombre: secundario.nombre } : null,
      preferences,
      antipatrones,
      disponibleEnProv,
    );

    resultado.push({
      id: entry.id,
      titulo: entry.titulo,
      macroArea: entry.macroArea,
      familia: entry.familia,
      duracion: getDuracionDisplay(entry),
      universidadesTotal: entry.universidades.length,
      universidadesEnProvincia: univsEnProv,
      salario: getSalarioByMacroArea(entry.macroArea) ?? null,
      tag: 'sorpresa',
      arquetipoOrigen: primario.id,
      fitScore: explicacion.fitScore > 0 ? explicacion.fitScore : fitScore,
      razon: explicacion.razon,
      alerta: explicacion.alerta,
    });
  }

  // Tag the first as 'top'
  if (resultado.length > 0) resultado[0].tag = 'top';

  return resultado;
}
