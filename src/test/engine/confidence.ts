/**
 * Robust confidence score calculation.
 */

export interface ConfidenceBreakdown {
  score: number;          // final 0-100
  gap: number;            // raw gap between top and second (0-100)
  concentration: number;  // 0-100 contribution from score concentration
  completion: number;     // 0-100 completion rate (1-based)
  contradictions: number; // number of contradictions detected
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

/**
 * Detect internal contradictions in the answer set.
 *
 * Contradiction 1: high autonomy (sca_1 = '1' or '2') + high structure (sca_4 = '1')
 *   — wants full self-direction but also needs complete certainty about the future.
 *
 * Contradiction 2: selected 'soledad' antipattern in anti_1 + chose option 'd' in sit_6
 *   (movilizar muchas personas hacia un objetivo común).
 */
function detectContradictions(answers: Record<string, string>): number {
  let count = 0;

  // Contradiction 1: extreme autonomy (scale_1 option 1) + extreme structure need (sca_4 option 1)
  const sca1 = answers['sca_1'];
  const sca4 = answers['sca_4'];
  if (sca1 === '1' && sca4 === '1') {
    count += 1;
  }

  // Contradiction 2: soledad antipattern + sit_6 option d (movilizar personas)
  const anti = answers['anti_1'] ?? '';
  const antiPatterns = anti.split(',').filter(Boolean);
  const sit6 = answers['sit_6'];
  if (antiPatterns.includes('soledad') && sit6 === 'd') {
    count += 1;
  }

  return count;
}

/**
 * Calculate confidence score from ranking, answers, and total question count.
 */
export function calcularConfianza(
  ranking: Array<{ id: string; pct: number }>,
  answers: Record<string, string>,
  totalQuestions: number,
): ConfidenceBreakdown {
  const pctTop = ranking[0]?.pct ?? 0;
  const pctSecond = ranking[1]?.pct ?? 0;

  // Gap contribution: 0-50 points
  const gap = pctTop - pctSecond;
  const gapContrib = clamp(gap * 2, 0, 50);

  // Concentration contribution: 0-30 points
  const sumAll = ranking.reduce((acc, r) => acc + r.pct, 0);
  const concentration = sumAll > 0 ? pctTop / sumAll : 0;
  const concContrib = clamp((concentration - 0.08) * 400, 0, 30);

  // Completion penalty: 0-35 points deducted
  const answered = Object.values(answers).filter(v => v && v.trim() !== '').length;
  // Subtract 1 for anti_1 which doesn't count toward test completion scoring
  const scorableAnswered = Math.min(answered, totalQuestions);
  const completionRate = totalQuestions > 0 ? scorableAnswered / totalQuestions : 1;
  const completionPenalty = (1 - completionRate) * 35;

  // Contradiction penalty: 7 points each
  const contradictions = detectContradictions(answers);
  const contradictionPenalty = contradictions * 7;

  const base = 52;
  const rawScore = base + gapContrib + concContrib - completionPenalty - contradictionPenalty;
  const score = clamp(Math.round(rawScore), 45, 97);

  return {
    score,
    gap,
    concentration: Math.round(concContrib),
    completion: Math.round(completionRate * 100),
    contradictions,
  };
}
