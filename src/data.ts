// data.ts — Vocaria
// Solo contiene datos propios de Vocaria.
// No hay referencias a template anterior, consulting, AI SaaS ni datos corporativos.

// El asset se IMPORTA (no se referencia como ruta `/src/...`): así Vite lo procesa,
// le pone hash y lo emite al build de producción. Referenciar `/src/...` a mano
// funciona en dev pero da 404 en producción, porque esa carpeta no existe en `dist`.
import heroClouds from './assets/images/clear_blue_sky_1780058835753.png';

export const IMAGES = {
  heroClouds,
};
