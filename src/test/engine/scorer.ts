import { QUESTIONS } from '../data/questions';
import { ARQUETIPOS, getArquetipo, getCombinacion, type Arquetipo, type Combinacion } from '../data/arquetipos';
import { type UserProfile, PROVINCIAS, getProvinciasDisponibles } from '../data/profile';

export interface ArquetipoScore {
  id: string;
  score: number;
  pct: number;
}

export interface Contexto {
  provincia?: string;
  provinciasDisponibles: string[];
  movilidad: UserProfile['movilidad'];
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

function acumularScores(answers: Record<string, string>): Record<string, number> {
  const raw: Record<string, number> = {};
  for (const arq of ARQUETIPOS) raw[arq.id] = 0;

  for (const q of QUESTIONS) {
    const answerId = answers[q.id];
    if (!answerId) continue;

    const ids = q.tipo === 'multiselect'
      ? answerId.split(',').filter(Boolean)
      : [answerId];

    for (const selectedId of ids) {
      const opcion = q.opciones.find(o => o.id === selectedId);
      if (!opcion?.scores) continue;
      for (const [arquetipoId, pts] of Object.entries(opcion.scores)) {
        if (arquetipoId in raw) raw[arquetipoId] += pts;
      }
    }
  }

  return raw;
}

export function calcularResultado(
  answers: Record<string, string>,
  profile: UserProfile,
): ScoringResult {
  const raw = acumularScores(answers);

  const maxScore = Math.max(...Object.values(raw), 1);

  const ranking: ArquetipoScore[] = ARQUETIPOS
    .map(arq => ({
      id: arq.id,
      score: raw[arq.id],
      pct: Math.round((raw[arq.id] / maxScore) * 100),
    }))
    .sort((a, b) => b.score - a.score);

  const top = ranking[0];
  const umbral = top.score * 0.5;
  const activos = ranking.filter(a => a.score >= umbral && a.score > 0);

  const primario = getArquetipo(ranking[0].id)!;
  const secundario = activos.length >= 2 ? getArquetipo(activos[1].id)! : null;
  const tercero = activos.length >= 3 ? getArquetipo(activos[2].id)! : null;

  const combinacion = secundario
    ? getCombinacion(primario.id, secundario.id) ?? null
    : null;

  const secondScore = ranking[1]?.score ?? 0;
  const gap = top.score > 0 ? (top.score - secondScore) / top.score : 0;

  let confianza = 85;
  if (gap < 0.1) confianza = 60;
  else if (gap < 0.2) confianza = 72;
  else if (gap >= 0.4) confianza = 92;

  const respondidas = QUESTIONS.filter(q => answers[q.id]).length;
  if (respondidas < Math.ceil(QUESTIONS.length * 0.7)) {
    confianza = Math.min(confianza, 65);
  }

  const advertencias: string[] = [];
  if (activos.length >= 3) {
    advertencias.push('Tu perfil es amplio y multidimensional. Hay varias áreas que te interesan genuinamente — el informe completo te ayuda a priorizar.');
  }
  if (respondidas < QUESTIONS.length * 0.8) {
    advertencias.push('Respondiste algunas preguntas sin completar el test. Más respuestas mejoran la precisión del resultado.');
  }

  const provinciaInfo = PROVINCIAS.find(p => p.id === profile.provinciaId);
  const contexto: Contexto = {
    provincia: provinciaInfo?.dbName,
    provinciasDisponibles: getProvinciasDisponibles(profile),
    movilidad: profile.movilidad,
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
