import { describe, expect, it } from 'vitest';
import { esPalindromoImperativo, esPalindromoIdiomatico } from './solucion.js';

describe('esPalindromoImperativo', () => {
  it('cadena vacía', () => {
    expect(esPalindromoImperativo('')).toBe(true);
  });

  it('carácter único', () => {
    expect(esPalindromoImperativo('a')).toBe(true);
  });

  it('cadena con espacios', () => {
    expect(esPalindromoImperativo('A man a plan a canal Panama')).toBe(false);
  });

  it('palíndromo corto', () => {
    expect(esPalindromoImperativo('oso')).toBe(true);
  });

  it('palíndromo largo', () => {
    expect(esPalindromoImperativo('reconocer')).toBe(true);
  });

  it('palíndromo par', () => {
    expect(esPalindromoImperativo('abba')).toBe(true);
  });

  it('palíndromo impar', () => {
    expect(esPalindromoImperativo('ala')).toBe(true);
  });

  it('caso negativo par', () => {
    expect(esPalindromoImperativo('gato')).toBe(false);
  });

  it('caso negativo impar', () => {
    expect(esPalindromoImperativo('barco')).toBe(false);
  });
});

describe('esPalindromoIdiomatico', () => {
  it('cadena vacía', () => {
    expect(esPalindromoIdiomatico('')).toBe(true);
  });

  it('carácter único', () => {
    expect(esPalindromoIdiomatico('a')).toBe(true);
  });

  it('cadena con espacios', () => {
    expect(esPalindromoIdiomatico('A man a plan a canal Panama')).toBe(false);
  });

  it('palíndromo corto', () => {
    expect(esPalindromoIdiomatico('oso')).toBe(true);
  });

  it('palíndromo largo', () => {
    expect(esPalindromoIdiomatico('reconocer')).toBe(true);
  });

  it('palíndromo par', () => {
    expect(esPalindromoIdiomatico('abba')).toBe(true);
  });

  it('palíndromo impar', () => {
    expect(esPalindromoIdiomatico('ala')).toBe(true);
  });

  it('caso negativo par', () => {
    expect(esPalindromoIdiomatico('gato')).toBe(false);
  });

  it('caso negativo impar', () => {
    expect(esPalindromoIdiomatico('barco')).toBe(false);
  });
});
