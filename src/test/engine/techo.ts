// Ceiling constants + normalization function
// TECHO = pre-calculated max theoretical score per archetype

export const TECHO: Record<string, number> = {
  arquitecto:   112,
  constructor:   60,
  sanador:       75,
  catalizador:   95,
  artifice:      80,
  interprete:    56,
  orquestador:   83,
  descubridor:  100,
  arbitro:       63,
  custodio:      46,
  narrador:      66,
  anfitrion:     34,
};

const MAX_TECHO = Math.max(...Object.values(TECHO));

/**
 * Returns 0–100 representing how much of the theoretical maximum was achieved.
 * If arquetipoId is unknown, falls back to raw / MAX_TECHO * 100.
 */
export function normalizePct(rawScore: number, arquetipoId: string): number {
  const ceiling = TECHO[arquetipoId] ?? MAX_TECHO;
  if (ceiling <= 0) return 0;
  return Math.min(100, (rawScore / ceiling) * 100);
}
