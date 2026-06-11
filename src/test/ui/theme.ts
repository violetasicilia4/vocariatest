/**
 * Tokens de UI del flujo del test — derivados del design system del HOME
 * (fuente de verdad). Tema CLARO: fondos claros, cards blancas, texto slate,
 * acento lime para CTAs y avance, dark #07111F para selección (igual que la
 * muestra de test del home).
 *
 * Reglas:
 *  - CTA de avance  → pill lime (como el hero/CTA del home).
 *  - Opción elegida → fondo dark #07111F + texto blanco (como MuestraTest).
 *  - Cards          → blancas, borde slate-200, sombra azulada sutil.
 *  - Tipografía     → font-display (Plus Jakarta) en títulos/labels.
 */

/** Fondo base de las pantallas del test (gris muy claro, como FAQ/MuestraTest del home). */
export const PAGE_BG = 'bg-[#F8FAFC]';

/** Marca dark de Vocaria, usada para texto fuerte y superficies de selección. */
export const INK = '#07111F';

/** Sombra azulada sutil para cards en reposo (igual que las cards del home). */
export const CARD_SHADOW = '0 4px 24px rgba(30,60,100,0.06)';
/** Sombra azulada elevada (cards destacadas / modales). */
export const CARD_SHADOW_LG = '0 12px 40px rgba(30,60,100,0.12)';
/** Sombra del CTA lime (igual que el CTA de cierre del home). */
export const LIME_SHADOW = '0 10px 28px rgba(213,255,63,0.30)';

/** CTA primario de avance: pill lime sobre dark. */
export const CTA_PRIMARY =
  'bg-brand-lime text-[#07111F] font-display font-black tracking-wide rounded-full ' +
  'hover:brightness-105 hover:scale-[1.01] active:scale-[0.98] ' +
  'transition-[transform,filter,box-shadow] duration-200 ' +
  'shadow-[0_10px_28px_rgba(213,255,63,0.30)] ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07111F]/25';

/** CTA secundario dark (alternativa, como el botón oscuro del home). */
export const CTA_DARK =
  'bg-[#07111F] text-white font-display font-black tracking-wide rounded-full ' +
  'hover:bg-brand-lime hover:text-[#07111F] active:scale-[0.97] ' +
  'transition-[background-color,color,transform] duration-200 ' +
  'shadow-[0_8px_24px_rgba(5,8,22,0.18)] ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07111F]/25';

/** Card blanca estándar. */
export const CARD =
  'bg-white border border-slate-200 rounded-[20px]';

/** Opción NO seleccionada (card blanca interactiva). */
export const OPTION_IDLE =
  'bg-white border border-slate-200 text-slate-700 ' +
  'hover:border-slate-400 hover:bg-slate-50';

/** Opción seleccionada (dark, como la muestra de test del home). */
export const OPTION_ACTIVE =
  'bg-[#07111F] border-[#07111F] text-white shadow-[0_8px_24px_rgba(5,8,22,0.18)]';

/** Opción deshabilitada. */
export const OPTION_DISABLED =
  'bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed';

/** Input de formulario. */
export const INPUT =
  'w-full px-4 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-900 ' +
  'placeholder:text-slate-400 font-display text-sm transition-all ' +
  'focus:outline-none focus:border-[#07111F] focus:ring-2 focus:ring-[#07111F]/10';

/** Label de formulario (eyebrow uppercase). */
export const LABEL =
  'block text-slate-500 text-[11px] font-semibold mb-1.5 tracking-widest uppercase';

/** Foco visible accesible para elementos interactivos sin estilo propio. */
export const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07111F]/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8FAFC]';
