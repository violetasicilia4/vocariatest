/**
 * V2 Engine — Latent Signal Model
 *
 * Converts test answers into a 37-dimensional vocational vector.
 * Cluster A: Cognitive
 * Cluster B: Domain
 * Cluster C: Social
 * Cluster D: Motivation
 * Cluster E: Agency
 * Cluster F: Temporal
 * Cluster G: Creative
 * Cluster H: Work mode
 */

// ---------------------------------------------------------------------------
// VectorVocacional
// ---------------------------------------------------------------------------

export interface VectorVocacional {
  // Cluster A — Cognitive
  curiosidad_intelectual: number;
  pensamiento_sistemico: number;
  pensamiento_abstracto: number;
  orientacion_investigativa: number;
  pensamiento_critico: number;
  reflexion_profunda: number;

  // Cluster B — Domain
  interes_datos: number;
  interes_personas: number;
  interes_objetos: number;
  interes_ideas: number;
  interes_naturaleza: number;
  interes_estetico: number;

  // Cluster C — Social
  orientacion_social: number;
  energia_interpersonal: number;
  empatia_funcional: number;
  liderazgo: number;
  colaboracion_cercana: number;
  persuasion_influencia: number;

  // Cluster D — Motivation
  busqueda_impacto: number;
  impacto_social: number;
  necesidad_reconocimiento: number;
  vocacion_servicio: number;
  orientacion_monetaria: number;

  // Cluster E — Agency
  autonomia: number;
  necesidad_estructura: number;
  tolerancia_incertidumbre: number;
  tolerancia_riesgo: number;
  orientacion_logro: number;

  // Cluster F — Temporal
  orientacion_largo_plazo: number;
  necesidad_estabilidad: number;

  // Cluster G — Creative
  creatividad_generativa: number;
  expresion_personal: number;
  sensibilidad_estetica: number;

  // Cluster H — Work mode
  // BIPOLAR (-100 to +100): positive = profundidad/reflexion, negative = amplitud/accion
  profundidad_vs_amplitud: number;
  reflexion_vs_accion: number;

  // Unipolar
  orientacion_practica: number;
  orientacion_analitica: number;
}

// ---------------------------------------------------------------------------
// Signal deltas per question option
// ---------------------------------------------------------------------------

type SignalDelta = Partial<Record<keyof VectorVocacional, number>>;
type OptionMap = Record<string, SignalDelta>;
type QuestionSignalMap = {
  type: 'single' | 'multi';
  options: OptionMap;
};

const SIGNAL_MAPPING: Record<string, QuestionSignalMap> = {
  sit_1: {
    type: 'single',
    options: {
      a: { curiosidad_intelectual: 18, orientacion_investigativa: 18, pensamiento_abstracto: 12, reflexion_profunda: 15, reflexion_vs_accion: 20 },
      b: { orientacion_practica: 22, tolerancia_riesgo: 15, orientacion_logro: 15, reflexion_vs_accion: -20 },
      c: { orientacion_social: 12, colaboracion_cercana: 15, empatia_funcional: 8, orientacion_practica: 8 },
      d: { pensamiento_sistemico: 18, interes_ideas: 12, orientacion_largo_plazo: 12, reflexion_profunda: 10 },
    },
  },

  vis_1: {
    type: 'single',
    options: {
      a: { curiosidad_intelectual: 18, orientacion_investigativa: 18, autonomia: 12, necesidad_reconocimiento: 10, profundidad_vs_amplitud: 15 },
      b: { orientacion_social: 18, empatia_funcional: 18, energia_interpersonal: 15, busqueda_impacto: 10, vocacion_servicio: 12 },
      c: { creatividad_generativa: 22, expresion_personal: 22, autonomia: 15, sensibilidad_estetica: 12 },
      d: { pensamiento_sistemico: 22, autonomia: 12, orientacion_logro: 12, interes_ideas: 10 },
      e: { busqueda_impacto: 18, impacto_social: 15, orientacion_largo_plazo: 18, interes_naturaleza: 15, vocacion_servicio: 12 },
      f: { persuasion_influencia: 22, interes_ideas: 18, expresion_personal: 12, busqueda_impacto: 12, orientacion_social: 10 },
    },
  },

  sca_1: {
    type: 'single',
    options: {
      '1': { autonomia: 30, tolerancia_incertidumbre: 18, necesidad_estructura: -25 },
      '2': { autonomia: 15, tolerancia_incertidumbre: 8 },
      '3': {},
      '4': { necesidad_estructura: 15, orientacion_logro: 8 },
      '5': { necesidad_estructura: 30, necesidad_estabilidad: 18, autonomia: -20 },
    },
  },

  sit_2: {
    type: 'single',
    options: {
      a: { interes_datos: 15, orientacion_analitica: 18, necesidad_estructura: 12, tolerancia_incertidumbre: -15, reflexion_profunda: 12 },
      b: { tolerancia_riesgo: 22, orientacion_logro: 18, tolerancia_incertidumbre: 18, reflexion_vs_accion: -18 },
      c: { orientacion_social: 18, colaboracion_cercana: 18, empatia_funcional: 12, reflexion_profunda: 8 },
      d: { pensamiento_sistemico: 18, empatia_funcional: 12, orientacion_largo_plazo: 12, busqueda_impacto: 8, reflexion_profunda: 12 },
    },
  },

  mul_1: {
    type: 'multi',
    options: {
      a: { curiosidad_intelectual: 18, orientacion_investigativa: 12, reflexion_profunda: 8 },
      b: { busqueda_impacto: 18, impacto_social: 18, vocacion_servicio: 12 },
      c: { autonomia: 22, tolerancia_riesgo: 12, expresion_personal: 10 },
      d: { necesidad_estabilidad: 22, orientacion_monetaria: 12, tolerancia_riesgo: -10 },
      e: { creatividad_generativa: 18, expresion_personal: 22, autonomia: 10 },
      f: { orientacion_monetaria: 28 },
      g: { orientacion_social: 18, energia_interpersonal: 18, colaboracion_cercana: 12 },
      h: { necesidad_reconocimiento: 22, orientacion_logro: 18, liderazgo: 8 },
    },
  },

  anti_1: {
    type: 'multi',
    options: {
      sangre:      { empatia_funcional: -18, interes_personas: -15, orientacion_practica: -10 },
      matematica:  { interes_datos: -22, orientacion_analitica: -18, pensamiento_abstracto: -12 },
      exposicion:  { energia_interpersonal: -25, persuasion_influencia: -18, necesidad_reconocimiento: -10 },
      rutina:      { autonomia: 12, tolerancia_incertidumbre: 12, creatividad_generativa: 8 },
      ventas:      { persuasion_influencia: -22, energia_interpersonal: -12, orientacion_monetaria: -8 },
      soledad:     { orientacion_social: 22, colaboracion_cercana: 18, energia_interpersonal: 15 },
      competencia: { necesidad_reconocimiento: -15, tolerancia_riesgo: -12, orientacion_logro: -8 },
    },
  },

  vis_2: {
    type: 'single',
    options: {
      a: { pensamiento_sistemico: 18, liderazgo: 12, interes_ideas: 12, orientacion_largo_plazo: 12, reflexion_profunda: 8 },
      b: { orientacion_logro: 22, orientacion_practica: 18, reflexion_vs_accion: -15, liderazgo: 8 },
      c: { empatia_funcional: 18, orientacion_social: 18, colaboracion_cercana: 18, energia_interpersonal: 12 },
      d: { pensamiento_critico: 22, orientacion_analitica: 18, interes_datos: 12, reflexion_profunda: 12 },
      e: { creatividad_generativa: 22, interes_ideas: 12, autonomia: 12, expresion_personal: 8 },
      f: { busqueda_impacto: 12, impacto_social: 12, orientacion_largo_plazo: 12, empatia_funcional: 10, necesidad_estructura: 8 },
    },
  },

  vis_sat: {
    type: 'single',
    options: {
      a: { empatia_funcional: 22, orientacion_social: 18, vocacion_servicio: 18, busqueda_impacto: 12, interes_personas: 15 },
      b: { curiosidad_intelectual: 22, interes_datos: 22, orientacion_investigativa: 18, necesidad_reconocimiento: 10, profundidad_vs_amplitud: 15 },
      c: { orientacion_practica: 22, interes_objetos: 18, orientacion_logro: 18 },
      d: { creatividad_generativa: 18, interes_ideas: 22, pensamiento_sistemico: 12, busqueda_impacto: 12 },
      e: { energia_interpersonal: 22, orientacion_social: 18, creatividad_generativa: 12, busqueda_impacto: 8 },
      f: { pensamiento_critico: 18, empatia_funcional: 12, liderazgo: 12, busqueda_impacto: 12, necesidad_estructura: 8 },
    },
  },

  sit_4: {
    type: 'single',
    options: {
      a: { pensamiento_critico: 22, persuasion_influencia: 15, impacto_social: 15, autonomia: 10, tolerancia_riesgo: 10 },
      b: { empatia_funcional: 22, orientacion_social: 15, reflexion_profunda: 15, colaboracion_cercana: 10 },
      c: { pensamiento_sistemico: 22, orientacion_analitica: 15, orientacion_investigativa: 12, reflexion_profunda: 12 },
      d: { impacto_social: 18, liderazgo: 18, persuasion_influencia: 15, orientacion_social: 12 },
    },
  },

  par_2: {
    type: 'single',
    options: {
      a: { profundidad_vs_amplitud: 35, curiosidad_intelectual: 12, orientacion_investigativa: 10, autonomia: 10 },
      b: { profundidad_vs_amplitud: -35, orientacion_social: 10, pensamiento_sistemico: 12, liderazgo: 8 },
    },
  },

  sca_3: {
    type: 'single',
    options: {
      '1': { expresion_personal: -20, orientacion_practica: 12, orientacion_analitica: 10 },
      '2': { busqueda_impacto: 8, expresion_personal: -8 },
      '3': {},
      '4': { expresion_personal: 18, creatividad_generativa: 12, sensibilidad_estetica: 10 },
      '5': { expresion_personal: 28, creatividad_generativa: 18, sensibilidad_estetica: 15, autonomia: 10 },
    },
  },

  sit_6: {
    type: 'single',
    options: {
      a: { autonomia: 22, reflexion_profunda: 15, orientacion_social: -20, energia_interpersonal: -15, profundidad_vs_amplitud: 12 },
      b: { colaboracion_cercana: 22, empatia_funcional: 15, autonomia: 8, orientacion_social: 8 },
      c: { interes_personas: 22, orientacion_social: 22, empatia_funcional: 18, energia_interpersonal: 15, vocacion_servicio: 10 },
      d: { liderazgo: 22, persuasion_influencia: 18, orientacion_social: 15, energia_interpersonal: 12 },
    },
  },

  mul_2: {
    type: 'multi',
    options: {
      a: { curiosidad_intelectual: 18, pensamiento_sistemico: 15, reflexion_profunda: 15, orientacion_investigativa: 12 },
      b: { empatia_funcional: 18, orientacion_social: 18, vocacion_servicio: 12, interes_personas: 15 },
      c: { creatividad_generativa: 18, interes_objetos: 15, orientacion_logro: 12, expresion_personal: 10 },
      d: { interes_datos: 22, orientacion_analitica: 18, pensamiento_sistemico: 12 },
      e: { liderazgo: 22, orientacion_logro: 15, pensamiento_sistemico: 10, energia_interpersonal: 10 },
      f: { interes_naturaleza: 22, orientacion_practica: 18, interes_objetos: 12 },
      g: { expresion_personal: 18, interes_ideas: 18, persuasion_influencia: 15, creatividad_generativa: 12 },
      h: { pensamiento_critico: 22, persuasion_influencia: 18, liderazgo: 12, orientacion_logro: 10 },
    },
  },

  sca_4: {
    type: 'single',
    options: {
      '1': { necesidad_estabilidad: 28, necesidad_estructura: 18, tolerancia_incertidumbre: -25, tolerancia_riesgo: -15 },
      '2': { necesidad_estructura: 15, orientacion_analitica: 10, tolerancia_incertidumbre: -8 },
      '3': {},
      '4': { tolerancia_incertidumbre: 15, autonomia: 12 },
      '5': { tolerancia_incertidumbre: 25, tolerancia_riesgo: 22, autonomia: 15, creatividad_generativa: 8 },
    },
  },

  par_3: {
    type: 'single',
    options: {
      a: { creatividad_generativa: 22, tolerancia_riesgo: 20, orientacion_investigativa: 12, expresion_personal: 10 },
      b: { pensamiento_sistemico: 20, orientacion_logro: 18, orientacion_practica: 15 },
    },
  },

  sit_fis: {
    type: 'single',
    options: {
      a: { pensamiento_sistemico: 22, interes_datos: 15, orientacion_investigativa: 12, pensamiento_abstracto: 12 },
      b: { interes_objetos: 25, orientacion_practica: 25, reflexion_vs_accion: -15 },
      c: { interes_datos: 22, orientacion_analitica: 22, orientacion_logro: 12, pensamiento_sistemico: 10 },
      d: { liderazgo: 22, pensamiento_sistemico: 15, orientacion_logro: 15, orientacion_social: 10 },
    },
  },

  sit_8: {
    type: 'single',
    options: {
      a: { profundidad_vs_amplitud: 30, orientacion_investigativa: 18, curiosidad_intelectual: 15, necesidad_reconocimiento: 12 },
      b: { orientacion_largo_plazo: 25, orientacion_logro: 18, liderazgo: 15, pensamiento_sistemico: 12 },
      c: { busqueda_impacto: 22, impacto_social: 18, vocacion_servicio: 18, interes_personas: 15 },
      d: { autonomia: 25, creatividad_generativa: 18, expresion_personal: 15, tolerancia_riesgo: 12 },
    },
  },

  sit_9: {
    type: 'single',
    options: {
      a: { pensamiento_sistemico: 22, orientacion_investigativa: 18, pensamiento_critico: 15, orientacion_logro: 12 },
      b: { empatia_funcional: 25, orientacion_social: 18, vocacion_servicio: 15, interes_personas: 18 },
      c: { orientacion_logro: 22, liderazgo: 18, reflexion_vs_accion: -20, energia_interpersonal: 12 },
      d: { interes_ideas: 22, pensamiento_sistemico: 15, creatividad_generativa: 12, persuasion_influencia: 10 },
    },
  },
};

// ---------------------------------------------------------------------------
// SIGNAL_TECHO: max theoretical raw score per signal
// For single-select: max positive delta across options
// For multi-select: sum of max positive delta per option (each can be selected)
// Bipolar signals: sum of max absolute positive contribution
// ---------------------------------------------------------------------------

const BIPOLAR_SIGNALS = new Set<keyof VectorVocacional>([
  'profundidad_vs_amplitud',
  'reflexion_vs_accion',
]);

function computeSignalTecho(): Record<keyof VectorVocacional, number> {
  const techo: Partial<Record<keyof VectorVocacional, number>> = {};

  for (const [, qMap] of Object.entries(SIGNAL_MAPPING)) {
    const options = Object.values(qMap.options);

    if (qMap.type === 'single') {
      // Max positive contribution from any one option
      for (const delta of options) {
        for (const [sig, val] of Object.entries(delta) as [keyof VectorVocacional, number][]) {
          if (val > 0) {
            techo[sig] = (techo[sig] ?? 0) + val;
          }
        }
      }
    } else {
      // Multi-select: each option can be independently selected
      for (const delta of options) {
        for (const [sig, val] of Object.entries(delta) as [keyof VectorVocacional, number][]) {
          if (val > 0) {
            techo[sig] = (techo[sig] ?? 0) + val;
          }
        }
      }
    }
  }

  // Ensure every signal has a techo (at least 1 to avoid div-by-zero)
  const allSignals: (keyof VectorVocacional)[] = [
    'curiosidad_intelectual', 'pensamiento_sistemico', 'pensamiento_abstracto',
    'orientacion_investigativa', 'pensamiento_critico', 'reflexion_profunda',
    'interes_datos', 'interes_personas', 'interes_objetos', 'interes_ideas',
    'interes_naturaleza', 'interes_estetico',
    'orientacion_social', 'energia_interpersonal', 'empatia_funcional',
    'liderazgo', 'colaboracion_cercana', 'persuasion_influencia',
    'busqueda_impacto', 'impacto_social', 'necesidad_reconocimiento',
    'vocacion_servicio', 'orientacion_monetaria',
    'autonomia', 'necesidad_estructura', 'tolerancia_incertidumbre',
    'tolerancia_riesgo', 'orientacion_logro',
    'orientacion_largo_plazo', 'necesidad_estabilidad',
    'creatividad_generativa', 'expresion_personal', 'sensibilidad_estetica',
    'profundidad_vs_amplitud', 'reflexion_vs_accion',
    'orientacion_practica', 'orientacion_analitica',
  ];

  const result: Record<string, number> = {};
  for (const sig of allSignals) {
    result[sig] = techo[sig] ?? 1;
  }
  return result as Record<keyof VectorVocacional, number>;
}

export const SIGNAL_TECHO: Record<keyof VectorVocacional, number> = computeSignalTecho();

// ---------------------------------------------------------------------------
// computeVector
// ---------------------------------------------------------------------------

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

export function computeVector(answers: Record<string, string>): VectorVocacional {
  // Accumulate raw signal scores
  const raw: Record<string, number> = {};

  for (const [qId, qMap] of Object.entries(SIGNAL_MAPPING)) {
    const answerRaw = answers[qId];
    if (!answerRaw) continue;

    const selectedIds = qMap.type === 'multi'
      ? answerRaw.split(',').filter(Boolean)
      : [answerRaw];

    for (const optId of selectedIds) {
      const delta = qMap.options[optId];
      if (!delta) continue;
      for (const [sig, val] of Object.entries(delta)) {
        raw[sig] = (raw[sig] ?? 0) + (val as number);
      }
    }
  }

  // Normalize each signal
  const allSignals: (keyof VectorVocacional)[] = [
    'curiosidad_intelectual', 'pensamiento_sistemico', 'pensamiento_abstracto',
    'orientacion_investigativa', 'pensamiento_critico', 'reflexion_profunda',
    'interes_datos', 'interes_personas', 'interes_objetos', 'interes_ideas',
    'interes_naturaleza', 'interes_estetico',
    'orientacion_social', 'energia_interpersonal', 'empatia_funcional',
    'liderazgo', 'colaboracion_cercana', 'persuasion_influencia',
    'busqueda_impacto', 'impacto_social', 'necesidad_reconocimiento',
    'vocacion_servicio', 'orientacion_monetaria',
    'autonomia', 'necesidad_estructura', 'tolerancia_incertidumbre',
    'tolerancia_riesgo', 'orientacion_logro',
    'orientacion_largo_plazo', 'necesidad_estabilidad',
    'creatividad_generativa', 'expresion_personal', 'sensibilidad_estetica',
    'profundidad_vs_amplitud', 'reflexion_vs_accion',
    'orientacion_practica', 'orientacion_analitica',
  ];

  const vector: Partial<VectorVocacional> = {};

  for (const sig of allSignals) {
    const rawVal = raw[sig] ?? 0;
    const ceiling = SIGNAL_TECHO[sig];

    if (BIPOLAR_SIGNALS.has(sig)) {
      // Normalize to -100..+100 using ceiling as max absolute positive
      vector[sig] = clamp(Math.round((rawVal / ceiling) * 100), -100, 100);
    } else {
      // Normalize to 0..100
      vector[sig] = clamp(Math.round((rawVal / ceiling) * 100), 0, 100);
    }
  }

  return vector as VectorVocacional;
}
