import { test, expect } from '@playwright/test';

/**
 * Smoke tests de la landing (desktop + mobile según el proyecto de Playwright).
 * No dependen de Supabase ni de Mercado Pago.
 */

test('la landing carga y muestra el CTA principal', async ({ page }) => {
  await page.goto('/');

  // El título principal del hero está visible.
  await expect(page.getByRole('heading').first()).toBeVisible();

  // Hay al menos un CTA para empezar el test.
  const cta = page.getByRole('button', { name: /empezar mi test vocacional/i }).first();
  await expect(cta).toBeVisible();
});

test('no hay imágenes sin texto alternativo', async ({ page }) => {
  await page.goto('/');
  // Accesibilidad básica: toda <img> debe tener atributo alt (puede ser "").
  const imgsSinAlt = await page.locator('img:not([alt])').count();
  expect(imgsSinAlt).toBe(0);
});
