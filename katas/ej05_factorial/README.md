# ej05 — factorial

`Tipo: doble (imperativo + idiomático) · Bloque: 1 · Dificultad: ★★`

## Enunciado

Calcular el factorial de un número entero no negativo.

## Descomposición

El factorial de N es el producto de todos los enteros positivos desde 1 hasta N. Ejemplo: `5! = 5 × 4 × 3 × 2 × 1 = 120`. Por convención matemática, `0! = 1`.

Hay dos decisiones de diseño relevantes. La primera es qué hacer con inputs fuera de rango: los factoriales de números negativos no están definidos, y a partir de `21!` el resultado supera `Number.MAX_SAFE_INTEGER` y JavaScript pierde precisión. Decido lanzar un error para cualquier input fuera de 0-20. La segunda es el caso de `0`: no necesita tratamiento especial si el bucle está bien construido, porque un bucle de 1 a 0 no entra y el acumulador queda en 1.

Casos límite:

- Input 0 → 1 (convención matemática, resuelto por el propio bucle).
- Input 1 → 1 (caso base mínimo no trivial).
- Input 5 → 120 (caso de control).
- Input 10 → 3628800 (verificación con número grande).
- Input negativo → lanza error.
- Input mayor que 20 → lanza error.

## Soluciones

### Versión imperativa

```ts
export function calcularFactorialImperativo(input: number): number {
  if (input < 0 || input > 20) throw 'Se debe introducir un número entero positivo entre 0 y 20';
  let acumulador = 1;
  for (let i = 1; i <= input; i++) {
    acumulador *= i;
  }
  return acumulador;
}
```

Bucle con acumulador multiplicativo. Mismo patrón que el contador de vocales pero con `*=` en lugar de `++`. La validación del rango va primero: rechazar lo inválido antes de trabajar con lo válido. El caso de `input === 0` no necesita guard especial: el bucle de `1` a `0` no entra, el acumulador queda en `1`, y se devuelve directamente.

### Versión idiomática

```ts
export function calcularFactorialIdiomatico(input: number): number {
  if (input < 0 || input > 20) throw 'Se debe introducir un número entero positivo entre 0 y 20';
  return Array.from({ length: input }, (_, i) => i + 1).reduce(
    (acumulador, actual) => acumulador * actual,
    1,
  );
}
```

Dos piezas encadenadas. `Array.from({length: input}, (_, i) => i + 1)` genera un array de `[1, 2, ..., N]`: crea N huecos vacíos y el mapper transforma cada posición (índice) en su valor correspondiente sumándole 1. `reduce` recorre ese array multiplicando cada elemento con el acumulador, partiendo de 1 como valor inicial. Es el equivalente funcional exacto del bucle imperativo: donde el `for` usa una variable mutable que se multiplica en cada vuelta, `reduce` pasa el acumulador como parámetro inmutable entre iteraciones.

Para `input === 0`, `Array.from({length: 0})` genera un array vacío, y `reduce` sobre un array vacío con valor inicial `1` devuelve directamente `1`. El caso límite se resuelve solo, igual que en la versión imperativa.

## Discusión

| Aspecto          | Imperativa        | Idiomática                 |
| ---------------- | ----------------- | -------------------------- |
| Líneas de cuerpo | 5                 | 4                          |
| Estado mutable   | Sí (`acumulador`) | No                         |
| Concepto clave   | Bucle con `*=`    | `Array.from` + `reduce`    |
| Manejo de `0!`   | Bucle no entra    | `reduce` sobre array vacío |

La relación entre ambas es directa: `reduce` es el bucle imperativo expresado como método funcional. El acumulador es el mismo concepto, solo cambia dónde vive (variable mutable vs parámetro del callback). Verlo con el debugger paso a paso hizo evidente la equivalencia.

## Qué aprendí

- **`Array.from({length: N}, mapper)`**: genera un array de N elementos donde cada posición se llena con lo que devuelva el mapper. El primer parámetro del mapper es el elemento (normalmente `undefined`, se ignora con `_`), el segundo es el índice. Documentación: [Array.from en MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/from).
- **`Array.prototype.reduce`**: recorre un array acumulando un resultado. Recibe `(acumulador, elementoActual)` y un valor inicial. Es el equivalente funcional de un bucle con variable acumuladora. Documentación: [Array.prototype.reduce en MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce).
- Validar primero y trabajar después: poner las guards de rango al inicio de la función, antes de cualquier lógica, es más limpio que mezclar validación con cálculo.
- Los **casos límite se resuelven solos** cuando el bucle está bien diseñado. No hace falta un `if (input === 0) return 1` si el bucle de `1` a `0` ya no entra y el acumulador ya empieza en `1`.
- El debugger fue clave para entender `reduce`: paso a paso se ve cómo el acumulador crece en cada iteración, igual que la variable del `for`.
