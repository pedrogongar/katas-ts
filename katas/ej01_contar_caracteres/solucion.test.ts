import { describe, it, expect } from 'vitest';
import { contarCaracteresImperativo, contarCaracteresIdiomatico } from './solucion.js';

describe('contarCaracteresImperativo', () => {
  it('contar caracteres con un string vacío', () => {
    expect(contarCaracteresImperativo('')).toBe(0);
  });

  it('contar caracteres con un string compuesto de espacios', () => {
    expect(contarCaracteresImperativo('   ')).toBe(3);
  });

  it('contar caracteres contenidos en un string', () => {
    expect(contarCaracteresImperativo('hola')).toBe(4);
  });

  it('contar caracteres en un string compuesto por un emoji', () => {
    expect(contarCaracteresImperativo('👋')).toBe(2);
  });

  it('contar caracteres con un string que contiene emojis', () => {
    expect(contarCaracteresImperativo('a👋b')).toBe(4);
  });
});

describe('contarCaracteresIdiomatico', () => {
  it('contar caracteres con un string vacío', () => {
    expect(contarCaracteresIdiomatico('')).toBe(0);
  });

  it('contar caracteres con un string compuesto de espacios', () => {
    expect(contarCaracteresIdiomatico('   ')).toBe(3);
  });

  it('contar caracteres contenidos en un string', () => {
    expect(contarCaracteresIdiomatico('hola')).toBe(4);
  });

  it('contar caracteres en un string compuesto por un emoji', () => {
    expect(contarCaracteresIdiomatico('👋')).toBe(1);
  });

  it('contar caracteres con un string que contiene emojis', () => {
    expect(contarCaracteresIdiomatico('a👋b')).toBe(3);
  });
});
