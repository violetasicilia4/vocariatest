// @vitest-environment jsdom
import { describe, it, expect, afterEach, vi } from 'vitest';
import type { AnalyticsEvent, AnalyticsProps } from '../../services/analytics';

// El flag DEBUG se lee al importar el módulo, así que reimportamos fresco por caso.
async function loadAnalytics(debug: boolean) {
  vi.resetModules();
  vi.stubEnv('VITE_ANALYTICS_DEBUG', debug ? 'true' : 'false');
  return import('../../services/analytics');
}

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('analytics — track() no-op', () => {
  it('nunca lanza, ni con evento/props inesperados', async () => {
    const { track } = await loadAnalytics(false);
    expect(() => track('landing_viewed')).not.toThrow();
    expect(() => track('cta_clicked', { index: 3, viewport: 'mobile' })).not.toThrow();
    // Robustez ante un caller en JS que pase basura:
    expect(() => track('nope' as AnalyticsEvent, { x: 1 } as unknown as AnalyticsProps)).not.toThrow();
  });

  it('no loguea si VITE_ANALYTICS_DEBUG no es "true" (no-op silencioso)', async () => {
    const spy = vi.spyOn(console, 'debug').mockImplementation(() => {});
    const { track } = await loadAnalytics(false);
    track('test_started');
    expect(spy).not.toHaveBeenCalled();
  });

  it('con el flag en dev, loguea SOLO claves permitidas (descarta PII)', async () => {
    const spy = vi.spyOn(console, 'debug').mockImplementation(() => {});
    const { track } = await loadAnalytics(true);
    // Inyectamos una clave tipo-PII vía cast: NO debe aparecer en el log.
    track('profile_completed', { archetype: 'arquitecto', email: 'a@b.com' } as unknown as AnalyticsProps);
    expect(spy).toHaveBeenCalledTimes(1);
    const logged = spy.mock.calls[0][2] as Record<string, unknown>;
    expect(logged).toEqual({ archetype: 'arquitecto' });
    expect(JSON.stringify(logged)).not.toContain('a@b.com');
  });

  it('no hace ninguna llamada de red', async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal('fetch', fetchSpy);
    const { track } = await loadAnalytics(true);
    track('result_preview_seen', { archetype: 'constructor' });
    track('payment_attempt_blocked', { plan: 'esencial', reason: 'payments_disabled' });
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('currentViewport clasifica por matchMedia sin exponer datos', async () => {
    const { currentViewport } = await loadAnalytics(false);
    vi.stubGlobal('matchMedia', (q: string) => ({ matches: q.includes('max-width') }) as MediaQueryList);
    expect(currentViewport()).toBe('mobile');
    vi.stubGlobal('matchMedia', () => ({ matches: false }) as MediaQueryList);
    expect(currentViewport()).toBe('desktop');
  });
});
