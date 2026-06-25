import { defineConfig, devices } from '@playwright/test';

/**
 * Configuración de Playwright (E2E).
 *
 * Levanta el server de desarrollo de Vite y corre los tests contra él en dos
 * viewports: desktop y mobile. NO testea Mercado Pago (los pagos están
 * deshabilitados y aislados; ver e2e/test-flow.spec.ts).
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  timeout: 60_000,

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    // En CI/local normal Playwright usa el browser que instala con
    // `npx playwright install chromium`. Si necesitás apuntar a un Chromium ya
    // presente en el sistema (p. ej. un entorno que lo trae preinstalado),
    // exportá PW_CHROMIUM_PATH con la ruta al binario.
    launchOptions: process.env.PW_CHROMIUM_PATH
      ? { executablePath: process.env.PW_CHROMIUM_PATH }
      : {},
  },

  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 800 } },
    },
    {
      name: 'mobile',
      use: { ...devices['Pixel 7'] },
    },
  ],

  // Reutiliza un server ya levantado en local; en CI lo arranca él mismo.
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
