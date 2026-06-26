// Genera la versión WebP del hero a partir del asset original (PNG/JPEG).
//
// Uso (no requiere dejar `sharp` en las dependencias):
//   npm run hero:webp
//
// Mantener el original; este script sólo (re)genera el .webp. La calidad 80 es
// holgada: el hero va bajo un gradiente al 90-97% de opacidad, así que cualquier
// micro-diferencia es imperceptible, y aun así el WebP pesa una fracción del PNG.
import sharp from 'sharp';

const SRC = 'src/assets/images/clear_blue_sky_1780058835753.png';
const OUT = 'src/assets/images/clear_blue_sky_1780058835753.webp';

const info = await sharp(SRC).webp({ quality: 80 }).toFile(OUT);
console.log(`WebP generado: ${OUT} — ${info.size} bytes (${info.width}x${info.height})`);
