import { describe, it, expect } from 'vitest';
import { invertirStringImperativo, invertirStringIdiomatico } from './solucion.js';

describe('invertirStringImperativo', () => {
  it('cadena vacía', () => {
    expect(invertirStringImperativo('')).toBe('');
  });

  it('carácter único', () => {
    expect(invertirStringImperativo('a')).toBe('a');
  });

  it('cadena con espacios', () => {
    expect(invertirStringImperativo(' ¡Hola, mundo!')).toBe('!odnum ,aloH¡ ');
  });

  it('palíndromo', () => {
    expect(invertirStringImperativo('oso')).toBe('oso');
  });

  it('cadena con emoji', () => {
    expect(invertirStringImperativo('a👋b')).toBe('b\uDC4B\uD83Da');
  });

  it('solo emoji', () => {
    expect(invertirStringImperativo('👋')).toBe('\uDC4B\uD83D');
  });
});

describe('invertirStringIdiomatico', () => {
  it('cadena vacía', () => {
    expect(invertirStringIdiomatico('')).toBe('');
  });

  it('carácter único', () => {
    expect(invertirStringIdiomatico('a')).toBe('a');
  });

  it('cadena con espacios', () => {
    expect(invertirStringIdiomatico(' ¡Hola, mundo!')).toBe('!odnum ,aloH¡ ');
  });

  it('palíndromo', () => {
    expect(invertirStringIdiomatico('oso')).toBe('oso');
  });

  it('cadena con emoji', () => {
    expect(invertirStringIdiomatico('a👋b')).toBe('b👋a');
  });

  it('solo emoji', () => {
    expect(invertirStringIdiomatico('👋')).toBe('👋');
  });
});
