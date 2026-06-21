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
  tagline: string;
  popular?: boolean;
  incluye: string[];
}> = {
  esencial: {
    nombre: 'Esencial',
    precio: '2.990',
    tagline: 'Tu perfil + carreras',
    incluye: [
      'Descripción completa de tu arquetipo vocacional',
      'Fortalezas, motivaciones y áreas de desarrollo',
      'Tus carreras más afines, con la razón de cada una',
    ],
  },
  universitario: {
    nombre: 'Universitario',
    precio: '4.990',
    tagline: 'Tu camino académico',
    popular: true,
    incluye: [
      'Todo lo del plan Esencial',
      'Universidades de Argentina donde se estudia cada carrera',
      'Modalidad y duración real de cada una',
    ],
  },
  profesional: {
    nombre: 'Profesional',
    precio: '7.990',
    tagline: 'Tu futuro laboral',
    incluye: [
      'Todo lo del plan Universitario',
      'Salidas laborales concretas por carrera',
      'Rangos salariales orientativos en Argentina (ARS)',
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
];

export function getProvinciasDisponibles(profile: UserProfile): string[] {
  if (profile.movilidad === 'si') return []; // vacío = todas las provincias
  const home = PROVINCIAS.find(p => p.id === profile.provinciaId)?.dbName;
  return home ? [home] : [];
}
