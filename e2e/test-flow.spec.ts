import { test, expect } from '@playwright/test';

/**
 * Flujo del test vocacional, hasta avanzar varias preguntas.
 *
 * NO cubre Mercado Pago: el cobro está deshabilitado (VITE_PAYMENTS_ENABLED) y
 * aislado. La pantalla de pago queda fuera de alcance hasta integrar MP.
 * Ver TODO(mp) en api/ y src/services/payments.ts.
 */

test('abrir el test muestra la captura de perfil', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /empezar mi test vocacional/i }).first().click();

  // La pantalla de perfil pide nombre y email.
  await expect(page.getByPlaceholder(/martina/i)).toBeVisible();
  await expect(page.getByPlaceholder(/email/i)).toBeVisible();
});

test('completar el perfil y avanzar varias preguntas del test', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /empezar mi test vocacional/i }).first().click();

  // ── Perfil, paso 1: datos ──
  await page.getByPlaceholder(/martina/i).fill('Tester E2E');
  await page.getByPlaceholder(/email/i).fill('tester@example.com');
  // Edad y provincia son <select> (edad primero, provincia segundo).
  await page.locator('select').nth(0).selectOption('18');
  await page.locator('select').nth(1).selectOption({ index: 1 });
  await page.locator('input[type="checkbox"]').first().check();
  await page.getByRole('button', { name: /continuar/i }).click();

  // ── Perfil, paso 2: movilidad ──
  await expect(page.getByRole('heading', { name: /mudarte/i })).toBeVisible();
  await page.getByRole('button', { name: /sí, me mudaría/i }).click();

  // ── Preguntas ── avanzar 3 respondiendo la primera opción de cada una.
  for (let i = 0; i < 3; i++) {
    // Las opciones son botones con aria-pressed; elegimos la primera disponible.
    const opcion = page.locator('button[aria-pressed]').first();
    await expect(opcion).toBeVisible({ timeout: 15_000 });
    await opcion.click();

    const siguiente = page.getByRole('button', { name: /siguiente/i });
    await expect(siguiente).toBeEnabled();
    await siguiente.click();
  }

  // Tras avanzar, seguimos dentro del flujo del test (no volvimos a la landing).
  await expect(page.getByRole('button', { name: /siguiente/i })).toBeVisible({ timeout: 15_000 });
});
