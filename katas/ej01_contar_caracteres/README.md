# ej01 — contar_caracteres

`Tipo: doble (imperativo + idiomático) · Bloque: 1 · Dificultad: ★`

## Enunciado

Dado un string, devolver el número de caracteres que contiene.

## Descomposición

El enunciado parece trivial pero esconde una decisión de producto: ¿qué cuenta como "carácter"? Para un humano, un emoji como `'👋'` es un carácter. Para JavaScript, ese mismo emoji ocupa dos posiciones internas en memoria. Las dos lecturas son válidas, pero son funciones distintas.

Asumo aquí la lectura humana: un carácter es lo que un lector percibe como una unidad visual. Espacios incluidos, emojis cuentan como uno.

Casos límite identificados:

- String vacío → 0.
- Solo espacios → tantos como espacios.
- Texto simple → longitud del texto.
- String con emoji intercalado (`'a👋b'`) → 3.
- Solo emoji (`'👋'`) → 1.

## Soluciones

### Versión imperativa

```ts
export function contarCaracteresImperativo(string: string): number {
  let contador = 0;
  for (let i = 0; i < string.length; i++) {
    contador++;
  }
  return contador;
}
```

Con la restricción del bloque 1 (sin `map`, `filter`, `reduce`, `spread`, `Array.from`), no hay forma de iterar respetando code points usando solo bucles e índices. Esta versión recorre el string con un `for` clásico y, por tanto, **cuenta code units de UTF-16**, no caracteres percibidos. Para `'👋'` devuelve 2.

No es un bug, es la limitación esperada del enfoque imperativo crudo cuando la API base trabaja en code units. Los tests de esta versión documentan la limitación esperando 2 para `'👋'` y 4 para `'a👋b'`.

### Versión idiomática

```ts
export function contarCaracteresIdiomatico(string: string): number {
  return [...string].length;
}
```

El spread operator sobre un string itera respetando code points en lugar de code units. Convertirlo a array y leer su `length` da la cuenta correcta desde el punto de vista del lector. Para `'👋'` devuelve 1.

## Discusión

La doble implementación pone en evidencia algo que la API esconde: string.length no responde la pregunta que parece responder. Mide unidades internas de almacenamiento, no caracteres.

Comparativa de las dos versiones:

| Aspecto               | Imperativa      | Idiomática |
| --------------------- | --------------- | ---------- |
| Líneas de cuerpo      | 4               | 1          |
| Cuenta code points    | No              | Sí         |
| Estado mutable        | Sí (`contador`) | No         |
| Resultado para `'👋'` | 2               | 1          |

Para una gestión de strings rigurosa (por ejemplo emojis compuestos como `'👨‍👩‍👧'`, donde el spread también falla), existe `Intl.Segmenter`. Es overkill para este kata, pero está ahí para casos reales.

## Qué aprendí

- La diferencia entre **code units** (cómo JavaScript guarda los strings internamente, en UTF-16) y **code points** (cómo los percibe Unicode y el lector humano). El primero lo da `string.length`; el segundo, iterar con spread.
- El **spread operator** sobre un string itera por code points, no por code units. Documentación: [Spread syntax en MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Spread_syntax).
- La trampa de [`String.prototype.length`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/length) está documentada en la propia MDN, con aviso explícito.
- Que una restricción artificial (prohibir spread en la versión imperativa) sirve para **hacer visible una limitación real** que normalmente queda escondida tras la API.
- Existe `Intl.Segmenter` para casos donde ni el spread basta: [Intl.Segmenter en MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter).
