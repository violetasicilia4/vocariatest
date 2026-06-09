/**
 * Configuración central de SEO para Vocaria.
 *
 * IMPORTANTE: Cuando tengas dominio propio, cambiá SITE_URL
 * por la URL final (ej: https://vocaria.com.ar) y volvé a hacer deploy.
 * Esta variable se usa en canonical, sitemap, Open Graph y metadata.
 *
 * También actualizá public/sitemap.xml con el mismo dominio.
 */

export const SITE_URL =
  'https://vocariatest.vercel.app'; // ← reemplazar por dominio propio

export const SEO = {
  siteName: 'Vocaria',
  siteUrl: SITE_URL,
  defaultTitle: 'Vocaria — Test vocacional para elegir carrera en Argentina',
  defaultDescription:
    'Vocaria analiza cómo pensás, qué te motiva y qué contexto tenés para mostrarte carreras que podrían tener sentido para vos. No una etiqueta: un mapa.',
  defaultOgImage: `${SITE_URL}/og-image.png`,
  twitterHandle: '@vocaria_ar',
  locale: 'es_AR',
};

export const PAGES = {
  home: '/',
  testVocacional: '/test-vocacional',
  elegirCarrera: '/elegir-carrera',
  carrerasArgentina: '/carreras-en-argentina',
  secundaria: '/test-vocacional-para-secundaria',
  cambiarCarrera: '/test-vocacional-para-cambiar-de-carrera',
  informe: '/informe-vocacional',
};
