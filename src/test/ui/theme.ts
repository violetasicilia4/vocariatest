/**
 * Tokens de UI del flujo del test — alineado 1:1 con la landing.
 *
 * Objetivo: que al pasar de la home al test el usuario NUNCA sienta que cambió
 * de producto. Misma identidad visual, mismas tipografías, mismos radios y
 * sombras. La paleta es la de la landing:
 *
 *  - Fondo         → blanco con un tinte cielo muy sutil (#F6F9FD).
 *  - Superficies   → blanco puro, borde hairline frío, sombra azulada suave.
 *  - Tinta         → navy de marca (#07111F): texto fuerte y fills de selección.
 *  - Acento "vivo" → azul cielo (#258EF9): progreso, foco, detalles activos.
 *  - Highlight     → lima (#D5FF3F): afinidad alta / precisión, como en el hero.
 *  - Titulares     → Plus Jakarta Sans (font-display), black/extrabold, tracking
 *                    cerrado — idéntico a los H1/H2 de la landing (sin serif).
 *  - CTA primario  → pill navy que en hover vira a lima con texto navy, igual
 *                    que el botón "Empezar mi test" del hero.
 *  - Selección     → fill navy + texto blanco + check lima: claro y de marca.
 */

/** Fondo base de las pantallas del test (blanco con tinte cielo). */
export const PAGE_BG = 'bg-paper';

/** Navy de marca: texto fuerte y superficies de selección. */
export const INK = '#07111f';
/** Azul cielo de marca — progreso, foco, micro-feedback "vivo". */
export const SKY = '#258ef9';
/** Lima de marca — afinidad alta / precisión (highlights, como en el hero). */
export const LIME = '#d5ff3f';

/** Sombra suave para cards en reposo (azulada fría, igual que la landing). */
export const CARD_SHADOW = '0 1px 2px rgba(11,22,40,0.04), 0 10px 30px rgba(11,22,40,0.06)';
/** Sombra elevada (cards destacadas / overlays). */
export const CARD_SHADOW_LG = '0 16px 48px rgba(11,22,40,0.14)';

/** CTA primario: pill navy que en hover vira a lima (idéntico al hero). */
export const CTA_PRIMARY =
  'bg-ink text-white font-display font-black tracking-wide rounded-full ' +
  'hover:bg-brand-lime hover:text-slate-950 active:scale-[0.97] ' +
  'transition-[transform,background-color,color,box-shadow] duration-200 ' +
  '[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ' +
  'shadow-[0_10px_28px_rgba(5,8,22,0.22)] ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky/40 focus-visible:ring-offset-2 focus-visible:ring-offset-paper';

/** CTA secundario (outline frío sobre blanco). */
export const CTA_DARK =
  'bg-paper-raised text-ink border border-line-strong font-display font-extrabold tracking-tight rounded-full ' +
  'hover:border-ink hover:bg-paper active:scale-[0.97] ' +
  'transition-[transform,background-color,border-color] duration-200 ease-out ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky/40';

/** Card estándar (blanco, borde frío, radio de la landing). */
export const CARD =
  'bg-paper-raised border border-line rounded-[22px]';

/** Opción NO seleccionada (card interactiva). */
export const OPTION_IDLE =
  'bg-paper-raised border border-line text-ink/80 ' +
  'hover:border-sky/45 hover:bg-sky-soft/40 hover:shadow-[0_8px_24px_rgba(37,142,249,0.08)]';

/** Opción seleccionada (fill navy, check lima). */
export const OPTION_ACTIVE =
  'bg-ink border-ink text-white shadow-[0_10px_28px_rgba(7,17,31,0.22)]';

/** Opción deshabilitada. */
export const OPTION_DISABLED =
  'bg-[#eef2f7] border-[#eef2f7] text-ink/25 cursor-not-allowed';

/** Input de formulario.
 *  El font-size es 16px a propósito: por debajo de eso, iOS Safari hace
 *  auto-zoom al enfocar el campo y deja la pantalla "pegada" en zoom, lo que
 *  permitía desplazarse en horizontal. Con 16px el zoom no se dispara. */
export const INPUT =
  'w-full px-4 py-3.5 rounded-2xl bg-paper-raised border border-line text-ink ' +
  'placeholder:text-ink/35 font-display font-medium text-[16px] transition-all ' +
  'focus:outline-none focus:border-sky focus:ring-2 focus:ring-sky/20';

/** Label de formulario (eyebrow uppercase). */
export const LABEL =
  'block text-ink/45 text-[11px] font-bold mb-1.5 tracking-[0.12em] uppercase';

/** Foco visible accesible para elementos interactivos sin estilo propio. */
export const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky/45 focus-visible:ring-offset-2 focus-visible:ring-offset-paper';

/** Curva de easing premium compartida (Apple/Linear-like, igual al hero). */
export const EASE = [0.16, 1, 0.3, 1] as const;
