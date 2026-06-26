// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

/**
 * Seguridad de la cola offline de leads: el nombre de la tabla se persiste en
 * localStorage (manipulable). Verificamos que la whitelist impida insertar en
 * tablas arbitrarias y que la cola siga funcionando para las tablas legítimas.
 */

const QUEUE_KEY = 'vocaria_pending_inserts';

// leads.ts lee la config de Supabase de import.meta.env en el tope del módulo,
// así que seteamos el entorno y reimportamos el módulo fresco en cada caso.
async function loadLeads() {
  vi.resetModules();
  vi.stubEnv('VITE_SUPABASE_URL', 'https://test.supabase.co');
  vi.stubEnv('VITE_SUPABASE_ANON_KEY', 'anon-key');
  return import('../../services/leads');
}

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('whitelist de tablas en la cola offline', () => {
  it('flushQueue NUNCA hace POST a una tabla fuera de la whitelist y la purga', async () => {
    const { flushQueue } = await loadLeads();
    const fetchMock = vi.fn().mockResolvedValue({ ok: true } as Response);
    vi.stubGlobal('fetch', fetchMock);

    // Cola manipulada: una entrada legítima (leads) y una maliciosa (purchases).
    localStorage.setItem(
      QUEUE_KEY,
      JSON.stringify([
        { table: 'leads', row: { email: 'a@b.com' }, ts: Date.now() },
        { table: 'purchases', row: { stolen: true }, ts: Date.now() },
      ]),
    );

    await flushQueue();

    // Sólo se tocó el endpoint de `leads`; jamás el de `purchases`.
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const url = String(fetchMock.mock.calls[0][0]);
    expect(url).toContain('/rest/v1/leads');
    expect(url).not.toContain('purchases');

    // La entrada maliciosa quedó purgada de la cola persistida.
    const q = JSON.parse(localStorage.getItem(QUEUE_KEY) ?? '[]') as { table: string }[];
    expect(q.some(it => it.table === 'purchases')).toBe(false);
  });

  it('captureLead encola en una tabla permitida cuando falla la red', async () => {
    const { captureLead } = await loadLeads();
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));

    await captureLead({ email: 'x@y.com', source: 'waitlist', consent: true });

    const q = JSON.parse(localStorage.getItem(QUEUE_KEY) ?? '[]') as { table: string }[];
    expect(q).toHaveLength(1);
    expect(q[0].table).toBe('leads');
  });

  it('no pierde el lead si Supabase rechaza el insert (HTTP no-ok): lo encola y no rompe', async () => {
    const { captureLead } = await loadLeads();
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500 } as Response));

    // No debe lanzar: el flujo de UI nunca se rompe por un insert fallido.
    const res = await captureLead({ email: 'z@y.com', source: 'test_start', consent: true });
    expect(res.ok).toBe(true);
    expect(res.persisted).toBe(false);

    const q = JSON.parse(localStorage.getItem(QUEUE_KEY) ?? '[]') as { table: string }[];
    expect(q).toHaveLength(1);
    expect(q[0].table).toBe('leads');
  });
});

describe('dedup de cliente (doble submit inmediato)', () => {
  it('un mismo source no se inserta dos veces en la misma sesión', async () => {
    const { captureLead } = await loadLeads();
    const fetchMock = vi.fn().mockResolvedValue({ ok: true } as Response);
    vi.stubGlobal('fetch', fetchMock);

    const first = await captureLead({ email: 'a@b.com', source: 'test_start', consent: true });
    const second = await captureLead({ email: 'a@b.com', source: 'test_start', consent: true });

    // Sólo el primer insert llega a la red; el segundo se deduplica.
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(first.deduped).toBe(false);
    expect(second.deduped).toBe(true);
    expect(second.ok).toBe(true); // la UX no se rompe
  });

  it('sources distintos NO se deduplican entre sí', async () => {
    const { captureLead } = await loadLeads();
    const fetchMock = vi.fn().mockResolvedValue({ ok: true } as Response);
    vi.stubGlobal('fetch', fetchMock);

    await captureLead({ email: 'a@b.com', source: 'test_start', consent: true });
    await captureLead({ email: 'a@b.com', source: 'purchase_intent', consent: true });

    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('un duplicado deduplicado NO pierde el lead original (ya quedó encolado al fallar)', async () => {
    const { captureLead } = await loadLeads();
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));

    await captureLead({ email: 'a@b.com', source: 'test_start', consent: true }); // encola
    await captureLead({ email: 'a@b.com', source: 'test_start', consent: true }); // deduped

    const q = JSON.parse(localStorage.getItem(QUEUE_KEY) ?? '[]') as { table: string }[];
    expect(q).toHaveLength(1); // el original está, sin duplicar
  });
});
