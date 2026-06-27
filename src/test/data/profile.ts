export interface UserProfile {
  nombre: string;
  email: string;
  edad: string;
  provinciaId: string;
  movilidad: 'si' | 'no' | 'nose';
}

export type PlanId = 'esencial' | 'universitario' | 'profesional';

export const PLANES: Record<PlanId, {
  /** Nombre del NIVEL del informe (la parte de tu decisión que abre). */
  nivel: string;
  nombre: string;
  precio: string;
  /** Promesa corta del plan (verbo en imperativo). Lo usan checkout y el PDF. */
  tagline: string;
  /** Para quién / qué dolor resuelve — humano, con una tensión real. */
  para: string;
  /** Qué te da, en clave de transformación (editorial, no lista de features). */
  promesa: string;
  /** El "después": qué cambia una vez que lo leés. */
  cambio: string;
  /** CTA orientado a deseo (sin precio; la pantalla concatena el monto). */
  cta: string;
  popular?: boolean;
  /** Etiqueta del plan destacado. */
  badge?: string;
  /** Solo en el recomendado: refuerzo anti-genérico. */
  noEs?: string;
  /** 3 beneficios concretos (lo usa la pantalla de checkout/reserva y el PDF). */
  incluye: string[];
}> = {
  esencial: {
    nivel: 'Entenderte',
    nombre: 'Esencial',
    precio: '2.990',
    tagline: 'Entenderme antes de elegir.',
    para: 'Para dejar de sentir que elegís a ciegas.',
    promesa: 'Poné en palabras qué te mueve, qué te traba y cómo decidís cuando algo sí encaja con vos.',
    cambio: 'Salís entendiendo tu forma de decidir, antes de mirar una sola carrera.',
    cta: 'Quiero entenderme mejor',
    incluye: [
      'Tu arquetipo vocacional explicado en profundidad',
      'Tus motivadores y fortalezas, con tus áreas de desarrollo',
      'Los bloqueos que pueden confundirte al momento de elegir',
    ],
  },
  universitario: {
    nivel: 'Elegir carrera',
    nombre: 'Universitario',
    precio: '4.990',
    tagline: 'Elegir mejor qué estudiar.',
    para: 'Para bajar tu perfil a opciones reales y dejar de dudar entre mil caminos.',
    promesa: 'Cruzamos tu perfil con carreras compatibles, te mostramos el porqué de cada coincidencia y dónde podrías estudiarlas en Argentina.',
    cambio: 'Pasás de “no sé qué estudiar” a una lista corta de opciones que tienen sentido para vos.',
    cta: 'Quiero ver mis carreras compatibles',
    popular: true,
    badge: 'El que más ayuda a decidir',
    noEs: 'No es una lista de carreras populares: es un cruce entre tus respuestas, tu perfil y opciones reales.',
    incluye: [
      'Todo lo del plan Esencial',
      'Tus carreras más compatibles, con la razón de cada una',
      'Universidades de Argentina, con modalidad y duración real',
    ],
  },
  profesional: {
    nivel: 'Pasar a la acción',
    nombre: 'Profesional',
    precio: '7.990',
    tagline: 'Pasar a la acción.',
    para: 'Para cuando entenderte no alcanza y necesitás saber cuál es el próximo paso.',
    promesa: 'Qué explorar primero, qué descartar antes de perder tiempo y cómo validar tus opciones en los próximos 30 días.',
    cambio: 'Dejás de dar vueltas: salís con un plan para validar y descartar sin perder meses probando a ciegas.',
    cta: 'Quiero mi plan de acción',
    incluye: [
      'Todo lo del plan Universitario',
      'Salidas laborales concretas y rangos salariales (ARS)',
      'Un plan de exploración: qué validar y qué descartar primero',
    ],
  },
};

export const PROVINCIAS = [
  { id: 'CABA',   label: 'Ciudad de Buenos Aires',       dbName: 'Ciudad Autonoma de Buenos Aires' },
  { id: 'GBA',    label: 'Gran Buenos Aires (Conurbano)', dbName: 'Buenos Aires' },
  { id: 'BAPROV', label: 'Buenos Aires (interior)',       dbName: 'Buenos Aires' },
  { id: 'COR',    label: 'Córdoba',                      dbName: 'Córdoba' },
  { id: 'SF',     label: 'Santa Fe',                     dbName: 'Santa Fé' },
  { id: 'MZA',    label: 'Mendoza',                      dbName: 'Mendoza' },
  { id: 'TUC',    label: 'Tucumán',                      dbName: 'Tucumán' },
  { id: 'ER',     label: 'Entre Ríos',                   dbName: 'Entre Ríos' },
  { id: 'SAL',    label: 'Salta',                        dbName: 'Salta' },
  { id: 'MIS',    label: 'Misiones',                     dbName: 'Misiones' },
  { id: 'CHA',    label: 'Chaco',                        dbName: 'Chaco' },
  { id: 'CORR',   label: 'Corrientes',                   dbName: 'Corrientes' },
  { id: 'SGO',    label: 'Santiago del Estero',          dbName: 'Santiago del Estero' },
  { id: 'SJ',     label: 'San Juan',                     dbName: 'San Juan' },
  { id: 'JUJ',    label: 'Jujuy',                        dbName: 'Jujuy' },
  { id: 'RN',     label: 'Río Negro',                    dbName: 'Río Negro' },
  { id: 'NQN',    label: 'Neuquén',                      dbName: 'Neuquén' },
  { id: 'FOR',    label: 'Formosa',                      dbName: 'Formosa' },
  { id: 'SL',     label: 'San Luis',                     dbName: 'San Luis' },
  { id: 'CAT',    label: 'Catamarca',                    dbName: 'Catamarca' },
  { id: 'LR',     label: 'La Rioja',                     dbName: 'La Rioja' },
  { id: 'LP',     label: 'La Pampa',                     dbName: 'La Pampa' },
  { id: 'CHU',    label: 'Chubut',                       dbName: 'Chubut' },
  { id: 'SC',     label: 'Santa Cruz',                   dbName: 'Santa Cruz' },
  { id: 'TDF',    label: 'Tierra del Fuego',             dbName: 'Tierra del Fuego' },
  // Fuera de Argentina: sin provincia local. dbName vacío → getProvinciasDisponibles
  // devuelve [] (igual que "me mudaría"), así el recomendador muestra todas las
  // universidades en vez de filtrar por una provincia que no aplica.
  { id: 'EXT',    label: 'No vivo en Argentina',          dbName: '' },
];

export function getProvinciasDisponibles(profile: UserProfile): string[] {
  if (profile.movilidad === 'si') return []; // vacío = todas las provincias
  const home = PROVINCIAS.find(p => p.id === profile.provinciaId)?.dbName;
  return home ? [home] : [];
}
