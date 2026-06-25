import { describe, it, expect } from 'vitest';
import {
  parseJsonBody,
  isPlainObject,
  validateRequiredFields,
  isValidEmail,
  normalizeEmail,
  clampString,
  MAX_BODY_BYTES,
  type ApiRequest,
} from '../../../api/_lib';

function req(partial: Partial<ApiRequest>): ApiRequest {
  return { headers: {}, ...partial };
}

describe('parseJsonBody', () => {
  it('acepta un body ya objeto', () => {
    expect(parseJsonBody(req({ body: { a: 1 } }))).toEqual({ a: 1 });
  });

  it('parsea un body string JSON', () => {
    expect(parseJsonBody(req({ body: '{"a":1}' }))).toEqual({ a: 1 });
  });

  it('devuelve {} ante body vacío', () => {
    expect(parseJsonBody(req({ body: '' }))).toEqual({});
    expect(parseJsonBody(req({}))).toEqual({});
  });

  it('devuelve null ante JSON inválido', () => {
    expect(parseJsonBody(req({ body: '{roto' }))).toBeNull();
  });

  it('rechaza payloads más grandes que MAX_BODY_BYTES', () => {
    const huge = '"' + 'x'.repeat(MAX_BODY_BYTES + 10) + '"';
    expect(parseJsonBody(req({ body: huge }))).toBeNull();
  });

  it('rechaza un array como body (no es objeto plano)', () => {
    expect(parseJsonBody(req({ body: '[1,2]' }))).toBeNull();
  });
});

describe('validadores', () => {
  it('isPlainObject distingue objetos de arrays/null', () => {
    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject([])).toBe(false);
    expect(isPlainObject(null)).toBe(false);
  });

  it('validateRequiredFields detecta faltantes y vacíos', () => {
    expect(validateRequiredFields({ a: 'x', b: '' }, ['a', 'b', 'c'])).toEqual(['b', 'c']);
    expect(validateRequiredFields({ a: 'x' }, ['a'])).toEqual([]);
  });

  it('isValidEmail acepta válidos y rechaza basura', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
    expect(isValidEmail('no-arroba')).toBe(false);
    expect(isValidEmail('a@b')).toBe(false);
    expect(isValidEmail(123)).toBe(false);
    expect(isValidEmail('x'.repeat(300) + '@a.com')).toBe(false);
  });

  it('normalizeEmail recorta y baja a minúsculas', () => {
    expect(normalizeEmail('  User@Example.COM ')).toBe('user@example.com');
  });

  it('clampString recorta a la longitud máxima y descarta vacíos', () => {
    expect(clampString('  hola  ', 10)).toBe('hola');
    expect(clampString('abcdef', 3)).toBe('abc');
    expect(clampString('   ', 10)).toBeNull();
    expect(clampString(42, 10)).toBeNull();
  });
});
