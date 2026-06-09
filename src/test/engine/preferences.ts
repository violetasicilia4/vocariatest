/**
 * Career preference dimensions extracted from test answers.
 * All values on a 0–100 scale.
 */
export interface CareerPreferences {
  personas: number;       // orientation toward working with people
  datos: number;          // orientation toward data, analysis, numbers
  objetos: number;        // orientation toward physical/tangible things
  ideas: number;          // orientation toward abstract concepts and systems
  creatividad: number;    // need for creative expression
  estructura: number;     // need for clear rules and defined processes
  autonomia: number;      // desire for independence in decision-making
  estabilidad: number;    // need for security and predictability
  teoria: number;         // preference for theoretical / conceptual work
  practica: number;       // preference for hands-on / applied work
  liderazgo: number;      // desire to lead and direct others
  colaboracion: number;   // desire for deep teamwork
  impactoSocial: number;  // motivation driven by social impact
  ingresos: number;       // motivation driven by financial reward
}

// ---------------------------------------------------------------------------
// Internal accumulator helpers
// ---------------------------------------------------------------------------

type DimKey = keyof CareerPreferences;

interface Contribution {
  questionId: string;
  optionId: string;
  dimension: DimKey;
  points: number;
}

/**
 * Maximum achievable raw points per dimension (used for normalisation).
 * These are the sums of the maximum possible contributions per dimension
 * across all questions, assuming multi-selects pick the most-contributing options.
 */
const DIM_MAX: Record<DimKey, number> = {
  personas:      40,
  datos:         35,
  objetos:       35,
  ideas:         40,
  creatividad:   35,
  estructura:    25,
  autonomia:     35,
  estabilidad:   25,
  teoria:        30,
  practica:      35,
  liderazgo:     35,
  colaboracion:  30,
  impactoSocial: 40,
  ingresos:      20,
};

// ---------------------------------------------------------------------------
// Contribution table
// Each entry: { questionId, optionId, dimension, points }
// ---------------------------------------------------------------------------

const CONTRIBUTIONS: Contribution[] = [
  // ── sit_1: how do you learn something new? ──────────────────────────────
  { questionId: 'sit_1', optionId: 'a', dimension: 'teoria',        points: 10 },
  { questionId: 'sit_1', optionId: 'a', dimension: 'ideas',         points: 6  },
  { questionId: 'sit_1', optionId: 'b', dimension: 'practica',      points: 10 },
  { questionId: 'sit_1', optionId: 'b', dimension: 'objetos',       points: 4  },
  { questionId: 'sit_1', optionId: 'c', dimension: 'personas',      points: 10 },
  { questionId: 'sit_1', optionId: 'c', dimension: 'colaboracion',  points: 5  },
  { questionId: 'sit_1', optionId: 'd', dimension: 'ideas',         points: 10 },
  { questionId: 'sit_1', optionId: 'd', dimension: 'estructura',    points: 4  },

  // ── vis_1: which situation gives you the most energy? ───────────────────
  { questionId: 'vis_1', optionId: 'a', dimension: 'ideas',         points: 10 },
  { questionId: 'vis_1', optionId: 'a', dimension: 'teoria',        points: 5  },
  { questionId: 'vis_1', optionId: 'b', dimension: 'personas',      points: 10 },
  { questionId: 'vis_1', optionId: 'b', dimension: 'impactoSocial', points: 5  },
  { questionId: 'vis_1', optionId: 'c', dimension: 'creatividad',   points: 10 },
  { questionId: 'vis_1', optionId: 'c', dimension: 'autonomia',     points: 5  },
  { questionId: 'vis_1', optionId: 'd', dimension: 'ideas',         points: 10 },
  { questionId: 'vis_1', optionId: 'd', dimension: 'estructura',    points: 6  },
  { questionId: 'vis_1', optionId: 'e', dimension: 'impactoSocial', points: 10 },
  { questionId: 'vis_1', optionId: 'e', dimension: 'objetos',       points: 4  },
  { questionId: 'vis_1', optionId: 'f', dimension: 'liderazgo',     points: 8  },
  { questionId: 'vis_1', optionId: 'f', dimension: 'impactoSocial', points: 6  },

  // ── sca_1: how important is knowing what is expected of you? (structure) ─
  { questionId: 'sca_1', optionId: '1', dimension: 'autonomia',     points: 10 },
  { questionId: 'sca_1', optionId: '2', dimension: 'autonomia',     points: 6  },
  { questionId: 'sca_1', optionId: '2', dimension: 'estructura',    points: 4  },
  { questionId: 'sca_1', optionId: '3', dimension: 'estructura',    points: 5  },
  { questionId: 'sca_1', optionId: '3', dimension: 'autonomia',     points: 3  },
  { questionId: 'sca_1', optionId: '4', dimension: 'estructura',    points: 7  },
  { questionId: 'sca_1', optionId: '5', dimension: 'estructura',    points: 10 },
  { questionId: 'sca_1', optionId: '5', dimension: 'estabilidad',   points: 5  },

  // ── sit_2: making an important decision with incomplete information ───────
  { questionId: 'sit_2', optionId: 'a', dimension: 'datos',         points: 10 },
  { questionId: 'sit_2', optionId: 'a', dimension: 'estructura',    points: 5  },
  { questionId: 'sit_2', optionId: 'b', dimension: 'autonomia',     points: 10 },
  { questionId: 'sit_2', optionId: 'b', dimension: 'practica',      points: 5  },
  { questionId: 'sit_2', optionId: 'c', dimension: 'personas',      points: 10 },
  { questionId: 'sit_2', optionId: 'c', dimension: 'colaboracion',  points: 6  },
  { questionId: 'sit_2', optionId: 'd', dimension: 'liderazgo',     points: 8  },
  { questionId: 'sit_2', optionId: 'd', dimension: 'personas',      points: 6  },

  // ── mul_1: most important career aspects (multiselect, max 3) ────────────
  { questionId: 'mul_1', optionId: 'a', dimension: 'ideas',         points: 8  },
  { questionId: 'mul_1', optionId: 'a', dimension: 'teoria',        points: 4  },
  { questionId: 'mul_1', optionId: 'b', dimension: 'impactoSocial', points: 10 },
  { questionId: 'mul_1', optionId: 'b', dimension: 'personas',      points: 5  },
  { questionId: 'mul_1', optionId: 'c', dimension: 'autonomia',     points: 10 },
  { questionId: 'mul_1', optionId: 'd', dimension: 'estabilidad',   points: 10 },
  { questionId: 'mul_1', optionId: 'd', dimension: 'ingresos',      points: 4  },
  { questionId: 'mul_1', optionId: 'e', dimension: 'creatividad',   points: 10 },
  { questionId: 'mul_1', optionId: 'e', dimension: 'autonomia',     points: 4  },
  { questionId: 'mul_1', optionId: 'f', dimension: 'ingresos',      points: 10 },
  { questionId: 'mul_1', optionId: 'g', dimension: 'personas',      points: 8  },
  { questionId: 'mul_1', optionId: 'g', dimension: 'colaboracion',  points: 5  },
  { questionId: 'mul_1', optionId: 'h', dimension: 'liderazgo',     points: 8  },
  { questionId: 'mul_1', optionId: 'h', dimension: 'ingresos',      points: 4  },

  // ── anti_1: work aversions — no preference contributions (scores: {}) ────
  // (handled separately in tensions / penalty logic; no preference contribution here)

  // ── vis_2: natural role in groups ────────────────────────────────────────
  { questionId: 'vis_2', optionId: 'a', dimension: 'liderazgo',     points: 10 },
  { questionId: 'vis_2', optionId: 'a', dimension: 'ideas',         points: 6  },
  { questionId: 'vis_2', optionId: 'b', dimension: 'practica',      points: 10 },
  { questionId: 'vis_2', optionId: 'b', dimension: 'liderazgo',     points: 5  },
  { questionId: 'vis_2', optionId: 'c', dimension: 'personas',      points: 10 },
  { questionId: 'vis_2', optionId: 'c', dimension: 'colaboracion',  points: 8  },
  { questionId: 'vis_2', optionId: 'd', dimension: 'datos',         points: 8  },
  { questionId: 'vis_2', optionId: 'd', dimension: 'estructura',    points: 6  },
  { questionId: 'vis_2', optionId: 'e', dimension: 'creatividad',   points: 10 },
  { questionId: 'vis_2', optionId: 'e', dimension: 'ideas',         points: 6  },
  { questionId: 'vis_2', optionId: 'f', dimension: 'impactoSocial', points: 10 },
  { questionId: 'vis_2', optionId: 'f', dimension: 'personas',      points: 5  },

  // ── vis_sat: satisfaction at end of week ─────────────────────────────────
  { questionId: 'vis_sat', optionId: 'a', dimension: 'personas',      points: 10 },
  { questionId: 'vis_sat', optionId: 'a', dimension: 'impactoSocial', points: 7  },
  { questionId: 'vis_sat', optionId: 'b', dimension: 'datos',         points: 10 },
  { questionId: 'vis_sat', optionId: 'b', dimension: 'teoria',        points: 6  },
  { questionId: 'vis_sat', optionId: 'c', dimension: 'objetos',       points: 10 },
  { questionId: 'vis_sat', optionId: 'c', dimension: 'practica',      points: 8  },
  { questionId: 'vis_sat', optionId: 'd', dimension: 'creatividad',   points: 10 },
  { questionId: 'vis_sat', optionId: 'd', dimension: 'ideas',         points: 7  },
  { questionId: 'vis_sat', optionId: 'e', dimension: 'personas',      points: 8  },
  { questionId: 'vis_sat', optionId: 'e', dimension: 'liderazgo',     points: 6  },
  { questionId: 'vis_sat', optionId: 'f', dimension: 'estructura',    points: 8  },
  { questionId: 'vis_sat', optionId: 'f', dimension: 'liderazgo',     points: 5  },

  // ── sit_4: response to injustice ─────────────────────────────────────────
  { questionId: 'sit_4', optionId: 'a', dimension: 'autonomia',     points: 8  },
  { questionId: 'sit_4', optionId: 'a', dimension: 'liderazgo',     points: 5  },
  { questionId: 'sit_4', optionId: 'b', dimension: 'personas',      points: 10 },
  { questionId: 'sit_4', optionId: 'b', dimension: 'colaboracion',  points: 6  },
  { questionId: 'sit_4', optionId: 'c', dimension: 'ideas',         points: 8  },
  { questionId: 'sit_4', optionId: 'c', dimension: 'estructura',    points: 5  },
  { questionId: 'sit_4', optionId: 'd', dimension: 'liderazgo',     points: 10 },
  { questionId: 'sit_4', optionId: 'd', dimension: 'impactoSocial', points: 8  },

  // ── par_2: specialist vs generalist ──────────────────────────────────────
  { questionId: 'par_2', optionId: 'a', dimension: 'teoria',        points: 10 },
  { questionId: 'par_2', optionId: 'a', dimension: 'autonomia',     points: 5  },
  { questionId: 'par_2', optionId: 'b', dimension: 'liderazgo',     points: 8  },
  { questionId: 'par_2', optionId: 'b', dimension: 'colaboracion',  points: 7  },

  // ── sca_3: importance of personal expression in work ─────────────────────
  { questionId: 'sca_3', optionId: '1', dimension: 'estructura',    points: 8  },
  { questionId: 'sca_3', optionId: '2', dimension: 'impactoSocial', points: 6  },
  { questionId: 'sca_3', optionId: '3', dimension: 'creatividad',   points: 3  },
  { questionId: 'sca_3', optionId: '4', dimension: 'creatividad',   points: 8  },
  { questionId: 'sca_3', optionId: '4', dimension: 'autonomia',     points: 4  },
  { questionId: 'sca_3', optionId: '5', dimension: 'creatividad',   points: 12 },
  { questionId: 'sca_3', optionId: '5', dimension: 'autonomia',     points: 7  },

  // ── sit_6: ideal relationship with people at work ────────────────────────
  { questionId: 'sit_6', optionId: 'a', dimension: 'autonomia',     points: 10 },
  { questionId: 'sit_6', optionId: 'b', dimension: 'colaboracion',  points: 10 },
  { questionId: 'sit_6', optionId: 'b', dimension: 'personas',      points: 5  },
  { questionId: 'sit_6', optionId: 'c', dimension: 'personas',      points: 12 },
  { questionId: 'sit_6', optionId: 'c', dimension: 'impactoSocial', points: 6  },
  { questionId: 'sit_6', optionId: 'd', dimension: 'liderazgo',     points: 12 },
  { questionId: 'sit_6', optionId: 'd', dimension: 'personas',      points: 5  },

  // ── mul_2: activities that generate flow (multiselect, max 3) ────────────
  { questionId: 'mul_2', optionId: 'a', dimension: 'teoria',        points: 8  },
  { questionId: 'mul_2', optionId: 'a', dimension: 'ideas',         points: 5  },
  { questionId: 'mul_2', optionId: 'b', dimension: 'personas',      points: 8  },
  { questionId: 'mul_2', optionId: 'b', dimension: 'impactoSocial', points: 5  },
  { questionId: 'mul_2', optionId: 'c', dimension: 'creatividad',   points: 8  },
  { questionId: 'mul_2', optionId: 'c', dimension: 'objetos',       points: 5  },
  { questionId: 'mul_2', optionId: 'd', dimension: 'datos',         points: 10 },
  { questionId: 'mul_2', optionId: 'd', dimension: 'teoria',        points: 5  },
  { questionId: 'mul_2', optionId: 'e', dimension: 'liderazgo',     points: 10 },
  { questionId: 'mul_2', optionId: 'e', dimension: 'personas',      points: 5  },
  { questionId: 'mul_2', optionId: 'f', dimension: 'objetos',       points: 10 },
  { questionId: 'mul_2', optionId: 'f', dimension: 'practica',      points: 8  },
  { questionId: 'mul_2', optionId: 'g', dimension: 'creatividad',   points: 8  },
  { questionId: 'mul_2', optionId: 'g', dimension: 'ideas',         points: 6  },
  { questionId: 'mul_2', optionId: 'h', dimension: 'liderazgo',     points: 8  },
  { questionId: 'mul_2', optionId: 'h', dimension: 'estructura',    points: 5  },

  // ── sca_4: comfort with uncertainty ──────────────────────────────────────
  { questionId: 'sca_4', optionId: '1', dimension: 'estabilidad',   points: 10 },
  { questionId: 'sca_4', optionId: '1', dimension: 'estructura',    points: 6  },
  { questionId: 'sca_4', optionId: '2', dimension: 'estabilidad',   points: 7  },
  { questionId: 'sca_4', optionId: '2', dimension: 'estructura',    points: 4  },
  { questionId: 'sca_4', optionId: '3', dimension: 'autonomia',     points: 4  },
  { questionId: 'sca_4', optionId: '3', dimension: 'estabilidad',   points: 3  },
  { questionId: 'sca_4', optionId: '4', dimension: 'autonomia',     points: 8  },
  { questionId: 'sca_4', optionId: '5', dimension: 'autonomia',     points: 10 },
  { questionId: 'sca_4', optionId: '5', dimension: 'creatividad',   points: 4  },

  // ── par_3: innovation vs optimisation ────────────────────────────────────
  { questionId: 'par_3', optionId: 'a', dimension: 'creatividad',   points: 10 },
  { questionId: 'par_3', optionId: 'a', dimension: 'autonomia',     points: 5  },
  { questionId: 'par_3', optionId: 'b', dimension: 'practica',      points: 10 },
  { questionId: 'par_3', optionId: 'b', dimension: 'objetos',       points: 5  },

  // ── sit_fis: physical vs abstract project ────────────────────────────────
  { questionId: 'sit_fis', optionId: 'a', dimension: 'ideas',       points: 10 },
  { questionId: 'sit_fis', optionId: 'a', dimension: 'teoria',      points: 5  },
  { questionId: 'sit_fis', optionId: 'b', dimension: 'objetos',     points: 10 },
  { questionId: 'sit_fis', optionId: 'b', dimension: 'practica',    points: 8  },
  { questionId: 'sit_fis', optionId: 'c', dimension: 'datos',       points: 10 },
  { questionId: 'sit_fis', optionId: 'c', dimension: 'teoria',      points: 5  },
  { questionId: 'sit_fis', optionId: 'd', dimension: 'liderazgo',   points: 10 },
  { questionId: 'sit_fis', optionId: 'd', dimension: 'personas',    points: 5  },

  // ── sit_8: long-term professional vision ─────────────────────────────────
  { questionId: 'sit_8', optionId: 'a', dimension: 'teoria',        points: 10 },
  { questionId: 'sit_8', optionId: 'a', dimension: 'autonomia',     points: 5  },
  { questionId: 'sit_8', optionId: 'b', dimension: 'liderazgo',     points: 10 },
  { questionId: 'sit_8', optionId: 'b', dimension: 'ingresos',      points: 5  },
  { questionId: 'sit_8', optionId: 'c', dimension: 'impactoSocial', points: 10 },
  { questionId: 'sit_8', optionId: 'c', dimension: 'personas',      points: 6  },
  { questionId: 'sit_8', optionId: 'd', dimension: 'creatividad',   points: 10 },
  { questionId: 'sit_8', optionId: 'd', dimension: 'autonomia',     points: 8  },

  // ── sit_9: central strength as perceived by others ───────────────────────
  { questionId: 'sit_9', optionId: 'a', dimension: 'ideas',         points: 10 },
  { questionId: 'sit_9', optionId: 'a', dimension: 'practica',      points: 5  },
  { questionId: 'sit_9', optionId: 'b', dimension: 'personas',      points: 10 },
  { questionId: 'sit_9', optionId: 'b', dimension: 'impactoSocial', points: 6  },
  { questionId: 'sit_9', optionId: 'c', dimension: 'liderazgo',     points: 10 },
  { questionId: 'sit_9', optionId: 'c', dimension: 'practica',      points: 5  },
  { questionId: 'sit_9', optionId: 'd', dimension: 'ideas',         points: 8  },
  { questionId: 'sit_9', optionId: 'd', dimension: 'creatividad',   points: 5  },
];

// ---------------------------------------------------------------------------
// Build lookup map at module load time
// ---------------------------------------------------------------------------

type ContribMap = Map<string, Contribution[]>;

function buildContribMap(): ContribMap {
  const map: ContribMap = new Map();
  for (const c of CONTRIBUTIONS) {
    const key = `${c.questionId}::${c.optionId}`;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(c);
  }
  return map;
}

const CONTRIB_MAP = buildContribMap();

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

/**
 * Extract career preference dimensions from a complete answer map.
 * Multi-select answers are comma-separated option IDs.
 */
export function extractPreferences(answers: Record<string, string>): CareerPreferences {
  const raw: Record<DimKey, number> = {
    personas: 0, datos: 0, objetos: 0, ideas: 0,
    creatividad: 0, estructura: 0, autonomia: 0, estabilidad: 0,
    teoria: 0, practica: 0, liderazgo: 0, colaboracion: 0,
    impactoSocial: 0, ingresos: 0,
  };

  for (const [questionId, answerRaw] of Object.entries(answers)) {
    if (!answerRaw) continue;
    const selectedIds = answerRaw.split(',').filter(Boolean);
    for (const optionId of selectedIds) {
      const key = `${questionId}::${optionId}`;
      const contribs = CONTRIB_MAP.get(key);
      if (!contribs) continue;
      for (const c of contribs) {
        raw[c.dimension] += c.points;
      }
    }
  }

  // Normalise each dimension to 0–100
  const result = {} as CareerPreferences;
  for (const dim of Object.keys(raw) as DimKey[]) {
    const maxPts = DIM_MAX[dim];
    result[dim] = clamp(Math.round((raw[dim] / maxPts) * 100), 0, 100);
  }

  return result;
}
