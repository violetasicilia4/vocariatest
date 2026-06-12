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

  // Q1 — Estilo cognitivo ante lo nuevo
  {
    id: 'sit_1',
    tipo: 'situacional',
    enunciado: 'Pensá en una vez que tuviste que aprender algo nuevo. ¿Qué hiciste naturalmente?',
    opciones: [
      { id: 'a', texto: 'Busqué entender los principios que explican cómo funciona, antes de hacer nada.', scores: { descubridor: 10, arquitecto: 5 } },
      { id: 'b', texto: 'Me lancé a practicar. Aprendí cometiendo errores y ajustando sobre la marcha.', scores: { constructor: 10, artifice: 5 } },
      { id: 'c', texto: 'Busqué a alguien que ya lo sabía y aprendí mirando cómo lo hacía.', scores: { catalizador: 10, anfitrion: 5 } },
      { id: 'd', texto: 'Necesité entender para qué sirve y cómo encaja en algo más grande antes de empezar.', scores: { narrador: 10, arbitro: 5 } },
    ],
  },

  // Q2 — Fuentes de energía
  {
    id: 'vis_1',
    tipo: 'visual',
    enunciado: '¿Cuál de estas situaciones te generaría más energía y motivación genuina?',
    opciones: [
      { id: 'a', emoji: '🔬', texto: 'Resolver algo técnico que nadie logró antes', scores: { descubridor: 10, arquitecto: 5 } },
      { id: 'b', emoji: '🤝', texto: 'Ser la persona a quien todos acuden cuando tienen un problema', scores: { catalizador: 10, sanador: 5 } },
      { id: 'c', emoji: '✏️', texto: 'Crear algo desde cero que lleva tu sello personal', scores: { artifice: 10, narrador: 5 } },
      { id: 'd', emoji: '📐', texto: 'Diseñar un sistema que funcione perfecto sin supervisión constante', scores: { arquitecto: 10, interprete: 5 } },
      { id: 'e', emoji: '🌿', texto: 'Proteger o recuperar algo valioso que está en riesgo', scores: { custodio: 10, sanador: 5 } },
      { id: 'f', emoji: '🎙️', texto: 'Presentar una idea que cambia cómo la gente piensa sobre algo', scores: { narrador: 10, catalizador: 5 } },
    ],
  },

  // Q3 — Necesidad de estructura (situación concreta, no escala de "importancia")
  {
    id: 'sca_1',
    tipo: 'scale',
    enunciado: 'Arrancás en un lugar nuevo. ¿Cómo te gustaría que fuera tu primer día?',
    opciones: [
      { id: '1', texto: 'Que me tiren al agua: "arreglate y mostranos qué sabés hacer"', scores: { descubridor: 3, artifice: 2 } },
      { id: '2', texto: 'Una dirección general y libertad para encararlo a mi modo', scores: { arquitecto: 2 } },
      { id: '3', texto: 'Algo de guía, pero con margen para adaptarme sobre la marcha', scores: { orquestador: 1 } },
      { id: '4', texto: 'Objetivos claros desde el primer día, con algo de margen propio', scores: { arbitro: 2 } },
      { id: '5', texto: 'Que me expliquen con precisión qué se espera de mí', scores: { custodio: 3, arbitro: 2 } },
    ],
  },

  // Q4 — Toma de decisiones bajo incertidumbre
  {
    id: 'sit_2',
    tipo: 'situacional',
    enunciado: 'Necesitás tomar una decisión importante con información incompleta. ¿Qué hacés?',
    opciones: [
      { id: 'a', texto: 'Busco más datos hasta sentirme lo suficientemente seguro/a.', scores: { interprete: 10, arbitro: 5 } },
      { id: 'b', texto: 'Decido con lo que tengo. Si me equivoco, ajusto.', scores: { arquitecto: 10, descubridor: 5 } },
      { id: 'c', texto: 'Consulto con personas de confianza antes de decidir.', scores: { catalizador: 10, sanador: 5 } },
      { id: 'd', texto: 'Evalúo qué consecuencias tiene cada opción para todos los involucrados.', scores: { arbitro: 10, orquestador: 5 } },
    ],
  },

  // Q5 — Valores de trabajo (opción F ajustada, sin sobre-atribuir arquetipo)
  {
    id: 'mul_1',
    tipo: 'multiselect',
    enunciado: '¿Cuáles de estos aspectos son más importantes para vos en una carrera? (elegí 3)',
    maxSelect: 3,
    opciones: [
      { id: 'a', texto: 'Que me desafíe intelectualmente', scores: { descubridor: 5, arquitecto: 4 } },
      { id: 'b', texto: 'Que tenga impacto real en personas o comunidades', scores: { sanador: 5, catalizador: 4 } },
      { id: 'c', texto: 'Que me dé libertad y autonomía para decidir', scores: { descubridor: 5, artifice: 4 } },
      { id: 'd', texto: 'Que me brinde estabilidad y seguridad económica', scores: { custodio: 5, arbitro: 4 } },
      { id: 'e', texto: 'Que me permita crear algo propio y expresarme', scores: { artifice: 5, narrador: 4 } },
      { id: 'f', texto: 'Que esté bien remunerado', scores: { orquestador: 2, interprete: 2 } },
      { id: 'g', texto: 'Que trabaje con personas que me inspiren', scores: { catalizador: 5, anfitrion: 4 } },
      { id: 'h', texto: 'Que tenga reconocimiento y crecimiento profesional', scores: { orquestador: 5, narrador: 4 } },
    ],
  },

  // Q6 — Antipatrones (alimenta penalizaciones en el scorer)
  {
    id: 'anti_1',
    tipo: 'multiselect',
    enunciado: '¿Qué tipo de trabajo te generaría más rechazo? Elegí 2.',
    maxSelect: 2,
    opciones: [
      { id: 'sangre',      texto: 'Trabajar con sangre, cuerpos o situaciones médicas de emergencia', scores: {} },
      { id: 'matematica',  texto: 'Pasar horas resolviendo ecuaciones o modelos matemáticos complejos', scores: {} },
      { id: 'exposicion',  texto: 'Estar expuesto constantemente a clientes, público amplio o cámaras', scores: {} },
      { id: 'rutina',      texto: 'Trabajar en oficina haciendo exactamente lo mismo todos los días', scores: {} },
      { id: 'ventas',      texto: 'Tener que cerrar ventas o convencer gente de comprar algo', scores: {} },
      { id: 'soledad',     texto: 'Trabajar solo la mayor parte del tiempo sin equipo', scores: {} },
      { id: 'competencia', texto: 'Trabajar en entornos muy competitivos con presión constante de resultados', scores: {} },
    ],
  },

  // Q7 — Roles naturales en grupos
  {
    id: 'vis_2',
    tipo: 'visual',
    enunciado: '¿Con cuál de estos roles te identificás más cuando trabajás con otras personas?',
    opciones: [
      { id: 'a', emoji: '🗺️', texto: 'El que tiene la visión y ve más lejos que los demás', scores: { arquitecto: 10, descubridor: 5 } },
      { id: 'b', emoji: '🛠️', texto: 'El que se asegura de que las cosas realmente pasen', scores: { constructor: 10, orquestador: 5 } },
      { id: 'c', emoji: '💬', texto: 'El que escucha, conecta y hace que el grupo funcione', scores: { catalizador: 10, anfitrion: 5 } },
      { id: 'd', emoji: '🔎', texto: 'El que cuestiona, analiza y encuentra lo que no cierra', scores: { arbitro: 10, interprete: 5 } },
      { id: 'e', emoji: '🎨', texto: 'El que propone cosas que nadie más pensó', scores: { artifice: 10, narrador: 5 } },
      { id: 'f', emoji: '🌱', texto: 'El que cuida que el proceso sea justo y sostenible', scores: { custodio: 10, sanador: 5 } },
    ],
  },

  // Q8 — Satisfacción concreta al final de semana (NUEVA — cubre constructor/custodio/anfitrion)
  {
    id: 'vis_sat',
    tipo: 'visual',
    enunciado: '¿Cuál de estos resultados al final de una semana de trabajo te daría más satisfacción?',
    opciones: [
      { id: 'a', emoji: '🧍', texto: 'Haber acompañado a alguien en un momento importante de su vida', scores: { sanador: 10, catalizador: 5 } },
      { id: 'b', emoji: '📈', texto: 'Haber descubierto un patrón en datos que nadie había visto', scores: { interprete: 10, descubridor: 5 } },
      { id: 'c', emoji: '🔩', texto: 'Haber resuelto un problema técnico concreto con herramientas o equipos', scores: { constructor: 10, custodio: 5 } },
      { id: 'd', emoji: '💡', texto: 'Haber desarrollado una idea que va a cambiar cómo se hace algo', scores: { artifice: 10, narrador: 5 } },
      { id: 'e', emoji: '🎪', texto: 'Haber organizado una experiencia que hizo que otros la pasen bien', scores: { anfitrion: 10, catalizador: 5 } },
      { id: 'f', emoji: '⚖️', texto: 'Haber resuelto un conflicto de forma justa para todos los involucrados', scores: { arbitro: 10, orquestador: 5 } },
    ],
  },

  // Q9 — Validación cruzada de impacto/empatía (disfrazada: "qué mirás al final")
  {
    id: 'xv_impacto',
    tipo: 'situacional',
    enunciado: 'Un proyecto en el que pusiste mucho finalmente sale. ¿Qué es lo primero que mirás para saber si valió la pena?',
    opciones: [
      { id: 'a', texto: 'Si mejoró concretamente la vida de las personas que lo iban a usar.', scores: { sanador: 10, catalizador: 5 } },
      { id: 'b', texto: 'Si los números y la calidad técnica dieron lo que esperaba.', scores: { interprete: 10, arquitecto: 5 } },
      { id: 'c', texto: 'Si el equipo terminó orgulloso y más unido por lo que logró.', scores: { anfitrion: 8, orquestador: 5 } },
      { id: 'd', texto: 'Si abrió la puerta a algo más grande o a una idea nueva.', scores: { narrador: 8, descubridor: 5 } },
    ],
  },

  // Q10 — Respuesta a la injusticia
  {
    id: 'sit_4',
    tipo: 'situacional',
    enunciado: 'Hay una situación claramente injusta en tu entorno de trabajo. ¿Cómo reaccionás?',
    opciones: [
      { id: 'a', texto: 'La señalo y argumento por qué está mal, aunque no sea popular hacerlo.', scores: { arbitro: 10, catalizador: 5 } },
      { id: 'b', texto: 'Escucho a todos los involucrados y trato de entender antes de opinar.', scores: { sanador: 10, anfitrion: 5 } },
      { id: 'c', texto: 'Analizo qué estructura o proceso genera esa situación y cómo cambiarla.', scores: { arquitecto: 10, descubridor: 5 } },
      { id: 'd', texto: 'Movilizo a otros para que también lo vean y actuemos juntos.', scores: { catalizador: 10, narrador: 5 } },
    ],
  },

  // Q10 — Especialista vs. generalista
  {
    id: 'par_2',
    tipo: 'pairs',
    enunciado: 'Si pudieras elegir cómo desarrollarte profesionalmente:',
    opciones: [
      { id: 'a', emoji: '🔭', texto: 'Ser un especialista profundo en algo que muy poca gente domina', scores: { descubridor: 10, arquitecto: 5 } },
      { id: 'b', emoji: '🌐', texto: 'Tener un entendimiento amplio de muchas áreas y conectarlas', scores: { orquestador: 10, catalizador: 5 } },
    ],
  },

  // Q11 — Expresión personal en el trabajo (midpoints escritos)
  {
    id: 'sca_3',
    tipo: 'scale',
    enunciado: '¿Qué tan importante es para vos que tu trabajo sea una forma de expresión personal?',
    opciones: [
      { id: '1', texto: 'No lo necesito; prefiero que sea funcional y eficiente', scores: { arquitecto: 2, interprete: 2 } },
      { id: '2', texto: 'Me resulta irrelevante si el trabajo tiene buen impacto', scores: { constructor: 2 } },
      { id: '3', texto: 'Está bien si el trabajo lo permite, pero no es indispensable', scores: {} },
      { id: '4', texto: 'Me importa bastante; disfruto cuando el trabajo tiene mi sello', scores: { artifice: 2, narrador: 2 } },
      { id: '5', texto: 'Es fundamental; necesito que refleje quién soy', scores: { artifice: 3, narrador: 3 } },
    ],
  },

  // Q12 — Relación ideal con personas en el trabajo (opción B corregida)
  {
    id: 'sit_6',
    tipo: 'situacional',
    enunciado: '¿Cuál describe mejor tu relación ideal con las personas en el trabajo?',
    opciones: [
      { id: 'a', texto: 'Trabajo solo. Las interacciones son bienvenidas pero secundarias.', scores: { arquitecto: 10, descubridor: 5 } },
      { id: 'b', texto: 'Trabajo con un equipo pequeño muy complementario, donde el vínculo importa.', scores: { catalizador: 8, arquitecto: 5 } },
      { id: 'c', texto: 'Las personas son el núcleo de mi trabajo. Sin esa conexión no tiene sentido.', scores: { sanador: 10, anfitrion: 5 } },
      { id: 'd', texto: 'Me gusta movilizar muchas personas hacia un objetivo común.', scores: { orquestador: 10, catalizador: 5 } },
    ],
  },

  // Q14 — Validación cruzada de liderazgo/iniciativa (disfrazada: grupo estancado)
  {
    id: 'xv_liderazgo',
    tipo: 'situacional',
    enunciado: 'Tu grupo está estancado y nadie se decide. Sin que nadie te lo pida, lo más probable es que vos…',
    opciones: [
      { id: 'a', texto: 'Tome la iniciativa y proponga un plan para que arranquemos ya.', scores: { orquestador: 10, catalizador: 5 } },
      { id: 'b', texto: 'Ayude a que cada uno diga lo que piensa para destrabarlo juntos.', scores: { sanador: 8, anfitrion: 5 } },
      { id: 'c', texto: 'Me ponga a resolver mi parte para no frenar al resto.', scores: { arquitecto: 8, constructor: 5 } },
      { id: 'd', texto: 'Analice por qué estamos trabados antes de empujar a nadie.', scores: { arbitro: 8, interprete: 5 } },
    ],
  },

  // Q15 — Actividades que generan flow
  {
    id: 'mul_2',
    tipo: 'multiselect',
    enunciado: '¿Cuáles de estas actividades te generarían más satisfacción si fueran parte de tu trabajo diario? (elegí 3)',
    maxSelect: 3,
    opciones: [
      { id: 'a', texto: 'Analizar un problema complejo hasta entenderlo completamente', scores: { arquitecto: 5, descubridor: 4 } },
      { id: 'b', texto: 'Tener conversaciones profundas que ayudan a alguien a resolver algo', scores: { sanador: 5, catalizador: 4 } },
      { id: 'c', texto: 'Diseñar o construir algo que antes no existía', scores: { artifice: 5, constructor: 4 } },
      { id: 'd', texto: 'Encontrar patrones en datos para tomar mejores decisiones', scores: { interprete: 5, arquitecto: 4 } },
      { id: 'e', texto: 'Liderar equipos y coordinar que todo encaje', scores: { orquestador: 5, catalizador: 4 } },
      { id: 'f', texto: 'Trabajar al aire libre o en contacto con el entorno físico real', scores: { custodio: 5, constructor: 4 } },
      { id: 'g', texto: 'Escribir, producir contenido o comunicar ideas con impacto', scores: { narrador: 5, artifice: 4 } },
      { id: 'h', texto: 'Defender una posición, negociar o argumentar ante otros', scores: { arbitro: 5, orquestador: 4 } },
    ],
  },

  // Q14 — Tolerancia a la incertidumbre (midpoints escritos)
  {
    id: 'sca_4',
    tipo: 'scale',
    enunciado: '¿Qué tan cómodo/a te sentís con la incertidumbre sobre el futuro de tu carrera?',
    opciones: [
      { id: '1', texto: 'Necesito saber adónde voy. La incertidumbre me paraliza.', scores: { custodio: 3, arbitro: 2 } },
      { id: '2', texto: 'Prefiero tener un plan claro, aunque pueda ajustarlo sobre la marcha', scores: { interprete: 2 } },
      { id: '3', texto: 'Me adapto según el contexto: a veces la incertidumbre me activa', scores: { orquestador: 1 } },
      { id: '4', texto: 'Me manejo bien con lo incierto si tengo cierta autonomía', scores: { descubridor: 2 } },
      { id: '5', texto: 'La incertidumbre me estimula. Prefiero construir el camino mientras camino.', scores: { descubridor: 3, artifice: 2 } },
    ],
  },

  // Q15 — Innovación vs. optimización
  {
    id: 'par_3',
    tipo: 'pairs',
    enunciado: '¿Cuál de estos tipos de trabajo te generaría más satisfacción profunda?',
    opciones: [
      { id: 'a', emoji: '💡', texto: 'Crear algo nuevo que no existía, aunque implique fracasar muchas veces', scores: { artifice: 10, descubridor: 5 } },
      { id: 'b', emoji: '⚙️', texto: 'Tomar algo que ya existe y hacerlo funcionar mucho mejor', scores: { arquitecto: 10, constructor: 5 } },
    ],
  },

  // Q16 — Mundo físico vs. abstracto (NUEVA — diferencia arquitecto/constructor/interprete/orquestador)
  {
    id: 'sit_fis',
    tipo: 'situacional',
    enunciado: '¿En cuál de estos proyectos te imaginarías más motivado/a?',
    opciones: [
      { id: 'a', texto: 'Diseñar el sistema de software que controla una planta industrial.', scores: { arquitecto: 10, descubridor: 5 } },
      { id: 'b', texto: 'Construir físicamente algo: una estructura, una instalación, una máquina.', scores: { constructor: 10, custodio: 5 } },
      { id: 'c', texto: 'Analizar los datos de producción y encontrar cómo mejorar la eficiencia.', scores: { interprete: 10, arquitecto: 5 } },
      { id: 'd', texto: 'Coordinar al equipo que integra todas esas partes en un proyecto funcional.', scores: { orquestador: 10, constructor: 5 } },
    ],
  },

  // Q17 — Visión de largo plazo
  {
    id: 'sit_8',
    tipo: 'situacional',
    enunciado: '¿Cuál de estas visiones de vida profesional te resuena más genuinamente?',
    opciones: [
      { id: 'a', texto: 'Dominar profundamente algo. Ser de las pocas personas que realmente lo entiende.', scores: { descubridor: 10, interprete: 5 } },
      { id: 'b', texto: 'Construir algo que perdure: una empresa, una institución, un legado concreto.', scores: { orquestador: 10, arquitecto: 5 } },
      { id: 'c', texto: 'Tener un impacto directo y sostenido en la vida de personas reales.', scores: { sanador: 10, catalizador: 5 } },
      { id: 'd', texto: 'Vivir con autonomía, explorando y creando en mis propios términos.', scores: { artifice: 10, narrador: 5 } },
    ],
  },

  // Q18 — Fortaleza central, vía recuerdo conductual (no auto-rótulo directo)
  {
    id: 'sit_9',
    tipo: 'situacional',
    enunciado: 'Pensá en la última vez que un grupo del que formabas parte logró algo difícil. ¿Qué parte de eso no habría pasado sin vos?',
    opciones: [
      { id: 'a', texto: 'Encontrar una salida cuando parecía que no había forma de avanzar.', scores: { arquitecto: 10, descubridor: 5 } },
      { id: 'b', texto: 'Sostener al grupo: que nadie se sintiera perdido ni de más.', scores: { sanador: 10, catalizador: 5 } },
      { id: 'c', texto: 'Empujar para que dejáramos de hablar y las cosas pasaran de verdad.', scores: { orquestador: 10, constructor: 5 } },
      { id: 'd', texto: 'Conectar ideas sueltas y darle un sentido al conjunto.', scores: { narrador: 10, arbitro: 5 } },
    ],
  },

];
