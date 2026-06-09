/**
 * Family → archetype affinity table.
 * Weights: 0.0 – 1.0. Families not listed for an archetype default to 0.
 */

export type FamilyAffinityMap = Record<string, Partial<Record<string, number>>>;

export const FAMILIA_AFFINITY: FamilyAffinityMap = {
  "Acompañamiento terapéutico": {
    sanador: 1.0,
    catalizador: 0.6,
  },

  "Administración gestión y negocios": {
    orquestador: 1.0,
    interprete: 0.6,
    arquitecto: 0.3,
  },

  "Agronomía agro y producción": {
    custodio: 1.0,
    descubridor: 0.4,
    constructor: 0.3,
  },

  "Ambiente biodiversidad y recursos naturales": {
    custodio: 1.0,
    descubridor: 0.6,
    catalizador: 0.3,
  },

  "Arquitectura urbanismo y obra": {
    constructor: 1.0,
    artifice: 0.5,
    arquitecto: 0.4,
  },

  "Arte música teatro y audiovisual": {
    artifice: 1.0,
    narrador: 0.7,
    catalizador: 0.3,
  },

  "Bioingeniería": {
    descubridor: 0.9,
    arquitecto: 0.7,
    sanador: 0.4,
  },

  "Biología genética y biotecnología": {
    descubridor: 1.0,
    custodio: 0.4,
    sanador: 0.3,
  },

  "Civil obras e infraestructura": {
    constructor: 1.0,
    arquitecto: 0.4,
    custodio: 0.2,
  },

  "Comunicación y medios digitales": {
    narrador: 1.0,
    artifice: 0.5,
    orquestador: 0.3,
  },

  "Contabilidad auditoría e impuestos": {
    interprete: 1.0,
    orquestador: 0.5,
    arbitro: 0.4,
  },

  "Datos IA estadística y matemática": {
    arquitecto: 1.0,
    interprete: 0.8,
    descubridor: 0.5,
  },

  "Derecho notariado y bienes": {
    arbitro: 1.0,
    orquestador: 0.4,
    narrador: 0.3,
  },

  "Diseño gráfico industrial y digital": {
    artifice: 1.0,
    arquitecto: 0.4,
    narrador: 0.3,
  },

  "Economía finanzas y banca": {
    interprete: 1.0,
    orquestador: 0.6,
    arquitecto: 0.3,
  },

  "Educación física y deporte": {
    anfitrion: 0.9,
    catalizador: 0.6,
    sanador: 0.3,
  },

  "Electrónica electricidad y telecomunicaciones": {
    arquitecto: 1.0,
    constructor: 0.5,
    descubridor: 0.3,
  },

  "Energía petróleo y naval": {
    constructor: 0.9,
    arquitecto: 0.5,
    custodio: 0.3,
  },

  "Enfermería": {
    sanador: 1.0,
    catalizador: 0.5,
    custodio: 0.2,
  },

  "Filosofía historia y humanidades": {
    narrador: 1.0,
    descubridor: 0.5,
    arbitro: 0.4,
  },

  "Física ciencias básicas y aplicadas": {
    descubridor: 1.0,
    arquitecto: 0.6,
    interprete: 0.3,
  },

  "Gobierno política y RRII": {
    arbitro: 0.8,
    orquestador: 0.8,
    narrador: 0.4,
  },

  "Idiomas traducción y letras": {
    narrador: 1.0,
    catalizador: 0.5,
    artifice: 0.3,
  },

  "Industrial procesos y logística": {
    constructor: 0.9,
    orquestador: 0.6,
    interprete: 0.4,
  },

  "Ingenierías generales": {
    constructor: 0.8,
    arquitecto: 0.7,
    descubridor: 0.3,
  },

  "Laboratorio farmacia y bioquímica": {
    descubridor: 0.9,
    sanador: 0.6,
    interprete: 0.4,
  },

  "Logística y operaciones": {
    orquestador: 0.9,
    constructor: 0.5,
    interprete: 0.4,
  },

  "Marketing publicidad y ventas": {
    orquestador: 1.0,
    artifice: 0.5,
    narrador: 0.4,
  },

  "Mecánica electromecánica y mecatrónica": {
    constructor: 1.0,
    arquitecto: 0.4,
    descubridor: 0.2,
  },

  "Medicina y atención clínica": {
    sanador: 1.0,
    descubridor: 0.4,
    catalizador: 0.3,
  },

  "Nutrición": {
    sanador: 0.9,
    custodio: 0.5,
    descubridor: 0.3,
  },

  "Odontología": {
    sanador: 0.9,
    artifice: 0.4,
    descubridor: 0.3,
  },

  "Periodismo y redacción": {
    narrador: 1.0,
    arbitro: 0.4,
    catalizador: 0.3,
  },

  "Profesorados pedagogía y gestión educativa": {
    catalizador: 1.0,
    narrador: 0.5,
    orquestador: 0.3,
  },

  "Psicología": {
    sanador: 0.9,
    catalizador: 0.8,
    descubridor: 0.3,
  },

  "Psicopedagogía": {
    catalizador: 0.9,
    sanador: 0.7,
    narrador: 0.3,
  },

  "Química": {
    descubridor: 1.0,
    sanador: 0.4,
    interprete: 0.3,
  },

  "Química alimentos y procesos": {
    descubridor: 0.9,
    custodio: 0.5,
    constructor: 0.3,
  },

  "RRHH y desarrollo organizacional": {
    catalizador: 1.0,
    orquestador: 0.6,
    sanador: 0.3,
  },

  "Rehabilitación y terapias": {
    sanador: 1.0,
    catalizador: 0.5,
    custodio: 0.2,
  },

  "Seguridad criminalística y fuerzas": {
    arbitro: 1.0,
    custodio: 0.4,
    orquestador: 0.3,
  },

  "Sociología trabajo social y comunidad": {
    catalizador: 1.0,
    narrador: 0.5,
    arbitro: 0.4,
  },

  "Software sistemas e informática": {
    arquitecto: 1.0,
    descubridor: 0.4,
    artifice: 0.3,
  },

  "Teología y religión": {
    narrador: 0.8,
    catalizador: 0.7,
    custodio: 0.3,
  },

  "Turismo hotelería y gastronomía": {
    anfitrion: 1.0,
    orquestador: 0.4,
    artifice: 0.3,
  },

  "Turismo hotelería eventos y gastronomía": {
    anfitrion: 1.0,
    orquestador: 0.4,
    artifice: 0.3,
  },

  "Técnicas y servicios de salud": {
    sanador: 0.9,
    constructor: 0.3,
    catalizador: 0.3,
  },

  "Veterinaria y salud animal": {
    custodio: 1.0,
    sanador: 0.5,
    descubridor: 0.3,
  },

  "Videojuegos y simulación": {
    arquitecto: 0.8,
    artifice: 0.8,
    descubridor: 0.4,
  },
};

/**
 * Returns the affinity weight (0.0–1.0) of the given family for the given archetype.
 * Returns 0 if the family or archetype is not mapped.
 */
export function getFamilyAffinity(familia: string, arquetipoId: string): number {
  const entry = FAMILIA_AFFINITY[familia];
  if (!entry) return 0;
  return entry[arquetipoId] ?? 0;
}
