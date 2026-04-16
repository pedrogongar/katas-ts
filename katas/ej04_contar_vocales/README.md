# ej04 — contar_vocales

`Tipo: doble (imperativo + idiomático) · Bloque: 1 · Dificultad: ★`

## Enunciado

Contar cuántas vocales hay en una cadena.

## Descomposición

El problema es directo: recorrer la cadena y contar las vocales. La decisión interesante está en definir qué cuenta como vocal. En español las vocales no son solo las cinco básicas: las acentuadas (`á`, `é`, `í`, `ó`, `ú`) y la diéresis (`ü`) son vocales legítimas. Ignorarlas sería lingüísticamente incorrecto, así que el conjunto completo es `a, e, i, o, u, á, é, í, ó, ú, ü`.

El input se espera normalizado en minúsculas. No se trabaja con emojis.

Casos límite identificados:

- Cadena vacía → 0.
- Cadena sin vocales (`'trns'`) → 0.
- Cadena normal (`'hola'`) → 2.
- Cadena de solo vocales (`'aeiou'`) → 5.
- Vocales acentuadas (`'balcón'`) → 2.
- Vocal con diéresis (`'ungüento'`) → 4.
- Conjunto completo de vocales especiales (`'áéíóúü'`) → 6.

## Soluciones

### Versión imperativa

```ts
export function contarVocalesImperativo(string: string): number {
  const vocales = ['a', 'e', 'i', 'o', 'u', 'á', 'é', 'í', 'ó', 'ú', 'ü'];
  let contador = 0;
  for (let i = 0; i < string.length; i++) {
    const caracter = string[i];
    if (caracter !== undefined && vocales.includes(caracter)) {
      contador++;
    }
  }
  return contador;
}
```

Bucle clásico con contador. El conjunto de vocales vive en un array y la comprobación se hace con `includes`. El detalle importante es el type guard `caracter !== undefined`: con `noUncheckedIndexedAccess` activo en el tsconfig, TypeScript trata `string[i]` como `string | undefined` porque no puede garantizar que el índice esté dentro del rango. La comprobación explícita le dice al compilador que a partir de ahí el valor es seguro.

### Versión idiomática

```ts
export function contarVocalesIdiomatico(string: string): number {
  const vocales = ['a', 'e', 'i', 'o', 'u', 'á', 'é', 'í', 'ó', 'ú', 'ü'];
  return [...string].filter((v) => vocales.includes(v)).length;
}
```

Spread + filter + length. El spread convierte la cadena en un array de caracteres, `filter` selecciona solo los que están en el conjunto de vocales, y `length` cuenta cuántos quedan. Es el primer uso de `filter` en el repositorio y un patrón que aparece constantemente en TypeScript moderno para contar o seleccionar elementos que cumplen una condición.

## Discusión

| Aspecto          | Imperativa            | Idiomática               |
| ---------------- | --------------------- | ------------------------ |
| Líneas de cuerpo | 8                     | 2                        |
| Estado mutable   | Sí (`contador`)       | No                       |
| Concepto clave   | Type guard + includes | Spread + filter + length |

La diferencia de expresividad es clara: la idiomática dice en una línea lo que la imperativa necesita ocho para expresar. Ambas usan `includes` para la comprobación, pero la imperativa necesita además un type guard por la configuración estricta del tsconfig.

El error más recurrente al usar `includes` fue ponerlo al revés: `caracter.includes(vocales)` en lugar de `vocales.includes(caracter)`. La clave para no confundirse: **el pajar llama a `includes`, la aguja va como argumento**. El pajar es el conjunto donde buscas (el array de vocales), la aguja es lo que buscas (el carácter).

## Qué aprendí

- **`Array.prototype.filter`**: recibe un callback, evalúa cada elemento, devuelve un nuevo array con solo los que cumplen. Documentación: [Array.prototype.filter en MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter).
- **`Array.prototype.includes`**: comprueba si un array contiene un elemento. Regla mental: pajar.includes(aguja). Documentación: [Array.prototype.includes en MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/includes).
- **Type guard con `noUncheckedIndexedAccess`**: cuando TypeScript marca un acceso por índice como `T | undefined`, la solución es guardar el valor en una variable y comprobar `!== undefined` antes de usarlo. Es un patrón que va a aparecer en cada kata que use índices.
- El patrón **spread → filter → length** para contar elementos que cumplen una condición.
- `it.each` en Vitest para tests parametrizados: una tabla de datos, un solo bloque de test, menos duplicación.
