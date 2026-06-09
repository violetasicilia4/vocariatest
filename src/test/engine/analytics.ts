/**
 * Event tracking schema for Vocaria feedback loop.
 */

export type VocariaEventType =
  | 'test_started'
  | 'question_answered'
  | 'test_completed'
  | 'result_viewed'
  | 'carrera_clicked'
  | 'carrera_guardada'
  | 'carrera_descartada'
  | 'arquetipo_identificado'
  | 'plan_selected'
  | 'checkout_started'
  | 'compra_completada';

// ---------------------------------------------------------------------------
// Typed data per event
// ---------------------------------------------------------------------------

export type EventData = {
  test_started: {
    source: string;
  };
  question_answered: {
    questionId: string;
    answerId: string;
    timeMs: number;
    questionIndex: number;
  };
  test_completed: {
    totalTimeMs: number;
    skippedCount: number;
  };
  result_viewed: {
    arquetipoId: string;
    confianza: number;
    planShown: string;
  };
  carrera_clicked: {
    carreraId: string;
    titulo: string;
    tag: 'top' | 'alternativa' | 'sorpresa';
    position: number;
    arquetipoOrigen: string;
  };
  carrera_guardada: {
    carreraId: string;
    titulo: string;
  };
  carrera_descartada: {
    carreraId: string;
    titulo: string;
  };
  arquetipo_identificado: {
    arquetipoId: string;
    pct: number;
    arquetiposActivos: string[];
  };
  plan_selected: {
    planId: string;
  };
  checkout_started: {
    planId: string;
    arquetipoId: string;
  };
  compra_completada: {
    planId: string;
    arquetipoId: string;
    amount: number;
  };
};

// ---------------------------------------------------------------------------
// Event shape
// ---------------------------------------------------------------------------

export interface VocariaEvent<T extends VocariaEventType = VocariaEventType> {
  type: T;
  sessionId: string;
  timestamp: number;
  data: EventData[T];
}

// ---------------------------------------------------------------------------
// Aggregate user metrics for analysis
// ---------------------------------------------------------------------------

export interface UserMetrics {
  sessionId: string;
  arquetipoId: string;
  confianza: number;
  completionRate: number;
  topCarrerasClicked: string[];
  convirtio: boolean;
  planComprado: string | null;
  tensionesDetectadas: string[];
}

// ---------------------------------------------------------------------------
// Helper: create a typed event
// ---------------------------------------------------------------------------

export function createEvent<T extends VocariaEventType>(
  type: T,
  sessionId: string,
  data: EventData[T],
): VocariaEvent<T> {
  return {
    type,
    sessionId,
    timestamp: Date.now(),
    data,
  };
}
