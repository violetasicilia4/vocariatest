/**
 * V2 Engine — Archetype Emergence
 *
 * Derives 12 archetype emergence scores from the VectorVocacional.
 * Each archetype has primary + secondary signal conditions and optional NOT_IF penalties.
 */

import type { VectorVocacional } from './signals';
import { signalPercentile } from './signalCalibration';

export interface ArquetipoEmergencia {
  id: string;
  emergencia: number; // 0-100
}

// ---------------------------------------------------------------------------
// Rule definition types
// ---------------------------------------------------------------------------

interface SignalCondition {
  signal: keyof VectorVocacional;
  threshold: number;
  weight: number;
}

interface NotIfCondition {
  signal: keyof VectorVocacional;
  /** 'gt' means signal > threshold triggers penalty (default) */
  direction?: 'gt' | 'lt';
  threshold: number;
  penalty: number;
}

interface ArchetypeRule {
  id: string;
  primary: SignalCondition[];
  secondary: SignalCondition[];
  notIf?: NotIfCondition[];
}

// ---------------------------------------------------------------------------
// Archetype rules
// ---------------------------------------------------------------------------

const ARCHETYPE_RULES: ArchetypeRule[] = [
  {
    id: 'arquitecto',
    primary: [
      { signal: 'pensamiento_sistemico',   threshold: 48, weight: 1.3 },
      { signal: 'orientacion_logro',        threshold: 42, weight: 0.8 },
      { signal: 'pensamiento_abstracto',    threshold: 44, weight: 1.0 },
    ],
    secondary: [
      { signal: 'interes_datos',            threshold: 50, weight: 0.5 },
      { signal: 'interes_ideas',            threshold: 50, weight: 0.4 },
      { signal: 'autonomia',                threshold: 50, weight: 0.4 },
    ],
    notIf: [
      { signal: 'orientacion_social',       threshold: 80, penalty: 0.15 },
    ],
  },

  {
    id: 'constructor',
    primary: [
      { signal: 'orientacion_practica',     threshold: 65, weight: 1.3 },
      { signal: 'interes_objetos',          threshold: 65, weight: 1.2 },
      { signal: 'orientacion_logro',        threshold: 60, weight: 0.9 },
    ],
    secondary: [
      { signal: 'pensamiento_sistemico',    threshold: 40, weight: 0.5 },
      { signal: 'necesidad_estructura',     threshold: 40, weight: 0.4 },
    ],
    notIf: [
      { signal: 'pensamiento_abstracto',    threshold: 80, penalty: 0.20 },
    ],
  },

  {
    id: 'sanador',
    primary: [
      { signal: 'empatia_funcional',        threshold: 73, weight: 1.3 },
      { signal: 'interes_personas',         threshold: 68, weight: 1.1 },
      { signal: 'vocacion_servicio',        threshold: 60, weight: 1.0 },
    ],
    secondary: [
      { signal: 'orientacion_social',       threshold: 60, weight: 0.5 },
      { signal: 'busqueda_impacto',         threshold: 50, weight: 0.4 },
    ],
    notIf: [
      { signal: 'energia_interpersonal',    threshold: 25, direction: 'lt', penalty: 0.25 },
    ],
  },

  {
    id: 'catalizador',
    primary: [
      { signal: 'impacto_social',           threshold: 50, weight: 1.2 },
      { signal: 'orientacion_social',       threshold: 48, weight: 1.0 },
      { signal: 'busqueda_impacto',         threshold: 48, weight: 1.0 },
    ],
    secondary: [
      { signal: 'liderazgo',                threshold: 50, weight: 0.5 },
      { signal: 'empatia_funcional',        threshold: 50, weight: 0.5 },
      { signal: 'energia_interpersonal',    threshold: 55, weight: 0.4 },
    ],
    notIf: [
      { signal: 'autonomia',                threshold: 85, penalty: 0.15 },
    ],
  },

  {
    id: 'artifice',
    primary: [
      { signal: 'creatividad_generativa',   threshold: 75, weight: 1.4 },
      { signal: 'expresion_personal',       threshold: 75, weight: 1.3 },
    ],
    secondary: [
      { signal: 'sensibilidad_estetica',    threshold: 60, weight: 0.7 },
      { signal: 'autonomia',                threshold: 55, weight: 0.4 },
      { signal: 'interes_ideas',            threshold: 50, weight: 0.3 },
    ],
    notIf: [
      { signal: 'necesidad_estructura',     threshold: 80, penalty: 0.20 },
    ],
  },

  {
    id: 'interprete',
    primary: [
      { signal: 'interes_datos',            threshold: 74, weight: 1.3 },
      { signal: 'orientacion_analitica',    threshold: 74, weight: 1.3 },
    ],
    secondary: [
      { signal: 'pensamiento_abstracto',    threshold: 55, weight: 0.5 },
      { signal: 'reflexion_profunda',       threshold: 50, weight: 0.4 },
      { signal: 'necesidad_estructura',     threshold: 40, weight: 0.3 },
    ],
    notIf: [
      { signal: 'interes_personas',         threshold: 80, penalty: 0.15 },
    ],
  },

  {
    id: 'orquestador',
    primary: [
      { signal: 'liderazgo',                threshold: 70, weight: 1.3 },
      { signal: 'orientacion_logro',        threshold: 70, weight: 1.1 },
    ],
    secondary: [
      { signal: 'persuasion_influencia',    threshold: 55, weight: 0.6 },
      { signal: 'pensamiento_sistemico',    threshold: 50, weight: 0.5 },
      { signal: 'energia_interpersonal',    threshold: 50, weight: 0.4 },
    ],
  },

  {
    id: 'descubridor',
    primary: [
      { signal: 'curiosidad_intelectual',   threshold: 75, weight: 1.4 },
      { signal: 'orientacion_investigativa',threshold: 70, weight: 1.3 },
    ],
    secondary: [
      { signal: 'pensamiento_abstracto',    threshold: 60, weight: 0.6 },
      { signal: 'tolerancia_incertidumbre', threshold: 60, weight: 0.5 },
      { signal: 'profundidad_vs_amplitud',  threshold: 55, weight: 0.4 },
    ],
    notIf: [
      { signal: 'orientacion_practica',     threshold: 80, penalty: 0.15 },
      { signal: 'necesidad_estructura',     threshold: 80, penalty: 0.15 },
    ],
  },

  {
    id: 'arbitro',
    primary: [
      { signal: 'pensamiento_critico',      threshold: 50, weight: 1.5 },
      { signal: 'impacto_social',           threshold: 44, weight: 1.0 },
      { signal: 'necesidad_estructura',     threshold: 42, weight: 0.8 },
    ],
    secondary: [
      { signal: 'orientacion_largo_plazo',  threshold: 52, weight: 0.5 },
      { signal: 'persuasion_influencia',    threshold: 48, weight: 0.5 },
      { signal: 'reflexion_profunda',       threshold: 52, weight: 0.4 },
    ],
  },

  {
    id: 'custodio',
    primary: [
      { signal: 'interes_naturaleza',       threshold: 48, weight: 1.4 },
      { signal: 'orientacion_largo_plazo',  threshold: 50, weight: 1.2 },
    ],
    secondary: [
      { signal: 'necesidad_estabilidad',    threshold: 48, weight: 0.5 },
      { signal: 'vocacion_servicio',        threshold: 48, weight: 0.5 },
      { signal: 'orientacion_practica',     threshold: 40, weight: 0.4 },
    ],
    notIf: [
      { signal: 'energia_interpersonal',    threshold: 80, penalty: 0.15 },
    ],
  },

  {
    id: 'narrador',
    primary: [
      { signal: 'interes_ideas',            threshold: 63, weight: 1.3 },
      { signal: 'expresion_personal',       threshold: 55, weight: 1.0 },
      { signal: 'persuasion_influencia',    threshold: 50, weight: 1.0 },
    ],
    secondary: [
      { signal: 'creatividad_generativa',   threshold: 48, weight: 0.5 },
      { signal: 'orientacion_social',       threshold: 45, weight: 0.3 },
      { signal: 'reflexion_profunda',       threshold: 50, weight: 0.4 },
    ],
    notIf: [
      { signal: 'interes_datos',            threshold: 80, penalty: 0.15 },
    ],
  },

  {
    id: 'anfitrion',
    primary: [
      { signal: 'energia_interpersonal',    threshold: 75, weight: 1.4 },
      { signal: 'orientacion_social',       threshold: 70, weight: 1.2 },
    ],
    secondary: [
      { signal: 'creatividad_generativa',   threshold: 45, weight: 0.4 },
      { signal: 'vocacion_servicio',        threshold: 50, weight: 0.5 },
      { signal: 'orientacion_logro',        threshold: 45, weight: 0.4 },
    ],
    notIf: [
      { signal: 'autonomia',                threshold: 80, penalty: 0.10 },
    ],
  },
];

// ---------------------------------------------------------------------------
// Emergence algorithm
// ---------------------------------------------------------------------------

/**
 * Ancho de la rampa de los umbrales. Antes los umbrales eran acantilados
 * (signal > threshold: todo o nada): una señal que cruzaba el umbral por 1
 * punto encendía de golpe toda su contribución, y cambiar UNA respuesta
 * podía dar vuelta el arquetipo. Con la rampa, la contribución entra
 * gradualmente entre (threshold - W) y (threshold + W): 0 abajo, 50% en el
 * umbral, 100% arriba. Misma semántica en promedio, sin discontinuidades.
 */
const SOFT_WIDTH = 12;

function getSignalValue(v: VectorVocacional, signal: keyof VectorVocacional): number {
  return signalPercentile(signal, v[signal] as number);
}

/** Grado de cumplimiento de una condición: 0-1 con rampa alrededor del umbral. */
function conditionFactor(v: VectorVocacional, cond: SignalCondition): number {
  const value = getSignalValue(v, cond.signal);
  return Math.max(0, Math.min(1, (value - cond.threshold + SOFT_WIDTH) / (2 * SOFT_WIDTH)));
}

export function emergerArquetipos(v: VectorVocacional): ArquetipoEmergencia[] {
  const result: ArquetipoEmergencia[] = [];

  for (const rule of ARCHETYPE_RULES) {
    // Primary contributions
    let primaryWeightedSum = 0;
    let primaryWeightTotal = 0;
    for (const cond of rule.primary) {
      primaryWeightTotal += cond.weight;
      const factor = conditionFactor(v, cond);
      if (factor > 0) {
        primaryWeightedSum += (factor * getSignalValue(v, cond.signal) * cond.weight) / 100;
      }
    }
    const primaryScore = primaryWeightTotal > 0 ? primaryWeightedSum / primaryWeightTotal : 0;

    // Secondary contributions
    let secondaryWeightedSum = 0;
    let secondaryWeightTotal = 0;
    for (const cond of rule.secondary) {
      secondaryWeightTotal += cond.weight;
      const factor = conditionFactor(v, cond);
      if (factor > 0) {
        secondaryWeightedSum += (factor * getSignalValue(v, cond.signal) * cond.weight) / 100;
      }
    }
    const secondaryScore = secondaryWeightTotal > 0 ? secondaryWeightedSum / secondaryWeightTotal : 0;

    // Combine
    let emergenciaRaw = primaryScore * 0.7 + secondaryScore * 0.3;

    // NOT_IF penalties — también con rampa, para evitar saltos
    if (rule.notIf) {
      for (const notIf of rule.notIf) {
        const val = getSignalValue(v, notIf.signal);
        const grado = notIf.direction === 'lt'
          ? Math.max(0, Math.min(1, (notIf.threshold + SOFT_WIDTH - val) / (2 * SOFT_WIDTH)))
          : Math.max(0, Math.min(1, (val - notIf.threshold + SOFT_WIDTH) / (2 * SOFT_WIDTH)));
        if (grado > 0) {
          emergenciaRaw *= (1 - notIf.penalty * grado);
        }
      }
    }

    result.push({
      id: rule.id,
      emergencia: Math.round(emergenciaRaw * 100),
    });
  }

  return result.sort((a, b) => b.emergencia - a.emergencia);
}
