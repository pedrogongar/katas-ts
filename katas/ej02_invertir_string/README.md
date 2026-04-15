# ej02 — invertir_string

`Tipo: doble (imperativo + idiomático) · Bloque: 1 · Dificultad: ★`

## Enunciado

Dada una cadena, devolver la cadena invertida.

## Descomposición

El problema parece evidente, pero arrastra el dilema de `ej01` con un giro: aquí no solo se cuentan mal los emojis, **se rompen al invertirlos**. Un emoji ocupa dos code units consecutivos en un orden concreto; si los inviertes por separado, el resultado deja de ser un emoji válido y queda como dos surrogate halves sueltos.

Decisiones tomadas:

- "Invertir" significa devolver la cadena leída de derecha a izquierda, carácter a carácter, manteniendo cualquier signo o espacio en su nueva posición.
- La versión idiomática preserva los emojis intactos en la posición invertida correcta. La versión imperativa, al indexar por code units, los rompe. Es una limitación esperada del bloque 1, no un bug.
- Una cadena vacía devuelve una cadena vacía.

Casos límite identificados:

- Cadena vacía → `''`.
- Único carácter → el mismo carácter.
- Cadena con espacios y signos (`' ¡Hola, mundo!'`) → la inversión los recoloca tal cual.
- Palíndromo (`'oso'`) → entrada y salida coinciden.
- Cadena con emoji intercalado (`'a👋b'`) → la idiomática devuelve `'b👋a'`, la imperativa devuelve `'b' + surrogate halves invertidos + 'a'`.
- Solo emoji (`'👋'`) → la idiomática lo preserva, la imperativa lo rompe.

## Soluciones

### Versión imperativa

```ts
export function invertirStringImperativo(string: string): string {
  let cadenaInvertida = '';
  for (let i = string.length - 1; i >= 0; i--) {
    cadenaInvertida += string[i];
  }
  return cadenaInvertida;
}
```

Recorre el string de derecha a izquierda con un índice descendente, concatenando cada code unit en una variable acumuladora. Como `string.length` y la indexación trabajan en code units, los emojis se desensamblan al ir carácter a carácter.

Para `'a👋b'` la salida es `'b' + '\uDC4B' + '\uD83D' + 'a'`: los dos surrogate halves del emoji aparecen invertidos entre sí, lo que rompe la representación del símbolo. No es un fallo del código, es la consecuencia inevitable de operar a nivel de unidades internas.

### Versión idiomática

```ts
export function invertirStringIdiomatico(string: string): string {
  return [...string].reverse().join('');
}
```

El spread operator sobre un string itera respetando code points, no code units. Eso convierte el string en un array donde cada emoji es un único elemento. `reverse` invierte el array y `join('')` lo recompone como cadena. Los emojis sobreviven enteros porque nunca se trataron como dos piezas.

Una alternativa habitual es `string.split('').reverse().join('')`, pero `split('')` divide por code units, así que tropezaría con el mismo problema que la versión imperativa. El spread es la pieza clave.

## Discusión

Las dos implementaciones invierten correctamente cualquier texto sin emojis. Cuando aparecen emojis, divergen:

| Aspecto                 | Imperativa                     | Idiomática       |
| ----------------------- | ------------------------------ | ---------------- |
| Líneas de cuerpo        | 5                              | 1                |
| Estado mutable          | Sí (`cadenaInvertida`)         | No               |
| Recorre por code units  | Sí                             | No (code points) |
| Resultado para `'a👋b'` | `'b' + surrogates rotos + 'a'` | `'b👋a'`         |

El kata refuerza el aprendizaje de `ej01` desde otro ángulo: el problema de fondo no es contar mal, es que **los métodos básicos de strings en JavaScript operan sobre la representación interna en UTF-16, no sobre lo que un humano percibe**. Para cualquier manipulación que involucre caracteres unicode complejos, el spread (o `Intl.Segmenter` para casos aún más estrictos) deja de ser opcional.

## Qué aprendí

- El **spread operator sobre un string ya devuelve un array** de code points; no hace falta encadenar con `split('')`. De hecho, `split('')` rompe el efecto que se busca, porque divide por code units.
- Los **surrogate halves** son los dos code units que componen un emoji en UTF-16. Se pueden obtener individualmente con `string[i]` cuando se itera por índices, y se pueden inspeccionar con `codePointAt`. Documentación: [String.prototype.codePointAt en MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt).
- Un bug recurrente del bloque 1 que ha vuelto a aparecer: confundir `i <= length` y `i >= 0` con sus equivalentes incorrectos al recorrer arrays. Los índices van de `0` a `length - 1`, sin excepción.
- Para verificar el comportamiento exacto de cualquier expresión sobre strings, el REPL de Node resuelve dudas en segundos: `node -e "console.log([...'👋'])"`.
