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

function buildHtml(nombre: string, result: ScoringResult): string {
  const firstName = esc(nombre.split(' ')[0] || nombre);
  const { primario, secundario, tercero, combinacion, confianza, tensiones, preferences } = result;

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
  .brand .dot { width: 22px; height: 22px; border-radius: 7px; background: #d8f95c; display: inline-block; }
  .meta { color: #94a3b8; font-size: 12px; margin-top: 4px; }
  h1 { font-size: 30px; font-weight: 900; margin: 22px 0 6px; color: #07111F; line-height: 1.1; }
  .tag { color: #1a3a5c; font-weight: 600; font-size: 16px; margin-bottom: 16px; }
  .badge { display: inline-block; background: #d8f95c; color: #07111F; font-weight: 800; font-size: 12px; padding: 4px 10px; border-radius: 6px; }
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

  ${tensionesHtml ? `<h2>Lo que te hace distinto</h2>${tensionesHtml}` : ''}

  <h2>Tu perfil en detalle</h2>
  ${prefRows}

  <div class="foot">
    Este es tu resultado gratuito de Vocaria. El informe completo —carreras afines con justificación,
    universidades argentinas donde se dictan y salidas laborales con rangos salariales— estará disponible próximamente.
    Vocaria es una herramienta de exploración vocacional y no reemplaza un proceso de orientación profesional.
  </div>

  <div class="noprint" style="text-align:center;margin-top:24px">
    <button class="printbtn" onclick="window.print()">Guardar como PDF / Imprimir</button>
  </div>
</div>
<script>window.addEventListener('load', function(){ setTimeout(function(){ window.print(); }, 350); });</script>
</body></html>`;
}

/**
 * Abre el informe imprimible en una pestaña nueva y dispara el diálogo de impresión.
 * Debe llamarse desde un handler de click (gesto del usuario) para evitar bloqueo de popups.
 */
export function openPrintableReport(nombre: string, result: ScoringResult): void {
  const html = buildHtml(nombre, result);
  const win = window.open('', '_blank');
  if (!win) {
    // Popup bloqueado: fallback a descarga de un .html con el mismo contenido.
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mi-resultado-vocaria.html';
    a.click();
    URL.revokeObjectURL(url);
    return;
  }
  win.document.open();
  win.document.write(html);
  win.document.close();
}
