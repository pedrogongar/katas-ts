import { describe, it, expect } from 'vitest';
import { contarVocalesImperativo, contarVocalesIdiomatico } from './solucion.js';

describe('contarVocalesImperativo', () => {
  it.each([
    ['', 0],
    ['balcón', 2],
    ['ungüento', 4],
    ['trns', 0],
    ['hola', 2],
    ['aeiou', 5],
    ['áéíóúü', 6],
  ])('para "%s" devuelve %i', (entrada, salida) => {
    expect(contarVocalesImperativo(entrada)).toBe(salida);
  });
});

describe('contarVocalesIdiomatico', () => {
  it.each([
    ['', 0],
    ['balcón', 2],
    ['ungüento', 4],
    ['trns', 0],
    ['hola', 2],
    ['aeiou', 5],
    ['áéíóúü', 6],
  ])('para "%s" devuelve %i', (entrada, salida) => {
    expect(contarVocalesIdiomatico(entrada)).toBe(salida);
  });
});
