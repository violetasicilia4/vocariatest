/**
 * Banco de preguntas adaptativas ("duelos").
 *
 * Estas preguntas NO alimentan el vector de señales (eso invalidaría la
 * calibración por percentiles del motor): cada opción suma puntos de
 * desempate directamente a la emergencia de los arquetipos en disputa.
 *
 * El selector (engine/adaptive.ts) elige, según qué arquetipos quedaron
 * peleados tras las 18 preguntas núcleo, las preguntas de este banco que
 * mejor discriminan esos pares. Cada usuario ve entre 0 y 5 de estas.
 *
 * Diseño del banco: cada opción favorece fuerte a UN arquetipo (8 pts) y
 * débil a uno afín (3 pts). Cada arquetipo aparece fuerte en 4-5 preguntas,
 * así cualquier par en disputa tiene al menos 2-3 duelos disponibles.
 */

import type { Question } from './questions';

export const ADAPTIVE_QUESTIONS: Question[] = [

  {
    id: 'adp_exito',
    tipo: 'situacional',
    enunciado: 'Imaginate a los 35 años sintiendo que "lo lograste". ¿Cuál de estas escenas se parece más a ese momento?',
    subtext: 'Pregunta de precisión: tu perfil está entre dos caminos y esto nos ayuda a afinarlo.',
    opciones: [
      { id: 'a', texto: 'Sos una de las personas que más sabe de tu tema. Te consultan de todo el mundo.', scores: { descubridor: 8, interprete: 3 } },
      { id: 'b', texto: 'Dirigís un equipo u organización que vos ayudaste a construir y que funciona.', scores: { orquestador: 8, arquitecto: 3 } },
      { id: 'c', texto: 'Hay personas concretas cuya vida cambió porque vos las acompañaste.', scores: { sanador: 8, catalizador: 3 } },
      { id: 'd', texto: 'Existe una obra tuya —algo creado por vos— que la gente reconoce y valora.', scores: { artifice: 8, narrador: 3 } },
    ],
  },

  {
    id: 'adp_lunes',
    tipo: 'situacional',
    enunciado: 'Es lunes a la mañana y podés elegir tu tarea del día. ¿Cuál agarrás?',
    opciones: [
      { id: 'a', texto: 'Hundirte en una base de datos hasta encontrar el patrón que explica un problema.', scores: { interprete: 8, descubridor: 3 } },
      { id: 'b', texto: 'Pasar el día en el taller / la obra / el campo resolviendo algo con tus manos.', scores: { constructor: 8, custodio: 3 } },
      { id: 'c', texto: 'Organizar un encuentro donde la gente se conozca, participe y la pase bien.', scores: { anfitrion: 8, catalizador: 3 } },
      { id: 'd', texto: 'Escribir o producir una pieza que comunique una idea que te importa.', scores: { narrador: 8, artifice: 3 } },
    ],
  },

  {
    id: 'adp_problema',
    tipo: 'situacional',
    enunciado: 'Te ofrecen cuatro problemas para dedicarle el próximo año. ¿Cuál elegís?',
    opciones: [
      { id: 'a', texto: 'Diseñar desde cero un sistema complejo que tiene que funcionar sin fallas.', scores: { arquitecto: 8, constructor: 3 } },
      { id: 'b', texto: 'Una pregunta abierta que nadie pudo responder todavía.', scores: { descubridor: 8, interprete: 3 } },
      { id: 'c', texto: 'Un caso real donde hay que decidir qué es justo cuando las reglas no alcanzan.', scores: { arbitro: 8, narrador: 3 } },
      { id: 'd', texto: 'Una comunidad con un problema concreto que necesita organizarse para resolverlo.', scores: { catalizador: 8, anfitrion: 3 } },
    ],
  },

  {
    id: 'adp_lectura',
    tipo: 'situacional',
    enunciado: 'Tenés una tarde libre y cuatro contenidos para elegir. ¿Cuál te atrapa de verdad?',
    opciones: [
      { id: 'a', texto: 'Un documental sobre un descubrimiento científico y cómo se llegó a él.', scores: { descubridor: 8, arquitecto: 3 } },
      { id: 'b', texto: 'Un ensayo provocador que cambia cómo pensás un tema social.', scores: { narrador: 8, arbitro: 3 } },
      { id: 'c', texto: 'Una historia sobre alguien que recuperó un ecosistema o un lugar degradado.', scores: { custodio: 8, sanador: 3 } },
      { id: 'd', texto: 'Un análisis con números reales: por qué fracasó una empresa o una política.', scores: { interprete: 8, orquestador: 3 } },
    ],
  },

  {
    id: 'adp_equipo',
    tipo: 'situacional',
    enunciado: 'Arranca un proyecto grande con un equipo nuevo. ¿Qué lugar ocupás naturalmente?',
    opciones: [
      { id: 'a', texto: 'Coordinás: repartís tareas, destrabás problemas y empujás para llegar a la meta.', scores: { orquestador: 8, catalizador: 3 } },
      { id: 'b', texto: 'Ejecutás: agarrás la parte más concreta y la hacés funcionar.', scores: { constructor: 8, custodio: 3 } },
      { id: 'c', texto: 'Diseñás el plan: cómo se conectan las partes para que todo cierre.', scores: { arquitecto: 8, interprete: 3 } },
      { id: 'd', texto: 'Cuidás al grupo: que todos se sientan parte y nadie quede afuera.', scores: { anfitrion: 8, sanador: 3 } },
    ],
  },

  {
    id: 'adp_ayuda',
    tipo: 'situacional',
    enunciado: 'Si tu trabajo fuera ayudar, ¿qué forma de ayudar te resulta más natural?',
    opciones: [
      { id: 'a', texto: 'Acompañar de cerca a una persona por vez, en su proceso, el tiempo que haga falta.', scores: { sanador: 8, anfitrion: 3 } },
      { id: 'b', texto: 'Armar un proyecto colectivo que mejore la situación de muchos a la vez.', scores: { catalizador: 8, orquestador: 3 } },
      { id: 'c', texto: 'Defender a quien fue tratado injustamente, con argumentos y de frente.', scores: { arbitro: 8, narrador: 3 } },
      { id: 'd', texto: 'Proteger un lugar, un recurso o un patrimonio para los que vienen después.', scores: { custodio: 8, constructor: 3 } },
    ],
  },

  {
    id: 'adp_crear',
    tipo: 'situacional',
    enunciado: 'Te dan seis meses pagos para crear lo que quieras. ¿Qué creás?',
    opciones: [
      { id: 'a', texto: 'Una obra con tu identidad: visual, musical, audiovisual. Algo que exprese algo tuyo.', scores: { artifice: 8, narrador: 3 } },
      { id: 'b', texto: 'Un objeto o herramienta útil que resuelva un problema real de la gente.', scores: { constructor: 8, arquitecto: 3 } },
      { id: 'c', texto: 'Un contenido —libro, podcast, canal— que instale una conversación nueva.', scores: { narrador: 8, catalizador: 3 } },
      { id: 'd', texto: 'Una plataforma o sistema que automatice algo que hoy es un caos.', scores: { arquitecto: 8, interprete: 3 } },
    ],
  },

  {
    id: 'adp_finde',
    tipo: 'situacional',
    enunciado: 'Fin de semana largo sin obligaciones. ¿Qué plan te recarga de verdad?',
    opciones: [
      { id: 'a', texto: 'Irte al campo, la montaña o el mar. Naturaleza, ritmo lento, sin pantallas.', scores: { custodio: 8, constructor: 3 } },
      { id: 'b', texto: 'Juntar gente: asado, juegos, sobremesa larga. Cuanta más gente querida, mejor.', scores: { anfitrion: 8, catalizador: 3 } },
      { id: 'c', texto: 'Meterte de lleno en un tema que te fascina: leer, mirar, tomar notas, conectar ideas.', scores: { descubridor: 8, narrador: 3 } },
      { id: 'd', texto: 'Avanzar un proyecto personal creativo que venís postergando.', scores: { artifice: 8, arquitecto: 3 } },
    ],
  },

  {
    id: 'adp_decision',
    tipo: 'situacional',
    enunciado: 'Tenés que tomar una decisión difícil que afecta a varias personas. ¿Qué pesa más en tu cabeza?',
    opciones: [
      { id: 'a', texto: 'Qué dicen los datos: sin evidencia, lo demás es opinión.', scores: { interprete: 8, arquitecto: 3 } },
      { id: 'b', texto: 'Cómo va a vivir cada persona involucrada las consecuencias.', scores: { sanador: 8, anfitrion: 3 } },
      { id: 'c', texto: 'Qué opción logra el mejor resultado global, aunque tenga costos.', scores: { orquestador: 8, constructor: 3 } },
      { id: 'd', texto: 'Qué es lo justo, más allá de que convenga o no.', scores: { arbitro: 8, custodio: 3 } },
    ],
  },

  {
    id: 'adp_orgullo',
    tipo: 'situacional',
    enunciado: 'De estos cuatro logros, ¿cuál te haría sentir más orgullo genuino?',
    opciones: [
      { id: 'a', texto: 'Algo tangible construido por vos que la gente usa todos los días.', scores: { constructor: 8, arquitecto: 3 } },
      { id: 'b', texto: 'Haber movilizado a un grupo grande de personas por una causa que valía la pena.', scores: { catalizador: 8, orquestador: 3 } },
      { id: 'c', texto: 'Haber anticipado con datos algo que nadie veía venir.', scores: { interprete: 8, descubridor: 3 } },
      { id: 'd', texto: 'Una idea tuya que ahora repite gente que ni te conoce.', scores: { narrador: 8, artifice: 3 } },
    ],
  },

  {
    id: 'adp_entorno',
    tipo: 'situacional',
    enunciado: '¿En cuál de estos entornos te imaginás trabajando mejor durante años?',
    opciones: [
      { id: 'a', texto: 'Al aire libre o en territorio: campo, planta, reserva, obra. Lejos del escritorio.', scores: { custodio: 8, constructor: 3 } },
      { id: 'b', texto: 'Tu propio estudio o taller, con tus tiempos y tu estética.', scores: { artifice: 8, descubridor: 3 } },
      { id: 'c', texto: 'Un lugar con movimiento y gente: se conversa, se atiende, pasan cosas.', scores: { anfitrion: 8, sanador: 3 } },
      { id: 'd', texto: 'Un espacio de concentración profunda con un equipo técnico chico y muy bueno.', scores: { arquitecto: 8, interprete: 3 } },
    ],
  },

  {
    id: 'adp_elogio',
    tipo: 'situacional',
    enunciado: 'De estos elogios, ¿cuál te llegaría más hondo?',
    opciones: [
      { id: 'a', texto: '"Nadie entiende este tema con la profundidad con que lo entendés vos."', scores: { descubridor: 8, interprete: 3 } },
      { id: 'b', texto: '"Lo que hiciste por mí me cambió la vida."', scores: { sanador: 8, catalizador: 3 } },
      { id: 'c', texto: '"Sin vos coordinando, esto no salía."', scores: { orquestador: 8, anfitrion: 3 } },
      { id: 'd', texto: '"Sos la persona más justa y derecha que conozco."', scores: { arbitro: 8, custodio: 3 } },
    ],
  },

  {
    id: 'adp_rechazo',
    tipo: 'situacional',
    enunciado: 'Si tuvieras que renunciar a un trabajo, ¿cuál de estos motivos te haría renunciar primero?',
    opciones: [
      { id: 'a', texto: 'Cero espacio creativo: todo está decidido y vos solo ejecutás el manual.', scores: { artifice: 8, descubridor: 3 } },
      { id: 'b', texto: 'Las decisiones se toman a ojo, ignorando la evidencia, y nadie mide nada.', scores: { interprete: 8, arquitecto: 3 } },
      { id: 'c', texto: 'El trabajo no le mejora la vida a nadie: es rentable pero vacío.', scores: { catalizador: 8, sanador: 3 } },
      { id: 'd', texto: 'Todo es reuniones y presentaciones: nunca se construye nada concreto.', scores: { constructor: 8, custodio: 3 } },
    ],
  },

  {
    id: 'adp_legado',
    tipo: 'situacional',
    enunciado: 'Pensando en qué dejás cuando ya no estés en ese trabajo, ¿qué legado te importa más?',
    opciones: [
      { id: 'a', texto: 'Un lugar (un bosque, una institución, un patrimonio) mejor conservado que como lo encontraste.', scores: { custodio: 8, arbitro: 3 } },
      { id: 'b', texto: 'Ideas tuyas que siguen circulando y formando a otros.', scores: { narrador: 8, descubridor: 3 } },
      { id: 'c', texto: 'Una comunidad de gente que se conoció y se sigue juntando gracias a vos.', scores: { anfitrion: 8, catalizador: 3 } },
      { id: 'd', texto: 'Un sistema que diseñaste y que sigue funcionando solo, años después.', scores: { arquitecto: 8, orquestador: 3 } },
    ],
  },

];
