export type Bloque = 'contexto' | 'situacional';
export type QuestionType = 'situacional' | 'context';

export interface ArquetipoScores {
  [arquetipoId: string]: number;
}

export interface Opcion {
  id: string;
  texto: string;
  scores?: ArquetipoScores;
}

export interface Question {
  id: string;
  bloque: Bloque;
  tipo: QuestionType;
  enunciado: string;
  subtext?: string;
  opciones: Opcion[];
}

export const QUESTIONS: Question[] = [

  // ── CONTEXTO ─────────────────────────────────────────────────────────────────

  {
    id: 'ctx_1',
    bloque: 'contexto',
    tipo: 'context',
    enunciado: '¿En qué provincia vivís actualmente?',
    subtext: 'Usamos esto para recomendarte universidades accesibles desde tu ubicación.',
    opciones: [
      { id: 'CABA',   texto: 'Ciudad de Buenos Aires' },
      { id: 'GBA',    texto: 'Gran Buenos Aires (Conurbano)' },
      { id: 'BAPROV', texto: 'Buenos Aires (interior de provincia)' },
      { id: 'COR',    texto: 'Córdoba' },
      { id: 'SF',     texto: 'Santa Fe' },
      { id: 'MZA',    texto: 'Mendoza' },
      { id: 'TUC',    texto: 'Tucumán' },
      { id: 'OTRA',   texto: 'Otra provincia' },
    ],
  },

  {
    id: 'ctx_2',
    bloque: 'contexto',
    tipo: 'context',
    enunciado: '¿Podrías mudarte o viajar para estudiar si encontraras la carrera ideal?',
    subtext: 'Sin compromiso — es solo para calibrar las recomendaciones.',
    opciones: [
      { id: 'si_total', texto: 'Sí, sin problema. Podría mudarme o viajar.' },
      { id: 'si_beca',  texto: 'Si consigo beca o apoyo económico, sí.' },
      { id: 'virtual',  texto: 'Prefiero opciones virtuales o semipresenciales.' },
      { id: 'no',       texto: 'No, necesito estudiar cerca de donde vivo.' },
    ],
  },

  {
    id: 'ctx_3',
    bloque: 'contexto',
    tipo: 'context',
    enunciado: '¿Cuánto tiempo estás dispuesto/a a invertir en estudiar una carrera?',
    opciones: [
      { id: 'corta',  texto: 'Corta (1–3 años): quiero salida rápida al mercado.' },
      { id: 'media',  texto: 'Media (3–5 años): estoy dispuesto/a a una carrera de grado.' },
      { id: 'larga',  texto: 'Larga (+5 años): no me importa si es lo que quiero.' },
      { id: 'nose',   texto: 'No lo sé todavía.' },
    ],
  },

  // ── SITUACIONALES ─────────────────────────────────────────────────────────────

  {
    id: 'sit_1',
    bloque: 'situacional',
    tipo: 'situacional',
    enunciado: 'Tenés un fin de semana libre y ganas de hacer algo productivo. ¿Qué arrancás?',
    opciones: [
      { id: 'a', texto: 'Aprender a programar algo, automatizar una tarea o armar un sistema propio.',
        scores: { arquitecto: 10, interprete: 5 } },
      { id: 'b', texto: 'Construir, reparar o mejorar algo físico en casa.',
        scores: { constructor: 10, custodio: 5 } },
      { id: 'c', texto: 'Escribir, dibujar, componer o producir algo creativo.',
        scores: { artifice: 10, narrador: 5 } },
      { id: 'd', texto: 'Organizar una actividad, salida o experiencia para otras personas.',
        scores: { anfitrion: 10, catalizador: 5 } },
    ],
  },

  {
    id: 'sit_2',
    bloque: 'situacional',
    tipo: 'situacional',
    enunciado: 'Un problema que no podés sacarte de la cabeza, aunque no sea tu responsabilidad resolverlo:',
    opciones: [
      { id: 'a', texto: 'Un proceso que claramente podría automatizarse o mejorarse con tecnología.',
        scores: { arquitecto: 10, constructor: 5 } },
      { id: 'b', texto: 'Alguien que está siendo tratado injustamente y nadie lo ve.',
        scores: { arbitro: 10, sanador: 5 } },
      { id: 'c', texto: 'Un ecosistema, especie o recurso natural que se está degradando.',
        scores: { custodio: 10, descubridor: 5 } },
      { id: 'd', texto: 'Una idea creativa o narrativa que nadie está explorando todavía.',
        scores: { artifice: 10, narrador: 5 } },
    ],
  },

  {
    id: 'sit_3',
    bloque: 'situacional',
    tipo: 'situacional',
    enunciado: 'Tu jornada de trabajo ideal se parece más a:',
    opciones: [
      { id: 'a', texto: 'Foco profundo: construir, programar o analizar sin interrupciones.',
        scores: { arquitecto: 10, interprete: 5 } },
      { id: 'b', texto: 'Acompañar personas: escuchar, orientar, trabajar con quienes lo necesitan.',
        scores: { sanador: 10, catalizador: 5 } },
      { id: 'c', texto: 'Trabajo de campo: movimiento, contacto con el entorno real y las personas.',
        scores: { constructor: 10, custodio: 5 } },
      { id: 'd', texto: 'Crear y diseñar: producir algo propio con libertad de forma y contenido.',
        scores: { artifice: 10, narrador: 5 } },
    ],
  },

  {
    id: 'sit_4',
    bloque: 'situacional',
    tipo: 'situacional',
    enunciado: '¿Cuándo sentiste más orgullo o satisfacción por algo que lograste?',
    opciones: [
      { id: 'a', texto: 'Cuando resolví algo técnico complejo que nadie más había podido.',
        scores: { arquitecto: 10, descubridor: 5 } },
      { id: 'b', texto: 'Cuando alguien mejoró, creció o superó algo gracias a mí.',
        scores: { sanador: 10, catalizador: 5 } },
      { id: 'c', texto: 'Cuando algo que organicé salió perfecto y todos lo valoraron.',
        scores: { orquestador: 10, anfitrion: 5 } },
      { id: 'd', texto: 'Cuando algo que hice o creé fue reconocido o generó impacto propio.',
        scores: { artifice: 10, narrador: 5 } },
    ],
  },

  {
    id: 'sit_5',
    bloque: 'situacional',
    tipo: 'situacional',
    enunciado: 'Cuando necesitás aprender algo nuevo, ¿cómo preferís hacerlo?',
    opciones: [
      { id: 'a', texto: 'Experimentando: rompiendo cosas, probando y llegando solo/a a la solución.',
        scores: { arquitecto: 10, descubridor: 5 } },
      { id: 'b', texto: 'Leyendo e investigando en profundidad antes de tocar nada.',
        scores: { descubridor: 10, interprete: 5 } },
      { id: 'c', texto: 'Viendo cómo lo hace alguien con experiencia y replicándolo.',
        scores: { constructor: 10, catalizador: 5 } },
      { id: 'd', texto: 'Aprendiéndolo en contexto real, con alguien que me guíe mientras hago.',
        scores: { anfitrion: 10, sanador: 5 } },
    ],
  },

  {
    id: 'sit_6',
    bloque: 'situacional',
    tipo: 'situacional',
    enunciado: '¿En qué entorno trabajarías mejor?',
    opciones: [
      { id: 'a', texto: 'Silencioso, autónomo, con foco largo y pocas interrupciones.',
        scores: { arquitecto: 10, descubridor: 5 } },
      { id: 'b', texto: 'Dinámico, con personas distintas, donde cada día es diferente.',
        scores: { anfitrion: 10, narrador: 5 } },
      { id: 'c', texto: 'Colaborativo pero con espacio para trabajar en profundidad cuando lo necesito.',
        scores: { catalizador: 10, artifice: 5 } },
      { id: 'd', texto: 'Estructurado, con roles claros y procesos bien definidos.',
        scores: { arbitro: 10, interprete: 5 } },
    ],
  },

  {
    id: 'sit_7',
    bloque: 'situacional',
    tipo: 'situacional',
    enunciado: '¿Qué tipo de impacto te gustaría tener en el mundo?',
    opciones: [
      { id: 'a', texto: 'Crear herramientas o sistemas que usen o necesiten miles de personas.',
        scores: { arquitecto: 10, orquestador: 5 } },
      { id: 'b', texto: 'Mejorar directamente la vida de personas en su momento más vulnerable.',
        scores: { sanador: 10, catalizador: 5 } },
      { id: 'c', texto: 'Proteger algo valioso que se puede perder: la naturaleza, la justicia, la cultura.',
        scores: { custodio: 10, arbitro: 5 } },
      { id: 'd', texto: 'Generar conocimiento nuevo que cambie cómo entendemos algo.',
        scores: { descubridor: 10, narrador: 5 } },
    ],
  },

  {
    id: 'sit_8',
    bloque: 'situacional',
    tipo: 'situacional',
    enunciado: 'Cuando ves algo que está mal, ¿qué hacés?',
    opciones: [
      { id: 'a', texto: 'Analizo la causa raíz y propongo una solución sistemática.',
        scores: { arquitecto: 10, interprete: 5 } },
      { id: 'b', texto: 'Lo enfrento directamente: busco que se haga lo correcto.',
        scores: { arbitro: 10, orquestador: 5 } },
      { id: 'c', texto: 'Busco a las personas involucradas y trato de mediar o acompañar.',
        scores: { sanador: 10, catalizador: 5 } },
      { id: 'd', texto: 'Lo documentás, lo escribís, lo hacés visible para que otros lo vean.',
        scores: { narrador: 10, orquestador: 5 } },
    ],
  },

  {
    id: 'sit_9',
    bloque: 'situacional',
    tipo: 'situacional',
    enunciado: '¿Qué relación tenés con los números y los datos?',
    opciones: [
      { id: 'a', texto: 'Los amo. Son mi forma natural de entender cómo funciona el mundo.',
        scores: { interprete: 10, arquitecto: 5 } },
      { id: 'b', texto: 'Los uso como herramienta cuando son necesarios, sin amor ni rechazo.',
        scores: { constructor: 10, orquestador: 5 } },
      { id: 'c', texto: 'Prefiero trabajar con personas, ideas o formas visuales.',
        scores: { sanador: 10, artifice: 5 } },
      { id: 'd', texto: 'Me interesa más el contexto, la historia y el significado detrás del número.',
        scores: { narrador: 10, descubridor: 5 } },
    ],
  },

  {
    id: 'sit_10',
    bloque: 'situacional',
    tipo: 'situacional',
    enunciado: '¿Cuánto tiempo podés pasar en un mismo espacio cerrado trabajando?',
    opciones: [
      { id: 'a', texto: 'Mucho tiempo: es donde más me concentro y más rindo.',
        scores: { arquitecto: 10, interprete: 5 } },
      { id: 'b', texto: 'Necesito alternar: el campo, el aire libre o el movimiento me recarga.',
        scores: { custodio: 10, constructor: 5 } },
      { id: 'c', texto: 'No me importa el lugar mientras el proyecto cambie y me desafíe.',
        scores: { orquestador: 10, narrador: 5 } },
      { id: 'd', texto: 'Prefiero estar en movimiento, en contacto con personas en contextos distintos.',
        scores: { anfitrion: 10, sanador: 5 } },
    ],
  },

  {
    id: 'sit_11',
    bloque: 'situacional',
    tipo: 'situacional',
    enunciado: 'Si tuvieras que crear algo que dure 20 años, ¿qué sería?',
    opciones: [
      { id: 'a', texto: 'Un sistema, software o plataforma digital que resuelva un problema real.',
        scores: { arquitecto: 10, orquestador: 5 } },
      { id: 'b', texto: 'Una obra física: infraestructura, edificio o producto tangible.',
        scores: { constructor: 10, custodio: 5 } },
      { id: 'c', texto: 'Un libro, serie, obra de arte o producción cultural que perdure.',
        scores: { narrador: 10, artifice: 5 } },
      { id: 'd', texto: 'Una organización, movimiento o institución que cambie algo en la sociedad.',
        scores: { orquestador: 10, arbitro: 5 } },
    ],
  },

  {
    id: 'sit_12',
    bloque: 'situacional',
    tipo: 'situacional',
    enunciado: '¿Cómo describirías tu relación con las personas en el trabajo?',
    opciones: [
      { id: 'a', texto: 'Prefiero trabajar solo/a o en equipos pequeños y muy autónomos.',
        scores: { arquitecto: 10, descubridor: 5 } },
      { id: 'b', texto: 'Las personas son el núcleo de mi trabajo: sin eso no tiene sentido.',
        scores: { sanador: 10, catalizador: 5 } },
      { id: 'c', texto: 'Me gusta liderar y orientar a otros hacia un objetivo concreto.',
        scores: { orquestador: 10, catalizador: 5 } },
      { id: 'd', texto: 'Disfruto el intercambio creativo pero no necesito que sea el eje.',
        scores: { artifice: 10, narrador: 5 } },
    ],
  },

  {
    id: 'sit_13',
    bloque: 'situacional',
    tipo: 'situacional',
    enunciado: '¿Qué tipo de problema te genera más ganas de resolver?',
    opciones: [
      { id: 'a', texto: 'Algo técnico y complejo que requiere lógica, experimentación y creatividad.',
        scores: { descubridor: 10, arquitecto: 5 } },
      { id: 'b', texto: 'Un conflicto humano que necesita escucha activa, empatía y presencia.',
        scores: { sanador: 10, catalizador: 5 } },
      { id: 'c', texto: 'Un sistema injusto o ineficiente que tiene que cambiar desde adentro.',
        scores: { arbitro: 10, orquestador: 5 } },
      { id: 'd', texto: 'Un vacío cultural, educativo o narrativo que nadie está llenando.',
        scores: { narrador: 10, catalizador: 5 } },
    ],
  },

  {
    id: 'sit_14',
    bloque: 'situacional',
    tipo: 'situacional',
    enunciado: '¿Cuál de estas frases te resuena más a la hora de tomar decisiones?',
    opciones: [
      { id: 'a', texto: '"Si lo pude medir, lo pude entender."',
        scores: { interprete: 10, arquitecto: 5 } },
      { id: 'b', texto: '"Lo que funciona en la práctica importa más que la teoría."',
        scores: { constructor: 10, anfitrion: 5 } },
      { id: 'c', texto: '"El contexto lo cambia todo. No hay reglas absolutas."',
        scores: { narrador: 10, descubridor: 5 } },
      { id: 'd', texto: '"Las normas existen por algo y son necesarias para que todo funcione."',
        scores: { arbitro: 10, interprete: 5 } },
    ],
  },

  {
    id: 'sit_15',
    bloque: 'situacional',
    tipo: 'situacional',
    enunciado: 'En 10 años, ¿qué querés que digan de vos en tu trabajo?',
    opciones: [
      { id: 'a', texto: '"Resolvía lo que nadie más podía resolver."',
        scores: { arquitecto: 10, descubridor: 5 } },
      { id: 'b', texto: '"Siempre estuvo para ayudar. Fue clave en el desarrollo de muchos."',
        scores: { sanador: 10, catalizador: 5 } },
      { id: 'c', texto: '"Tenía una visión y la ejecutaba. Movía equipos y generaba resultados."',
        scores: { orquestador: 10, constructor: 5 } },
      { id: 'd', texto: '"Lo que creó sigue vivo. Tiene valor propio."',
        scores: { artifice: 10, narrador: 5 } },
    ],
  },

  {
    id: 'sit_16',
    bloque: 'situacional',
    tipo: 'situacional',
    enunciado: '¿Qué pregunta te parece más interesante y urgente?',
    opciones: [
      { id: 'a', texto: '¿Cómo podemos usar la tecnología para resolver mejor esto?',
        scores: { arquitecto: 10, descubridor: 5 } },
      { id: 'b', texto: '¿Por qué algunas personas tienen acceso a esto y otras no?',
        scores: { catalizador: 10, arbitro: 5 } },
      { id: 'c', texto: '¿Cómo protegemos lo que todavía no perdimos?',
        scores: { custodio: 10, narrador: 5 } },
      { id: 'd', texto: '¿Qué está cambiando en la economía y cómo aprovecharlo bien?',
        scores: { interprete: 10, orquestador: 5 } },
    ],
  },

  {
    id: 'sit_17',
    bloque: 'situacional',
    tipo: 'situacional',
    enunciado: '¿Qué actividad, si pudiera ocupar el 80% de tu semana, te haría sentir que vivís bien?',
    opciones: [
      { id: 'a', texto: 'Programar, construir sistemas o analizar datos en profundidad.',
        scores: { arquitecto: 10, interprete: 5 } },
      { id: 'b', texto: 'Acompañar, escuchar, enseñar o ayudar a personas.',
        scores: { sanador: 10, catalizador: 5 } },
      { id: 'c', texto: 'Investigar, experimentar, leer y generar conocimiento nuevo.',
        scores: { descubridor: 10, interprete: 5 } },
      { id: 'd', texto: 'Crear, producir o expresar algo que comunica una idea con fuerza.',
        scores: { artifice: 10, narrador: 5 } },
    ],
  },

  {
    id: 'sit_18',
    bloque: 'situacional',
    tipo: 'situacional',
    enunciado: '¿Cómo te imaginás trabajando a los 30–35 años?',
    opciones: [
      { id: 'a', texto: 'Frente a pantallas, en proyectos complejos, con autonomía total.',
        scores: { arquitecto: 10, narrador: 5 } },
      { id: 'b', texto: 'En contacto directo con personas o entornos reales, en movimiento.',
        scores: { sanador: 10, anfitrion: 5 } },
      { id: 'c', texto: 'Liderando equipos hacia algo que yo ayudé a diseñar o construir.',
        scores: { orquestador: 10, constructor: 5 } },
      { id: 'd', texto: 'Con autonomía y tiempo para investigar, crear o explorar nuevos territorios.',
        scores: { descubridor: 10, artifice: 5 } },
    ],
  },

  {
    id: 'sit_19',
    bloque: 'situacional',
    tipo: 'situacional',
    enunciado: 'Te ofrecen dos trabajos: uno muy estable, otro incierto pero apasionante. ¿Qué hacés?',
    opciones: [
      { id: 'a', texto: 'Me quedo con el incierto sin dudarlo. La pasión primero.',
        scores: { artifice: 10, descubridor: 5 } },
      { id: 'b', texto: 'Elijo el estable: la seguridad me libera para hacer lo que quiero fuera del trabajo.',
        scores: { interprete: 10, arbitro: 5 } },
      { id: 'c', texto: 'Negocio algo del apasionante para que tenga más estabilidad.',
        scores: { orquestador: 10, arquitecto: 5 } },
      { id: 'd', texto: 'Evalúo cuál tiene más impacto real, independientemente de lo que me genere.',
        scores: { catalizador: 10, custodio: 5 } },
    ],
  },

  {
    id: 'sit_20',
    bloque: 'situacional',
    tipo: 'situacional',
    enunciado: '¿Con cuál de estas imágenes te identificás más como forma de ser?',
    opciones: [
      { id: 'a', texto: 'Un arquitecto de sistemas: construye reglas que funcionan solas.',
        scores: { arquitecto: 10, arbitro: 5 } },
      { id: 'b', texto: 'Un explorador: lo desconocido le genera más curiosidad que miedo.',
        scores: { descubridor: 10, custodio: 5 } },
      { id: 'c', texto: 'Un puente: conecta personas, ideas y mundos que no se veían.',
        scores: { catalizador: 10, narrador: 5 } },
      { id: 'd', texto: 'Un artesano: lo que hace lleva su firma, cada detalle es una decisión.',
        scores: { artifice: 10, constructor: 5 } },
    ],
  },
];
