import { CARRERAS_DB, type CarreraEntry, type UniversidadEntry } from '../data/db';
import { getSalarioByMacroArea, type SalarioFamilia } from '../data/salarios';
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
}

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
  // Return most common duration
  const freq: Record<string, number> = {};
  for (const d of duraciones) freq[d] = (freq[d] ?? 0) + 1;
  return Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0];
}

export function recomendar(result: ScoringResult): CarreraRecomendada[] {
  const { activos, primario, contexto } = result;

  // Collect all macroareas from active archetypes (weighted by score)
  const macroAreaPeso: Record<string, number> = {};
  for (const activo of activos) {
    const arq = result.ranking.find(r => r.id === activo.id);
    const peso = arq?.pct ?? 50;
    const arquetipoData = result.primario.id === activo.id
      ? result.primario
      : result.secundario?.id === activo.id
      ? result.secundario
      : result.tercero?.id === activo.id
      ? result.tercero
      : null;
    if (!arquetipoData) continue;
    for (const macro of arquetipoData.macroareas) {
      macroAreaPeso[macro] = Math.max(macroAreaPeso[macro] ?? 0, peso);
    }
  }

  const macroAreasActivas = new Set(Object.keys(macroAreaPeso));

  // Score each career
  const scored = CARRERAS_DB
    .filter(entry => macroAreasActivas.has(entry.macroArea))
    .map(entry => {
      const pesoPorMacro = macroAreaPeso[entry.macroArea] ?? 0;
      const univsEnProv = filtrarUniversidadesPorProvincia(entry, contexto.provinciasDisponibles);
      const disponibleEnProv = univsEnProv.length > 0;
      const provBonus = disponibleEnProv ? 15 : 0;
      const score = pesoPorMacro + provBonus;

      return { entry, score, univsEnProv, disponibleEnProv };
    })
    .sort((a, b) => b.score - a.score);

  // Diversity: max 3 per macroArea
  const resultado: CarreraRecomendada[] = [];
  const macroUsada: Record<string, number> = {};
  const titlosUsados = new Set<string>();

  for (const { entry, score, univsEnProv } of scored) {
    if (resultado.length >= 8) break;
    if (titlosUsados.has(entry.titulo)) continue;

    const count = macroUsada[entry.macroArea] ?? 0;
    if (count >= 3) continue;

    macroUsada[entry.macroArea] = count + 1;
    titlosUsados.add(entry.titulo);

    // Determine origin archetype
    let origenId = primario.id;
    for (const activo of activos) {
      const arquetipoData = result.primario.id === activo.id
        ? result.primario
        : result.secundario?.id === activo.id
        ? result.secundario
        : result.tercero?.id === activo.id
        ? result.tercero
        : null;
      if (arquetipoData?.macroareas.includes(entry.macroArea)) {
        origenId = activo.id;
        break;
      }
    }

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
    });
  }

  // Sorpresa: carrera de macroárea no representada pero de archetype activo
  const macroEnResultado = new Set(resultado.map(r => r.macroArea));
  const sorpresaCandidata = scored.find(
    ({ entry }) =>
      !macroEnResultado.has(entry.macroArea) &&
      macroAreasActivas.has(entry.macroArea) &&
      !titlosUsados.has(entry.titulo)
  );
  if (sorpresaCandidata && resultado.length < 9) {
    const { entry, univsEnProv } = sorpresaCandidata;
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
    });
  }

  // Tag the first as 'top'
  if (resultado.length > 0) resultado[0].tag = 'top';

  return resultado;
}
