import { QUESTIONS } from '../data/questions';
import { ARQUETIPOS, COMBINACIONES, getArquetipo, getCombinacion, type Arquetipo, type Combinacion } from '../data/arquetipos';

export interface ArquetipoScore {
  id: string;
  score: number;
  pct: number; // 0-100, porcentaje del máximo posible
}

export interface Contexto {
  provincia?: string;
  movilidad?: string;
  duracion?: string;
}

export interface ScoringResult {
  ranking: ArquetipoScore[];
  activos: ArquetipoScore[];
  primario: Arquetipo;
  secundario: Arquetipo | null;
  tercero: Arquetipo | null;
  combinacion: Combinacion | null;
  confianza: number;
  advertencias: string[];
  contexto: Contexto;
}

const PROVINCIA_MAP: Record<string, string> = {
  CABA:   'Ciudad Autonoma de Buenos Aires',
  GBA:    'Buenos Aires',
  BAPROV: 'Buenos Aires',
  COR:    'Córdoba',
  SF:     'Santa Fé',
  MZA:    'Mendoza',
  TUC:    'Tucumán',
};

function acumularScores(answers: Record<string, string>): Record<string, number> {
  const raw: Record<string, number> = {};
  for (const arq of ARQUETIPOS) raw[arq.id] = 0;

  const situacionales = QUESTIONS.filter(q => q.bloque === 'situacional');
  for (const q of situacionales) {
    const answerId = answers[q.id];
    if (!answerId) continue;
    const opcion = q.opciones.find(o => o.id === answerId);
    if (!opcion?.scores) continue;
    for (const [arquetipoId, pts] of Object.entries(opcion.scores)) {
      if (arquetipoId in raw) raw[arquetipoId] += pts;
    }
  }
  return raw;
}

export function calcularResultado(answers: Record<string, string>): ScoringResult {
  const raw = acumularScores(answers);

  // Máximo posible: cada pregunta da 10 pts al primario
  const situacionalesRespondidas = QUESTIONS.filter(
    q => q.bloque === 'situacional' && answers[q.id]
  ).length;
  const maxPosible = Math.max(situacionalesRespondidas * 10, 1);

  // Ranking normalizado
  const ranking: ArquetipoScore[] = ARQUETIPOS
    .map(arq => ({
      id: arq.id,
      score: raw[arq.id],
      pct: Math.min(100, Math.round((raw[arq.id] / maxPosible) * 100)),
    }))
    .sort((a, b) => b.score - a.score);

  const top = ranking[0];

  // Arquetipos activos: los que superan el 50% del score del top
  const umbral = top.score * 0.5;
  const activos = ranking.filter(a => a.score >= umbral && a.score > 0);

  const primario = getArquetipo(ranking[0].id)!;
  const secundario = activos.length >= 2 ? getArquetipo(activos[1].id)! : null;
  const tercero = activos.length >= 3 ? getArquetipo(activos[2].id)! : null;

  // Buscar combinación nombrada
  const combinacion = secundario
    ? getCombinacion(primario.id, secundario.id) ?? null
    : null;

  // Confianza
  let confianza = 85;
  const topPct = top.pct;
  if (topPct < 30) confianza = 60;
  else if (topPct < 45) confianza = 72;
  else if (topPct >= 60) confianza = 92;

  if (situacionalesRespondidas < 15) confianza = Math.min(confianza, 65);

  // Advertencias
  const advertencias: string[] = [];
  if (activos.length >= 3) {
    advertencias.push('Tu perfil es amplio y multidimensional. Hay varias áreas que te interesan genuinamente — el informe completo te ayuda a priorizar.');
  }
  if (situacionalesRespondidas < 20) {
    advertencias.push('Respondiste algunas preguntas sin completar el test. Más respuestas mejoran la precisión del resultado.');
  }

  // Contexto
  const provinciaId = answers['ctx_1'];
  const contexto: Contexto = {
    provincia: PROVINCIA_MAP[provinciaId] ?? undefined,
    movilidad: answers['ctx_2'],
    duracion: answers['ctx_3'],
  };

  return {
    ranking,
    activos,
    primario,
    secundario,
    tercero,
    combinacion,
    confianza: Math.max(50, Math.min(98, confianza)),
    advertencias,
    contexto,
  };
}
