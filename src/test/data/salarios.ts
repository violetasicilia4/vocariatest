export interface RolSalarial {
  rol: string;
  juniorMin: number;
  juniorMax: number;
  seniorMin: number;
  seniorMax: number;
}

export interface SalarioFamilia {
  macroArea: string;
  roles: RolSalarial[];
}

// Salarios en ARS miles/mes — estimaciones mercado 2025
export const SALARIOS: SalarioFamilia[] = [
  {
    macroArea: 'Ingeniería Informática y Sistemas',
    roles: [
      { rol: 'Desarrollador/a Junior', juniorMin: 400, juniorMax: 700, seniorMin: 1400, seniorMax: 2800 },
      { rol: 'Desarrollador/a Senior', juniorMin: 900, juniorMax: 1400, seniorMin: 2200, seniorMax: 4500 },
      { rol: 'Ingeniero/a de Software', juniorMin: 500, juniorMax: 900, seniorMin: 1800, seniorMax: 3500 },
      { rol: 'QA / Testing', juniorMin: 350, juniorMax: 600, seniorMin: 900, seniorMax: 1800 },
    ],
  },
  {
    macroArea: 'Datos, IA y Matemática',
    roles: [
      { rol: 'Data Analyst', juniorMin: 450, juniorMax: 750, seniorMin: 1200, seniorMax: 2500 },
      { rol: 'Data Scientist', juniorMin: 600, juniorMax: 1000, seniorMin: 1800, seniorMax: 3800 },
      { rol: 'Machine Learning Engineer', juniorMin: 700, juniorMax: 1200, seniorMin: 2000, seniorMax: 4500 },
      { rol: 'Estadístico/a', juniorMin: 400, juniorMax: 700, seniorMin: 1000, seniorMax: 2000 },
    ],
  },
  {
    macroArea: 'Ingeniería Eléctrica, Electrónica y Telecomunicaciones',
    roles: [
      { rol: 'Ingeniero/a Electrónico/a', juniorMin: 450, juniorMax: 750, seniorMin: 1200, seniorMax: 2200 },
      { rol: 'Técnico/a en Telecomunicaciones', juniorMin: 350, juniorMax: 600, seniorMin: 900, seniorMax: 1600 },
    ],
  },
  {
    macroArea: 'Medicina y Salud',
    roles: [
      { rol: 'Médico/a Clínico/a', juniorMin: 350, juniorMax: 650, seniorMin: 1000, seniorMax: 2500 },
      { rol: 'Médico/a Especialista', juniorMin: 700, juniorMax: 1200, seniorMin: 2000, seniorMax: 5000 },
      { rol: 'Enfermero/a', juniorMin: 280, juniorMax: 480, seniorMin: 550, seniorMax: 1000 },
      { rol: 'Kinesiólogo/a', juniorMin: 300, juniorMax: 550, seniorMin: 700, seniorMax: 1400 },
      { rol: 'Odontólogo/a', juniorMin: 350, juniorMax: 700, seniorMin: 900, seniorMax: 2500 },
      { rol: 'Nutricionista', juniorMin: 280, juniorMax: 500, seniorMin: 650, seniorMax: 1200 },
      { rol: 'Fonoaudiólogo/a', juniorMin: 280, juniorMax: 480, seniorMin: 600, seniorMax: 1100 },
    ],
  },
  {
    macroArea: 'Psicología y Comportamiento Humano',
    roles: [
      { rol: 'Psicólogo/a Clínico/a', juniorMin: 250, juniorMax: 450, seniorMin: 700, seniorMax: 1500 },
      { rol: 'Psicólogo/a Organizacional', juniorMin: 350, juniorMax: 600, seniorMin: 800, seniorMax: 1600 },
      { rol: 'Psicopedagogo/a', juniorMin: 250, juniorMax: 430, seniorMin: 550, seniorMax: 1100 },
    ],
  },
  {
    macroArea: 'Química, Farmacia y Bioquímica',
    roles: [
      { rol: 'Bioquímico/a', juniorMin: 350, juniorMax: 600, seniorMin: 800, seniorMax: 1600 },
      { rol: 'Farmacéutico/a', juniorMin: 350, juniorMax: 600, seniorMin: 750, seniorMax: 1500 },
      { rol: 'Químico/a Industrial', juniorMin: 380, juniorMax: 650, seniorMin: 900, seniorMax: 1800 },
    ],
  },
  {
    macroArea: 'Administración y Negocios',
    roles: [
      { rol: 'Analista de Negocios', juniorMin: 350, juniorMax: 600, seniorMin: 800, seniorMax: 1800 },
      { rol: 'Gerente de Área', juniorMin: 700, juniorMax: 1200, seniorMin: 1800, seniorMax: 4000 },
      { rol: 'Consultor/a de Management', juniorMin: 450, juniorMax: 800, seniorMin: 1200, seniorMax: 3000 },
      { rol: 'Logística y Operaciones', juniorMin: 320, juniorMax: 550, seniorMin: 700, seniorMax: 1500 },
    ],
  },
  {
    macroArea: 'Economía y Finanzas',
    roles: [
      { rol: 'Analista Financiero/a', juniorMin: 400, juniorMax: 700, seniorMin: 1000, seniorMax: 2500 },
      { rol: 'Economista', juniorMin: 400, juniorMax: 700, seniorMin: 1000, seniorMax: 2200 },
      { rol: 'Trader / Analista de Mercados', juniorMin: 500, juniorMax: 900, seniorMin: 1500, seniorMax: 4000 },
    ],
  },
  {
    macroArea: 'Contabilidad e Impuestos',
    roles: [
      { rol: 'Contador/a Público/a', juniorMin: 350, juniorMax: 600, seniorMin: 800, seniorMax: 1800 },
      { rol: 'Auditor/a', juniorMin: 400, juniorMax: 700, seniorMin: 900, seniorMax: 2000 },
      { rol: 'Liquidador/a Impositivo/a', juniorMin: 300, juniorMax: 530, seniorMin: 650, seniorMax: 1300 },
    ],
  },
  {
    macroArea: 'Derecho y Ciencias Jurídicas',
    roles: [
      { rol: 'Abogado/a Junior', juniorMin: 400, juniorMax: 700, seniorMin: 1000, seniorMax: 2500 },
      { rol: 'Abogado/a Senior / Socio/a', juniorMin: 1000, juniorMax: 2000, seniorMin: 2500, seniorMax: 8000 },
      { rol: 'Escribano/a', juniorMin: 500, juniorMax: 900, seniorMin: 1200, seniorMax: 3000 },
    ],
  },
  {
    macroArea: 'Arte, Música y Audiovisual',
    roles: [
      { rol: 'Editor/a Audiovisual', juniorMin: 280, juniorMax: 500, seniorMin: 700, seniorMax: 1500 },
      { rol: 'Director/a de Arte', juniorMin: 350, juniorMax: 600, seniorMin: 900, seniorMax: 2000 },
      { rol: 'Músico/a Profesional', juniorMin: 200, juniorMax: 450, seniorMin: 600, seniorMax: 2000 },
      { rol: 'Productor/a Audiovisual', juniorMin: 300, juniorMax: 550, seniorMin: 800, seniorMax: 2000 },
    ],
  },
  {
    macroArea: 'Diseño y Creatividad',
    roles: [
      { rol: 'Diseñador/a Gráfico/a', juniorMin: 300, juniorMax: 530, seniorMin: 700, seniorMax: 1600 },
      { rol: 'UX/UI Designer', juniorMin: 450, juniorMax: 800, seniorMin: 1200, seniorMax: 2800 },
      { rol: 'Diseñador/a Industrial', juniorMin: 300, juniorMax: 550, seniorMin: 700, seniorMax: 1500 },
    ],
  },
  {
    macroArea: 'Marketing, Publicidad y Comercialización',
    roles: [
      { rol: 'Marketing Digital Junior', juniorMin: 350, juniorMax: 600, seniorMin: 800, seniorMax: 1800 },
      { rol: 'Brand Manager', juniorMin: 600, juniorMax: 1000, seniorMin: 1500, seniorMax: 3500 },
      { rol: 'Media Buyer / Performance', juniorMin: 400, juniorMax: 700, seniorMin: 1000, seniorMax: 2500 },
    ],
  },
  {
    macroArea: 'Comunicación y Medios',
    roles: [
      { rol: 'Periodista', juniorMin: 250, juniorMax: 450, seniorMin: 600, seniorMax: 1500 },
      { rol: 'Community Manager', juniorMin: 280, juniorMax: 500, seniorMin: 700, seniorMax: 1500 },
      { rol: 'Productor/a de Contenidos', juniorMin: 300, juniorMax: 550, seniorMin: 750, seniorMax: 1600 },
    ],
  },
  {
    macroArea: 'Educación y Docencia',
    roles: [
      { rol: 'Docente (sector público)', juniorMin: 320, juniorMax: 500, seniorMin: 550, seniorMax: 900 },
      { rol: 'Docente (sector privado)', juniorMin: 350, juniorMax: 600, seniorMin: 600, seniorMax: 1200 },
      { rol: 'Coordinador/a Pedagógico/a', juniorMin: 450, juniorMax: 750, seniorMin: 800, seniorMax: 1600 },
    ],
  },
  {
    macroArea: 'Recursos Humanos y Organizaciones',
    roles: [
      { rol: 'Analista de RRHH', juniorMin: 350, juniorMax: 600, seniorMin: 750, seniorMax: 1500 },
      { rol: 'Jefe/a de Personas', juniorMin: 600, juniorMax: 1000, seniorMin: 1200, seniorMax: 2500 },
    ],
  },
  {
    macroArea: 'Arquitectura, Urbanismo y Construcción',
    roles: [
      { rol: 'Arquitecto/a Junior', juniorMin: 350, juniorMax: 600, seniorMin: 800, seniorMax: 1800 },
      { rol: 'Arquitecto/a Senior / Estudio', juniorMin: 700, juniorMax: 1200, seniorMin: 1500, seniorMax: 4000 },
      { rol: 'Director/a de Obra', juniorMin: 550, juniorMax: 900, seniorMin: 1200, seniorMax: 2800 },
    ],
  },
  {
    macroArea: 'Ingeniería Civil, Construcción e Infraestructura',
    roles: [
      { rol: 'Ingeniero/a Civil Junior', juniorMin: 400, juniorMax: 700, seniorMin: 1000, seniorMax: 2000 },
      { rol: 'Ingeniero/a Civil Senior', juniorMin: 800, juniorMax: 1400, seniorMin: 1800, seniorMax: 3500 },
      { rol: 'Inspector/a de Obras', juniorMin: 350, juniorMax: 600, seniorMin: 800, seniorMax: 1600 },
    ],
  },
  {
    macroArea: 'Ingeniería Industrial y Producción',
    roles: [
      { rol: 'Ingeniero/a Industrial Junior', juniorMin: 420, juniorMax: 720, seniorMin: 1000, seniorMax: 2200 },
      { rol: 'Jefe/a de Producción', juniorMin: 700, juniorMax: 1200, seniorMin: 1500, seniorMax: 3000 },
    ],
  },
  {
    macroArea: 'Ingeniería Mecánica, Electromecánica y Mecatrónica',
    roles: [
      { rol: 'Ingeniero/a Mecánico/a', juniorMin: 420, juniorMax: 720, seniorMin: 1000, seniorMax: 2200 },
      { rol: 'Técnico/a Electromecánico/a', juniorMin: 350, juniorMax: 600, seniorMin: 800, seniorMax: 1600 },
    ],
  },
  {
    macroArea: 'Ingeniería Química y de Alimentos',
    roles: [
      { rol: 'Ingeniero/a Químico/a', juniorMin: 420, juniorMax: 720, seniorMin: 1000, seniorMax: 2200 },
      { rol: 'Tecnólogo/a en Alimentos', juniorMin: 380, juniorMax: 650, seniorMin: 850, seniorMax: 1800 },
    ],
  },
  {
    macroArea: 'Ciencias Exactas y Naturales',
    roles: [
      { rol: 'Investigador/a (CONICET)', juniorMin: 400, juniorMax: 700, seniorMin: 800, seniorMax: 1500 },
      { rol: 'Docente Universitario/a', juniorMin: 350, juniorMax: 600, seniorMin: 650, seniorMax: 1200 },
      { rol: 'Consultor/a Científico/a', juniorMin: 450, juniorMax: 800, seniorMin: 1000, seniorMax: 2500 },
    ],
  },
  {
    macroArea: 'Ciencias Biológicas y Biotecnología',
    roles: [
      { rol: 'Biólogo/a de Investigación', juniorMin: 380, juniorMax: 650, seniorMin: 800, seniorMax: 1600 },
      { rol: 'Biotecnólogo/a Industrial', juniorMin: 450, juniorMax: 750, seniorMin: 1000, seniorMax: 2200 },
    ],
  },
  {
    macroArea: 'Ambiente y Recursos Naturales',
    roles: [
      { rol: 'Profesional Ambiental', juniorMin: 350, juniorMax: 600, seniorMin: 800, seniorMax: 1600 },
      { rol: 'Consultor/a Ambiental', juniorMin: 450, juniorMax: 750, seniorMin: 1000, seniorMax: 2000 },
    ],
  },
  {
    macroArea: 'Agropecuarias y Producción Alimentaria',
    roles: [
      { rol: 'Ingeniero/a Agrónomo/a', juniorMin: 350, juniorMax: 600, seniorMin: 800, seniorMax: 1800 },
      { rol: 'Asesor/a de Campo', juniorMin: 300, juniorMax: 550, seniorMin: 700, seniorMax: 1500 },
    ],
  },
  {
    macroArea: 'Veterinaria',
    roles: [
      { rol: 'Veterinario/a Clínico/a', juniorMin: 300, juniorMax: 550, seniorMin: 750, seniorMax: 1800 },
      { rol: 'Veterinario/a de Producción', juniorMin: 350, juniorMax: 600, seniorMin: 800, seniorMax: 1800 },
    ],
  },
  {
    macroArea: 'Ciencias Sociales y Comunitarias',
    roles: [
      { rol: 'Trabajador/a Social', juniorMin: 280, juniorMax: 490, seniorMin: 550, seniorMax: 1100 },
      { rol: 'Sociólogo/a', juniorMin: 300, juniorMax: 530, seniorMin: 650, seniorMax: 1400 },
    ],
  },
  {
    macroArea: 'Seguridad, Criminalística y Defensa',
    roles: [
      { rol: 'Criminalista', juniorMin: 350, juniorMax: 600, seniorMin: 700, seniorMax: 1400 },
      { rol: 'Consultor/a en Seguridad', juniorMin: 400, juniorMax: 700, seniorMin: 900, seniorMax: 1800 },
    ],
  },
  {
    macroArea: 'Turismo, Gastronomía y Hospitalidad',
    roles: [
      { rol: 'Guía de Turismo', juniorMin: 250, juniorMax: 450, seniorMin: 550, seniorMax: 1100 },
      { rol: 'Jefe/a de Recepción', juniorMin: 300, juniorMax: 520, seniorMin: 650, seniorMax: 1200 },
      { rol: 'Chef / Cocinero/a Profesional', juniorMin: 280, juniorMax: 500, seniorMin: 700, seniorMax: 2000 },
    ],
  },
  {
    macroArea: 'Deportes y Actividad Física',
    roles: [
      { rol: 'Profesor/a de Educación Física', juniorMin: 280, juniorMax: 500, seniorMin: 550, seniorMax: 1000 },
      { rol: 'Entrenador/a Personal', juniorMin: 250, juniorMax: 500, seniorMin: 600, seniorMax: 1500 },
    ],
  },
  {
    macroArea: 'Gobierno, Política y Relaciones Internacionales',
    roles: [
      { rol: 'Analista de Políticas Públicas', juniorMin: 380, juniorMax: 650, seniorMin: 800, seniorMax: 1800 },
      { rol: 'Relacionista Internacional', juniorMin: 350, juniorMax: 600, seniorMin: 750, seniorMax: 1600 },
    ],
  },
  {
    macroArea: 'Humanidades, Filosofía y Religión',
    roles: [
      { rol: 'Investigador/a en Humanidades', juniorMin: 300, juniorMax: 520, seniorMin: 600, seniorMax: 1200 },
      { rol: 'Docente Universitario/a', juniorMin: 350, juniorMax: 600, seniorMin: 650, seniorMax: 1200 },
    ],
  },
  {
    macroArea: 'Lenguas, Traducción y Letras',
    roles: [
      { rol: 'Traductor/a Público/a', juniorMin: 350, juniorMax: 600, seniorMin: 800, seniorMax: 2000 },
      { rol: 'Intérprete', juniorMin: 400, juniorMax: 700, seniorMin: 900, seniorMax: 2500 },
    ],
  },
  {
    macroArea: 'Ingeniería y Tecnología',
    roles: [
      { rol: 'Ingeniero/a Junior', juniorMin: 420, juniorMax: 720, seniorMin: 1000, seniorMax: 2200 },
      { rol: 'Ingeniero/a Senior', juniorMin: 900, juniorMax: 1500, seniorMin: 2000, seniorMax: 4000 },
    ],
  },
];

export function getSalarioByMacroArea(macroArea: string): SalarioFamilia | undefined {
  return SALARIOS.find(s => s.macroArea === macroArea);
}

export function formatSalario(min: number, max: number): string {
  const fmt = (n: number) => n >= 1000 ? `$${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}M` : `$${n}k`;
  return `${fmt(min)} – ${fmt(max)}`;
}
