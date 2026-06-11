/**
 * Tokens de UI del flujo del test — sistema "Editorial Calm".
 *
 * Objetivo: que el test se sienta humano, premium, cálido y confiable —
 * NO una startup tech/fintech. Se evoluciona el design system del home
 * (manteniendo el logo y la marca) hacia una identidad propia, más editorial
 * y orientada al autodescubrimiento.
 *
 * Reglas del sistema:
 *  - Fondo         → papel cálido (#F6F3EC), no el gris frío anterior.
 *  - Titulares     → serif (Fraunces): editorial, humano, legible en preguntas largas.
 *  - UI / cuerpo   → sans (Plus Jakarta / Inter).
 *  - Acento        → arcilla (#C45D3A) desaturado, usado con moderación
 *                    (progreso, detalles, checks). Nunca grandes superficies saturadas.
 *  - CTA primario  → pill tinta (ink) con texto papel: decisivo, calmo, Apple-like.
 *  - Selección     → fill tinta + texto papel: feedback claro sin agresividad cromática.
 *  - Cards         → blanco cálido, borde hairline cálido, sombra suave neutra.
 */

/** Fondo base de las pantallas del test (papel cálido). */
export const PAGE_BG = 'bg-paper';

/** Tinta cálida de marca para el test: texto fuerte y superficies de selección. */
export const INK = '#1c1a16';
/** Acento arcilla (warm clay) — progreso, detalles, micro-feedback. */
export const CLAY = '#c45d3a';

/** Sombra suave para cards en reposo (neutra cálida, sin tinte azul). */
export const CARD_SHADOW = '0 1px 2px rgba(28,26,22,0.04), 0 8px 28px rgba(28,26,22,0.05)';
/** Sombra elevada (cards destacadas / overlays). */
export const CARD_SHADOW_LG = '0 12px 44px rgba(28,26,22,0.12)';

/** CTA primario de avance: pill tinta sobre papel. */
export const CTA_PRIMARY =
  'bg-ink text-paper font-display font-bold tracking-tight rounded-full ' +
  'hover:bg-[#2a2722] active:scale-[0.985] ' +
  'transition-[transform,background-color] duration-200 ease-out ' +
  'shadow-[0_8px_24px_rgba(28,26,22,0.16)] ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay/40 focus-visible:ring-offset-2 focus-visible:ring-offset-paper';

/** CTA secundario (outline cálido, sobre papel). */
export const CTA_DARK =
  'bg-paper-raised text-ink border border-line-strong font-display font-bold tracking-tight rounded-full ' +
  'hover:border-ink hover:bg-white active:scale-[0.985] ' +
  'transition-[transform,background-color,border-color] duration-200 ease-out ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay/40';

/** Card estándar (blanco cálido). */
export const CARD =
  'bg-paper-raised border border-line rounded-[22px]';

/** Opción NO seleccionada (card interactiva). */
export const OPTION_IDLE =
  'bg-paper-raised border border-line text-ink/80 ' +
  'hover:border-line-strong hover:bg-white';

/** Opción seleccionada (fill tinta). */
export const OPTION_ACTIVE =
  'bg-ink border-ink text-paper shadow-[0_8px_24px_rgba(28,26,22,0.18)]';

/** Opción deshabilitada. */
export const OPTION_DISABLED =
  'bg-[#efeae0] border-[#efeae0] text-ink/25 cursor-not-allowed';

/** Input de formulario. */
export const INPUT =
  'w-full px-4 py-3.5 rounded-2xl bg-paper-raised border border-line text-ink ' +
  'placeholder:text-ink/35 font-display text-[15px] transition-all ' +
  'focus:outline-none focus:border-ink focus:ring-2 focus:ring-clay/15';

/** Label de formulario (eyebrow uppercase). */
export const LABEL =
  'block text-ink/45 text-[11px] font-bold mb-1.5 tracking-[0.12em] uppercase';

/** Foco visible accesible para elementos interactivos sin estilo propio. */
export const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay/40 focus-visible:ring-offset-2 focus-visible:ring-offset-paper';

/** Curva de easing premium compartida (Apple/Linear-like). */
export const EASE = [0.22, 1, 0.36, 1] as const;
