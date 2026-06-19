/**
 * Genera public/og-image.png (1200×630) para Open Graph / Twitter Card.
 *
 * Uso:  node scripts/generate-og.mjs
 *
 * El OG image es lo que se ve al compartir el link en WhatsApp, X, LinkedIn, etc.
 * Antes era favicon.svg (no renderiza tarjeta). Esto genera un PNG real de marca.
 *
 * Requiere @resvg/resvg-js (instalado on-demand; ver package.json → scripts.og).
 */
import { Resvg } from '@resvg/resvg-js';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Paleta de marca (coherente con theme.ts / index.css)
const NAVY = '#07111F';
const NAVY_2 = '#0d1b2e';
const LIME = '#d5ff3f';
const SKY = '#9FD2F1';
const WHITE = '#ffffff';

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="78%" cy="18%" r="65%">
      <stop offset="0%" stop-color="${SKY}" stop-opacity="0.22"/>
      <stop offset="55%" stop-color="${NAVY_2}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${NAVY_2}"/>
      <stop offset="100%" stop-color="${NAVY}"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <!-- Marca -->
  <g transform="translate(80, 72)">
    <rect width="44" height="44" rx="13" fill="${LIME}"/>
    <path d="M12 14 L22 32 L32 14" stroke="${NAVY}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <text x="60" y="32" font-family="DejaVu Sans" font-weight="bold" font-size="30" fill="${WHITE}">Vocaria</text>
  </g>

  <!-- Headline -->
  <text x="80" y="270" font-family="DejaVu Sans" font-weight="bold" font-size="74" fill="${WHITE}">Carreras que encajan</text>
  <text x="80" y="356" font-family="DejaVu Sans" font-weight="bold" font-size="74" fill="${WHITE}">con cómo <tspan fill="${LIME}">pensás</tspan>.</text>

  <!-- Sub -->
  <text x="82" y="430" font-family="DejaVu Sans" font-size="30" fill="${SKY}" opacity="0.92">Test vocacional para elegir carrera en Argentina</text>

  <!-- Pill -->
  <g transform="translate(80, 478)">
    <rect width="540" height="62" rx="31" fill="${LIME}"/>
    <text x="270" y="40" font-family="DejaVu Sans" font-weight="bold" font-size="25" fill="${NAVY}" text-anchor="middle">Resultado personalizado · gratis</text>
  </g>

  <!-- Mockup de resultado (mostrá, no prometas) -->
  <g transform="translate(835, 150)" opacity="0.97">
    <rect width="300" height="330" rx="26" fill="#ffffff" opacity="0.06"/>
    <rect x="22" y="26" width="120" height="14" rx="7" fill="${SKY}" opacity="0.5"/>
    <rect x="22" y="58" width="210" height="26" rx="8" fill="#ffffff" opacity="0.92"/>
    <rect x="22" y="92" width="160" height="16" rx="8" fill="#ffffff" opacity="0.4"/>
    <g transform="translate(22, 140)">
      <rect width="256" height="44" rx="12" fill="${LIME}"/>
      <text x="20" y="29" font-family="DejaVu Sans" font-weight="bold" font-size="20" fill="${NAVY}">94% de afinidad</text>
    </g>
    <rect x="22" y="206" width="256" height="14" rx="7" fill="#ffffff" opacity="0.25"/>
    <rect x="22" y="232" width="220" height="14" rx="7" fill="#ffffff" opacity="0.25"/>
    <rect x="22" y="258" width="240" height="14" rx="7" fill="#ffffff" opacity="0.25"/>
    <rect x="22" y="284" width="180" height="14" rx="7" fill="#ffffff" opacity="0.25"/>
  </g>
</svg>`;

const resvg = new Resvg(svg, {
  fitTo: { mode: 'width', value: 1200 },
  font: { loadSystemFonts: true },
});
const png = resvg.render().asPng();
const out = join(__dirname, '..', 'public', 'og-image.png');
writeFileSync(out, png);
console.log(`✓ OG image generada: ${out} (${png.length} bytes)`);
