export type QuestionType = 'forced_choice' | 'situational' | 'scale' | 'context' | 'dropdown';
export type Bloque = 'contexto' | 'actividad' | 'entorno' | 'autoconocimiento' | 'adaptativa';

export interface DimensionScores {
  R?: number; I?: number; A?: number; S?: number; E?: number; C?: number;
  autonomia?: number; seguridad?: number; impacto?: number;
  riesgo?: number; rutina?: number; equipo?: number;
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
  // Para scale: texto del extremo inferior y superior
  anclaMin?: string;
  anclaMax?: string;
  opciones: Opcion[];
  condicion?: (answers: Record<string, string>) => boolean;
}

export const PROVINCIAS = [
  'Ciudad Autónoma de Buenos Aires',
  'Buenos Aires (GBA / Conurbano)',
  'Buenos Aires (interior de provincia)',
  'Catamarca',
  'Chaco',
  'Chubut',
  'Córdoba',
  'Corrientes',
  'Entre Ríos',
  'Formosa',
  'Jujuy',
  'La Pampa',
  'La Rioja',
  'Mendoza',
  'Misiones',
  'Neuquén',
  'Río Negro',
  'Salta',
  'San Juan',
  'San Luis',
  'Santa Cruz',
  'Santa Fe',
  'Santiago del Estero',
  'Tierra del Fuego',
  'Tucumán',
  'No vivo en Argentina',
];

export const QUESTIONS: Question[] = [

  // ── BLOQUE 0: CONTEXTO ───────────────────────────────────────────────────
  // Estas preguntas filtran recomendaciones. No puntúan RIASEC.

  {
    id: 'ctx_provincia',
    bloque: 'contexto',
    tipo: 'dropdown',
    enunciado: '¿En qué provincia vivís?',
    subtext: 'Te recomendamos universidades cercanas a donde estás.',
    opciones: PROVINCIAS.map(p => ({ id: p, texto: p })),
  },

  {
    id: 'ctx_movilidad',
    bloque: 'contexto',
    tipo: 'forced_choice',
    enunciado: 'Si la mejor opción para vos estuviera en otra ciudad, ¿podrías irte a estudiar ahí?',
    opciones: [
      { id: 'si_total', texto: 'Sí, podría mudarme sin problema' },
      { id: 'si_beca', texto: 'Podría, pero necesitaría una beca o apoyo económico' },
      { id: 'virtual', texto: 'Prefiero quedarme donde estoy — busco algo presencial local o virtual' },
      { id: 'no', texto: 'No puedo mudarme por trabajo, familia u otro motivo' },
    ],
  },

  {
    id: 'ctx_duracion',
    bloque: 'contexto',
    tipo: 'forced_choice',
    enunciado: '¿Cuánto tiempo estás dispuesto/a a invertir en estudiar?',
    opciones: [
      { id: 'larga', texto: 'Una carrera larga (5-6 años) — quiero la formación completa' },
      { id: 'media', texto: 'Algo de 3-4 años — un punto intermedio' },
      { id: 'corta', texto: 'Una tecnicatura o carrera corta (2-3 años) — quiero salida laboral rápida' },
      { id: 'nose', texto: 'Todavía no lo sé' },
    ],
  },

  // ── BLOQUE 1: ACTIVIDAD Y MOTIVACIÓN ────────────────────────────────────
  // Por qué estas preguntas: el bloque de actividad es el corazón del modelo.
  // Mide qué tipo de tarea activa al usuario. Se usan situaciones concretas
  // porque "¿te gusta X?" genera respuestas socialmente deseables.
  // Cada situación fue diseñada para discriminar entre los 6 tipos RIASEC.

  {
    id: 'act_1',
    bloque: 'actividad',
    tipo: 'situational',
    // Por qué: primer discriminador R/I/A/S. Pregunta de actividad pura
    // sin presión social. El "sábado libre" elimina el "debo elegir lo que
    // paga bien". Revela motivación intrínseca real.
    enunciado: 'Tenés un sábado libre sin compromisos. ¿Qué terminás haciendo por iniciativa propia?',
    opciones: [
      { id: 'A', texto: 'Me pongo a arreglar o construir algo — una mueble, un circuito, el auto', scores: { R: 10, C: 2 } },
      { id: 'B', texto: 'Me quedo leyendo o investigando un tema que me dejó pensando esta semana', scores: { I: 10, A: 2 } },
      { id: 'C', texto: 'Me pongo a crear algo — dibujar, escribir, editar fotos o video, diseñar', scores: { A: 10, I: 2 } },
      { id: 'D', texto: 'Llamo a alguien que la está pasando mal o organizo algo para estar con gente', scores: { S: 10, E: 2 } },
    ],
  },

  {
    id: 'act_2',
    bloque: 'actividad',
    tipo: 'forced_choice',
    // Por qué: discriminador E/C vs I/A. Fuerza un tradeoff real
    // entre ejecutar ideas propias (emprendedor), seguir procesos (convencional),
    // crear (artístico) o analizar (investigativo). Formato binario → elimina neutralidad.
    enunciado: 'Si tuvieras que elegir entre estos dos tipos de trabajo para siempre, ¿cuál elegirías?',
    opciones: [
      { id: 'A', texto: 'Inventar cosas nuevas y convencer a otros de que valen la pena', scores: { E: 10, A: 6 } },
      { id: 'B', texto: 'Hacer que los sistemas y procesos funcionen perfectamente bien', scores: { C: 10, I: 4 } },
    ],
  },

  {
    id: 'act_3',
    bloque: 'actividad',
    tipo: 'situational',
    // Por qué: discriminador E/liderazgo vs I/profundidad. Situación real
    // de carrera laboral que muchos ingresantes van a enfrentar pronto.
    // La respuesta C captura el perfil artístico/independiente que suele
    // quedar mal representado en las otras preguntas.
    enunciado: 'Empezaste a trabajar en un lugar nuevo. Al mes, te ofrecen liderar un proyecto que nadie manejó antes. ¿Qué hacés?',
    opciones: [
      { id: 'A', texto: 'Lo tomo — la incertidumbre no me frena, me activa', scores: { E: 10, riesgo: 8 } },
      { id: 'B', texto: 'Lo tomo, pero primero me aseguro de tener estructura y apoyo claros', scores: { C: 6, E: 4, seguridad: 6 } },
      { id: 'C', texto: 'Prefiero quedarme en mi rol actual y dominarlo bien antes de liderar', scores: { I: 8, C: 4, seguridad: 8 } },
      { id: 'D', texto: 'Depende del tema — el rol me importa menos que lo que voy a aprender', scores: { I: 10, A: 4 } },
    ],
  },

  {
    id: 'act_4',
    bloque: 'actividad',
    tipo: 'situational',
    // Por qué: discrimina S/cuidado vs I/análisis vs C/proceso vs E/acción.
    // Los errores de equipo son situaciones cargadas emocionalmente que
    // revelan la respuesta automática real de la persona.
    enunciado: 'Hubo un error grave en el proyecto que todos estaban haciendo. Nadie dice nada. ¿Qué hacés vos?',
    opciones: [
      { id: 'A', texto: 'Analizo qué falló técnicamente y propongo cómo arreglarlo', scores: { I: 8, R: 4 } },
      { id: 'B', texto: 'Hablo con el equipo, entiendo cómo está cada uno y los ayudo a organizarse', scores: { S: 10, E: 4 } },
      { id: 'C', texto: 'Me aseguro de que el proceso quede documentado para que no vuelva a pasar', scores: { C: 10, I: 2 } },
      { id: 'D', texto: 'Busco una solución creativa que salve la situación rápido', scores: { A: 6, E: 8 } },
    ],
  },

  {
    id: 'act_5',
    bloque: 'actividad',
    tipo: 'forced_choice',
    // Por qué: reemplaza la escala abstracta "¿disfrutás explicar?" por una
    // elección concreta entre HACER la tarea vs ENSEÑAR la tarea. Discrimina S
    // (le gusta enseñar) vs R/I (prefiere producir). Forma parte del "triángulo
    // de actividad" junto con act_1 y act_7.
    enunciado: 'Te piden ayuda con algo que vos dominás bien. ¿Qué te genera más satisfacción?',
    opciones: [
      { id: 'A', texto: 'Hacerlo yo y que vea el resultado final', scores: { R: 8, I: 4, autonomia: 6 } },
      { id: 'B', texto: 'Explicarle paso a paso hasta que pueda hacerlo solo/a', scores: { S: 10, E: 2 } },
    ],
  },

  {
    id: 'act_6',
    bloque: 'actividad',
    tipo: 'situational',
    // Por qué: reemplaza la escala "preferís tener instrucciones claras".
    // Esta situación concreta (primer día, jefe ausente) discrimina
    // autonomia alta vs seguridad alta de forma mucho más precisa.
    enunciado: 'Primer día en un trabajo nuevo. Tu jefe te da una tarea y desaparece. No dejó instrucciones claras. ¿Cómo reaccionás?',
    opciones: [
      { id: 'A', texto: 'Bien — me gusta explorar y encontrar mi propio método', scores: { A: 6, autonomia: 10, riesgo: 6 } },
      { id: 'B', texto: 'Lo intento, pero me quedo más tranquilo/a si le puedo preguntar algo', scores: { C: 4, autonomia: 5 } },
      { id: 'C', texto: 'Me cuesta — necesito saber exactamente qué se espera de mí para trabajar bien', scores: { C: 8, seguridad: 10, rutina: 4 } },
      { id: 'D', texto: 'Busco a alguien del equipo para entender cómo lo hacen los demás', scores: { S: 8, equipo: 8 } },
    ],
  },

  {
    id: 'act_7',
    bloque: 'actividad',
    tipo: 'forced_choice',
    // Por qué: discrimina el perfil de contenido como proxy de intereses
    // profundos. Es más fiable que preguntar directamente "¿te gusta la ciencia?"
    // porque el consumo voluntario de contenido es comportamiento real.
    enunciado: 'Si pudieras elegir qué consumir ahora mismo, ¿qué elegirías?',
    opciones: [
      { id: 'A', texto: 'Un documental técnico — cómo funciona algo de ingeniería, ciencia o tecnología', scores: { R: 6, I: 8 } },
      { id: 'B', texto: 'Una charla sobre cómo liderar mejor o hacer crecer un negocio', scores: { E: 8, S: 4 } },
      { id: 'C', texto: 'Un proceso creativo — detrás de escena de arte, diseño, música, escritura', scores: { A: 10 } },
      { id: 'D', texto: 'Un análisis sobre política, economía o un problema social', scores: { I: 6, S: 4, E: 4 } },
    ],
  },

  {
    id: 'act_8',
    bloque: 'actividad',
    tipo: 'situational',
    // Por qué: "logro pasado" es un gold standard en psicología vocacional.
    // Cómo llegó al resultado revela el estilo de trabajo natural más que
    // cualquier pregunta directa sobre preferencias.
    enunciado: 'Pensá en algo de lo que estés orgulloso/a — puede ser pequeño. ¿Cómo llegaste a ese resultado?',
    opciones: [
      { id: 'A', texto: 'Me concentré solo/a y lo fui construyendo paso a paso, sin apuro', scores: { I: 8, C: 4, autonomia: 8 } },
      { id: 'B', texto: 'Armé un equipo o convencí a otros para que sumaran al proyecto', scores: { E: 10, S: 6 } },
      { id: 'C', texto: 'Tuve una idea que nadie había tenido y la ejecuté a mi manera', scores: { A: 10, I: 4, autonomia: 6 } },
      { id: 'D', texto: 'Seguí un proceso muy bien y lo ejecuté mejor que lo esperado', scores: { C: 10, R: 4 } },
    ],
  },

  {
    id: 'act_9',
    bloque: 'actividad',
    tipo: 'situational',
    // Por qué: reemplaza la escala "la incertidumbre te activa". Esta
    // situación concreta (oferta con riesgo real) mide la tolerancia al
    // riesgo de forma mucho más válida. Discrimina E/emprendedor vs C/organizador.
    enunciado: 'Te ofrecen un proyecto que podría ser muy bueno, pero no hay garantías ni estructura clara. ¿Qué hacés?',
    opciones: [
      { id: 'A', texto: 'Lo tomo — no saber el resultado me parece emocionante, no amenazante', scores: { E: 10, riesgo: 10 } },
      { id: 'B', texto: 'Pido más información antes de decidir — quiero entender bien qué implica', scores: { I: 8, C: 4 } },
      { id: 'C', texto: 'Solo lo acepto si primero hay un plan mínimo que me dé cierta seguridad', scores: { C: 8, seguridad: 8 } },
      { id: 'D', texto: 'Prefiero algo más estable — el riesgo me genera más estrés que entusiasmo', scores: { C: 6, seguridad: 10, rutina: 6 } },
    ],
  },

  {
    id: 'act_10',
    bloque: 'actividad',
    tipo: 'forced_choice',
    // Por qué: ranking de valores simplificado. Discrimina los motivadores
    // profundos. Fuerza elegir UNO entre cuatro cosas que a la mayoría le
    // "importan todas" — eso es exactamente lo que necesita el modelo.
    enunciado: 'Si pudieras garantizarte una sola cosa de tu trabajo ideal, ¿cuál elegiría?',
    opciones: [
      { id: 'A', texto: 'Ganar bien desde el principio', scores: { E: 4, C: 4, seguridad: 8 } },
      { id: 'B', texto: 'Sentir que lo que hago ayuda a otras personas de verdad', scores: { S: 10, impacto: 10 } },
      { id: 'C', texto: 'Tener libertad de hacer las cosas a mi manera y en mis tiempos', scores: { A: 6, autonomia: 10 } },
      { id: 'D', texto: 'Construir algo reconocido — que me identifiquen con lo que logré', scores: { E: 8, I: 4 } },
    ],
  },

  {
    id: 'act_11',
    bloque: 'actividad',
    tipo: 'situational',
    // Por qué: hablar en público es una situación con carga emocional que
    // discrimina E/S (disfrutan la audiencia) vs I/A (prefieren otros formatos).
    // No pregunta si "le gusta" sino cómo reacciona — más válido.
    enunciado: 'Te piden que presentes un tema que conocés muy bien frente a 30 personas. ¿Cómo lo vivís?',
    opciones: [
      { id: 'A', texto: 'Me gusta — es una oportunidad de que me escuchen y de conectar', scores: { E: 8, S: 6, A: 4 } },
      { id: 'B', texto: 'Lo hago bien si hace falta, pero no es lo que más disfruto', scores: { I: 4, C: 4 } },
      { id: 'C', texto: 'Prefiero escribirlo o hacer algo visual — el foco no me incomoda, pero soy más de hacer', scores: { A: 8, I: 4 } },
      { id: 'D', texto: 'Me genera ansiedad real — prefiero formatos más personales o individuales', scores: { S: 4, seguridad: 4 } },
    ],
  },

  {
    id: 'act_12',
    bloque: 'actividad',
    tipo: 'forced_choice',
    // Por qué: cierre del bloque con el discriminador más directo de todos:
    // qué tipo de semana de trabajo sería ideal. Es el resumen conductual
    // de todo el bloque y sirve como check de consistencia interna.
    enunciado: 'Si pudieras elegir cómo es tu semana de trabajo, ¿cuál de estos te resulta más atractivo?',
    opciones: [
      { id: 'A', texto: 'Resolver un problema técnico complejo, solo/a, con concentración profunda', scores: { I: 10, R: 6, autonomia: 8 } },
      { id: 'B', texto: 'Trabajar codo a codo con personas — en movimiento, con contacto directo', scores: { S: 10, E: 4, equipo: 10 } },
      { id: 'C', texto: 'Crear algo desde cero — diseño, texto, código, concepto — sin límites rígidos', scores: { A: 10, autonomia: 6 } },
      { id: 'D', texto: 'Gestionar muchas cosas a la vez y que todo salga en tiempo y forma', scores: { C: 10, E: 6 } },
    ],
  },

  // ── BLOQUE 2: ENTORNO DE TRABAJO ─────────────────────────────────────────
  // Por qué existe este bloque: el modelo RIASEC mide qué tipo de actividad
  // te gusta. El entorno mide EN QUÉ CONDICIONES podés dar lo mejor.
  // Dos personas con el mismo RIASEC pueden necesitar entornos muy distintos.

  {
    id: 'ent_1',
    bloque: 'entorno',
    tipo: 'forced_choice',
    // Por qué: discrimina R/campo vs I/interior vs A/estudio vs E/movimiento.
    // La elección de entorno físico es muy predictiva del ajuste laboral a largo plazo.
    enunciado: '¿En qué tipo de espacio te imaginás pasando la mayor parte de tu vida laboral?',
    opciones: [
      { id: 'A', texto: 'Laboratorio, oficina o aula — espacio interior, concentrado', scores: { I: 4, C: 4 } },
      { id: 'B', texto: 'Terreno, obra, campo, hospital — contacto directo con el mundo real', scores: { R: 10, S: 4 } },
      { id: 'C', texto: 'Estudio, taller o espacio creativo propio', scores: { A: 10, autonomia: 6 } },
      { id: 'D', texto: 'Distintos lugares — moviéndome, visitando, conociendo contextos nuevos', scores: { E: 6, S: 4 } },
    ],
  },

  {
    id: 'ent_2',
    bloque: 'entorno',
    tipo: 'situational',
    // Por qué: reemplaza la escala "¿preferís rutina?". Esta situación
    // (propuesta de cambio de rutina) es mucho más concreta y mide
    // la respuesta emocional real ante la variabilidad, no la autoimagen.
    enunciado: 'Tu trabajo viene funcionando bien hace meses. Te proponen rediseñar todo el proceso desde cero. ¿Cómo lo recibís?',
    opciones: [
      { id: 'A', texto: 'Con entusiasmo — la variedad y los cambios me mantienen activo/a', scores: { A: 4, E: 4, riesgo: 6 } },
      { id: 'B', texto: 'Lo evalúo — si tiene sentido, bienvenido el cambio', scores: { I: 6 } },
      { id: 'C', texto: 'Con cierta resistencia — prefiero ajustar lo que funciona, no tirar todo', scores: { C: 6, rutina: 6 } },
      { id: 'D', texto: 'Me incomoda — los procesos estables me dan más seguridad para trabajar bien', scores: { C: 8, seguridad: 8, rutina: 10 } },
    ],
  },

  {
    id: 'ent_3',
    bloque: 'entorno',
    tipo: 'forced_choice',
    // Por qué: presencial/remoto es un filtro práctico pero también
    // es un proxy de S (necesita presencia humana) vs I (funciona solo).
    enunciado: '¿Cómo preferirías trabajar en cuanto a presencia física?',
    opciones: [
      { id: 'A', texto: 'Presencial — me activa el ambiente compartido y el contacto cotidiano', scores: { S: 6, equipo: 8 } },
      { id: 'B', texto: 'Remoto — trabajo mejor desde mi espacio, con menos interrupciones', scores: { I: 6, autonomia: 8 } },
      { id: 'C', texto: 'Híbrido — quiero lo mejor de los dos mundos', scores: { E: 4 } },
      { id: 'D', texto: 'No me importa — me adapto a lo que pida el rol', scores: {} },
    ],
  },

  {
    id: 'ent_4',
    bloque: 'entorno',
    tipo: 'forced_choice',
    // Por qué: tipo de organización es altamente predictivo de ajuste.
    // Discrimina C/estructura grande vs E/startup vs A/independiente
    // vs S/impacto. Las diferencias son muy reales y marcan satisfacción laboral.
    enunciado: '¿En qué tipo de organización te imaginarías más cómodo/a?',
    opciones: [
      { id: 'A', texto: 'Empresa grande con estructura, carrera definida y procesos claros', scores: { C: 8, seguridad: 8 } },
      { id: 'B', texto: 'Startup o equipo chico — más impacto, menos jerarquía, más riesgo', scores: { E: 10, riesgo: 6 } },
      { id: 'C', texto: 'Independiente o freelance — mi propio proyecto, a mi ritmo', scores: { A: 6, autonomia: 10, riesgo: 8 } },
      { id: 'D', texto: 'Estado o sector público — estabilidad y posibilidad de impacto colectivo', scores: { C: 6, S: 6, seguridad: 10, impacto: 6 } },
    ],
  },

  {
    id: 'ent_5',
    bloque: 'entorno',
    tipo: 'situational',
    // Por qué: reemplaza la escala "¿preferís autonomía?". Esta situación
    // (tu jefe no supervisa) mide cómo se siente el usuario con autonomía real,
    // no qué cree que prefiere en abstracto.
    enunciado: 'Tu jefe o cliente dejó de supervisarte de cerca. Ahora definís vos cómo hacés el trabajo. ¿Cómo te sentís?',
    opciones: [
      { id: 'A', texto: 'Liberado/a — es exactamente lo que necesito para dar lo mejor', scores: { autonomia: 10, A: 4, E: 4 } },
      { id: 'B', texto: 'Bien, pero me quedo más tranquilo/a si puedo consultar cuando lo necesito', scores: { autonomia: 6 } },
      { id: 'C', texto: 'Un poco incómodo/a — me gusta saber que alguien revisa que voy bien', scores: { C: 4, seguridad: 6 } },
      { id: 'D', texto: 'Me cuesta — necesito validación y estructura para trabajar con confianza', scores: { C: 8, seguridad: 8 } },
    ],
  },

  {
    id: 'ent_6',
    bloque: 'entorno',
    tipo: 'forced_choice',
    // Por qué: largo plazo vs corto plazo es un discriminador clave
    // entre perfiles investigativos (les gusta construir cosas que tardan)
    // y emprendedores/realistas (necesitan ver resultados rápido para mantenerse motivados).
    enunciado: '¿Qué tipo de satisfacción laboral te motiva más?',
    opciones: [
      { id: 'A', texto: 'Ver el resultado de lo que hice ese mismo día o esa misma semana', scores: { R: 6, E: 4 } },
      { id: 'B', texto: 'Construir algo de largo plazo que valdrá la pena en años', scores: { I: 8, C: 4 } },
      { id: 'C', texto: 'Aprender algo nuevo en cada proyecto — siempre estar creciendo', scores: { I: 6, A: 4 } },
      { id: 'D', texto: 'Saber que hoy hice diferencia concreta en la vida de alguien', scores: { S: 10, impacto: 10 } },
    ],
  },

  {
    id: 'ent_7',
    bloque: 'entorno',
    tipo: 'forced_choice',
    // Por qué: rol técnico vs coordinación vs creativo es una de las
    // decisiones más importantes en la vida laboral y la más frecuentemente
    // equivocada. Forzar la elección aquí previene el "quiero hacer todo".
    enunciado: '¿Qué rol te imaginás más en un equipo de trabajo?',
    opciones: [
      { id: 'A', texto: 'El experto/a técnico — la persona que más sabe sobre el tema', scores: { R: 8, I: 6 } },
      { id: 'B', texto: 'El coordinador/a — el que conecta personas, gestiona tiempos y facilita', scores: { E: 8, S: 6, C: 4 } },
      { id: 'C', texto: 'El creativo/a — el que propone ideas y da forma a lo nuevo', scores: { A: 10, I: 4 } },
      { id: 'D', texto: 'Me muevo entre roles según lo que necesita el proyecto', scores: { E: 4, I: 4 } },
    ],
  },

  {
    id: 'ent_8',
    bloque: 'entorno',
    tipo: 'scale',
    // Por qué: impacto social es el único ítem que dejamos en escala porque
    // su intensidad es lo que importa — no hay forma de capturarlo bien
    // con una situación. Pero usamos anclas conductuales concretas.
    enunciado: '¿Cuánto te importa que tu trabajo tenga un impacto real en otras personas o en la sociedad?',
    anclaMin: 'No es un factor determinante para mí',
    anclaMax: 'Es fundamental — sin eso no me imagino trabajando',
    opciones: [
      { id: '1', texto: '1', scores: {} },
      { id: '2', texto: '2', scores: { impacto: 2 } },
      { id: '3', texto: '3', scores: { impacto: 5 } },
      { id: '4', texto: '4', scores: { S: 6, impacto: 8 } },
      { id: '5', texto: '5', scores: { S: 10, impacto: 10 } },
    ],
  },

  // ── BLOQUE 3: AUTOCONOCIMIENTO ───────────────────────────────────────────
  // Por qué este bloque: mide la madurez vocacional y detecta sesgos externos.
  // No afecta el RIASEC pero sí la confianza del resultado y el texto del informe.

  {
    id: 'auto_1',
    bloque: 'autoconocimiento',
    tipo: 'forced_choice',
    // Por qué: más específico que una escala de claridad. Discrimina entre
    // "no sé qué quiero" (perfil plano esperado) vs "tengo opciones concretas"
    // (perfil más definido) vs "me define todo el contexto externo".
    enunciado: '¿Cómo describirías tu situación actual respecto a elegir carrera?',
    opciones: [
      { id: 'A', texto: 'No tengo ni idea por dónde empezar — estoy en cero' },
      { id: 'B', texto: 'Tengo algunas ideas vagas pero nada concreto todavía' },
      { id: 'C', texto: 'Manejo dos o tres opciones en mente y quiero decidir entre ellas' },
      { id: 'D', texto: 'Tengo una opción bastante clara pero algo me genera duda' },
    ],
  },

  {
    id: 'auto_2',
    bloque: 'autoconocimiento',
    tipo: 'forced_choice',
    // Por qué: detecta influencia externa. Si hay presión alta y el perfil
    // resultante no coincide con las expectativas del entorno, el informe
    // puede alertarlo. No penaliza el score — solo enriquece la interpretación.
    enunciado: '¿Hay personas en tu entorno que esperan que estudies algo en particular?',
    subtext: 'Esta respuesta no afecta tu resultado — nos ayuda a interpretar el contexto.',
    opciones: [
      { id: 'no', texto: 'No, tengo total libertad para elegir' },
      { id: 'leve', texto: 'Hay expectativas, pero siento que puedo elegir igual' },
      { id: 'fuerte', texto: 'Hay bastante presión y me cuesta ignorarla' },
      { id: 'prefiero', texto: 'Prefiero no responder' },
    ],
  },

  {
    id: 'auto_3',
    bloque: 'autoconocimiento',
    tipo: 'situational',
    // Por qué: el proceso de toma de decisiones es altamente predictivo
    // del estilo cognitivo. Discrimina I/analítico vs S/consultivo
    // vs A/intuitivo vs E/experimental. Valida la consistencia con el bloque 1.
    enunciado: 'Cuando tenés que tomar una decisión importante en tu vida, ¿cómo la tomás?',
    opciones: [
      { id: 'A', texto: 'Analizo toda la información disponible antes de moverme', scores: { I: 8, C: 4 } },
      { id: 'B', texto: 'Hablo con personas de confianza y peso sus perspectivas', scores: { S: 8, equipo: 6 } },
      { id: 'C', texto: 'Me guío por lo que me dice el instinto cuando tengo la info básica', scores: { A: 6, riesgo: 6 } },
      { id: 'D', texto: 'Pruebo algo concreto y ajusto según lo que pasa', scores: { E: 8, R: 4 } },
    ],
  },

  {
    id: 'auto_4',
    bloque: 'autoconocimiento',
    tipo: 'forced_choice',
    // Por qué: el miedo específico al elegir carrera revela qué dimensión
    // le importa más al usuario. Miedo a equivocarse → seguridad.
    // Miedo a decepcionar → social. Miedo a no saber quién es → autoconocimiento bajo.
    enunciado: '¿Qué te genera más ansiedad cuando pensás en elegir carrera?',
    opciones: [
      { id: 'A', texto: 'Equivocarme y perder años de mi vida', scores: { seguridad: 8 } },
      { id: 'B', texto: 'No encontrar trabajo o que no pague bien', scores: { seguridad: 6 } },
      { id: 'C', texto: 'Decepcionar a las personas que quiero', scores: { S: 4 } },
      { id: 'D', texto: 'No saber realmente quién soy ni qué quiero', scores: {} },
    ],
  },

  {
    id: 'auto_5',
    bloque: 'autoconocimiento',
    tipo: 'scale',
    // Por qué: único ítem de escala que dejamos en autoconocimiento.
    // El nivel de claridad vocacional afecta cómo presentar el resultado
    // (con más o menos contexto orientativo). Anclas conductuales claras.
    enunciado: 'Más allá del test, ¿qué tan claro/a tenés lo que querés estudiar?',
    anclaMin: 'Estoy en cero — no tengo la menor idea',
    anclaMax: 'Estoy muy seguro/a — el test lo confirma o lo cuestiona',
    opciones: [
      { id: '1', texto: '1', scores: {} },
      { id: '2', texto: '2', scores: {} },
      { id: '3', texto: '3', scores: {} },
      { id: '4', texto: '4', scores: {} },
      { id: '5', texto: '5', scores: {} },
    ],
  },

  // ── BLOQUE 4: ADAPTATIVAS (máx 3, solo si hay ambigüedad) ───────────────
  // Por qué: si el margen entre los dos primeros arquetipos es < 8 puntos,
  // se activan preguntas de "desempate" que discriminan la dimensión en conflicto.

  {
    id: 'adap_1',
    bloque: 'adaptativa',
    tipo: 'forced_choice',
    enunciado: 'Entre estas dos tareas, ¿cuál te resulta más natural hacer bien?',
    subtext: 'Una última pregunta para afinar tu perfil.',
    opciones: [
      { id: 'A', texto: 'Construir o arreglar algo físico y ver el resultado tangible', scores: { R: 10 } },
      { id: 'B', texto: 'Entender a fondo por qué algo funciona o falla', scores: { I: 10 } },
    ],
    condicion: () => true,
  },

  {
    id: 'adap_2',
    bloque: 'adaptativa',
    tipo: 'forced_choice',
    enunciado: 'Si trabajaras en un proyecto de impacto social, ¿qué rol preferirías?',
    subtext: 'Una última pregunta para afinar tu perfil.',
    opciones: [
      { id: 'A', texto: 'Diseñar la estrategia y convencer a otros de implementarla', scores: { E: 10, S: 2 } },
      { id: 'B', texto: 'Trabajar directamente con las personas a las que ayuda el proyecto', scores: { S: 10, E: 2 } },
    ],
    condicion: () => true,
  },

  {
    id: 'adap_3',
    bloque: 'adaptativa',
    tipo: 'forced_choice',
    enunciado: 'En un proyecto creativo, ¿qué parte disfrutás más?',
    subtext: 'Una última pregunta para afinar tu perfil.',
    opciones: [
      { id: 'A', texto: 'La expresión libre — crear sin reglas ni formatos fijos', scores: { A: 10 } },
      { id: 'B', texto: 'La ejecución precisa — que todo esté perfecto y bien terminado', scores: { C: 10, A: 2 } },
    ],
    condicion: () => true,
  },
];

export const CONTEXT_QUESTION_IDS = QUESTIONS
  .filter(q => q.bloque === 'contexto')
  .map(q => q.id);

export const SCORED_QUESTION_IDS = QUESTIONS
  .filter(q => q.bloque !== 'contexto')
  .map(q => q.id);
