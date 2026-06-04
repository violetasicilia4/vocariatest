export interface Arquetipo {
  id: string;
  nombre: string;
  tagline: string;
  descripcion: string;
  emoji: string;
  color: string; // hex accent
  colorBg: string;
  // Perfil RIASEC dominante (0-100)
  perfil: {
    R: number; I: number; A: number; S: number; E: number; C: number;
  };
  motivacion: {
    autonomia: number;
    seguridad: number;
    impacto: number;
    riesgo: number;
  };
  carreras_primarias: string[];
  carreras_secundarias: string[];
  combinaciones: { con: string; resultado: string }[];
  fortalezas: string[];
  desafios: string[];
}

export const ARQUETIPOS: Arquetipo[] = [
  {
    id: 'constructor',
    nombre: 'El Constructor',
    tagline: 'Creás cosas concretas. El resultado que se puede tocar te importa.',
    descripcion: 'Sos de las personas que encuentran satisfacción en el resultado tangible. Preferís un problema técnico claro por encima de una discusión abstracta. Te movés bien en entornos donde hay algo que armar, reparar o mejorar.',
    emoji: '🔧',
    color: '#f97316',
    colorBg: '#fff7ed',
    perfil: { R: 85, I: 50, A: 25, S: 30, E: 40, C: 45 },
    motivacion: { autonomia: 55, seguridad: 60, impacto: 40, riesgo: 35 },
    carreras_primarias: ['Ingeniería Civil', 'Ingeniería Mecánica', 'Ingeniería Industrial', 'Arquitectura', 'Ingeniería Electrónica', 'Tecnología en Construcción'],
    carreras_secundarias: ['Diseño Industrial', 'Ingeniería Química', 'Ingeniería Agraria', 'Tecnicatura en Mantenimiento'],
    combinaciones: [
      { con: 'investigador', resultado: 'Ingeniería de alto nivel o I+D aplicado' },
      { con: 'organizador', resultado: 'Gestión de proyectos de construcción o manufactura' },
    ],
    fortalezas: ['Pensamiento práctico', 'Capacidad técnica', 'Orientación a resultados', 'Resolución de problemas concretos'],
    desafios: ['Puede frustrarse con tareas muy abstractas o sin resultado visible', 'A veces prefiere el detalle técnico por encima de la visión estratégica'],
  },

  {
    id: 'investigador',
    nombre: 'El Investigador',
    tagline: 'Querés entender cómo funciona todo, no solo que funcione.',
    descripcion: 'Te sentís más vivo/a cuando encontrás la respuesta a algo que nadie había resuelto antes. Preferís trabajar en profundidad. La incertidumbre no te asusta, te atrae. Necesitás autonomía para explorar a tu ritmo.',
    emoji: '🔬',
    color: '#6366f1',
    colorBg: '#eef2ff',
    perfil: { R: 40, I: 90, A: 45, S: 30, E: 30, C: 45 },
    motivacion: { autonomia: 75, seguridad: 35, impacto: 55, riesgo: 50 },
    carreras_primarias: ['Física', 'Matemática', 'Bioquímica', 'Biotecnología', 'Ciencias de Datos', 'Filosofía', 'Economía'],
    carreras_secundarias: ['Ingeniería en Computación', 'Medicina', 'Historia', 'Ciencias Naturales'],
    combinaciones: [
      { con: 'analista', resultado: 'Ciencia de datos, bioinformática, inteligencia artificial' },
      { con: 'comunicador', resultado: 'Periodismo científico, divulgación, docencia universitaria' },
    ],
    fortalezas: ['Pensamiento analítico profundo', 'Capacidad de concentración', 'Rigor intelectual', 'Curiosidad sostenida'],
    desafios: ['Puede subestimar cuánto tarda la investigación en dar frutos', 'A veces le cuesta comunicar sus hallazgos a audiencias no técnicas'],
  },

  {
    id: 'creativo',
    nombre: 'El Creativo Aplicado',
    tagline: 'Expresión + función. Creás cosas que importan y que se ven.',
    descripcion: 'Tenés una combinación poco común: querés que lo que creás sea útil y también bello. No te basta con que algo funcione si no tiene una forma que valga la pena. Te movés bien en la intersección entre arte y problema real.',
    emoji: '🎨',
    color: '#ec4899',
    colorBg: '#fdf2f8',
    perfil: { R: 25, I: 40, A: 90, S: 45, E: 50, C: 25 },
    motivacion: { autonomia: 80, seguridad: 30, impacto: 50, riesgo: 55 },
    carreras_primarias: ['Diseño Gráfico', 'Diseño de Indumentaria', 'Comunicación Visual', 'Arquitectura', 'Diseño Industrial', 'Bellas Artes'],
    carreras_secundarias: ['Publicidad', 'Diseño UX/UI', 'Arquitectura de Interiores', 'Animación Digital'],
    combinaciones: [
      { con: 'emprendedor', resultado: 'Agencia creativa, marca personal, estudio de diseño propio' },
      { con: 'comunicador', resultado: 'Dirección de arte, content design, creative strategy' },
    ],
    fortalezas: ['Pensamiento visual', 'Capacidad de síntesis estética', 'Creatividad aplicada', 'Sensibilidad hacia el usuario'],
    desafios: ['Puede subestimar la parte técnica o de negocios de una carrera creativa', 'El mercado laboral creativo requiere construir portafolio desde el día 1'],
  },

  {
    id: 'conector',
    nombre: 'El Conector Social',
    tagline: 'Tu energía está en las personas. El vínculo es tu herramienta.',
    descripcion: 'Sos naturalmente bueno/a para leer a las personas, crear confianza rápido y hacer que los grupos funcionen. Te cansa trabajar solo/a por mucho tiempo. Encontrás sentido cuando lo que hacés tiene un efecto directo en alguien.',
    emoji: '🤝',
    color: '#10b981',
    colorBg: '#ecfdf5',
    perfil: { R: 20, I: 25, A: 35, S: 90, E: 55, C: 30 },
    motivacion: { autonomia: 40, seguridad: 50, impacto: 90, riesgo: 35 },
    carreras_primarias: ['Psicología', 'Trabajo Social', 'Educación', 'Enfermería', 'Comunicación Social', 'Recursos Humanos'],
    carreras_secundarias: ['Sociología', 'Salud Pública', 'Terapia Ocupacional', 'Licenciatura en Educación'],
    combinaciones: [
      { con: 'cuidador', resultado: 'Psicología clínica, trabajo en salud mental o atención primaria' },
      { con: 'estratega', resultado: 'Liderazgo en organizaciones sociales, consultoría en RR.HH.' },
    ],
    fortalezas: ['Empatía y escucha activa', 'Capacidad de construir relaciones', 'Trabajo en equipo', 'Comunicación interpersonal'],
    desafios: ['Puede absorber emocionalmente las situaciones difíciles de otros', 'Necesita aprender a poner límites en profesiones de ayuda'],
  },

  {
    id: 'estratega',
    nombre: 'El Estratega',
    tagline: 'Pensás en sistemas. Sabés cómo hacer que las cosas pasen.',
    descripcion: 'Tenés capacidad para ver el cuadro completo y también el detalle que va a marcar la diferencia. Te gusta tomar decisiones, incluso con información incompleta. Los roles donde tenés que convencer y mover a otros te quedan cómodos.',
    emoji: '♟️',
    color: '#f59e0b',
    colorBg: '#fffbeb',
    perfil: { R: 30, I: 50, A: 35, S: 55, E: 90, C: 60 },
    motivacion: { autonomia: 65, seguridad: 45, impacto: 60, riesgo: 70 },
    carreras_primarias: ['Administración de Empresas', 'Ciencias Políticas', 'Derecho', 'Marketing', 'Relaciones Internacionales', 'Ingeniería Industrial'],
    carreras_secundarias: ['Economía', 'Comunicación Institucional', 'Sociología', 'MBA (posgrado)'],
    combinaciones: [
      { con: 'organizador', resultado: 'Gestión de proyectos, consultoría de procesos, supply chain' },
      { con: 'investigador', resultado: 'Economía aplicada, política pública, inteligencia de mercado' },
    ],
    fortalezas: ['Pensamiento estratégico', 'Liderazgo natural', 'Capacidad de decisión bajo presión', 'Visión sistémica'],
    desafios: ['Puede impacientarse con procesos lentos o exceso de burocracia', 'A veces subestima la importancia del detalle técnico'],
  },

  {
    id: 'organizador',
    nombre: 'El Organizador',
    tagline: 'Donde hay caos, vos ponés orden. Y eso tiene un valor enorme.',
    descripcion: 'Sos de las personas que disfrutan cuando un proceso funciona como reloj. Preferís la certeza y los sistemas bien definidos. La improvisación te incomoda, no porque te falte capacidad, sino porque sabés que la estructura previene errores.',
    emoji: '📋',
    color: '#0ea5e9',
    colorBg: '#f0f9ff',
    perfil: { R: 35, I: 50, A: 20, S: 35, E: 50, C: 90 },
    motivacion: { autonomia: 35, seguridad: 85, impacto: 40, riesgo: 20 },
    carreras_primarias: ['Contador Público', 'Administración', 'Tecnicatura en Administración', 'Licenciatura en Sistemas', 'Comercio Exterior', 'Gestión de Información'],
    carreras_secundarias: ['Auditoría', 'Logística', 'Gestión de RRHH', 'Ciencias Económicas'],
    combinaciones: [
      { con: 'analista', resultado: 'Business Intelligence, análisis financiero, data governance' },
      { con: 'estratega', resultado: 'Gerencia de operaciones, PMO, consultoría de procesos' },
    ],
    fortalezas: ['Orden y meticulosidad', 'Confiabilidad y consistencia', 'Capacidad de sistematizar', 'Gestión del detalle'],
    desafios: ['Puede resistir los cambios rápidos o la ambigüedad prolongada', 'En entornos muy creativos puede sentirse fuera de lugar'],
  },

  {
    id: 'transformador',
    nombre: 'El Transformador Social',
    tagline: 'No te alcanza con estar bien vos. Querés cambiar algo más grande.',
    descripcion: 'Tenés una brújula interna muy clara sobre lo que está bien y lo que está mal. El impacto colectivo te moviliza. No querés solo un trabajo, querés que tu trabajo cambie algo en el mundo, aunque sea en una escala pequeña.',
    emoji: '🌱',
    color: '#84cc16',
    colorBg: '#f7fee7',
    perfil: { R: 20, I: 45, A: 40, S: 85, E: 65, C: 35 },
    motivacion: { autonomia: 55, seguridad: 35, impacto: 95, riesgo: 50 },
    carreras_primarias: ['Trabajo Social', 'Ciencias Políticas', 'Derecho', 'Sociología', 'Salud Pública', 'Relaciones Internacionales'],
    carreras_secundarias: ['Periodismo', 'Antropología', 'Psicología Social', 'Educación Popular'],
    combinaciones: [
      { con: 'estratega', resultado: 'Gestión de ONGs, política pública, advocacy' },
      { con: 'comunicador', resultado: 'Periodismo de investigación, comunicación para el desarrollo' },
    ],
    fortalezas: ['Compromiso y convicción', 'Empatía sistémica', 'Capacidad de movilizar a otros', 'Visión de largo plazo'],
    desafios: ['El sector social puede ser emocionalmente agotador y económicamente inestable al inicio', 'Necesita aprender a sostener el ritmo sin quemarse'],
  },

  {
    id: 'cientifico',
    nombre: 'El Científico-Técnico',
    tagline: 'La exactitud no es una obsesión. Es tu manera de respetar la realidad.',
    descripcion: 'Combinás la curiosidad del investigador con la capacidad técnica del constructor. Te incomoda la imprecisión. Preferís una respuesta correcta tardía que una rápida y equivocada. Te movés muy bien en ciencias exactas, medicina o ingeniería de alto nivel.',
    emoji: '⚗️',
    color: '#8b5cf6',
    colorBg: '#f5f3ff',
    perfil: { R: 70, I: 85, A: 25, S: 25, E: 30, C: 50 },
    motivacion: { autonomia: 65, seguridad: 50, impacto: 55, riesgo: 40 },
    carreras_primarias: ['Medicina', 'Bioquímica', 'Física', 'Ingeniería Química', 'Biotecnología', 'Odontología'],
    carreras_secundarias: ['Farmacia', 'Kinesiología', 'Ingeniería Electrónica', 'Ciencias Naturales'],
    combinaciones: [
      { con: 'investigador', resultado: 'Investigación biomédica, física aplicada, nanotecnología' },
      { con: 'cuidador', resultado: 'Medicina clínica, salud pública, rehabilitación' },
    ],
    fortalezas: ['Rigor metodológico', 'Capacidad técnica avanzada', 'Pensamiento sistémico', 'Precisión'],
    desafios: ['Las carreras de este perfil son largas y exigentes — requieren mucha tolerancia al esfuerzo prolongado', 'El éxito suele llegar tarde'],
  },

  {
    id: 'emprendedor_creativo',
    nombre: 'El Emprendedor Creativo',
    tagline: 'Tenés ideas originales y querés hacerlas pasar. Eso es raro y valioso.',
    descripcion: 'Combinás la creatividad con la energía para ejecutar. No te basta con tener la idea — querés que pase. Tolerás bien el riesgo, te aburre la rutina excesiva y preferís construir algo propio antes que seguir estructuras ajenas.',
    emoji: '🚀',
    color: '#f43f5e',
    colorBg: '#fff1f2',
    perfil: { R: 35, I: 45, A: 75, S: 45, E: 85, C: 25 },
    motivacion: { autonomia: 90, seguridad: 20, impacto: 60, riesgo: 85 },
    carreras_primarias: ['Diseño UX/UI', 'Marketing', 'Comunicación', 'Diseño Gráfico', 'Administración de Empresas', 'Publicidad'],
    carreras_secundarias: ['Ingeniería en Sistemas (con orientación producto)', 'Relaciones Públicas', 'Multimedia'],
    combinaciones: [
      { con: 'creativo', resultado: 'Agencias, startups de producto, creative technologist' },
      { con: 'estratega', resultado: 'Fundador/a de startup, consultor/a de innovación' },
    ],
    fortalezas: ['Pensamiento innovador', 'Alta energía y ejecución', 'Tolerancia al riesgo', 'Visión de producto'],
    desafios: ['Puede comprometer demasiadas cosas a la vez y dispersarse', 'Necesita aprender a validar antes de escalar'],
  },

  {
    id: 'cuidador',
    nombre: 'El Cuidador Profesional',
    tagline: 'Estar presente en los momentos difíciles de otro es una habilidad, no un rasgo.',
    descripcion: 'Tenés una combinación de empatía y vocación de servicio que es genuina. No te agotan los problemas de los demás — te activan. Encontrás sentido profundo cuando ves a alguien mejorar gracias a lo que hacés.',
    emoji: '💙',
    color: '#06b6d4',
    colorBg: '#ecfeff',
    perfil: { R: 30, I: 40, A: 30, S: 90, E: 35, C: 40 },
    motivacion: { autonomia: 40, seguridad: 60, impacto: 90, riesgo: 25 },
    carreras_primarias: ['Medicina', 'Enfermería', 'Psicología', 'Kinesiología', 'Nutrición', 'Terapia Ocupacional'],
    carreras_secundarias: ['Trabajo Social', 'Educación Especial', 'Farmacia', 'Salud Mental'],
    combinaciones: [
      { con: 'cientifico', resultado: 'Medicina especializada, investigación clínica, salud pública' },
      { con: 'conector', resultado: 'Psicología grupal, trabajo comunitario, facilitación' },
    ],
    fortalezas: ['Empatía clínica', 'Presencia y escucha', 'Orientación al bienestar del otro', 'Resiliencia emocional'],
    desafios: ['Las profesiones de cuidado tienen desgaste emocional real — requieren autocuidado activo', 'Los salarios iniciales suelen ser bajos en el sector público'],
  },

  {
    id: 'comunicador',
    nombre: 'El Comunicador',
    tagline: 'Las palabras y las historias son tu herramienta de trabajo más afilada.',
    descripcion: 'Tenés la capacidad de hacer que las cosas complejas parezcan claras, y que las simples parezcan importantes. Te gusta conectar ideas con audiencias. Tanto el periodismo como el marketing, la docencia o la comunicación institucional tienen sentido para vos.',
    emoji: '📢',
    color: '#d946ef',
    colorBg: '#fdf4ff',
    perfil: { R: 15, I: 40, A: 70, S: 70, E: 55, C: 30 },
    motivacion: { autonomia: 60, seguridad: 40, impacto: 70, riesgo: 45 },
    carreras_primarias: ['Comunicación Social', 'Periodismo', 'Publicidad', 'Letras', 'Relaciones Públicas', 'Docencia'],
    carreras_secundarias: ['Marketing Digital', 'Edición', 'Guion y Realización', 'Comunicación Política'],
    combinaciones: [
      { con: 'investigador', resultado: 'Periodismo de investigación, comunicación científica, data journalism' },
      { con: 'creativo', resultado: 'Dirección de arte, branding, producción audiovisual' },
    ],
    fortalezas: ['Claridad comunicativa', 'Empatía con la audiencia', 'Narrativa y storytelling', 'Adaptabilidad de registro'],
    desafios: ['El periodismo y la comunicación atraviesan transformaciones profundas — requieren adaptación constante', 'El mercado es muy competitivo para posiciones estables'],
  },

  {
    id: 'analista',
    nombre: 'El Analista de Sistemas',
    tagline: 'Los datos, los patrones y la lógica son tu lenguaje nativo.',
    descripcion: 'Sos de las personas que disfrutan cuando los números cuentan una historia. Pensás en sistemas, en procesos y en cómo automatizar lo que puede automatizarse. Combinás capacidad técnica con una mente ordenada que busca eficiencia.',
    emoji: '📊',
    color: '#3b82f6',
    colorBg: '#eff6ff',
    perfil: { R: 40, I: 80, A: 25, S: 20, E: 40, C: 80 },
    motivacion: { autonomia: 60, seguridad: 55, impacto: 40, riesgo: 40 },
    carreras_primarias: ['Ingeniería en Sistemas', 'Ciencia de Datos', 'Ingeniería en Computación', 'Estadística', 'Ingeniería Industrial', 'Licenciatura en Informática'],
    carreras_secundarias: ['Tecnicatura en Programación', 'Ingeniería Electrónica', 'Actuariado', 'Matemática Aplicada'],
    combinaciones: [
      { con: 'investigador', resultado: 'Machine learning, investigación en IA, ciencia de datos académica' },
      { con: 'organizador', resultado: 'Business intelligence, gestión de proyectos de tecnología, ERP' },
    ],
    fortalezas: ['Pensamiento lógico y estructurado', 'Capacidad para detectar patrones', 'Precisión técnica', 'Sistematización'],
    desafios: ['Puede subestimar las habilidades blandas necesarias para trabajar en equipo', 'El campo evoluciona muy rápido — requiere actualización continua'],
  },
];

export function getArquetipoById(id: string): Arquetipo | undefined {
  return ARQUETIPOS.find(a => a.id === id);
}
