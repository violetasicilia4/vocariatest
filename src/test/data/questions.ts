export type QuestionType = 'situacional' | 'scale' | 'visual' | 'pairs' | 'multiselect';

export interface ArquetipoScores {
  [arquetipoId: string]: number;
}

export interface Opcion {
  id: string;
  texto: string;
  emoji?: string;
  scores?: ArquetipoScores;
}

export interface Question {
  id: string;
  tipo: QuestionType;
  enunciado: string;
  subtext?: string;
  opciones: Opcion[];
  maxSelect?: number;
}

export const QUESTIONS: Question[] = [

  // ── VISUAL 1 ─────────────────────────────────────────────────────────────────
  {
    id: 'vis_1',
    tipo: 'visual',
    enunciado: '¿En cuál de estos entornos te imaginás trabajando?',
    opciones: [
      { id: 'a', emoji: '🔬', texto: 'Laboratorio o investigación', scores: { descubridor: 10, arquitecto: 5 } },
      { id: 'b', emoji: '🏥', texto: 'Clínica, hospital o consultorio', scores: { sanador: 10, anfitrion: 5 } },
      { id: 'c', emoji: '🎨', texto: 'Estudio creativo o agencia', scores: { artifice: 10, narrador: 5 } },
      { id: 'd', emoji: '📊', texto: 'Oficina de análisis o finanzas', scores: { interprete: 10, orquestador: 5 } },
      { id: 'e', emoji: '🏗️', texto: 'Obra, fábrica o instalaciones', scores: { constructor: 10, custodio: 5 } },
      { id: 'f', emoji: '🎓', texto: 'Aula, universidad o formación', scores: { catalizador: 10, narrador: 5 } },
    ],
  },

  // ── SITUACIONAL 1 ─────────────────────────────────────────────────────────────
  {
    id: 'sit_1',
    tipo: 'situacional',
    enunciado: 'Entrás a trabajar a un lugar nuevo. ¿Qué es lo primero que hacés?',
    opciones: [
      { id: 'a', texto: 'Pido que me expliquen cómo funciona el sistema completo.', scores: { arquitecto: 10, descubridor: 5 } },
      { id: 'b', texto: 'Busco conectar con el equipo y entender a cada persona.', scores: { catalizador: 10, anfitrion: 5 } },
      { id: 'c', texto: 'Identifico rápido qué procesos se pueden optimizar.', scores: { orquestador: 10, interprete: 5 } },
      { id: 'd', texto: 'Observo sin meter mano hasta entender bien la dinámica.', scores: { arbitro: 10, custodio: 5 } },
    ],
  },

  // ── PAIRS 1 ──────────────────────────────────────────────────────────────────
  {
    id: 'par_1',
    tipo: 'pairs',
    enunciado: 'Si tuvieras que elegir entre estos dos caminos:',
    opciones: [
      { id: 'a', emoji: '⚙️', texto: 'Diseñar sistemas que funcionen solos y escalen', scores: { arquitecto: 10, interprete: 5 } },
      { id: 'b', emoji: '🫂', texto: 'Acompañar a personas en procesos de cambio real', scores: { sanador: 10, catalizador: 5 } },
    ],
  },

  // ── SITUACIONAL 2 ─────────────────────────────────────────────────────────────
  {
    id: 'sit_2',
    tipo: 'situacional',
    enunciado: 'Te asignan un proyecto sin ninguna guía ni estructura. ¿Cómo reaccionás?',
    opciones: [
      { id: 'a', texto: 'Me emociona. Es la oportunidad de diseñar algo desde cero.', scores: { descubridor: 10, arquitecto: 5 } },
      { id: 'b', texto: 'Armo un plan detallado antes de tocar nada.', scores: { arquitecto: 10, orquestador: 5 } },
      { id: 'c', texto: 'Lo convierto en algo creativo e inesperado.', scores: { artifice: 10, narrador: 5 } },
      { id: 'd', texto: 'Preferiría tener al menos una referencia para partir.', scores: { custodio: 10, arbitro: 5 } },
    ],
  },

  // ── SCALE 1 ──────────────────────────────────────────────────────────────────
  {
    id: 'sca_1',
    tipo: 'scale',
    enunciado: '¿Qué tan cómodo/a te sentís tomando decisiones cuando la situación es ambigua?',
    opciones: [
      { id: '1', texto: 'Prefiero tener todos los datos antes de decidir', scores: { custodio: 3, arbitro: 3 } },
      { id: '2', texto: '', scores: { custodio: 1 } },
      { id: '3', texto: '', scores: { orquestador: 1 } },
      { id: '4', texto: '', scores: { arquitecto: 2, orquestador: 2 } },
      { id: '5', texto: 'Es donde mejor me desempeño', scores: { arquitecto: 3, descubridor: 3 } },
    ],
  },

  // ── MULTISELECT 1 ────────────────────────────────────────────────────────────
  {
    id: 'mul_1',
    tipo: 'multiselect',
    enunciado: '¿Qué tres cosas son más importantes para vos en un trabajo?',
    subtext: 'Elegí exactamente 3',
    maxSelect: 3,
    opciones: [
      { id: 'a', texto: 'Creatividad e innovación constante', scores: { artifice: 5, descubridor: 5, narrador: 4 } },
      { id: 'b', texto: 'Estabilidad y seguridad económica', scores: { custodio: 5, arbitro: 5 } },
      { id: 'c', texto: 'Impacto social real y visible', scores: { catalizador: 5, sanador: 5, custodio: 4 } },
      { id: 'd', texto: 'Autonomía para decidir cómo trabajo', scores: { descubridor: 5, arquitecto: 5 } },
      { id: 'e', texto: 'Buen equipo y ambiente humano', scores: { anfitrion: 5, catalizador: 5 } },
      { id: 'f', texto: 'Ingresos altos y reconocimiento', scores: { interprete: 5, orquestador: 5 } },
      { id: 'g', texto: 'Aprendizaje y desafío intelectual', scores: { descubridor: 5, arquitecto: 4 } },
      { id: 'h', texto: 'Liderazgo y posibilidad de crecer', scores: { orquestador: 5, narrador: 4 } },
    ],
  },

  // ── SITUACIONAL 3 ─────────────────────────────────────────────────────────────
  {
    id: 'sit_3',
    tipo: 'situacional',
    enunciado: 'Hay un conflicto serio entre dos personas de tu equipo. ¿Cómo actuás?',
    opciones: [
      { id: 'a', texto: 'Escucho a cada uno por separado y busco el punto en común.', scores: { catalizador: 10, sanador: 5 } },
      { id: 'b', texto: 'Analizo la situación objetivamente y propongo una solución lógica.', scores: { arbitro: 10, interprete: 5 } },
      { id: 'c', texto: 'Creo un espacio seguro para que se expresen y lleguen a un acuerdo.', scores: { anfitrion: 10, catalizador: 5 } },
      { id: 'd', texto: 'Establezco límites claros y pido que se respeten las normas del equipo.', scores: { orquestador: 10, arquitecto: 5 } },
    ],
  },

  // ── VISUAL 2 ─────────────────────────────────────────────────────────────────
  {
    id: 'vis_2',
    tipo: 'visual',
    enunciado: '¿Cuál de estas situaciones te daría más satisfacción al final del día?',
    opciones: [
      { id: 'a', emoji: '🧩', texto: 'Haber resuelto un problema técnico complejo', scores: { arquitecto: 10, descubridor: 5 } },
      { id: 'b', emoji: '❤️', texto: 'Haber ayudado genuinamente a alguien', scores: { sanador: 10, catalizador: 5 } },
      { id: 'c', emoji: '🎤', texto: 'Haber comunicado algo que impactó a una audiencia', scores: { narrador: 10, anfitrion: 5 } },
      { id: 'd', emoji: '📜', texto: 'Haber defendido algo justo y ganado', scores: { arbitro: 10, catalizador: 5 } },
      { id: 'e', emoji: '🌱', texto: 'Haber contribuido a algo más grande que yo', scores: { custodio: 10, sanador: 5 } },
      { id: 'f', emoji: '🛠️', texto: 'Haber construido algo concreto y tangible', scores: { constructor: 10, artifice: 5 } },
    ],
  },

  // ── SCALE 2 ──────────────────────────────────────────────────────────────────
  {
    id: 'sca_2',
    tipo: 'scale',
    enunciado: '¿Cuánto disfrutás trabajar directamente con personas (clientes, pacientes, alumnos)?',
    opciones: [
      { id: '1', texto: 'Prefiero mucho el trabajo independiente', scores: { arquitecto: 2, descubridor: 2 } },
      { id: '2', texto: '', scores: { interprete: 2 } },
      { id: '3', texto: '', scores: {} },
      { id: '4', texto: '', scores: { catalizador: 2, anfitrion: 2 } },
      { id: '5', texto: 'Es lo que le da sentido a todo lo que hago', scores: { sanador: 3, catalizador: 3, anfitrion: 3 } },
    ],
  },

  // ── SITUACIONAL 4 ─────────────────────────────────────────────────────────────
  {
    id: 'sit_4',
    tipo: 'situacional',
    enunciado: 'Descubrís una ineficiencia enorme en un proceso de tu trabajo. ¿Qué hacés?',
    opciones: [
      { id: 'a', texto: 'Diseño una solución sistemática para eliminarlo de raíz.', scores: { arquitecto: 10, constructor: 5 } },
      { id: 'b', texto: 'Lo documento y lo escalo a quien pueda cambiarlo formalmente.', scores: { arbitro: 10, orquestador: 5 } },
      { id: 'c', texto: 'Construyo un prototipo rápido para probarlo yo mismo/a.', scores: { constructor: 10, descubridor: 5 } },
      { id: 'd', texto: 'Hablo con el equipo antes de tocar nada para entender el contexto.', scores: { catalizador: 10, custodio: 5 } },
    ],
  },

  // ── PAIRS 2 ──────────────────────────────────────────────────────────────────
  {
    id: 'par_2',
    tipo: 'pairs',
    enunciado: '¿Con cuál de estos roles te identificás más naturalmente?',
    opciones: [
      { id: 'a', emoji: '📊', texto: 'El que encuentra el error que nadie más vio en los datos', scores: { interprete: 10, arbitro: 5 } },
      { id: 'b', emoji: '🎭', texto: 'El que crea algo que hace que la gente sienta algo', scores: { artifice: 10, narrador: 5 } },
    ],
  },

  // ── SCALE 3 ──────────────────────────────────────────────────────────────────
  {
    id: 'sca_3',
    tipo: 'scale',
    enunciado: '¿Qué tan importante es para vos que tu trabajo tenga un impacto social visible?',
    opciones: [
      { id: '1', texto: 'No es mi prioridad principal', scores: { arquitecto: 2, interprete: 2 } },
      { id: '2', texto: '', scores: { constructor: 2 } },
      { id: '3', texto: '', scores: {} },
      { id: '4', texto: '', scores: { catalizador: 2, custodio: 2 } },
      { id: '5', texto: 'Es lo que me mueve a trabajar', scores: { sanador: 3, catalizador: 3, custodio: 3 } },
    ],
  },

  // ── SITUACIONAL 5 ─────────────────────────────────────────────────────────────
  {
    id: 'sit_5',
    tipo: 'situacional',
    enunciado: 'Tenés que presentar algo ante un grupo grande. ¿Qué pensás antes de hacerlo?',
    opciones: [
      { id: 'a', texto: 'Me preparo con datos y estructura sólida. La forma importa menos que el argumento.', scores: { interprete: 10, arquitecto: 5 } },
      { id: 'b', texto: 'Me foco en conectar emocionalmente con la audiencia.', scores: { narrador: 10, catalizador: 5 } },
      { id: 'c', texto: 'Me pone nervioso/a pero lo acepto como desafío y aprendo de eso.', scores: { constructor: 10, custodio: 5 } },
      { id: 'd', texto: 'Es algo que realmente disfruto y en lo que me destaco.', scores: { anfitrion: 10, narrador: 5 } },
    ],
  },

  // ── SITUACIONAL 6 ─────────────────────────────────────────────────────────────
  {
    id: 'sit_6',
    tipo: 'situacional',
    enunciado: 'Si pudieras elegir, ¿en qué proyecto trabajarías los próximos 3 años?',
    opciones: [
      { id: 'a', texto: 'Investigar algo que todavía nadie entiende bien y documentarlo.', scores: { descubridor: 10, narrador: 5 } },
      { id: 'b', texto: 'Construir una empresa o emprendimiento desde cero.', scores: { orquestador: 10, catalizador: 5 } },
      { id: 'c', texto: 'Desarrollar una tecnología o sistema que resuelva un problema real.', scores: { arquitecto: 10, constructor: 5 } },
      { id: 'd', texto: 'Trabajar en algo que mejore la calidad de vida de comunidades.', scores: { sanador: 10, custodio: 5 } },
    ],
  },

  // ── MULTISELECT 2 ────────────────────────────────────────────────────────────
  {
    id: 'mul_2',
    tipo: 'multiselect',
    enunciado: '¿Cuáles de estas actividades disfrutarías hacer todos los días?',
    subtext: 'Elegí exactamente 3',
    maxSelect: 3,
    opciones: [
      { id: 'a', texto: 'Resolver problemas técnicos o lógicos complejos', scores: { arquitecto: 5, constructor: 4 } },
      { id: 'b', texto: 'Cuidar o acompañar a otras personas', scores: { sanador: 5, anfitrion: 4 } },
      { id: 'c', texto: 'Escribir, diseñar o crear contenido', scores: { narrador: 5, artifice: 5 } },
      { id: 'd', texto: 'Analizar datos y encontrar patrones ocultos', scores: { interprete: 5, descubridor: 4 } },
      { id: 'e', texto: 'Organizar equipos y coordinar proyectos', scores: { orquestador: 5, catalizador: 4 } },
      { id: 'f', texto: 'Trabajar al aire libre o con elementos físicos', scores: { custodio: 5, constructor: 4 } },
      { id: 'g', texto: 'Negociar, argumentar o defender posiciones', scores: { arbitro: 5, narrador: 4 } },
      { id: 'h', texto: 'Enseñar, mentorear o guiar a otros', scores: { catalizador: 5, narrador: 4 } },
    ],
  },

  // ── SCALE 4 ──────────────────────────────────────────────────────────────────
  {
    id: 'sca_4',
    tipo: 'scale',
    enunciado: '¿Cuánto te atrae la idea de crear cosas tangibles con tus manos o herramientas?',
    opciones: [
      { id: '1', texto: 'No es algo que me llame la atención', scores: { narrador: 2, interprete: 2 } },
      { id: '2', texto: '', scores: { arquitecto: 2 } },
      { id: '3', texto: '', scores: {} },
      { id: '4', texto: '', scores: { constructor: 2, artifice: 2 } },
      { id: '5', texto: 'Me encanta y es donde me siento más realizado/a', scores: { constructor: 3, artifice: 3 } },
    ],
  },

  // ── SITUACIONAL 7 ─────────────────────────────────────────────────────────────
  {
    id: 'sit_7',
    tipo: 'situacional',
    enunciado: 'Ves un problema social grave que te impacta. ¿Cuál es tu primer impulso?',
    opciones: [
      { id: 'a', texto: 'Investigar sus causas raíz para entenderlo profundamente.', scores: { descubridor: 10, arbitro: 5 } },
      { id: 'b', texto: 'Armar algo concreto para atacarlo: campaña, app, propuesta.', scores: { catalizador: 10, narrador: 5 } },
      { id: 'c', texto: 'Involucrarme directamente con las personas afectadas.', scores: { sanador: 10, anfitrion: 5 } },
      { id: 'd', texto: 'Proponer cambios en las reglas o sistemas que lo generan.', scores: { arbitro: 10, arquitecto: 5 } },
    ],
  },

  // ── PAIRS 3 ──────────────────────────────────────────────────────────────────
  {
    id: 'par_3',
    tipo: 'pairs',
    enunciado: 'A la hora de resolver un problema difícil, preferís:',
    opciones: [
      { id: 'a', emoji: '🔍', texto: 'Investigar a fondo hasta entender exactamente qué pasa', scores: { descubridor: 10, arquitecto: 5 } },
      { id: 'b', emoji: '💬', texto: 'Hablar con todos los involucrados y entender su perspectiva', scores: { catalizador: 10, anfitrion: 5 } },
    ],
  },

  // ── SITUACIONAL 8 ─────────────────────────────────────────────────────────────
  {
    id: 'sit_8',
    tipo: 'situacional',
    enunciado: 'Tenés que elegir entre dos ofertas de trabajo. ¿Qué pesa más en tu decisión?',
    opciones: [
      { id: 'a', texto: 'Los desafíos técnicos y la complejidad de los problemas a resolver.', scores: { arquitecto: 10, descubridor: 5 } },
      { id: 'b', texto: 'La cultura del equipo y la misión de la empresa.', scores: { catalizador: 10, sanador: 5 } },
      { id: 'c', texto: 'La estabilidad, el sueldo y un rol bien definido.', scores: { custodio: 10, arbitro: 5 } },
      { id: 'd', texto: 'La libertad creativa y la posibilidad de innovar.', scores: { artifice: 10, narrador: 5 } },
    ],
  },

  // ── SITUACIONAL 9 ─────────────────────────────────────────────────────────────
  {
    id: 'sit_9',
    tipo: 'situacional',
    enunciado: 'Tu jefe te pide que definas cómo preferís trabajar. ¿Qué respondés?',
    opciones: [
      { id: 'a', texto: 'Solo y con total autonomía. Me comprometés con resultados y me dejás trabajar.', scores: { arquitecto: 10, descubridor: 5 } },
      { id: 'b', texto: 'Liderando un equipo diverso con roles claros y complementarios.', scores: { orquestador: 10, catalizador: 5 } },
      { id: 'c', texto: 'En colaboración creativa, iterando rápido con otros.', scores: { artifice: 10, interprete: 5 } },
      { id: 'd', texto: 'Coordinando con especialistas externos y gestionando relaciones clave.', scores: { anfitrion: 10, narrador: 5 } },
    ],
  },

  // ── SITUACIONAL 10 ────────────────────────────────────────────────────────────
  {
    id: 'sit_10',
    tipo: 'situacional',
    enunciado: '¿Con cuál de estas formas de ser te identificás más?',
    opciones: [
      { id: 'a', texto: 'El arquitecto: construye reglas y sistemas que funcionan solos.', scores: { arquitecto: 10, arbitro: 5 } },
      { id: 'b', texto: 'El explorador: lo desconocido le genera más curiosidad que miedo.', scores: { descubridor: 10, custodio: 5 } },
      { id: 'c', texto: 'El puente: conecta personas, ideas y mundos que no se veían.', scores: { catalizador: 10, narrador: 5 } },
      { id: 'd', texto: 'El artesano: lo que hace lleva su firma, cada detalle es una decisión.', scores: { artifice: 10, constructor: 5 } },
    ],
  },
];
