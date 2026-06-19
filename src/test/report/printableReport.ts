/**
 * Genera un informe imprimible/descargable a partir del resultado del test.
 *
 * Es el entregable real del tier gratuito: el usuario obtiene un PDF de su
 * resultado (vía "Guardar como PDF" del diálogo de impresión del navegador),
 * sin depender de un backend de email ni de librerías de PDF pesadas.
 *
 * El informe completo de pago (universidades, salarios, etc.) se entrega cuando
 * exista el backend; esto cubre el "no hay nada que entregar" del tier gratuito.
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

function buildHtml(nombre: string, result: ScoringResult, recomendaciones: CarreraRecomendada[] = []): string {
  const firstName = esc(nombre.split(' ')[0] || nombre);
  const { primario, secundario, tercero, combinacion, confianza, tensiones, preferences } = result;

  // Carreras: el corazón del entregable. Mostramos las 3 con mayor afinidad con
  // su justificación (sin universidades ni salarios — eso es el informe completo).
  const carreras = recomendaciones.slice(0, 3);
  const carrerasHtml = carreras
    .map(c => {
      const tagLabel = c.tag === 'top' ? 'Alta afinidad' : c.tag === 'sorpresa' ? 'Para explorar' : 'Alternativa';
      return `<div class="career">
        <div class="career-head">
          <span class="career-title">${esc(c.titulo)}</span>
          <span class="career-tag">${tagLabel}</span>
        </div>
        <p class="career-why">${esc(c.razon)}</p>
        ${c.alerta ? `<p class="career-alert">${esc(c.alerta)}</p>` : ''}
      </div>`;
    })
    .join('');

  const prefRows = (Object.entries(preferences) as [keyof CareerPreferences, number][])
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
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

  const tensionesHtml = tensiones.length
    ? tensiones
        .map(
          t => `<div class="tension">
            <p class="t-msg">${esc(t.mensaje)}</p>
            <p class="t-tip">${esc(t.consejo)}</p>
          </div>`,
        )
        .join('')
    : '';

  const secundarios = [secundario, tercero]
    .filter(Boolean)
    .map(a => `<span class="chip">${esc((a as { nombre: string }).nombre)}</span>`)
    .join('');

  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8"/>
<title>Mi resultado vocacional — Vocaria</title>
<style>
  @page { margin: 18mm 16mm; }
  * { box-sizing: border-box; }
  body { font-family: system-ui, -apple-system, sans-serif; color: #0d1b2e; line-height: 1.6; margin: 0; }
  .wrap { max-width: 720px; margin: 0 auto; padding: 24px; }
  .brand { display: flex; align-items: center; gap: 8px; font-weight: 800; font-size: 15px; color: #07111F; }
  .brand .dot { width: 22px; height: 22px; border-radius: 7px; background: #d5ff3f; display: inline-block; }
  .meta { color: #94a3b8; font-size: 12px; margin-top: 4px; }
  h1 { font-size: 30px; font-weight: 900; margin: 22px 0 6px; color: #07111F; line-height: 1.1; }
  .tag { color: #1a3a5c; font-weight: 600; font-size: 16px; margin-bottom: 16px; }
  .badge { display: inline-block; background: #d5ff3f; color: #07111F; font-weight: 800; font-size: 12px; padding: 4px 10px; border-radius: 6px; }
  h2 { font-size: 16px; font-weight: 800; margin: 28px 0 10px; color: #0d1b2e; text-transform: uppercase; letter-spacing: .04em; }
  p { font-size: 14px; color: #334155; }
  ul { margin: 8px 0 0 18px; font-size: 14px; color: #334155; }
  li { margin-bottom: 5px; }
  .chip { display: inline-block; background: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 999px; padding: 5px 12px; font-size: 12.5px; font-weight: 600; margin: 0 6px 6px 0; }
  .bar-row { display: flex; align-items: center; gap: 10px; margin-bottom: 9px; }
  .bar-label { flex: 0 0 180px; font-size: 13px; font-weight: 600; }
  .bar-track { flex: 1; height: 7px; background: #e2e8f0; border-radius: 999px; overflow: hidden; }
  .bar-fill { display: block; height: 100%; background: #1a3a5c; border-radius: 999px; }
  .bar-val { flex: 0 0 38px; text-align: right; font-size: 12px; font-weight: 700; color: #64748b; }
  .tension { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px 16px; margin-bottom: 10px; }
  .t-msg { font-weight: 600; color: #0d1b2e; margin: 0; }
  .t-tip { color: #64748b; font-size: 13px; margin: 8px 0 0; }
  .career { border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px 16px; margin-bottom: 12px; page-break-inside: avoid; }
  .career-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
  .career-title { font-weight: 800; font-size: 16px; color: #07111F; }
  .career-tag { font-size: 10.5px; font-weight: 700; text-transform: uppercase; letter-spacing: .04em; color: #1a3a5c; background: #eef5fb; border-radius: 999px; padding: 3px 9px; white-space: nowrap; }
  .career-why { margin: 8px 0 0; font-size: 13.5px; }
  .career-alert { margin: 6px 0 0; font-size: 12.5px; color: #b45309; }
  .foot { margin-top: 36px; border-top: 1px solid #e2e8f0; padding-top: 14px; color: #94a3b8; font-size: 11.5px; }
  @media print { .noprint { display: none; } body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
  .printbtn { background: #07111F; color: #fff; border: 0; border-radius: 999px; padding: 12px 26px; font-weight: 700; font-size: 14px; cursor: pointer; margin-top: 8px; }
</style></head>
<body>
<div class="wrap">
  <div class="brand"><span class="dot"></span> Vocaria</div>
  <div class="meta">Informe vocacional de ${firstName} · generado el ${new Date().toLocaleDateString('es-AR')}</div>

  <h1>${esc(combinacion ? combinacion.nombre : primario.nombre)}</h1>
  <p class="tag">${esc(combinacion ? combinacion.descripcion : primario.tagline)}</p>
  <span class="badge">Precisión ${confianza}% · analizado en 37 dimensiones</span>

  <h2>Tu perfil</h2>
  <p>${esc(primario.descripcion)}</p>

  ${secundarios ? `<h2>También resonás con</h2><div>${secundarios}</div>` : ''}

  <h2>Tus fortalezas</h2>
  <ul>${fortalezas}</ul>

  ${carrerasHtml ? `<h2>Carreras que encajan con tu perfil</h2>${carrerasHtml}` : ''}

  ${tensionesHtml ? `<h2>Lo que te hace distinto</h2>${tensionesHtml}` : ''}

  <h2>Tu perfil en detalle</h2>
  ${prefRows}

  <div class="foot">
    Este es tu resultado gratuito de Vocaria. El informe completo agrega, para cada carrera,
    las universidades argentinas donde se dicta, las modalidades y duración real, y las salidas
    laborales con rangos salariales. Vocaria es una herramienta de exploración vocacional y no
    reemplaza un proceso de orientación profesional.
  </div>

  <div class="noprint" style="text-align:center;margin-top:24px">
    <button class="printbtn" onclick="window.print()">Guardar como PDF / Imprimir</button>
  </div>
</div>
<script>window.addEventListener('load', function(){ setTimeout(function(){ window.print(); }, 350); });</script>
</body></html>`;
}

// ───────────────────────────────────────────────────────────────────────────
// Informe COMPLETO simulado por plan (vista previa gratuita)
//
// Genera el informe que recibiría quien compra cada plan, usando datos REALES
// del recomendador (carreras, universidades, salarios argentinos) sobre el
// resultado de la persona. Es la "simulación gratuita" para previsualizar el
// entregable de pago antes de que Mercado Pago esté habilitado.
// ───────────────────────────────────────────────────────────────────────────

function fmtSalary(minMiles: number, maxMiles: number): string {
  const f = (n: number) => '$' + (n * 1000).toLocaleString('es-AR');
  return `${f(minMiles)} – ${f(maxMiles)}`;
}

function buildPlanHtml(
  nombre: string,
  result: ScoringResult,
  planId: PlanId,
  recomendaciones: CarreraRecomendada[],
): string {
  const firstName = esc(nombre.split(' ')[0] || nombre);
  const { primario, secundario, combinacion, confianza, preferences } = result;
  const plan = PLANES[planId];

  // Niveles de detalle progresivos por plan.
  const showUnis = planId === 'universitario' || planId === 'profesional';
  const showSalarios = planId === 'profesional';

  const carreras = recomendaciones.slice(0, 6);

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

  const carrerasHtml = carreras
    .map(c => {
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

  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8"/>
<title>Informe ${esc(plan.nombre)} — Vocaria</title>
<style>
  @page { margin: 16mm 15mm; }
  * { box-sizing: border-box; }
  body { font-family: system-ui, -apple-system, sans-serif; color: #0d1b2e; line-height: 1.6; margin: 0; }
  .wrap { max-width: 740px; margin: 0 auto; padding: 24px; }
  .brand { display: flex; align-items: center; gap: 8px; font-weight: 800; font-size: 15px; color: #07111F; }
  .brand .dot { width: 22px; height: 22px; border-radius: 7px; background: #d5ff3f; display: inline-block; }
  .preview { margin-top: 14px; background: #07111F; color: #d5ff3f; font-size: 11.5px; font-weight: 700; letter-spacing: .04em; text-transform: uppercase; padding: 8px 14px; border-radius: 8px; display: inline-block; }
  .meta { color: #94a3b8; font-size: 12px; margin-top: 10px; }
  h1 { font-size: 30px; font-weight: 900; margin: 18px 0 4px; color: #07111F; line-height: 1.1; }
  .tag { color: #1a3a5c; font-weight: 600; font-size: 16px; margin-bottom: 14px; }
  .badge { display: inline-block; background: #d5ff3f; color: #07111F; font-weight: 800; font-size: 12px; padding: 4px 10px; border-radius: 6px; }
  h2 { font-size: 15px; font-weight: 800; margin: 30px 0 10px; color: #0d1b2e; text-transform: uppercase; letter-spacing: .05em; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; }
  p { font-size: 14px; color: #334155; }
  ul { margin: 6px 0 0 18px; font-size: 14px; color: #334155; }
  li { margin-bottom: 5px; }
  .includes { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px 18px; margin: 16px 0; }
  .includes ul { margin-top: 4px; }
  .bar-row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
  .bar-label { flex: 0 0 170px; font-size: 13px; font-weight: 600; }
  .bar-track { flex: 1; height: 7px; background: #e2e8f0; border-radius: 999px; overflow: hidden; }
  .bar-fill { display: block; height: 100%; background: #1a3a5c; border-radius: 999px; }
  .bar-val { flex: 0 0 38px; text-align: right; font-size: 12px; font-weight: 700; color: #64748b; }
  .career { border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px 16px; margin-bottom: 12px; page-break-inside: avoid; }
  .career-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
  .career-title { font-weight: 800; font-size: 16px; color: #07111F; }
  .career-tag { font-size: 10.5px; font-weight: 700; text-transform: uppercase; letter-spacing: .04em; color: #1a3a5c; background: #eef5fb; border-radius: 999px; padding: 3px 9px; white-space: nowrap; }
  .career-why { margin: 8px 0 0; font-size: 13.5px; }
  .career-alert { margin: 6px 0 0; font-size: 12.5px; color: #b45309; }
  .sub { margin-top: 10px; }
  .sub-h { display: block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .05em; color: #94a3b8; margin-bottom: 5px; }
  .uni { font-size: 13px; color: #334155; display: flex; justify-content: space-between; gap: 10px; padding: 2px 0; }
  .uni-meta { color: #94a3b8; font-size: 12px; white-space: nowrap; }
  .uni-more { font-size: 12px; color: #94a3b8; margin-top: 2px; }
  .sal { font-size: 13px; display: flex; justify-content: space-between; gap: 10px; padding: 2px 0; }
  .sal-rol { color: #334155; } .sal-rng { color: #07111F; font-weight: 700; white-space: nowrap; }
  .foot { margin-top: 34px; border-top: 1px solid #e2e8f0; padding-top: 14px; color: #94a3b8; font-size: 11.5px; }
  @media print { .noprint { display: none; } body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
  .printbtn { background: #07111F; color: #fff; border: 0; border-radius: 999px; padding: 12px 26px; font-weight: 700; font-size: 14px; cursor: pointer; margin-top: 8px; }
</style></head>
<body>
<div class="wrap">
  <div class="brand"><span class="dot"></span> Vocaria</div>
  <div class="preview">Vista previa · Informe ${esc(plan.nombre)}</div>
  <div class="meta">Informe de ${firstName} · generado el ${new Date().toLocaleDateString('es-AR')}</div>

  <h1>${esc(combinacion ? combinacion.nombre : primario.nombre)}</h1>
  <p class="tag">${esc(combinacion ? combinacion.descripcion : primario.tagline)}</p>
  <span class="badge">Precisión ${confianza}% · 37 dimensiones</span>

  <div class="includes">
    <span class="sub-h">Este informe incluye</span>
    <ul>${incluye}</ul>
  </div>

  <h2>Tu perfil</h2>
  <p>${esc(primario.descripcion)}</p>
  ${secundario ? `<p>Con rasgos de <strong>${esc(secundario.nombre)}</strong>.</p>` : ''}

  <h2>Fortalezas</h2>
  <ul>${fortalezas}</ul>

  <h2>Áreas de desarrollo</h2>
  <ul>${desafios}</ul>

  <h2>Carreras afines${showUnis ? ' y dónde estudiarlas' : ''}</h2>
  ${carrerasHtml || '<p>No se encontraron carreras para mostrar en esta vista.</p>'}

  <h2>Tu perfil en detalle</h2>
  ${prefRows}

  <div class="foot">
    Vista previa gratuita del informe <strong>${esc(plan.nombre)}</strong>, generada con tus respuestas reales.
    El pago con Mercado Pago todavía no está habilitado: esto es una simulación del entregable.
    Vocaria es una herramienta de exploración vocacional y no reemplaza un proceso de orientación profesional.
  </div>

  <div class="noprint" style="text-align:center;margin-top:24px">
    <button class="printbtn" onclick="window.print()">Guardar como PDF / Imprimir</button>
  </div>
</div>
<script>window.addEventListener('load', function(){ setTimeout(function(){ window.print(); }, 400); });</script>
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
 * Abre la vista previa simulada del informe de pago para el plan elegido.
 * El recomendador (que carga la DB de carreras) se importa on-demand para no
 * inflar el chunk inicial del test. La ventana se abre de forma sincrónica
 * dentro del gesto de click para evitar el bloqueo de popups; se completa al
 * resolver el import.
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

/**
 * Abre el informe imprimible en una pestaña nueva y dispara el diálogo de impresión.
 * Debe llamarse desde un handler de click (gesto del usuario) para evitar bloqueo de popups.
 *
 * El recomendador (que carga la DB de carreras) se importa on-demand: así el informe
 * gratuito ya incluye las 3 carreras con mayor afinidad, sin inflar el chunk inicial
 * del test. La ventana se abre de forma sincrónica dentro del click para no gatillar
 * el bloqueo de popups; el contenido se completa al resolver el import.
 */
export function openPrintableReport(nombre: string, result: ScoringResult): void {
  const win = window.open('', '_blank');
  if (win) {
    win.document.write('<p style="font-family:system-ui;color:#64748b;padding:40px;text-align:center">Generando tu informe…</p>');
  }
  import('../engine/recommender')
    .then(({ recomendar }) => {
      writeToWindow(win, buildHtml(nombre, result, recomendar(result)), 'mi-resultado-vocaria.html');
    })
    .catch(() => {
      // Si el chunk del recomendador no carga (red), entregamos igual el informe de perfil.
      writeToWindow(win, buildHtml(nombre, result), 'mi-resultado-vocaria.html');
    });
}
