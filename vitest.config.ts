import { defineConfig } from 'vitest/config';
import path from 'path';

// Config dedicada de Vitest (no carga los plugins de Vite de la app —
// tailwind/react no hacen falta para testear el motor, que es código puro).
export default defineConfig({
  resolve: {
    alias: { '@': path.resolve(__dirname, '.') },
  },
  test: {
    // El motor vocacional es determinístico y sin DOM → entorno node.
    environment: 'node',
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    // Los scripts de diagnóstico y la data no son tests.
    exclude: ['node_modules', 'dist', 'e2e', 'scripts'],
    testTimeout: 30_000,
  },
});
