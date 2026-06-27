export interface UserProfile {
  nombre: string;
  email: string;
  edad: string;
  provinciaId: string;
  movilidad: 'si' | 'no' | 'nose';
}

export type PlanId = 'esencial' | 'universitario' | 'profesional';

export const PLANES: Record<PlanId, {
  nombre: string;
  precio: string;
  /** Promesa corta del plan (verbo en imperativo). */
  tagline: string;
  /** Para quién es: una línea que ayuda a auto-seleccionarse. */
  paraQuien: string;
  popular?: boolean;
  /** Etiqueta del plan destacado. */
  badge?: string;
  /** 3 beneficios concretos. */
  incluye: string[];
  /** Qué desbloquea del preview (se muestra en la card como nivel de unlock). */
  desbloquea: string;
  /** Hook grisado: lo que insinúa sin entregar. */
  hook: string;
}> = {
  esencial: {
    nombre: 'Esencial',
    precio: '2.990',
    tagline: 'Entendé tu perfil.',
    paraQuien: 'Para entenderte antes de elegir carrera: quién sos y cómo decidís.',
    incluye: [
      'Tu arquetipo vocacional explicado en profundidad',
      'Tus motivadores y fortalezas, con tus áreas de desarrollo',
      'Los bloqueos que pueden confundirte al momento de elegir',
    ],
    desbloquea: 'Tu perfil completo y la lectura de tus señales',
    hook: 'Incluye el patrón que más condiciona tus decisiones.',
  },
  universitario: {
    nombre: 'Universitario',
    precio: '4.990',
    tagline: 'Elegí mejor con carreras compatibles.',
    paraQuien: 'Si ya querés pasar del perfil a decidir qué estudiar.',
    popular: true,
    badge: 'Recomendado para decidir',
    incluye: [
      'Todo lo del plan Esencial',
      'Tus carreras más compatibles, con la razón de cada una',
      'Universidades de Argentina, con modalidad y duración real',
    ],
    desbloquea: 'Tus carreras afines y dónde estudiarlas',
    hook: 'Tus 3 carreras con mayor compatibilidad aparecen acá.',
  },
  profesional: {
    nombre: 'Profesional',
    precio: '7.990',
    tagline: 'Transformá el resultado en plan de acción.',
    paraQuien: 'Para pasar a la acción: qué explorar primero, qué descartar y cómo validar opciones.',
    incluye: [
      'Todo lo del plan Universitario',
      'Salidas laborales concretas y rangos salariales (ARS)',
      'Un plan de exploración: qué validar y qué descartar primero',
    ],
    desbloquea: 'El panorama laboral y tu plan de acción',
    hook: 'Incluye un plan sugerido de exploración para los próximos 30 días.',
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
