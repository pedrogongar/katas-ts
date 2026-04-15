# ej03 — palindromos

`Tipo: doble (imperativo + idiomático) · Bloque: 1 · Dificultad: ★`

## Enunciado

Determinar si una cadena es palíndromo.

## Descomposición

Un palíndromo es una cadena que se lee igual en ambos sentidos. La definición es trivial, pero arrastra dos decisiones que conviene cerrar antes de programar nada.

La primera, ¿qué hacemos con la normalización? La cadena `'A man a plan a canal Panama'` es un palíndromo famoso, pero solo si ignoras mayúsculas, espacios y signos. Mezclar normalización y verificación en la misma función junta dos problemas distintos. Aquí decido que la función espera **input ya normalizado** (minúsculas, sin espacios, sin signos). La normalización vivirá en otro kata futuro, no aquí.

La segunda, ¿qué pasa con cadenas vacías y de un solo carácter? Por la definición misma, ambas se leen igual en los dos sentidos: cumplen trivialmente la condición. Devuelven `true`.

Casos límite:

- Cadena vacía → `true`.
- Único carácter → `true`.
- Cadena no normalizada (`'A man a plan a canal Panama'`) → `false`, porque las mayúsculas y los espacios cuentan como caracteres distintos.
- Palíndromos cortos y largos, de longitud par e impar (`'oso'`, `'reconocer'`, `'abba'`, `'ala'`).
- Casos negativos de longitud par e impar (`'gato'`, `'barco'`).

Las longitudes par e impar importan: el bucle de comparación se comporta distinto en el centro y conviene asegurarse de que el algoritmo cubre los dos casos.

## Soluciones

### Versión imperativa

```ts
export function esPalindromoImperativo(string: string): boolean {
  let izquierda = 0;
  let derecha = string.length - 1;
  while (izquierda < derecha) {
    if (string[izquierda] !== string[derecha]) return false;
    izquierda++;
    derecha--;
  }
  return true;
}
```

Aplica la **técnica de los dos punteros**: dos índices que se mueven en direcciones opuestas hasta cruzarse. En cada paso, si los caracteres apuntados difieren, devuelve `false` inmediatamente sin terminar el recorrido. Si los punteros se cruzan sin encontrar diferencias, la cadena es palíndromo.

La condición `izquierda < derecha` cubre los dos casos límite sin necesidad de una guard explícita: para cadena vacía, `derecha` es `-1` y el bucle no entra; para un único carácter, `izquierda === derecha` desde el inicio y tampoco entra. En los dos casos se devuelve `true` directamente.

Esta es la versión más eficiente del problema: en el peor caso recorre la mitad de la cadena, en el mejor termina en la primera comparación. No construye estructuras nuevas; solo usa dos índices.

### Versión idiomática

```ts
export function esPalindromoIdiomatico(string: string): boolean {
  return [...string].reverse().join('') === string;
}
```

Reutiliza el patrón del kata anterior: invierte la cadena con spread + `reverse` + `join('')` y compara con el original. Si la cadena invertida coincide, es palíndromo.

Es menos eficiente que dos punteros: siempre construye un array nuevo y siempre recorre la cadena entera, incluso cuando una sola comparación habría bastado para descartar. A cambio, es una sola línea expresiva donde la intención se lee directa.

## Discusión

| Aspecto                 | Imperativa (dos punteros) | Idiomática (invertir y comparar) |
| ----------------------- | ------------------------- | -------------------------------- |
| Líneas de cuerpo        | 8                         | 1                                |
| Memoria                 | O(1)                      | O(n)                             |
| Tiempo en el peor caso  | O(n/2)                    | O(n)                             |
| Tiempo en el mejor caso | O(1)                      | O(n)                             |
| Termina temprano        | Sí                        | No                               |

La técnica de dos punteros es uno de los patrones más reutilizables que aparece en el bloque 1. No es exclusiva de strings: se aplica a arrays ordenados (búsqueda binaria es una variante), eliminación in-place de duplicados, problemas de "encontrar pares que sumen X", sliding window. Vale la pena interiorizarla más allá de este kata.

## Qué aprendí

- La **técnica de los dos punteros**: dos índices independientes que se mueven en direcciones opuestas. En problemas de simetría (como palíndromos), permite return temprano y memoria constante.
- **Strings y array-likes**: un string en JavaScript no es un array, pero comparte `.length` y acceso por índice. Por eso el `for` clásico funciona sobre strings sin conversión, aunque métodos como `map` o `filter` no estén disponibles. Documentación: [Array-like objects en MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections#working_with_array-like_objects).
- Los **casos límite se pueden resolver desde la condición del bucle**, no siempre necesitan guards explícitas. La condición `izquierda < derecha` ya cubre cadena vacía y carácter único sin código adicional.
- Separar **normalización** y **verificación** en funciones distintas mantiene el alcance manejable y evita mezclar dos problemas en uno.
