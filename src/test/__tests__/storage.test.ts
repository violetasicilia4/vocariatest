// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest';
import {
  readJSON,
  writeJSON,
  remove,
  readWithTTL,
  writeWithTTL,
  safeParseStorage,
  saveProgress,
  loadProgress,
  clearProgress,
  saveResultDraft,
  loadResultDraft,
  clearResultDraft,
} from '../../services/storage';

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
});

describe('primitivas JSON seguras', () => {
  it('writeJSON / readJSON hacen roundtrip', () => {
    writeJSON('k', { a: 1, b: 'x' });
    expect(readJSON('k', null)).toEqual({ a: 1, b: 'x' });
  });

  it('readJSON devuelve el fallback si no existe la clave', () => {
    expect(readJSON('missing', 'fallback')).toBe('fallback');
  });

  it('readJSON devuelve el fallback (no rompe) ante JSON corrupto', () => {
    localStorage.setItem('bad', '{no es json');
    expect(readJSON('bad', [])).toEqual([]);
  });

  it('remove elimina la clave', () => {
    writeJSON('k', 1);
    remove('k');
    expect(readJSON('k', null)).toBeNull();
  });
});

describe('TTL', () => {
  it('writeWithTTL / readWithTTL devuelven el dato dentro del TTL', () => {
    writeWithTTL('o', { plan: 'esencial' });
    expect(readWithTTL('o', 60_000)).toEqual({ plan: 'esencial' });
  });

  it('readWithTTL descarta y limpia datos vencidos', () => {
    // Envoltura con ts viejo (vencido).
    localStorage.setItem('o', JSON.stringify({ ts: Date.now() - 100_000, data: { x: 1 } }));
    expect(readWithTTL('o', 1_000)).toBeNull();
    expect(localStorage.getItem('o')).toBeNull(); // se limpió
  });

  it('readWithTTL descarta formato viejo/corrupto', () => {
    localStorage.setItem('o', JSON.stringify({ order: 'sin ts' }));
    expect(readWithTTL('o', 60_000)).toBeNull();
  });
});

describe('safeParseStorage', () => {
  const isNumArray = (v: unknown): v is number[] =>
    Array.isArray(v) && v.every(n => typeof n === 'number');

  it('valida la estructura y devuelve el dato si pasa', () => {
    expect(safeParseStorage('[1,2,3]', isNumArray)).toEqual([1, 2, 3]);
  });

  it('devuelve null si la estructura no valida', () => {
    expect(safeParseStorage('["a"]', isNumArray)).toBeNull();
  });

  it('devuelve null ante JSON inválido o input null', () => {
    expect(safeParseStorage('{roto', isNumArray)).toBeNull();
    expect(safeParseStorage(null, isNumArray)).toBeNull();
  });
});

describe('progreso del test (sessionStorage)', () => {
  it('save / load / clear funcionan', () => {
    saveProgress({ answers: { sit_1: 'a' }, index: 3 });
    expect(loadProgress()).toEqual({ answers: { sit_1: 'a' }, index: 3 });
    clearProgress();
    expect(loadProgress()).toBeNull();
  });

  it('NO persiste datos personales: la estructura sólo tiene answers e index', () => {
    saveProgress({ answers: { sit_1: 'a' }, index: 1 });
    const loaded = loadProgress();
    expect(loaded && Object.keys(loaded).sort()).toEqual(['answers', 'index']);
  });

  it('descarta progreso corrupto sin romper', () => {
    sessionStorage.setItem('vocaria_progress', '{"data":{"index":"no-es-numero"}}');
    expect(loadProgress()).toBeNull();
  });
});

describe('borrador de resultado (sessionStorage, PII mínima)', () => {
  it('save / load / clear funcionan y sólo guardan lo mínimo', () => {
    saveResultDraft({ primario: 'arquitecto', secundario: 'constructor', confianza: 82 });
    const d = loadResultDraft();
    expect(d?.primario).toBe('arquitecto');
    expect(d?.confianza).toBe(82);
    // No hay forma de guardar email/nombre por el tipo; verificamos las claves.
    expect(d && Object.keys(d).sort()).toEqual(['confianza', 'primario', 'secundario']);
    clearResultDraft();
    expect(loadResultDraft()).toBeNull();
  });
});
