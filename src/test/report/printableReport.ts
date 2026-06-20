/**
 * Genera el informe vocacional de PAGO como documento imprimible/descargable
 * (vía "Guardar como PDF" del diálogo de impresión del navegador), sin depender
 * de un backend de PDF.
 *
 * El PDF es un entregable de los PLANES PAGOS. El tier gratuito NO descarga PDF:
 * su resultado vive en pantalla (ResultPreview). Mientras Mercado Pago no esté
 * habilitado, este documento se muestra como "vista previa" del entregable de pago.
 *
 * Estructura del documento (página por página): portada → perfil → fortalezas y
 * áreas de desarrollo → carreras afines (con universidades/salarios según plan) →
 * próximos pasos → cierre y metodología.
 */
import type { ScoringResult } from '../engine/scorer';
import type { CareerPreferences } from '../engine/preferences';
import type { CarreraRecomendada } from '../engine/recommender';
import { PLANES, type PlanId } from '../data/profile';

const PREF_LABELS: Record<keyof CareerPreferences, string> = {
  personas: 'Trabajar con personas',
  datos: 'Análisis y datos',
  objetos: 'Cosas tangibles',
  ideas: 'Ideas y sistemas',
  creatividad: 'Expresión creativa',
  estructura: 'Orden y método',
  autonomia: 'Autonomía',
  estabilidad: 'Estabilidad',
  teoria: 'Lo conceptual',
  practica: 'Lo práctico',
  liderazgo: 'Liderar',
  colaboracion: 'Colaborar en equipo',
  impactoSocial: 'Impacto social',
  ingresos: 'Recompensa económica',
};

function esc(s: string): string {
  return s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] as string));
}

function fmtSalary(minMiles: number, maxMiles: number): string {
  const f = (n: number) => '$' + (n * 1000).toLocaleString('es-AR');
  return `${f(minMiles)} – ${f(maxMiles)}`;
}

// ───────────────────────────────────────────────────────────────────────────
// Próximos pasos — generados a partir del resultado real (carrera de cabeza,
// universidad disponible, movilidad). Es la sección que convierte el informe en
// algo accionable: el usuario sale sabiendo qué hacer, no solo quién es.
// ───────────────────────────────────────────────────────────────────────────
function buildProximosPasos(result: ScoringResult, carreras: CarreraRecomendada[]): string {
  const top = carreras[0];
  const segundo = carreras[1];
  const pasos: { titulo: string; texto: string }[] = [];

  if (top) {
    pasos.push({
      titulo: `Investigá a fondo ${esc(top.titulo)}`,
      texto: `Buscá el plan de estudios y mirá las materias de los primeros dos años: ahí se nota rápido si te engancha o no. Es tu opción de mayor afinidad y vale empezar por ahí.`,
    });
  }

  const area = top ? top.macroArea : result.primario.macroareas[0];
  pasos.push({
    titulo: 'Hablá con alguien que ya esté ahí',
    texto: `Una charla de 20 minutos con alguien que estudie o trabaje en ${esc(area.toLowerCase())} te va a decir más que mil búsquedas. Preguntale qué es lo que menos esperaba de esa carrera.`,
  });

  const uni = top?.universidadesEnProvincia?.[0];
  if (uni) {
    pasos.push({
      titulo: `Acercate a ${esc(uni.nombre)}`,
      texto: `Fijate si tiene clase abierta, charla informativa o visita de campus. Pisar el lugar donde estudiarías cambia mucho la decisión.`,
    });
  } else {
    pasos.push({
      titulo: 'Resolvé el "dónde"',
      texto: 'Las opciones para esta orientación pueden estar fuera de tu provincia. Revisá modalidades virtuales o mixtas, o evaluá con tiempo la posibilidad de mudarte.',
    });
  }

  pasos.push({
    titulo: 'Ponete un plazo',
    texto: `Date unas semanas. Si ${top ? esc(top.titulo) : 'tu opción de cabeza'} te sigue cerrando, es una señal fuerte. Si no, volvé a este informe y mirá ${segundo ? `${esc(segundo.titulo)} y ` : ''}las alternativas con calma. Dudar también es información.`,
  });

  return pasos
    .map(
      (p, i) => `<div class="step">
        <span class="step-n">${i + 1}</span>
        <div>
          <p class="step-t">${p.titulo}</p>
          <p class="step-x">${p.texto}</p>
        </div>
      </div>`,
    )
    .join('');
}

function buildPlanHtml(
  nombre: string,
  result: ScoringResult,
  planId: PlanId,
  recomendaciones: CarreraRecomendada[],
): string {
  const firstName = esc(nombre.split(' ')[0] || nombre);
  const { primario, secundario, tercero, combinacion, confianza, preferences, tensiones } = result;
  const plan = PLANES[planId];
  const fecha = new Date().toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' });

  // Niveles de detalle progresivos por plan.
  const showUnis = planId === 'universitario' || planId === 'profesional';
  const showSalarios = planId === 'profesional';

  const carreras = recomendaciones.slice(0, 6);

  const tituloPrincipal = combinacion ? combinacion.nombre : primario.nombre;
  const taglinePrincipal = combinacion ? combinacion.descripcion : primario.tagline;

  const incluye = plan.incluye.map(i => `<li>${esc(i)}</li>`).join('');

  const prefRows = (Object.entries(preferences) as [keyof CareerPreferences, number][])
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([key, value]) => {
      const v = Math.round(value);
      return `<div class="bar-row">
        <span class="bar-label">${esc(PREF_LABELS[key])}</span>
        <span class="bar-track"><span class="bar-fill" style="width:${v}%"></span></span>
        <span class="bar-val">${v}%</span>
      </div>`;
    })
    .join('');

  const fortalezas = primario.fortalezas.map(f => `<li>${esc(f)}</li>`).join('');
  const desafios = primario.desafios.map(d => `<li>${esc(d)}</li>`).join('');

  const huella = tensiones.length
    ? `<div class="huella">
         <p class="huella-h">Lo que te hace distinto</p>
         <p class="huella-msg">${esc(tensiones[0].mensaje)}</p>
         <p class="huella-tip">${esc(tensiones[0].consejo)}</p>
       </div>`
    : '';

  const secundariosChips = [secundario, tercero]
    .filter(Boolean)
    .map(a => `<span class="chip">${esc((a as { nombre: string }).nombre)}</span>`)
    .join('');

  const carrerasHtml = carreras
    .map((c, idx) => {
      const tagLabel = c.tag === 'top' ? 'Alta afinidad' : c.tag === 'sorpresa' ? 'Para explorar' : 'Alternativa';
      const unisBlock = showUnis && c.universidadesEnProvincia.length
        ? `<div class="sub">
             <span class="sub-h">Dónde estudiarla</span>
             ${c.universidadesEnProvincia.slice(0, 3).map(u =>
               `<div class="uni">${esc(u.nombre)}<span class="uni-meta">${esc(u.provincia)}${u.duracion ? ' · ' + esc(u.duracion) : ''}</span></div>`,
             ).join('')}
             ${c.universidadesTotal > 3 ? `<div class="uni-more">y ${c.universidadesTotal - 3} universidad(es) más</div>` : ''}
           </div>`
        : '';
      const salBlock = showSalarios && c.salario && c.salario.roles.length
        ? `<div class="sub">
             <span class="sub-h">Salida laboral y salarios (ARS/mes · orientativo)</span>
             ${c.salario.roles.slice(0, 3).map(r =>
               `<div class="sal"><span class="sal-rol">${esc(r.rol)}</span><span class="sal-rng">${fmtSalary(r.juniorMin, r.seniorMax)}</span></div>`,
             ).join('')}
           </div>`
        : '';
      return `<div class="career">
        <div class="career-head">
          <span class="career-rank">${idx + 1}</span>
          <span class="career-title">${esc(c.titulo)}</span>
          <span class="career-tag">${tagLabel}</span>
        </div>
        <p class="career-why">${esc(c.razon)}</p>
        ${c.alerta ? `<p class="career-alert">${esc(c.alerta)}</p>` : ''}
        ${unisBlock}
        ${salBlock}
      </div>`;
    })
    .join('');

  const proximosPasos = buildProximosPasos(result, carreras);

  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8"/>
<title>Informe vocacional de ${firstName} — Vocaria</title>
<style>
  @page { size: A4; margin: 15mm 15mm; }
  * { box-sizing: border-box; }
  html, body { margin: 0; }
  body {
    font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #1e293b; line-height: 1.6;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
  .navy { color: #07111F; }
  .lime-dot { width: 22px; height: 22px; border-radius: 7px; background: #d5ff3f; display: inline-block; vertical-align: middle; }

  /* ── PORTADA ── */
  .cover {
    background: #07111F; color: #fff; border-radius: 16px;
    min-height: 250mm; padding: 28mm 22mm; display: flex; flex-direction: column;
    page-break-after: always;
  }
  .cover-brand { display: flex; align-items: center; gap: 9px; font-weight: 800; font-size: 16px; }
  .cover-mid { margin-top: auto; }
  .cover-eyebrow { color: #9FD2F1; font-size: 13px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; margin: 0 0 14px; }
  .cover-title { font-size: 44px; font-weight: 900; line-height: 1.04; margin: 0 0 8px; }
  .cover-title .accent { color: #d5ff3f; }
  .cover-tag { color: rgba(255,255,255,.66); font-size: 17px; font-weight: 500; max-width: 130mm; margin: 0; }
  .cover-badge { display: inline-block; background: #d5ff3f; color: #07111F; font-weight: 800; font-size: 13px; padding: 6px 13px; border-radius: 7px; margin-top: 22px; }
  .cover-foot { margin-top: auto; padding-top: 26px; border-top: 1px solid rgba(255,255,255,.14); color: rgba(255,255,255,.55); font-size: 12.5px; display: flex; justify-content: space-between; gap: 10px; }
  .cover-foot strong { color: #fff; font-weight: 700; }

  /* ── SECCIONES ── */
  .section { page-break-before: always; }
  .kicker { font-size: 11px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; color: #258ef9; margin: 0 0 4px; }
  .h-sec { font-size: 24px; font-weight: 900; color: #07111F; line-height: 1.1; margin: 0 0 14px; }
  h2 { font-size: 14px; font-weight: 800; margin: 24px 0 9px; color: #07111F; text-transform: uppercase; letter-spacing: .05em; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; }
  p { font-size: 13.5px; color: #334155; }
  ul { margin: 6px 0 0 18px; font-size: 13.5px; color: #334155; }
  li { margin-bottom: 5px; }

  .includes { background: #f6f9fd; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px 18px; margin: 0 0 18px; }
  .includes .sub-h { margin-bottom: 6px; }

  .chip { display: inline-block; background: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 999px; padding: 5px 12px; font-size: 12.5px; font-weight: 600; margin: 0 6px 6px 0; color: #334155; }

  .huella { background: #f6f9fd; border: 1px solid #e2e8f0; border-left: 3px solid #258ef9; border-radius: 10px; padding: 14px 16px; margin: 16px 0 0; }
  .huella-h { font-size: 11px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: #258ef9; margin: 0 0 6px; }
  .huella-msg { font-weight: 700; color: #0d1b2e; margin: 0; font-size: 13.5px; }
  .huella-tip { color: #64748b; font-size: 12.5px; margin: 7px 0 0; }

  .bar-row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
  .bar-label { flex: 0 0 165px; font-size: 13px; font-weight: 600; color: #334155; }
  .bar-track { flex: 1; height: 7px; background: #e8eef5; border-radius: 999px; overflow: hidden; }
  .bar-fill { display: block; height: 100%; background: #258ef9; border-radius: 999px; }
  .bar-val { flex: 0 0 38px; text-align: right; font-size: 12px; font-weight: 700; color: #64748b; }

  .two-col { display: flex; gap: 22px; }
  .two-col > div { flex: 1; }

  .career { border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px 16px; margin-bottom: 12px; page-break-inside: avoid; }
  .career-head { display: flex; align-items: center; gap: 10px; }
  .career-rank { flex: 0 0 24px; width: 24px; height: 24px; border-radius: 999px; background: #07111F; color: #fff; font-size: 12px; font-weight: 800; display: inline-flex; align-items: center; justify-content: center; }
  .career-title { font-weight: 800; font-size: 15.5px; color: #07111F; flex: 1; }
  .career-tag { font-size: 10.5px; font-weight: 700; text-transform: uppercase; letter-spacing: .04em; color: #1a3a5c; background: #e7f1fe; border-radius: 999px; padding: 3px 9px; white-space: nowrap; }
  .career-why { margin: 8px 0 0; font-size: 13px; }
  .career-alert { margin: 6px 0 0; font-size: 12px; color: #b45309; }
  .sub { margin-top: 10px; }
  .sub-h { display: block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .05em; color: #94a3b8; margin-bottom: 5px; }
  .uni { font-size: 12.5px; color: #334155; display: flex; justify-content: space-between; gap: 10px; padding: 2px 0; }
  .uni-meta { color: #94a3b8; font-size: 11.5px; white-space: nowrap; }
  .uni-more { font-size: 11.5px; color: #94a3b8; margin-top: 2px; }
  .sal { font-size: 12.5px; display: flex; justify-content: space-between; gap: 10px; padding: 2px 0; }
  .sal-rol { color: #334155; } .sal-rng { color: #07111F; font-weight: 700; white-space: nowrap; }

  .step { display: flex; gap: 14px; padding: 14px 0; border-bottom: 1px solid #eef2f7; page-break-inside: avoid; }
  .step:last-child { border-bottom: 0; }
  .step-n { flex: 0 0 30px; width: 30px; height: 30px; border-radius: 999px; background: #d5ff3f; color: #07111F; font-weight: 900; font-size: 14px; display: inline-flex; align-items: center; justify-content: center; }
  .step-t { font-weight: 800; color: #07111F; margin: 3px 0 4px; font-size: 14.5px; }
  .step-x { margin: 0; font-size: 13px; color: #475569; }

  .foot { margin-top: 26px; border-top: 1px solid #e2e8f0; padding-top: 14px; color: #94a3b8; font-size: 11.5px; }

  @media print { .noprint { display: none !important; } }
  .printbar { position: fixed; bottom: 0; left: 0; right: 0; background: #07111F; padding: 12px; text-align: center; }
  .printbtn { background: #d5ff3f; color: #07111F; border: 0; border-radius: 999px; padding: 11px 26px; font-weight: 800; font-size: 14px; cursor: pointer; }
</style></head>
<body>

  <!-- PÁGINA 1 — PORTADA -->
  <div class="cover">
    <div class="cover-brand"><span class="lime-dot"></span> Vocaria</div>
    <div class="cover-mid">
      <p class="cover-eyebrow">Informe vocacional · ${esc(firstName)}</p>
      <h1 class="cover-title">${esc(tituloPrincipal)}</h1>
      <p class="cover-tag">${esc(taglinePrincipal)}</p>
      <span class="cover-badge">Precisión ${confianza}% · 37 dimensiones analizadas</span>
    </div>
    <div class="cover-foot">
      <span>Plan <strong>${esc(plan.nombre)}</strong> · ${esc(plan.tagline)}</span>
      <span>${esc(fecha)}</span>
    </div>
  </div>

  <!-- PÁGINA 2 — TU PERFIL -->
  <div class="section">
    <p class="kicker">Quién sos</p>
    <h2 class="h-sec">Tu perfil</h2>

    <div class="includes">
      <span class="sub-h">Este informe incluye</span>
      <ul>${incluye}</ul>
    </div>

    <p>${esc(primario.descripcion)}</p>
    ${secundariosChips ? `<h2>También resonás con</h2><div>${secundariosChips}</div>` : ''}
    ${huella}

    <h2>Tu perfil en detalle</h2>
    ${prefRows}
  </div>

  <!-- PÁGINA 3 — FORTALEZAS Y DESARROLLO -->
  <div class="section">
    <p class="kicker">Tu manera de aportar</p>
    <h2 class="h-sec">Fortalezas y áreas de desarrollo</h2>
    <div class="two-col">
      <div>
        <h2>Tus fortalezas</h2>
        <ul>${fortalezas}</ul>
      </div>
      <div>
        <h2>Áreas de desarrollo</h2>
        <ul>${desafios}</ul>
      </div>
    </div>
  </div>

  <!-- PÁGINA 4 — CARRERAS -->
  <div class="section">
    <p class="kicker">El corazón de tu resultado</p>
    <h2 class="h-sec">Carreras que encajan${showUnis ? ' y dónde estudiarlas' : ''}</h2>
    ${carrerasHtml || '<p>No se encontraron carreras para mostrar.</p>'}
  </div>

  <!-- PÁGINA 5 — PRÓXIMOS PASOS -->
  <div class="section">
    <p class="kicker">Qué hacer ahora</p>
    <h2 class="h-sec">Tus próximos pasos</h2>
    <p style="margin-bottom:8px">Un resultado sin próximo paso te deja igual que antes. Esto es lo concreto que podés hacer esta semana.</p>
    ${proximosPasos}

    <div class="foot">
      Informe <strong>${esc(plan.nombre)}</strong> de ${esc(firstName)}, generado el ${esc(fecha)} con tus respuestas reales.
      Los rangos salariales son orientativos y de referencia para Argentina.
      Vocaria es una herramienta de exploración vocacional y no reemplaza un proceso de orientación profesional.
      ${planId ? 'El pago con Mercado Pago se está habilitando: por ahora esto es la vista previa de tu informe.' : ''}
    </div>
  </div>

  <div class="printbar noprint">
    <button class="printbtn" onclick="window.print()">Guardar como PDF / Imprimir</button>
  </div>
<script>window.addEventListener('load', function(){ setTimeout(function(){ window.print(); }, 450); });</script>
</body></html>`;
}

function writeToWindow(win: Window | null, html: string, fallbackName: string): void {
  if (!win) {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fallbackName;
    a.click();
    URL.revokeObjectURL(url);
    return;
  }
  win.document.open();
  win.document.write(html);
  win.document.close();
}

/**
 * Abre el informe de pago (documento completo) para el plan elegido y dispara el
 * diálogo de impresión. El recomendador (que carga la DB de carreras) se importa
 * on-demand para no inflar el chunk inicial del test. La ventana se abre de forma
 * sincrónica dentro del gesto de click para evitar el bloqueo de popups; el
 * contenido se completa al resolver el import.
 */
export function openPlanReport(nombre: string, result: ScoringResult, planId: PlanId): void {
  const win = window.open('', '_blank');
  if (win) {
    win.document.write('<p style="font-family:system-ui;color:#64748b;padding:40px;text-align:center">Generando tu informe…</p>');
  }
  import('../engine/recommender')
    .then(({ recomendar }) => {
      const html = buildPlanHtml(nombre, result, planId, recomendar(result));
      writeToWindow(win, html, `informe-${planId}-vocaria.html`);
    })
    .catch(() => {
      if (win) win.close();
    });
}
