export type QuestionType = 'forced_choice' | 'situational' | 'scale' | 'context';
export type Bloque = 'contexto' | 'actividad' | 'entorno' | 'autoconocimiento' | 'adaptativa';

export interface DimensionScores {
  R?: number; // Realista/Técnico
  I?: number; // Investigativo
  A?: number; // Artístico
  S?: number; // Social
  E?: number; // Emprendedor
  C?: number; // Convencional/Organizativo
  autonomia?: number;
  seguridad?: number;
  impacto?: number;
  riesgo?: number;
  rutina?: number;
  equipo?: number;
}

export interface Opcion {
  id: string;
  texto: string;
  scores?: DimensionScores;
}

export interface Question {
  id: string;
  bloque: Bloque;
  tipo: QuestionType;
  enunciado: string;
  subtext?: string;
  opciones: Opcion[];
  // Para preguntas adaptativas: función que determina si mostrarla
  condicion?: (answers: Record<string, string>) => boolean;
}

export const QUESTIONS: Question[] = [
  // ── BLOQUE 0: CONTEXTO (no puntúan RIASEC) ───────────────────────────────

  {
    id: 'ctx_1',
    bloque: 'contexto',
    tipo: 'context',
    enunciado: '¿En qué provincia vivís actualmente?',
    subtext: 'Usamos esto para recomendarte universidades accesibles.',
    opciones: [
      { id: 'CABA', texto: 'Ciudad de Buenos Aires' },
      { id: 'GBA', texto: 'Gran Buenos Aires (Conurbano)' },
      { id: 'BAPROV', texto: 'Buenos Aires (interior de provincia)' },
      { id: 'COR', texto: 'Córdoba' },
      { id: 'SF', texto: 'Santa Fe' },
      { id: 'MZA', texto: 'Mendoza' },
      { id: 'TUC', texto: 'Tucumán' },
      { id: 'OTRA', texto: 'Otra provincia' },
    ],
  },

  {
    id: 'ctx_2',
    bloque: 'contexto',
    tipo: 'context',
    enunciado: '¿Podés o querés estudiar fuera de tu ciudad actual?',
    opciones: [
      { id: 'si_total', texto: 'Sí, puedo mudarme sin problema' },
      { id: 'si_beca', texto: 'Podría, pero necesitaría una beca o apoyo económico' },
      { id: 'virtual', texto: 'Prefiero estudiar en mi ciudad o en modalidad virtual' },
      { id: 'no', texto: 'No puedo mudarme (trabajo, familia u otro motivo)' },
    ],
  },

  {
    id: 'ctx_3',
    bloque: 'contexto',
    tipo: 'context',
    enunciado: '¿Cuánto tiempo querés dedicarle a la carrera?',
    subtext: 'No hay una respuesta correcta. Esto nos ayuda a ajustar las recomendaciones.',
    opciones: [
      { id: 'larga', texto: 'Una carrera completa, aunque dure 5 o 6 años' },
      { id: 'media', texto: 'Algo de 3 a 4 años' },
      { id: 'corta', texto: 'Una tecnicatura o carrera corta (2 a 3 años)' },
      { id: 'nosé', texto: 'No lo tengo claro todavía' },
    ],
  },

  // ── BLOQUE 1: ACTIVIDAD Y MOTIVACIÓN (core, 12 preguntas) ────────────────

  {
    id: 'act_1',
    bloque: 'actividad',
    tipo: 'forced_choice',
    enunciado: 'Imaginá que tenés un proyecto libre por hacer. ¿Qué tipo de tarea te sale buscar primero?',
    opciones: [
      { id: 'A', texto: 'Armar, construir o reparar algo concreto con tus manos o herramientas', scores: { R: 10, C: 2 } },
      { id: 'B', texto: 'Investigar a fondo un tema que no terminás de entender', scores: { I: 10, A: 2 } },
      { id: 'C', texto: 'Diseñar algo visual, escribir o crear desde cero', scores: { A: 10, I: 2 } },
      { id: 'D', texto: 'Organizar el proceso, armar un plan y distribuir tareas', scores: { C: 10, E: 4 } },
    ],
  },

  {
    id: 'act_2',
    bloque: 'actividad',
    tipo: 'forced_choice',
    enunciado: '¿Cuál de estas actividades disfrutarías más un sábado a la tarde?',
    opciones: [
      { id: 'A', texto: 'Aprender a usar una herramienta nueva o hacer algo técnico', scores: { R: 8, I: 4 } },
      { id: 'B', texto: 'Charlar o ayudar a alguien que está pasando por algo difícil', scores: { S: 10, A: 2 } },
      { id: 'C', texto: 'Buscar un negocio o proyecto propio que me entusiasme', scores: { E: 10, A: 4 } },
      { id: 'D', texto: 'Poner en orden algo que está desorganizado (datos, espacio, agenda)', scores: { C: 10, R: 2 } },
    ],
  },

  {
    id: 'act_3',
    bloque: 'actividad',
    tipo: 'situational',
    enunciado: 'Empezaste a trabajar en un lugar nuevo. Al mes te ofrecen liderar un proyecto que nadie manejó antes. ¿Qué hacés?',
    opciones: [
      { id: 'A', texto: 'Lo acepto — el desafío me activa aunque tenga incertidumbre', scores: { E: 10, riesgo: 8 } },
      { id: 'B', texto: 'Lo acepto, pero primero pido estructura y apoyo claro', scores: { C: 6, E: 4, seguridad: 6 } },
      { id: 'C', texto: 'Prefiero quedarme en mi rol actual y dominarlo bien antes de liderar', scores: { I: 6, C: 6, seguridad: 8, rutina: 4 } },
      { id: 'D', texto: 'Depende mucho del tema del proyecto — me importa más el qué que el rol', scores: { I: 8, A: 4 } },
    ],
  },

  {
    id: 'act_4',
    bloque: 'actividad',
    tipo: 'situational',
    enunciado: 'En un equipo de trabajo se cometió un error grave. ¿Qué hacés vos primero?',
    opciones: [
      { id: 'A', texto: 'Analizo qué falló técnicamente y propongo una solución', scores: { I: 8, R: 4 } },
      { id: 'B', texto: 'Hablo con el equipo para entender cómo se siente cada uno y reorganizo', scores: { S: 10, E: 4 } },
      { id: 'C', texto: 'Me aseguro de que el proceso quede documentado para que no vuelva a pasar', scores: { C: 10, I: 2 } },
      { id: 'D', texto: 'Busco una solución creativa que salve la situación rápido', scores: { A: 6, E: 8 } },
    ],
  },

  {
    id: 'act_5',
    bloque: 'actividad',
    tipo: 'scale',
    enunciado: 'Disfrutás explicarle algo complejo a alguien hasta que lo entienda de verdad.',
    subtext: '1 = no es para mí · 5 = lo haría aunque no me pagaran',
    opciones: [
      { id: '1', texto: 'Casi nunca', scores: { S: 0 } },
      { id: '2', texto: 'Poco', scores: { S: 2 } },
      { id: '3', texto: 'A veces', scores: { S: 5 } },
      { id: '4', texto: 'Bastante', scores: { S: 8 } },
      { id: '5', texto: 'Siempre', scores: { S: 10, A: 2 } },
    ],
  },

  {
    id: 'act_6',
    bloque: 'actividad',
    tipo: 'scale',
    enunciado: 'Preferís saber exactamente qué se espera de vos antes de empezar algo.',
    subtext: '1 = prefiero la ambigüedad · 5 = necesito instrucciones claras',
    opciones: [
      { id: '1', texto: 'Prefiero la ambigüedad', scores: { A: 4, riesgo: 6, autonomia: 6 } },
      { id: '2', texto: 'Algo de libertad', scores: { A: 2, autonomia: 4 } },
      { id: '3', texto: 'Un poco de cada cosa', scores: {} },
      { id: '4', texto: 'Bastante estructura', scores: { C: 4, seguridad: 4 } },
      { id: '5', texto: 'Instrucciones muy claras', scores: { C: 8, seguridad: 8, rutina: 4 } },
    ],
  },

  {
    id: 'act_7',
    bloque: 'actividad',
    tipo: 'forced_choice',
    enunciado: 'Si tuvieras que elegir un contenido para ver o escuchar ahora mismo, ¿qué elegirías?',
    opciones: [
      { id: 'A', texto: 'Un documental técnico sobre cómo funciona algo (ingeniería, ciencia, tecnología)', scores: { R: 6, I: 8 } },
      { id: 'B', texto: 'Una charla sobre cómo mejorar organizaciones o liderar personas', scores: { E: 8, S: 4 } },
      { id: 'C', texto: 'Un proceso creativo: arte, diseño, escritura, música', scores: { A: 10 } },
      { id: 'D', texto: 'Un análisis sobre política, sociedad o economía', scores: { I: 6, E: 4, S: 4 } },
    ],
  },

  {
    id: 'act_8',
    bloque: 'actividad',
    tipo: 'forced_choice',
    enunciado: 'Pensá en un logro del que estés orgulloso/a. ¿Cómo llegaste a ese resultado?',
    opciones: [
      { id: 'A', texto: 'Me concentré solo/a y lo fui construyendo paso a paso', scores: { I: 8, C: 4, autonomia: 8 } },
      { id: 'B', texto: 'Armé un equipo y coordiné para que todo funcione', scores: { E: 10, S: 6 } },
      { id: 'C', texto: 'Tuve una idea original que nadie había pensado', scores: { A: 10, I: 4 } },
      { id: 'D', texto: 'Seguí un proceso claro y lo ejecuté muy bien', scores: { C: 10, R: 4 } },
    ],
  },

  {
    id: 'act_9',
    bloque: 'actividad',
    tipo: 'scale',
    enunciado: 'La incertidumbre te activa más de lo que te paraliza.',
    subtext: '1 = me paraliza · 5 = me activa',
    opciones: [
      { id: '1', texto: 'Me paraliza', scores: { seguridad: 10, rutina: 6 } },
      { id: '2', texto: 'Me incomoda bastante', scores: { seguridad: 6, rutina: 4 } },
      { id: '3', texto: 'Depende de la situación', scores: {} },
      { id: '4', texto: 'Suelo manejarlo bien', scores: { riesgo: 6, autonomia: 4 } },
      { id: '5', texto: 'Me activa', scores: { riesgo: 10, E: 4, A: 2 } },
    ],
  },

  {
    id: 'act_10',
    bloque: 'actividad',
    tipo: 'forced_choice',
    enunciado: '¿Cuál de estos resultados te importaría más en tu trabajo ideal?',
    opciones: [
      { id: 'A', texto: 'Ganar bien desde el principio', scores: { E: 4, C: 4, seguridad: 8 } },
      { id: 'B', texto: 'Sentir que mis acciones ayudan a otras personas', scores: { S: 10, impacto: 10 } },
      { id: 'C', texto: 'Tener libertad para hacer las cosas a mi manera', scores: { A: 6, autonomia: 10 } },
      { id: 'D', texto: 'Que me reconozcan por lo que logro y construyo', scores: { E: 8, I: 4 } },
    ],
  },

  {
    id: 'act_11',
    bloque: 'actividad',
    tipo: 'situational',
    enunciado: 'Te piden que presentes un tema que conocés bien frente a 30 personas. ¿Cómo te sentís?',
    opciones: [
      { id: 'A', texto: 'Me gusta, es una oportunidad de que me escuchen', scores: { E: 8, S: 6, A: 4 } },
      { id: 'B', texto: 'Lo hago si hace falta, pero no es lo que más disfruto', scores: { I: 4, C: 4 } },
      { id: 'C', texto: 'Prefiero escribirlo o hacer algo visual antes que hablar', scores: { A: 8, I: 4 } },
      { id: 'D', texto: 'Me genera ansiedad pero lo enfrento', scores: { S: 4, seguridad: 4 } },
    ],
  },

  {
    id: 'act_12',
    bloque: 'actividad',
    tipo: 'forced_choice',
    enunciado: 'Si pudieras elegir cómo pasar tu próxima semana de trabajo, ¿qué elegiríás?',
    opciones: [
      { id: 'A', texto: 'Resolver un problema técnico complejo solo/a, con profundidad', scores: { I: 10, R: 6, autonomia: 8 } },
      { id: 'B', texto: 'Trabajar codo a codo con personas, en movimiento y contacto directo', scores: { S: 10, E: 4, equipo: 10 } },
      { id: 'C', texto: 'Crear algo desde cero — un diseño, un texto, un concepto', scores: { A: 10, autonomia: 6 } },
      { id: 'D', texto: 'Gestionar múltiples cosas a la vez y que todo salga en tiempo y forma', scores: { C: 10, E: 6 } },
    ],
  },

  // ── BLOQUE 2: ENTORNO DE TRABAJO (8 preguntas) ───────────────────────────

  {
    id: 'ent_1',
    bloque: 'entorno',
    tipo: 'forced_choice',
    enunciado: 'En tu trabajo ideal, ¿en qué tipo de espacio estarías la mayor parte del tiempo?',
    opciones: [
      { id: 'A', texto: 'Oficina, laboratorio o aula — espacio interior, concentrado', scores: { I: 4, C: 4 } },
      { id: 'B', texto: 'Terreno, obra, campo, hospitales — contacto directo con el mundo real', scores: { R: 10, S: 4 } },
      { id: 'C', texto: 'Estudio, taller o espacio creativo propio', scores: { A: 10, autonomia: 6 } },
      { id: 'D', texto: 'Distintos lugares — moviéndome, conociendo, visitando', scores: { E: 6, S: 4 } },
    ],
  },

  {
    id: 'ent_2',
    bloque: 'entorno',
    tipo: 'scale',
    enunciado: 'Preferís un trabajo con rutina y procesos predecibles.',
    subtext: '1 = prefiero variedad total · 5 = prefiero rutina estable',
    opciones: [
      { id: '1', texto: 'Variedad total', scores: { A: 4, E: 4, riesgo: 6 } },
      { id: '2', texto: 'Mayormente variedad', scores: { A: 2, E: 2 } },
      { id: '3', texto: 'Balance', scores: {} },
      { id: '4', texto: 'Mayormente rutina', scores: { C: 4, rutina: 6 } },
      { id: '5', texto: 'Rutina estable', scores: { C: 8, seguridad: 6, rutina: 10 } },
    ],
  },

  {
    id: 'ent_3',
    bloque: 'entorno',
    tipo: 'forced_choice',
    enunciado: '¿Cómo preferirías trabajar en términos de presencia?',
    opciones: [
      { id: 'A', texto: 'Presencial — me gusta el contacto y el ambiente compartido', scores: { S: 6, equipo: 8 } },
      { id: 'B', texto: 'Remoto — trabajo mejor desde mi espacio, sin interrupciones', scores: { I: 6, autonomia: 8 } },
      { id: 'C', texto: 'Híbrido — lo mejor de los dos mundos', scores: { E: 4, C: 2 } },
      { id: 'D', texto: 'No me importa, depende del rol', scores: {} },
    ],
  },

  {
    id: 'ent_4',
    bloque: 'entorno',
    tipo: 'forced_choice',
    enunciado: '¿En qué tipo de organización te imaginarías mejor?',
    opciones: [
      { id: 'A', texto: 'Empresa grande con estructura y carrera definida', scores: { C: 8, seguridad: 8 } },
      { id: 'B', texto: 'Startup o equipo chico donde tengo más impacto', scores: { E: 10, riesgo: 6 } },
      { id: 'C', texto: 'Independiente o freelance — mi propio proyecto', scores: { A: 6, autonomia: 10, riesgo: 8 } },
      { id: 'D', texto: 'Estado o sector público — estabilidad e impacto social', scores: { C: 6, S: 6, seguridad: 10, impacto: 6 } },
    ],
  },

  {
    id: 'ent_5',
    bloque: 'entorno',
    tipo: 'scale',
    enunciado: 'Preferís definir vos cómo hacés tu trabajo, aunque eso implique más responsabilidad.',
    subtext: '1 = prefiero que me digan cómo · 5 = quiero total autonomía',
    opciones: [
      { id: '1', texto: 'Que me digan cómo', scores: { C: 6, seguridad: 6 } },
      { id: '2', texto: 'Guías claras con algo de libertad', scores: { C: 4 } },
      { id: '3', texto: 'Mitad y mitad', scores: {} },
      { id: '4', texto: 'Bastante autonomía', scores: { autonomia: 6, E: 4 } },
      { id: '5', texto: 'Autonomía total', scores: { autonomia: 10, A: 4, E: 4 } },
    ],
  },

  {
    id: 'ent_6',
    bloque: 'entorno',
    tipo: 'forced_choice',
    enunciado: '¿Qué valorás más en un trabajo diario?',
    opciones: [
      { id: 'A', texto: 'Resultados inmediatos — ver el impacto de lo que hago ese mismo día', scores: { R: 6, E: 4 } },
      { id: 'B', texto: 'Proyectos de largo plazo — construir algo que dure y valga la pena', scores: { I: 8, C: 4 } },
      { id: 'C', texto: 'Aprendizaje constante — siempre estar creciendo', scores: { I: 6, A: 4 } },
      { id: 'D', texto: 'Impacto en personas — saber que hoy hice diferencia en alguien', scores: { S: 10, impacto: 10 } },
    ],
  },

  {
    id: 'ent_7',
    bloque: 'entorno',
    tipo: 'forced_choice',
    enunciado: '¿Preferís un rol técnico o un rol de coordinación?',
    opciones: [
      { id: 'A', texto: 'Técnico — me gusta ser el experto/a en la materia', scores: { R: 8, I: 6 } },
      { id: 'B', texto: 'Coordinación — me gusta conectar personas y procesos', scores: { E: 8, S: 6, C: 4 } },
      { id: 'C', texto: 'Creativo — me gusta generar ideas y propuestas', scores: { A: 10, I: 4 } },
      { id: 'D', texto: 'Me imagino en los dos según el momento', scores: { E: 4, I: 4 } },
    ],
  },

  {
    id: 'ent_8',
    bloque: 'entorno',
    tipo: 'scale',
    enunciado: 'Te importa sentir que tu trabajo tiene un impacto en la sociedad o en otras personas.',
    subtext: '1 = no es determinante · 5 = es fundamental para mí',
    opciones: [
      { id: '1', texto: 'No es determinante', scores: { E: 2 } },
      { id: '2', texto: 'Algo me importa', scores: { impacto: 2 } },
      { id: '3', texto: 'Me parece importante', scores: { impacto: 5 } },
      { id: '4', texto: 'Es muy importante', scores: { S: 6, impacto: 8 } },
      { id: '5', texto: 'Es fundamental', scores: { S: 10, impacto: 10 } },
    ],
  },

  // ── BLOQUE 3: AUTOCONOCIMIENTO (5 preguntas) ─────────────────────────────

  {
    id: 'auto_1',
    bloque: 'autoconocimiento',
    tipo: 'scale',
    enunciado: '¿Qué tan claro/a tenés lo que querés estudiar?',
    subtext: '1 = sin la menor idea · 5 = tengo muy claro hacia dónde voy',
    opciones: [
      { id: '1', texto: 'Sin la menor idea' },
      { id: '2', texto: 'Algunas ideas vagas' },
      { id: '3', texto: 'Tengo algunas opciones en mente' },
      { id: '4', texto: 'Bastante claro, pero con dudas' },
      { id: '5', texto: 'Muy claro' },
    ],
  },

  {
    id: 'auto_2',
    bloque: 'autoconocimiento',
    tipo: 'context',
    enunciado: '¿Hay alguien en tu entorno que espera que estudies algo en particular?',
    subtext: 'Familia, pareja, amigos... Esta pregunta es confidencial y no afecta tu resultado, pero nos ayuda a interpretar el perfil.',
    opciones: [
      { id: 'no', texto: 'No, tengo total libertad para elegir' },
      { id: 'si_leve', texto: 'Sí, hay expectativas pero siento que puedo elegir igual' },
      { id: 'si_fuerte', texto: 'Sí, hay bastante presión y me cuesta ignorarla' },
      { id: 'prefiero', texto: 'Prefiero no responder esto' },
    ],
  },

  {
    id: 'auto_3',
    bloque: 'autoconocimiento',
    tipo: 'context',
    enunciado: '¿Cuántas carreras consideraste en serio hasta ahora?',
    opciones: [
      { id: 'ninguna', texto: 'Ninguna todavía, estoy en cero' },
      { id: 'una', texto: 'Una sola opción' },
      { id: 'pocas', texto: 'Dos o tres opciones' },
      { id: 'varias', texto: 'Cuatro o más — tengo demasiadas opciones' },
    ],
  },

  {
    id: 'auto_4',
    bloque: 'autoconocimiento',
    tipo: 'forced_choice',
    enunciado: '¿Qué te genera más ansiedad cuando pensás en elegir carrera?',
    opciones: [
      { id: 'A', texto: 'Equivocarme y perder años de mi vida', scores: { seguridad: 8 } },
      { id: 'B', texto: 'No encontrar trabajo o no ganar bien', scores: { seguridad: 6, C: 2 } },
      { id: 'C', texto: 'Decepcionar a las personas que me importan', scores: { S: 4 } },
      { id: 'D', texto: 'No saber quién soy realmente ni qué quiero', scores: {} },
    ],
  },

  {
    id: 'auto_5',
    bloque: 'autoconocimiento',
    tipo: 'forced_choice',
    enunciado: 'Cuando tenés que tomar una decisión importante, ¿cómo la tomás?',
    opciones: [
      { id: 'A', texto: 'Analizo toda la información disponible antes de decidir', scores: { I: 8, C: 4 } },
      { id: 'B', texto: 'Consulto con personas de confianza y peso sus opiniones', scores: { S: 8, equipo: 6 } },
      { id: 'C', texto: 'Confío en lo que me dice el instinto', scores: { A: 6, riesgo: 6 } },
      { id: 'D', texto: 'Pruebo algo y ajusto según los resultados', scores: { E: 8, R: 4 } },
    ],
  },

  // ── BLOQUE 4: ADAPTATIVAS (solo si hay ambigüedad) ───────────────────────

  {
    id: 'adap_1',
    bloque: 'adaptativa',
    tipo: 'forced_choice',
    enunciado: 'Entre construir algo físico y entender algo abstracto, ¿cuál te parece más atractivo?',
    subtext: 'Una pregunta más para afinar tu perfil.',
    opciones: [
      { id: 'A', texto: 'Construir algo físico — ver el resultado tangible', scores: { R: 10 } },
      { id: 'B', texto: 'Entender algo abstracto — resolver el porqué', scores: { I: 10 } },
    ],
    condicion: (answers) => {
      // Mostrar si R e I están muy cercanos
      return true; // El engine decide en runtime
    },
  },

  {
    id: 'adap_2',
    bloque: 'adaptativa',
    tipo: 'forced_choice',
    enunciado: 'Si tuvieras que elegir entre estos dos roles en un proyecto de impacto social, ¿cuál elegirías?',
    subtext: 'Una pregunta más para afinar tu perfil.',
    opciones: [
      { id: 'A', texto: 'El que diseña la estrategia y convence a otros de seguirla', scores: { E: 10, S: 2 } },
      { id: 'B', texto: 'El que trabaja directamente con las personas a quienes ayuda el proyecto', scores: { S: 10, E: 2 } },
    ],
    condicion: (answers) => true,
  },

  {
    id: 'adap_3',
    bloque: 'adaptativa',
    tipo: 'forced_choice',
    enunciado: 'En un proyecto creativo, ¿qué parte disfrutás más?',
    subtext: 'Una pregunta más para afinar tu perfil.',
    opciones: [
      { id: 'A', texto: 'La expresión libre — hacer algo nuevo sin reglas', scores: { A: 10 } },
      { id: 'B', texto: 'La organización del proceso — que todo fluya y esté bien ejecutado', scores: { C: 10, A: 2 } },
    ],
    condicion: (answers) => true,
  },
];

export const CONTEXT_QUESTION_IDS = QUESTIONS
  .filter(q => q.bloque === 'contexto')
  .map(q => q.id);

export const SCORED_QUESTION_IDS = QUESTIONS
  .filter(q => q.bloque !== 'contexto')
  .map(q => q.id);
