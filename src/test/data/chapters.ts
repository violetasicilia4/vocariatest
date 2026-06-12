/**
 * Capítulos del test — agrupan las preguntas en bloques conceptuales para
 * crear sensación de progreso por etapas y hacer que el test "parezca más
 * corto". Cada capítulo abarca un rango de índices del núcleo de preguntas;
 * todo lo que excede el núcleo (fase adaptativa) cae en el capítulo final.
 */
export interface Chapter {
  id: string;
  /** Número de orden (1-based). */
  numero: number;
  titulo: string;
  /** Subtítulo corto, calmo, orientado al autodescubrimiento. */
  subtitulo: string;
  /** Índice (0-based) de la primera pregunta del capítulo en el núcleo. */
  start: number;
  /** Marca el tramo adaptativo: el recorrido deja de ser igual para todos. */
  adaptive?: boolean;
}

export const CHAPTERS: Chapter[] = [
  { id: 'pensar', numero: 1, titulo: 'Cómo pensás',      subtitulo: 'La forma en que abordás lo nuevo y lo incierto.', start: 0 },
  { id: 'mueve',  numero: 2, titulo: 'Qué te mueve',     subtitulo: 'Lo que te da energía y lo que te importa de verdad.', start: 4 },
  { id: 'trabajo',numero: 3, titulo: 'Cómo trabajás',    subtitulo: 'Tu relación con las personas, el ritmo y el entorno.', start: 10 },
  { id: 'rumbo',  numero: 4, titulo: 'Hacia dónde vas',  subtitulo: 'La vida profesional que te resuena de verdad.', start: 16 },
];

/** Capítulo "extra" para la fase adaptativa (índices fuera del núcleo). */
export const ADAPTIVE_CHAPTER: Chapter = {
  id: 'afinar',
  numero: CHAPTERS.length + 1,
  titulo: 'Afinando tu perfil',
  subtitulo: 'Elegimos estas preguntas según cómo venís respondiendo. No todos reciben las mismas.',
  start: -1,
  adaptive: true,
};

export const TOTAL_CHAPTERS = CHAPTERS.length + 1;

export interface ChapterPosition {
  chapter: Chapter;
  /** ¿Es la primera pregunta de este capítulo? (dispara la transición) */
  isFirstOfChapter: boolean;
  /** Posición dentro del capítulo (1-based) y total del capítulo. */
  indexInChapter: number;
  countInChapter: number;
}

/**
 * Resuelve a qué capítulo pertenece una pregunta.
 * @param index  índice 0-based de la pregunta dentro del array completo.
 * @param coreLength  cantidad de preguntas del núcleo (sin adaptativas).
 */
export function getChapterPosition(index: number, coreLength: number): ChapterPosition {
  if (index >= coreLength) {
    const indexInChapter = index - coreLength + 1;
    return {
      chapter: ADAPTIVE_CHAPTER,
      isFirstOfChapter: index === coreLength,
      indexInChapter,
      countInChapter: 0, // desconocido de antemano; se muestra sin total
    };
  }

  let ch = CHAPTERS[0];
  for (const c of CHAPTERS) {
    if (index >= c.start) ch = c;
  }
  const next = CHAPTERS.find(c => c.numero === ch.numero + 1);
  const end = next ? next.start : coreLength;
  return {
    chapter: ch,
    isFirstOfChapter: index === ch.start,
    indexInChapter: index - ch.start + 1,
    countInChapter: end - ch.start,
  };
}
