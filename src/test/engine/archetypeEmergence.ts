/**
 * V2 Engine — Archetype Emergence
 *
 * Derives 12 archetype emergence scores from the VectorVocacional.
 * Each archetype has primary + secondary signal conditions and optional NOT_IF penalties.
 */

import type { VectorVocacional } from './signals';

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
      { signal: 'pensamiento_sistemico',   threshold: 60, weight: 1.2 },
      { signal: 'orientacion_logro',        threshold: 50, weight: 0.8 },
      { signal: 'pensamiento_abstracto',    threshold: 55, weight: 1.0 },
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
      { signal: 'empatia_funcional',        threshold: 70, weight: 1.3 },
      { signal: 'interes_personas',         threshold: 65, weight: 1.1 },
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
      { signal: 'impacto_social',           threshold: 65, weight: 1.2 },
      { signal: 'orientacion_social',       threshold: 60, weight: 1.0 },
      { signal: 'busqueda_impacto',         threshold: 60, weight: 1.0 },
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
      { signal: 'creatividad_generativa',   threshold: 70, weight: 1.4 },
      { signal: 'expresion_personal',       threshold: 70, weight: 1.3 },
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
      { signal: 'interes_datos',            threshold: 70, weight: 1.3 },
      { signal: 'orientacion_analitica',    threshold: 70, weight: 1.3 },
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
      { signal: 'liderazgo',                threshold: 65, weight: 1.3 },
      { signal: 'orientacion_logro',        threshold: 65, weight: 1.1 },
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
      { signal: 'profundidad_vs_amplitud',  threshold: 25, weight: 0.4 },
    ],
    notIf: [
      { signal: 'orientacion_practica',     threshold: 80, penalty: 0.15 },
      { signal: 'necesidad_estructura',     threshold: 80, penalty: 0.15 },
    ],
  },

  {
    id: 'arbitro',
    primary: [
      { signal: 'pensamiento_critico',      threshold: 70, weight: 1.3 },
      { signal: 'impacto_social',           threshold: 55, weight: 0.9 },
      { signal: 'necesidad_estructura',     threshold: 50, weight: 0.8 },
    ],
    secondary: [
      { signal: 'orientacion_largo_plazo',  threshold: 55, weight: 0.5 },
      { signal: 'persuasion_influencia',    threshold: 50, weight: 0.4 },
      { signal: 'reflexion_profunda',       threshold: 55, weight: 0.4 },
    ],
  },

  {
    id: 'custodio',
    primary: [
      { signal: 'interes_naturaleza',       threshold: 65, weight: 1.4 },
      { signal: 'orientacion_largo_plazo',  threshold: 65, weight: 1.2 },
    ],
    secondary: [
      { signal: 'necesidad_estabilidad',    threshold: 50, weight: 0.5 },
      { signal: 'vocacion_servicio',        threshold: 50, weight: 0.5 },
      { signal: 'orientacion_practica',     threshold: 40, weight: 0.4 },
    ],
    notIf: [
      { signal: 'energia_interpersonal',    threshold: 80, penalty: 0.15 },
    ],
  },

  {
    id: 'narrador',
    primary: [
      { signal: 'interes_ideas',            threshold: 70, weight: 1.2 },
      { signal: 'expresion_personal',       threshold: 60, weight: 1.0 },
      { signal: 'persuasion_influencia',    threshold: 55, weight: 1.0 },
    ],
    secondary: [
      { signal: 'creatividad_generativa',   threshold: 50, weight: 0.5 },
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

function getSignalValue(v: VectorVocacional, signal: keyof VectorVocacional): number {
  return v[signal] as number;
}

function conditionMet(v: VectorVocacional, cond: SignalCondition): boolean {
  return getSignalValue(v, cond.signal) > cond.threshold;
}

export function emergerArquetipos(v: VectorVocacional): ArquetipoEmergencia[] {
  const result: ArquetipoEmergencia[] = [];

  for (const rule of ARCHETYPE_RULES) {
    // Primary contributions
    let primaryWeightedSum = 0;
    let primaryWeightTotal = 0;
    for (const cond of rule.primary) {
      primaryWeightTotal += cond.weight;
      if (conditionMet(v, cond)) {
        primaryWeightedSum += (getSignalValue(v, cond.signal) * cond.weight) / 100;
      }
    }
    const primaryScore = primaryWeightTotal > 0 ? primaryWeightedSum / primaryWeightTotal : 0;

    // Secondary contributions
    let secondaryWeightedSum = 0;
    let secondaryWeightTotal = 0;
    for (const cond of rule.secondary) {
      secondaryWeightTotal += cond.weight;
      if (conditionMet(v, cond)) {
        secondaryWeightedSum += (getSignalValue(v, cond.signal) * cond.weight) / 100;
      }
    }
    const secondaryScore = secondaryWeightTotal > 0 ? secondaryWeightedSum / secondaryWeightTotal : 0;

    // Combine
    let emergenciaRaw = primaryScore * 0.7 + secondaryScore * 0.3;

    // NOT_IF penalties
    if (rule.notIf) {
      for (const notIf of rule.notIf) {
        const val = getSignalValue(v, notIf.signal);
        const violated = notIf.direction === 'lt'
          ? val < notIf.threshold
          : val > notIf.threshold;
        if (violated) {
          emergenciaRaw *= (1 - notIf.penalty);
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
