export interface UserProfile {
  nombre: string;
  email: string;
  edad: string;
  provinciaId: string;
  movilidad: 'si' | 'no' | 'nose';
}

export type PlanId = 'esencial' | 'universitario' | 'profesional';

/** Un módulo premium del informe (lo que desbloquea un nivel). El `titulo` es un
 *  hook marketinero; `porque` explica por qué importa en una línea. */
export interface PlanModulo {
  titulo: string;
  porque: string;
  /** Si está, el componente reemplaza `porque` por contenido dinámico del motor. */
  dyn?: 'bloqueo';
}

export const PLANES: Record<PlanId, {
  /** Nombre del NIVEL de desbloqueo (lo que pasás a poder hacer). */
  nivel: string;
  nombre: string;
  precio: string;
  /** Promesa corta del plan (verbo en imperativo). */
  tagline: string;
  /** Para quién es: una línea que ayuda a auto-seleccionarse. */
  paraQuien: string;
  /** Por qué vale la pena: una línea de valor. */
  valor: string;
  popular?: boolean;
  /** Etiqueta del plan destacado. */
  badge?: string;
  /** Módulos premium que desbloquea este nivel (hooks + por qué importa). */
  modulos: PlanModulo[];
  /** 3 beneficios concretos (lo usa la pantalla de checkout/reserva). */
  incluye: string[];
  /** Qué desbloquea, en una frase. */
  desbloquea: string;
  /** Hook grisado: lo que insinúa sin entregar. */
  hook: string;
}> = {
  esencial: {
    nivel: 'Entenderte',
    nombre: 'Esencial',
    precio: '2.990',
    tagline: 'Entenderme antes de elegir.',
    paraQuien: 'Para entenderte antes de elegir: quién sos y cómo decidís.',
    valor: 'El piso de todo: entender tu forma de decidir antes de mirar carreras.',
    modulos: [
      { titulo: 'El patrón que más puede confundirte al elegir', porque: 'Eso que te hace dudar o elegir por las razones equivocadas.', dyn: 'bloqueo' },
      { titulo: 'Tus motores reales: qué te enciende y qué te apaga', porque: 'Lo que va a sostener —o cansar— tu día a día en una carrera.' },
      { titulo: 'Tus fortalezas y tus puntos ciegos', porque: 'En qué jugás con ventaja y qué conviene tener en el radar.' },
    ],
    incluye: [
      'Tu arquetipo vocacional explicado en profundidad',
      'Tus motivadores y fortalezas, con tus áreas de desarrollo',
      'Los bloqueos que pueden confundirte al momento de elegir',
    ],
    desbloquea: 'Tu perfil completo y la lectura de tus señales',
    hook: 'Incluye el patrón que más condiciona tus decisiones.',
  },
  universitario: {
    nivel: 'Elegir carrera',
    nombre: 'Universitario',
    precio: '4.990',
    tagline: 'Elegir mejor qué estudiar.',
    paraQuien: 'Para pasar del perfil a decidir qué estudiar, con fundamento.',
    valor: 'El nivel que convierte tu perfil en una decisión concreta.',
    popular: true,
    badge: 'Recomendado para decidir',
    modulos: [
      { titulo: 'Las 3 carreras donde tu perfil encaja mejor', porque: 'Tu match más alto, no una lista de “carreras populares”.' },
      { titulo: 'Por qué encajan con vos (no es azar)', porque: 'La razón concreta detrás de cada recomendación.' },
      { titulo: 'Dónde estudiarlas: universidades, modalidad y duración', porque: 'Opciones reales en Argentina, para ver si es viable para vos.' },
    ],
    incluye: [
      'Todo lo del plan Esencial',
      'Tus carreras más compatibles, con la razón de cada una',
      'Universidades de Argentina, con modalidad y duración real',
    ],
    desbloquea: 'Tus carreras afines y dónde estudiarlas',
    hook: 'Tus 3 carreras con mayor compatibilidad aparecen acá.',
  },
  profesional: {
    nivel: 'Pasar a la acción',
    nombre: 'Profesional',
    precio: '7.990',
    tagline: 'Pasar a la acción.',
    paraQuien: 'Para dejar de girar: qué explorar, qué descartar y cómo validar.',
    valor: 'El nivel que transforma el resultado en próximos pasos concretos.',
    modulos: [
      { titulo: 'Qué te conviene explorar primero', porque: 'Por dónde empezar para no perder meses probando a ciegas.' },
      { titulo: 'Qué deberías descartar antes de perder tiempo', porque: 'Lo que parece para vos pero probablemente no lo sea.' },
      { titulo: 'Tu plan de exploración para los próximos 30 días', porque: 'Salidas laborales, rangos salariales (ARS) y pasos para validar.' },
    ],
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
