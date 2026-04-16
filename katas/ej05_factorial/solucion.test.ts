import { describe, it, expect } from 'vitest';
import { calcularFactorialImperativo, calcularFactorialIdiomatico } from './solucion.js';

describe('calcularFactorialImperativo', () => {
  it.each([
    [0, 1],
    [5, 120],
    [1, 1],
    [10, 3628800],
  ])('para %i devuelve %i', (entrada, salida) => {
    expect(calcularFactorialImperativo(entrada)).toBe(salida);
  });

  it.each([[21], [-2]])('para %i lanza error', (entrada) => {
    expect(() => calcularFactorialImperativo(entrada)).toThrow();
  });
});

describe('calcularFactorialIdiomatico', () => {
  it.each([
    [0, 1],
    [5, 120],
    [1, 1],
    [10, 3628800],
  ])('para %i devuelve %i', (entrada, salida) => {
    expect(calcularFactorialIdiomatico(entrada)).toBe(salida);
  });

  it.each([[21], [-2]])('para %i lanza error', (entrada) => {
    expect(() => calcularFactorialIdiomatico(entrada)).toThrow();
  });
});
