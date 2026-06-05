import { CARRERAS, type Carrera } from '../data/carreras';
import type { NormalizedProfile } from './scorer';

export interface CarreraRecomendada {
  carrera: Carrera;
  score: number; // 0-100
  fit_score: number;
  razon: string;
  tag: 'top' | 'alternativa' | 'sorpresa';
}

export interface ContextoFiltro {
  provincia?: string;
  movilidad?: string; // 'si_total' | 'si_beca' | 'virtual' | 'no'
  duracion?: string;  // 'larga' | 'media' | 'corta' | 'nosé'
}

function cosineSim(a: number[], b: number[]): number {
  const dot = a.reduce((s, v, i) => s + v * b[i], 0);
  const magA = Math.sqrt(a.reduce((s, v) => s + v * v, 0));
  const magB = Math.sqrt(b.reduce((s, v) => s + v * v, 0));
  if (magA === 0 || magB === 0) return 0;
  return dot / (magA * magB);
}

function duracionCompatible(carrera: Carrera, preferencia?: string): boolean {
  if (!preferencia || preferencia === 'nosé') return true;
  if (preferencia === 'larga') return carrera.duracion_anios >= 5;
  if (preferencia === 'media') return carrera.duracion_anios >= 3 && carrera.duracion_anios <= 5;
  if (preferencia === 'corta') return carrera.tipo === 'tecnicatura' || carrera.duracion_anios <= 3;
  return true;
}

function movilidadCompatible(carrera: Carrera, movilidad?: string, provincia?: string): boolean {
  if (!movilidad || movilidad === 'si_total') return true;

  const tieneEnProvincia = carrera.universidades.some(u =>
    !provincia || u.provincia === provincia || u.provincia === 'Nacional'
  );

  if (movilidad === 'no' || movilidad === 'virtual') {
    const tieneVirtual = carrera.universidades.some(u =>
      u.modalidad === 'virtual' || u.modalidad === 'mixta'
    );
    return tieneEnProvincia || tieneVirtual;
  }

  return true;
}

function generarRazon(carrera: Carrera, arquetipoId: string, profile: NormalizedProfile): string {
  const esCompatible = carrera.arquetipos_compatibles.includes(arquetipoId);
  const expandiendo = carrera.mercado === 'en_expansion';
  const remoto = carrera.remoto_posible;

  if (esCompatible && expandiendo && remoto) {
    return `Combina muy bien con tu perfil y tiene alta demanda con posibilidad de trabajo remoto.`;
  }
  if (esCompatible && expandiendo) {
    return `Alinea con tus dimensiones dominantes y el mercado laboral está creciendo.`;
  }
  if (esCompatible) {
    return `Tu perfil vocacional tiene una coincidencia fuerte con esta carrera.`;
  }
  if (profile.impacto > 65) {
    return `Para tu orientación hacia el impacto social, esta carrera ofrece salidas laborales muy significativas.`;
  }
  return `Esta carrera complementa tu perfil con habilidades que ya tenés desarrolladas.`;
}

export function recomendar(
  profile: NormalizedProfile,
  arquetipoId: string,
  contexto: ContextoFiltro
): CarreraRecomendada[] {
  const riasecUser = [profile.R, profile.I, profile.A, profile.S, profile.E, profile.C];

  const scored = CARRERAS
    .filter(c => duracionCompatible(c, contexto.duracion))
    .filter(c => movilidadCompatible(c, contexto.movilidad, contexto.provincia))
    .map(carrera => {
      const riasecCarrera = [
        carrera.perfil_riasec.R, carrera.perfil_riasec.I, carrera.perfil_riasec.A,
        carrera.perfil_riasec.S, carrera.perfil_riasec.E, carrera.perfil_riasec.C,
      ];
      const fitScore = cosineSim(riasecUser, riasecCarrera);

      const arquetipoBonus = carrera.arquetipos_compatibles.includes(arquetipoId) ? 0.12 : 0;
      const mercadoBonus = carrera.mercado === 'en_expansion' ? 0.05
        : carrera.mercado === 'saturado' ? -0.05 : 0;

      const score = Math.min(1, fitScore + arquetipoBonus + mercadoBonus);

      return {
        carrera,
        score: Math.round(score * 100),
        fit_score: Math.round(fitScore * 100),
        razon: generarRazon(carrera, arquetipoId, profile),
        tag: 'alternativa' as const,
      };
    })
    .sort((a, b) => b.score - a.score);

  // Diversity by familia — max 2 per familia in top results
  const resultado: CarreraRecomendada[] = [];
  const familiasUsadas: Record<string, number> = {};

  for (const item of scored) {
    if (resultado.length >= 6) break;

    const familia = item.carrera.familia;
    const countFamilia = familiasUsadas[familia] ?? 0;

    if (countFamilia >= 2) continue;

    familiasUsadas[familia] = countFamilia + 1;
    resultado.push({
      ...item,
      tag: resultado.length === 0 ? 'top' : 'alternativa',
    });
  }

  // Sorpresa: carrera con fit ≥ 55 de familia no representada
  const familiasEnResultado = new Set(resultado.map(r => r.carrera.familia));
  const sorpresa = scored.find(
    s => !familiasEnResultado.has(s.carrera.familia) && s.score >= 55 && !resultado.some(r => r.carrera.id === s.carrera.id)
  );
  if (sorpresa) {
    resultado.push({ ...sorpresa, tag: 'sorpresa' });
  }

  return resultado;
}
