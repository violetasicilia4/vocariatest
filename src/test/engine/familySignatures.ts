/**
 * V2 Engine — Family Signatures
 *
 * Each career family has a signature vector that defines which vocational signals
 * matter for fit and how much. computeFamilyFit returns 0-100.
 */

import type { VectorVocacional } from './signals';

export type FamilySignature = Partial<Record<keyof VectorVocacional, number>>;

export const FAMILIA_FIRMA: Record<string, FamilySignature> = {
  'Software, sistemas e informática': {
    pensamiento_sistemico: 0.90,
    curiosidad_intelectual: 0.80,
    interes_datos: 0.75,
    pensamiento_abstracto: 0.70,
    orientacion_investigativa: 0.65,
    autonomia: 0.55,
    orientacion_logro: 0.50,
  },

  'Datos, IA, estadística y matemática': {
    interes_datos: 0.95,
    orientacion_analitica: 0.90,
    pensamiento_abstracto: 0.75,
    pensamiento_sistemico: 0.70,
    curiosidad_intelectual: 0.70,
    orientacion_investigativa: 0.60,
  },

  'Psicología': {
    empatia_funcional: 0.90,
    interes_personas: 0.85,
    curiosidad_intelectual: 0.70,
    orientacion_investigativa: 0.60,
    reflexion_profunda: 0.65,
    orientacion_social: 0.55,
    pensamiento_critico: 0.50,
  },

  'Medicina y atención clínica': {
    empatia_funcional: 0.90,
    interes_personas: 0.80,
    vocacion_servicio: 0.85,
    orientacion_logro: 0.65,
    busqueda_impacto: 0.60,
  },

  'Arte, música, teatro y audiovisual': {
    creatividad_generativa: 0.95,
    expresion_personal: 0.90,
    sensibilidad_estetica: 0.85,
    autonomia: 0.65,
    interes_ideas: 0.55,
  },

  'Diseño gráfico, industrial y digital': {
    creatividad_generativa: 0.90,
    sensibilidad_estetica: 0.90,
    expresion_personal: 0.80,
    pensamiento_sistemico: 0.55,
    interes_ideas: 0.55,
  },

  'Administración, gestión y negocios': {
    orientacion_logro: 0.85,
    pensamiento_sistemico: 0.75,
    liderazgo: 0.70,
    interes_datos: 0.55,
    necesidad_estructura: 0.50,
  },

  'Marketing, publicidad y ventas': {
    persuasion_influencia: 0.90,
    energia_interpersonal: 0.80,
    creatividad_generativa: 0.65,
    orientacion_logro: 0.65,
    orientacion_social: 0.60,
  },

  'Economía, finanzas y banca': {
    interes_datos: 0.90,
    orientacion_analitica: 0.85,
    pensamiento_abstracto: 0.70,
    orientacion_logro: 0.65,
    orientacion_monetaria: 0.55,
  },

  'Contabilidad, auditoría e impuestos': {
    interes_datos: 0.85,
    orientacion_analitica: 0.80,
    necesidad_estructura: 0.80,
    orientacion_logro: 0.60,
  },

  'Derecho, notariado y bienes': {
    pensamiento_critico: 0.90,
    persuasion_influencia: 0.75,
    necesidad_estructura: 0.70,
    reflexion_profunda: 0.65,
    impacto_social: 0.55,
  },

  'Profesorados, pedagogía y gestión educativa': {
    impacto_social: 0.85,
    empatia_funcional: 0.80,
    orientacion_social: 0.75,
    liderazgo: 0.60,
    busqueda_impacto: 0.65,
  },

  'Biología, genética y biotecnología': {
    curiosidad_intelectual: 0.90,
    orientacion_investigativa: 0.90,
    pensamiento_abstracto: 0.75,
    interes_naturaleza: 0.65,
    interes_datos: 0.55,
  },

  'Civil, obras e infraestructura': {
    interes_objetos: 0.90,
    orientacion_practica: 0.90,
    pensamiento_sistemico: 0.70,
    orientacion_logro: 0.65,
  },

  'Mecánica, electromecánica y mecatrónica': {
    interes_objetos: 0.90,
    orientacion_practica: 0.85,
    pensamiento_sistemico: 0.65,
    orientacion_logro: 0.60,
  },

  'Comunicación y medios digitales': {
    persuasion_influencia: 0.80,
    expresion_personal: 0.80,
    interes_ideas: 0.75,
    orientacion_social: 0.60,
    creatividad_generativa: 0.65,
  },

  'Sociología, trabajo social y comunidad': {
    impacto_social: 0.90,
    orientacion_social: 0.80,
    empatia_funcional: 0.75,
    busqueda_impacto: 0.80,
    pensamiento_critico: 0.55,
  },

  'RRHH y desarrollo organizacional': {
    empatia_funcional: 0.80,
    liderazgo: 0.75,
    orientacion_social: 0.75,
    impacto_social: 0.65,
    energia_interpersonal: 0.65,
  },

  'Ambiente, biodiversidad y recursos naturales': {
    interes_naturaleza: 0.95,
    orientacion_largo_plazo: 0.85,
    orientacion_investigativa: 0.70,
    busqueda_impacto: 0.65,
    impacto_social: 0.60,
  },

  'Turismo, hotelería y gastronomía': {
    energia_interpersonal: 0.90,
    orientacion_social: 0.85,
    creatividad_generativa: 0.60,
    orientacion_logro: 0.55,
    vocacion_servicio: 0.55,
  },

  'Turismo, hotelería, eventos y gastronomía': {
    energia_interpersonal: 0.90,
    orientacion_social: 0.85,
    creatividad_generativa: 0.60,
    orientacion_logro: 0.55,
    vocacion_servicio: 0.55,
  },

  'Filosofía, historia y humanidades': {
    reflexion_profunda: 0.85,
    interes_ideas: 0.90,
    curiosidad_intelectual: 0.80,
    pensamiento_critico: 0.75,
    orientacion_investigativa: 0.65,
  },

  'Idiomas, traducción y letras': {
    interes_ideas: 0.85,
    expresion_personal: 0.75,
    curiosidad_intelectual: 0.70,
    orientacion_investigativa: 0.60,
  },

  'Periodismo y redacción': {
    persuasion_influencia: 0.80,
    expresion_personal: 0.85,
    interes_ideas: 0.80,
    orientacion_social: 0.60,
    pensamiento_critico: 0.60,
  },

  'Física, ciencias básicas y aplicadas': {
    curiosidad_intelectual: 0.95,
    orientacion_investigativa: 0.90,
    pensamiento_abstracto: 0.90,
    interes_datos: 0.80,
    reflexion_profunda: 0.65,
  },

  'Química': {
    curiosidad_intelectual: 0.90,
    orientacion_investigativa: 0.85,
    pensamiento_abstracto: 0.80,
    interes_datos: 0.70,
    orientacion_practica: 0.55,
  },

  'Química, alimentos y procesos': {
    curiosidad_intelectual: 0.85,
    orientacion_investigativa: 0.80,
    pensamiento_abstracto: 0.70,
    interes_naturaleza: 0.50,
    orientacion_practica: 0.55,
  },

  'Laboratorio, farmacia y bioquímica': {
    curiosidad_intelectual: 0.85,
    orientacion_investigativa: 0.85,
    pensamiento_abstracto: 0.70,
    interes_datos: 0.65,
    empatia_funcional: 0.45,
  },

  'Acompañamiento terapéutico': {
    empatia_funcional: 0.90,
    vocacion_servicio: 0.85,
    interes_personas: 0.80,
    orientacion_social: 0.65,
  },

  'Agronomía, agro y producción': {
    interes_naturaleza: 0.85,
    orientacion_practica: 0.80,
    interes_objetos: 0.65,
    orientacion_largo_plazo: 0.60,
  },

  'Arquitectura, urbanismo y obra': {
    interes_objetos: 0.80,
    creatividad_generativa: 0.75,
    pensamiento_sistemico: 0.80,
    sensibilidad_estetica: 0.70,
    orientacion_logro: 0.60,
  },

  'Bioingeniería': {
    pensamiento_abstracto: 0.85,
    pensamiento_sistemico: 0.85,
    curiosidad_intelectual: 0.80,
    orientacion_investigativa: 0.75,
    interes_datos: 0.65,
  },

  'Educación física y deporte': {
    energia_interpersonal: 0.80,
    orientacion_social: 0.75,
    orientacion_practica: 0.70,
    vocacion_servicio: 0.65,
    busqueda_impacto: 0.55,
  },

  'Electrónica, electricidad y telecomunicaciones': {
    pensamiento_sistemico: 0.85,
    interes_datos: 0.75,
    orientacion_practica: 0.70,
    pensamiento_abstracto: 0.65,
    orientacion_investigativa: 0.60,
  },

  'Energía, petróleo y naval': {
    interes_objetos: 0.85,
    orientacion_practica: 0.80,
    pensamiento_sistemico: 0.70,
    orientacion_logro: 0.60,
  },

  'Enfermería': {
    empatia_funcional: 0.90,
    vocacion_servicio: 0.85,
    interes_personas: 0.80,
    orientacion_practica: 0.60,
    busqueda_impacto: 0.55,
  },

  'Gobierno, política y RRII': {
    liderazgo: 0.85,
    persuasion_influencia: 0.80,
    pensamiento_critico: 0.75,
    impacto_social: 0.70,
    orientacion_largo_plazo: 0.65,
  },

  'Industrial, procesos y logística': {
    pensamiento_sistemico: 0.80,
    orientacion_practica: 0.75,
    orientacion_logro: 0.75,
    interes_objetos: 0.60,
    orientacion_analitica: 0.55,
  },

  'Ingenierías generales': {
    pensamiento_sistemico: 0.85,
    interes_objetos: 0.70,
    orientacion_practica: 0.70,
    orientacion_logro: 0.65,
    pensamiento_abstracto: 0.55,
  },

  'Logística y operaciones': {
    orientacion_logro: 0.85,
    pensamiento_sistemico: 0.75,
    orientacion_practica: 0.65,
    necesidad_estructura: 0.60,
  },

  'Nutrición': {
    empatia_funcional: 0.75,
    vocacion_servicio: 0.75,
    interes_naturaleza: 0.65,
    orientacion_investigativa: 0.60,
    orientacion_social: 0.55,
  },

  'Odontología': {
    empatia_funcional: 0.80,
    orientacion_practica: 0.80,
    vocacion_servicio: 0.70,
    sensibilidad_estetica: 0.55,
  },

  'Psicopedagogía': {
    empatia_funcional: 0.85,
    impacto_social: 0.80,
    orientacion_social: 0.75,
    vocacion_servicio: 0.75,
    curiosidad_intelectual: 0.55,
  },

  'Rehabilitación y terapias': {
    empatia_funcional: 0.90,
    vocacion_servicio: 0.85,
    orientacion_practica: 0.65,
    interes_personas: 0.80,
  },

  'Seguridad, criminalística y fuerzas': {
    pensamiento_critico: 0.80,
    orientacion_logro: 0.75,
    necesidad_estructura: 0.80,
    orientacion_practica: 0.65,
  },

  'Técnicas y servicios de salud': {
    empatia_funcional: 0.80,
    orientacion_practica: 0.75,
    vocacion_servicio: 0.75,
    interes_personas: 0.65,
  },

  'Teología y religión': {
    reflexion_profunda: 0.80,
    interes_ideas: 0.80,
    impacto_social: 0.70,
    vocacion_servicio: 0.75,
    necesidad_estructura: 0.50,
  },

  'Veterinaria y salud animal': {
    interes_naturaleza: 0.90,
    empatia_funcional: 0.75,
    vocacion_servicio: 0.70,
    orientacion_practica: 0.65,
  },

  'Videojuegos y simulación': {
    creatividad_generativa: 0.85,
    pensamiento_sistemico: 0.85,
    pensamiento_abstracto: 0.70,
    expresion_personal: 0.65,
    interes_datos: 0.60,
  },
};

// ---------------------------------------------------------------------------
// computeFamilyFit
// ---------------------------------------------------------------------------

/**
 * Map bipolar signals (-100..+100) to 0-100 for cosine computation.
 */
function getSignalValue(vector: VectorVocacional, key: keyof VectorVocacional): number {
  const v = vector[key] as number;
  // Bipolar signals arrive as -100..+100; map to 0-100 for similarity calculation
  if (key === 'profundidad_vs_amplitud' || key === 'reflexion_vs_accion') {
    return (v + 100) / 2;
  }
  return v;
}

/**
 * Weighted dot product between (user vector / 100) and signature weights,
 * normalised by signature magnitude. Returns 0-100.
 */
export function computeFamilyFit(vector: VectorVocacional, familia: string): number {
  const sig = FAMILIA_FIRMA[familia];
  if (!sig) return 0;

  let dot = 0;
  let sigMag = 0;

  for (const [key, weight] of Object.entries(sig) as [keyof VectorVocacional, number][]) {
    const vVal = getSignalValue(vector, key);
    const vNorm = vVal / 100;
    dot += vNorm * weight;
    sigMag += weight * weight;
  }

  const similarity = sigMag > 0 ? dot / Math.sqrt(sigMag) : 0;
  return Math.round(Math.min(similarity * 140, 100));
}
