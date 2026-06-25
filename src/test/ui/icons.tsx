/**
 * Iconografía del test — reemplaza por completo a los emojis.
 *
 * El brief exige eliminar todos los emojis y no mezclarlos nunca con iconos.
 * Para evitar churn en los datos (questions.ts / arquetipos.ts mantienen su
 * campo `emoji` como clave semántica), resolvemos el emoji a un icono de
 * Lucide en tiempo de render. Toda la UI muestra SOLO iconos.
 */
import type { LucideIcon } from 'lucide-react';
import {
  Microscope, Handshake, Pencil, DraftingCompass, Leaf, Mic, Map, Wrench,
  MessagesSquare, Search, Palette, Sprout, UserRound, TrendingUp,
  Lightbulb, Drama, Scale, Telescope, Globe, Settings2, Plane, House,
  HelpCircle, Target, BarChart3, Stethoscope, Building2, PenLine, Compass,
  Hammer, ShieldCheck,
} from 'lucide-react';

/** Mapa central emoji → icono profesional. */
const EMOJI_ICON: Record<string, LucideIcon> = {
  // — Estilo cognitivo / exploración —
  '🔬': Microscope,
  '🔭': Telescope,
  '🔎': Search,
  '🌐': Globe,
  '📐': DraftingCompass,
  '📈': TrendingUp,
  '📊': BarChart3,
  '💡': Lightbulb,
  // — Hacer / construir —
  '🛠️': Wrench,
  '🔩': Hammer,
  '⚙️': Settings2,
  '🏗️': Building2,
  '🔩️': Hammer,
  // — Personas / vínculo —
  '🤝': Handshake,
  '💬': MessagesSquare,
  '🧍': UserRound,
  '🎪': Drama,
  '🎙️': Mic,
  // — Creación / expresión —
  '✏️': Pencil,
  '✍️': PenLine,
  '🎨': Palette,
  // — Naturaleza / cuidado —
  '🌿': Leaf,
  '🌱': Sprout,
  '🩺': Stethoscope,
  // — Orden / dirección —
  '⚖️': Scale,
  '🗺️': Map,
  '🎯': Target,
  // — Movilidad —
  '✈️': Plane,
  '🏠': House,
  '🤔': HelpCircle,
  // — Respaldo —
  '🛡️': ShieldCheck,
};

/** Devuelve el icono Lucide para un emoji dado (fallback: brújula). */
export function iconForEmoji(emoji?: string): LucideIcon {
  if (!emoji) return Compass;
  return EMOJI_ICON[emoji] ?? Compass;
}
