export interface Arquetipo {
  id: string;
  nombre: string;
  tagline: string;
  descripcion: string;
  emoji: string;
  color: string;
  colorBg: string;
  macroareas: string[];
  fortalezas: string[];
  desafios: string[];
}

export interface Combinacion {
  ids: [string, string];
  nombre: string;
  descripcion: string;
}

export const ARQUETIPOS: Arquetipo[] = [
  {
    id: 'arquitecto',
    nombre: 'El Arquitecto',
    tagline: 'Construye sistemas que funcionan solos. Ve estructura donde otros ven caos.',
    descripcion: 'Tenés una mente que descompone problemas complejos en partes manejables. No solo querés que las cosas funcionen: querés entender por qué funcionan y cómo hacerlas más eficientes. Tu satisfacción más grande es construir algo invisible que sostiene todo lo demás.',
    emoji: '⚙️',
    color: '#6366f1',
    colorBg: '#eef2ff',
    macroareas: [
      'Ingeniería Informática y Sistemas',
      'Datos, IA y Matemática',
      'Ingeniería Eléctrica, Electrónica y Telecomunicaciones',
    ],
    fortalezas: ['Pensamiento sistémico', 'Resolución de problemas complejos', 'Autonomía y foco profundo', 'Lógica aplicada', 'Abstracción y modelado'],
    desafios: ['Puede subestimar la dimensión humana de los problemas', 'Prefiere el detalle técnico por sobre la visión estratégica', 'Puede aislarse demasiado en el trabajo individual'],
  },
  {
    id: 'constructor',
    nombre: 'El Constructor',
    tagline: 'Necesita que sus ideas tengan peso y volumen. Opera en el mundo físico.',
    descripcion: 'Para vos, el resultado es algo que se puede tocar, medir o transitar. Encontrás satisfacción en materializar ideas: un edificio que se sostiene, una máquina que funciona, una red que resiste. El trabajo concreto y el resultado tangible son lo que te moviliza.',
    emoji: '🏗️',
    color: '#f97316',
    colorBg: '#fff7ed',
    macroareas: [
      'Ingeniería Civil, Construcción e Infraestructura',
      'Ingeniería Mecánica, Electromecánica y Mecatrónica',
      'Ingeniería Industrial y Producción',
      'Arquitectura, Urbanismo y Construcción',
      'Ingeniería y Tecnología',
    ],
    fortalezas: ['Orientación a resultados tangibles', 'Capacidad técnica y manual', 'Gestión de proyectos complejos', 'Pensamiento espacial', 'Rigor y precisión'],
    desafios: ['Puede frustrarse con lo abstracto o intangible', 'A veces el detalle técnico opaca la visión de conjunto', 'Puede resistir cambios de plan una vez que arrancó'],
  },
  {
    id: 'sanador',
    nombre: 'El Sanador',
    tagline: 'Acompaña a otros en su dimensión más vulnerable. La persona como centro.',
    descripcion: 'Tenés una orientación natural hacia el bienestar de los demás. No es solo empatía: es la convicción de que acompañar a alguien en un momento difícil es uno de los trabajos más importantes que existen. La salud, en su sentido más amplio, es tu territorio.',
    emoji: '🩺',
    color: '#10b981',
    colorBg: '#ecfdf5',
    macroareas: [
      'Medicina y Salud',
      'Psicología y Comportamiento Humano',
      'Química, Farmacia y Bioquímica',
    ],
    fortalezas: ['Escucha activa y empatía', 'Presencia en situaciones difíciles', 'Orientación al cuidado', 'Visión integral de la persona', 'Paciencia y constancia'],
    desafios: ['Puede cargar emocionalmente con el trabajo', 'A veces posterga sus propias necesidades', 'Puede tener dificultad para poner límites profesionales'],
  },
  {
    id: 'catalizador',
    nombre: 'El Catalizador',
    tagline: 'Su mayor satisfacción es multiplicar el potencial de otros.',
    descripcion: 'No trabajás para brillar vos: trabajás para que otros brillen. Encontrás sentido en desarrollar capacidades, facilitar aprendizajes y construir comunidad. El impacto que más te importa es el que se multiplica en otras personas.',
    emoji: '🌱',
    color: '#14b8a6',
    colorBg: '#f0fdfa',
    macroareas: [
      'Educación y Docencia',
      'Recursos Humanos y Organizaciones',
      'Ciencias Sociales y Comunitarias',
    ],
    fortalezas: ['Comunicación y pedagogía', 'Desarrollo de personas', 'Trabajo comunitario', 'Facilitación de procesos grupales', 'Visión social del trabajo'],
    desafios: ['Puede depender demasiado de la validación externa', 'A veces posterga resultados por priorizar el proceso', 'Dificultad para tomar decisiones duras con personas'],
  },
  {
    id: 'artifice',
    nombre: 'El Artífice',
    tagline: 'Piensa en imágenes antes que en palabras. Combina estética con función.',
    descripcion: 'Para vos, la forma importa tanto como el contenido. Tenés una sensibilidad especial hacia lo visual, lo estético y lo expresivo. Tu trabajo lleva una firma: cada detalle refleja una decisión consciente. No concebís hacer algo que no tenga valor propio.',
    emoji: '🎨',
    color: '#ec4899',
    colorBg: '#fdf2f8',
    macroareas: [
      'Arte, Música y Audiovisual',
      'Diseño y Creatividad',
    ],
    fortalezas: ['Sensibilidad estética', 'Creatividad aplicada', 'Atención al detalle', 'Comunicación visual', 'Originalidad y voz propia'],
    desafios: ['Puede tener dificultad con restricciones creativas externas', 'A veces la perfección impide cerrar proyectos', 'Puede subestimar la dimensión técnica o de negocio'],
  },
  {
    id: 'interprete',
    nombre: 'El Intérprete',
    tagline: 'Lee la realidad a través de patrones y números. Convierte datos en decisiones.',
    descripcion: 'Los números son tu idioma nativo. No solo los manejás: los disfrutás. Sos de las personas que ven un gráfico y ven una historia, que encuentran señales donde otros ven ruido. Tu valor está en traducir la complejidad en algo accionable.',
    emoji: '📊',
    color: '#3b82f6',
    colorBg: '#eff6ff',
    macroareas: [
      'Economía y Finanzas',
      'Contabilidad e Impuestos',
      'Datos, IA y Matemática',
    ],
    fortalezas: ['Pensamiento analítico', 'Manejo de datos y modelos', 'Objetividad en la toma de decisiones', 'Capacidad para simplificar lo complejo', 'Rigor metodológico'],
    desafios: ['Puede sobre-analizar antes de actuar', 'A veces subestima factores cualitativos', 'Puede ser percibido como frío o distante'],
  },
  {
    id: 'orquestador',
    nombre: 'El Orquestador',
    tagline: 'Mueve personas y recursos hacia un objetivo. Liderazgo como forma de pensar.',
    descripcion: 'Ves el panorama completo y sabés qué pieza mover primero. Tenés una capacidad natural para organizar esfuerzos, alinear personas y ejecutar estrategias. No necesitás hacer todo vos: tu rol es que el conjunto funcione mejor que cada parte por separado.',
    emoji: '🎯',
    color: '#f59e0b',
    colorBg: '#fffbeb',
    macroareas: [
      'Administración y Negocios',
      'Marketing, Publicidad y Comercialización',
      'Gobierno, Política y Relaciones Internacionales',
    ],
    fortalezas: ['Visión estratégica', 'Liderazgo y coordinación', 'Comunicación persuasiva', 'Orientación a resultados de negocio', 'Adaptabilidad y gestión del cambio'],
    desafios: ['Puede perder el foco en el detalle operativo', 'A veces toma decisiones sin suficiente consulta', 'Puede depender demasiado del contexto para motivarse'],
  },
  {
    id: 'descubridor',
    nombre: 'El Descubridor',
    tagline: 'Vive para formular preguntas que nadie hizo todavía. La duda como motor.',
    descripcion: 'Tu energía viene de lo que aún no se sabe. Tenés una curiosidad que no se sacia fácilmente: cada respuesta abre tres preguntas nuevas. La investigación, la experimentación y el pensamiento profundo son tu hábitat natural.',
    emoji: '🔬',
    color: '#8b5cf6',
    colorBg: '#f5f3ff',
    macroareas: [
      'Ciencias Exactas y Naturales',
      'Ciencias Biológicas y Biotecnología',
      'Ingeniería Química y de Alimentos',
    ],
    fortalezas: ['Curiosidad intelectual profunda', 'Rigor científico', 'Pensamiento crítico', 'Tolerancia a la incertidumbre', 'Capacidad de concentración sostenida'],
    desafios: ['Puede tener dificultad para cerrar proyectos y pasar a la acción', 'A veces se aísla en el trabajo individual', 'Puede subestimar la comunicación de sus hallazgos'],
  },
  {
    id: 'arbitro',
    nombre: 'El Árbitro',
    tagline: 'El orden y la justicia como principio organizador de todo.',
    descripcion: 'Creés genuinamente en las normas, no como restricciones sino como acuerdos que hacen posible la convivencia. Tenés una sensibilidad aguda hacia lo que está bien y lo que está mal, y la energía para actuar en consecuencia. La justicia no es abstracta para vos: es urgente.',
    emoji: '⚖️',
    color: '#94a3b8',
    colorBg: '#f8fafc',
    macroareas: [
      'Derecho y Ciencias Jurídicas',
      'Seguridad, Criminalística y Defensa',
      'Gobierno, Política y Relaciones Internacionales',
    ],
    fortalezas: ['Pensamiento jurídico y normativo', 'Sentido de la justicia', 'Argumentación y retórica', 'Integridad y consistencia', 'Manejo de conflictos complejos'],
    desafios: ['Puede ser inflexible ante situaciones grises', 'A veces la rigidez normativa impide adaptarse al contexto', 'Puede tomarse los conflictos demasiado personalmente'],
  },
  {
    id: 'custodio',
    nombre: 'El Custodio',
    tagline: 'Responsable de lo vivo y lo natural. Piensa en décadas, no en trimestres.',
    descripcion: 'Tenés un vínculo profundo con los sistemas vivos: el campo, el ecosistema, los animales, el territorio. Tu horizonte de tiempo es largo: te importa lo que va a quedar cuando vos ya no estés. La responsabilidad sobre lo que existe y lo que puede existir te define.',
    emoji: '🌿',
    color: '#22c55e',
    colorBg: '#f0fdf4',
    macroareas: [
      'Ambiente y Recursos Naturales',
      'Agropecuarias y Producción Alimentaria',
      'Veterinaria',
    ],
    fortalezas: ['Visión de largo plazo', 'Responsabilidad ambiental y territorial', 'Trabajo en entornos naturales', 'Conexión con sistemas vivos', 'Paciencia y constancia'],
    desafios: ['Puede frustrarse con la lentitud de los cambios sistémicos', 'A veces el idealismo choca con la viabilidad económica', 'Puede tener dificultad para trabajar en entornos muy urbanos o corporativos'],
  },
  {
    id: 'narrador',
    nombre: 'El Narrador',
    tagline: 'Da forma al mundo con palabras, imágenes y cultura.',
    descripcion: 'Para vos, el lenguaje es una herramienta de transformación. Sabés que una historia bien contada puede cambiar perspectivas, mover emociones e instalar ideas que duran. Tenés el impulso de nombrar lo que otros sienten pero no saben cómo decir.',
    emoji: '✍️',
    color: '#e879f9',
    colorBg: '#fdf4ff',
    macroareas: [
      'Comunicación y Medios',
      'Humanidades, Filosofía y Religión',
      'Lenguas, Traducción y Letras',
    ],
    fortalezas: ['Comunicación escrita y oral', 'Sensibilidad cultural y narrativa', 'Pensamiento crítico y reflexivo', 'Capacidad de síntesis', 'Empatía conceptual'],
    desafios: ['Puede tener dificultad con estructuras muy rígidas o técnicas', 'A veces la reflexión posterga la acción', 'Puede subestimar el valor de lo cuantitativo'],
  },
  {
    id: 'anfitrion',
    nombre: 'El Anfitrión',
    tagline: 'Crea experiencias que transforman a las personas. Hospitalidad como vocación.',
    descripcion: 'Tu trabajo existe en el encuentro: el momento en que alguien vive algo que no esperaba, disfruta más de lo que imaginaba, o se siente genuinamente cuidado. Tenés una energía especial para que los demás se sientan bien, y eso lo convertís en tu profesión.',
    emoji: '🤝',
    color: '#06b6d4',
    colorBg: '#ecfeff',
    macroareas: [
      'Turismo, Gastronomía y Hospitalidad',
      'Deportes y Actividad Física',
    ],
    fortalezas: ['Orientación al cliente y la experiencia', 'Energía interpersonal', 'Adaptabilidad y creatividad situacional', 'Liderazgo de equipos operativos', 'Presencia y comunicación'],
    desafios: ['Puede tener dificultad con el trabajo muy solitario o técnico', 'Jornadas exigentes pueden generar desgaste', 'A veces subestima la dimensión estratégica del sector'],
  },
];

export const COMBINACIONES: Combinacion[] = [
  { ids: ['arquitecto', 'interprete'], nombre: 'El Ingeniero de Decisiones', descripcion: 'Construye sistemas y los alimenta con datos para tomar mejores decisiones.' },
  { ids: ['arquitecto', 'descubridor'], nombre: 'El Científico de Sistemas', descripcion: 'Investiga en profundidad para diseñar soluciones técnicas de alto nivel.' },
  { ids: ['arquitecto', 'orquestador'], nombre: 'El Líder Técnico', descripcion: 'Combina visión estratégica con capacidad de construir sistemas que escalan.' },
  { ids: ['arquitecto', 'constructor'], nombre: 'El Ingeniero Total', descripcion: 'Domina tanto el mundo digital como el físico. Diseña y construye de punta a punta.' },
  { ids: ['sanador', 'catalizador'], nombre: 'El Transformador Social', descripcion: 'Combina cuidado individual con impacto colectivo. Salud y comunidad como misión.' },
  { ids: ['sanador', 'descubridor'], nombre: 'El Científico Clínico', descripcion: 'Une la curiosidad científica con la vocación de curar. Investigación aplicada a la salud.' },
  { ids: ['sanador', 'arbitro'], nombre: 'El Defensor de Derechos', descripcion: 'Trabaja en la intersección entre salud, justicia y dignidad humana.' },
  { ids: ['catalizador', 'orquestador'], nombre: 'El Líder de Personas', descripcion: 'Desarrolla individuos y construye organizaciones. Liderazgo con foco humano.' },
  { ids: ['catalizador', 'narrador'], nombre: 'El Educador Cultural', descripcion: 'Transmite conocimiento y cultura con creatividad narrativa y sentido pedagógico.' },
  { ids: ['artifice', 'narrador'], nombre: 'El Creador de Cultura', descripcion: 'Produce contenido, arte e ideas que instalan conversaciones y mueven emociones.' },
  { ids: ['artifice', 'descubridor'], nombre: 'El Innovador Creativo', descripcion: 'Experimenta con formas nuevas de expresar ideas. La creatividad como investigación.' },
  { ids: ['artifice', 'orquestador'], nombre: 'El Director Creativo', descripcion: 'Tiene visión estética y la capacidad de ejecutarla con equipos y recursos.' },
  { ids: ['interprete', 'orquestador'], nombre: 'El Arquitecto de Negocios', descripcion: 'Combina análisis riguroso con visión estratégica para construir y gestionar organizaciones.' },
  { ids: ['interprete', 'descubridor'], nombre: 'El Analista Científico', descripcion: 'Aplica metodología científica al análisis económico, financiero o estadístico.' },
  { ids: ['orquestador', 'arbitro'], nombre: 'El Gestor de Instituciones', descripcion: 'Construye y lidera organizaciones con un fuerte sentido de norma y bien común.' },
  { ids: ['descubridor', 'custodio'], nombre: 'El Guardián Científico', descripcion: 'Investiga ecosistemas, biodiversidad y sistemas naturales para protegerlos.' },
  { ids: ['custodio', 'narrador'], nombre: 'El Comunicador de Territorio', descripcion: 'Documenta, cuenta y defiende el valor de lo natural y lo cultural.' },
  { ids: ['narrador', 'catalizador'], nombre: 'El Periodista Social', descripcion: 'Usa la comunicación como herramienta de transformación comunitaria.' },
  { ids: ['arbitro', 'orquestador'], nombre: 'El Gestor de Poder', descripcion: 'Combina la comprensión del sistema jurídico con la capacidad de liderar en él.' },
  { ids: ['anfitrion', 'catalizador'], nombre: 'El Animador de Comunidades', descripcion: 'Crea experiencias que construyen comunidad y transforman la vida cotidiana.' },
  { ids: ['constructor', 'custodio'], nombre: 'El Ingeniero Ambiental', descripcion: 'Construye infraestructura que respeta y convive con los sistemas naturales.' },
];

export function getArquetipo(id: string): Arquetipo | undefined {
  return ARQUETIPOS.find(a => a.id === id);
}

export function getCombinacion(id1: string, id2: string): Combinacion | undefined {
  return COMBINACIONES.find(
    c => (c.ids[0] === id1 && c.ids[1] === id2) || (c.ids[0] === id2 && c.ids[1] === id1)
  );
}
