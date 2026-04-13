# ROADMAP-KATAS

Plan de progresión del repositorio. Define la configuración técnica, los bloques temáticos y el detalle del bloque inicial.

---

## Configuración técnica

### TypeScript

- `strict: true` (las ocho opciones estrictas estándar activas).
- `noUncheckedIndexedAccess: true` (acceso por índice devuelve `T | undefined`, fuerza pensamiento defensivo).
- `target: "ES2022"`, `module: "ESNext"`, `moduleResolution: "Bundler"`.

### ESLint (flat config)

- Base recomendada de `@typescript-eslint`.
- `@typescript-eslint/no-explicit-any` activa.
- `eqeqeq` activa (obliga `===`).
- `prefer-const` activa.
- `no-console` en modo `warn`.
- Sin reglas de formato (responsabilidad de Prettier).
- Sin reglas de complejidad ni naming convention.

### Prettier

- `semi: true`
- `singleQuote: true`
- `printWidth: 100`
- `tabWidth: 2`
- `useTabs: false`
- `trailingComma: "all"`
- `arrowParens: "always"`

### Otros

- `.editorconfig` para consistencia entre máquinas.
- `.gitignore` completo desde el inicio.
- Sin Husky ni GitHub Actions al inicio. Se reevalúan más adelante si el flujo lo pide.

### Convenciones

- Numeración: `ejNN_nombre_descriptivo`, padding de dos cifras, empezando en `ej01`.
- Naming en español: carpetas, funciones, variables, comentarios.
- README de cada kata: abre con una línea tipo `Tipo: doble (imperativo + idiomático) · Bloque: 1 · Dificultad: ★`. Sin frontmatter YAML.
- Enlaces a MDN en la sección "qué he aprendido" del README cada vez que aparece un método nuevo.

### Filosofía Exercism: qué se hereda y qué no

- **Sí**: README rico como enunciado profesional (descripción, ejemplos, casos límite, enlaces a docs); ciclo de iteración con feedback; discusión de soluciones alternativas tras resolver el kata.
- **No**: tests pre-escritos. Los tests se escriben a partir de los casos límite identificados en la fase de descomposición.

---

## Visión general de los ocho bloques

| Bloque | Tema                                     | Estilo                                         | Katas estimados |
| ------ | ---------------------------------------- | ---------------------------------------------- | --------------- |
| 1      | Lógica pura básica con números y strings | Doble implementación (imperativo + idiomático) | 12              |
| 2      | Arrays: transformación y agregación      | Solo idiomático                                | 8-10            |
| 3      | Objetos y diccionarios                   | Solo idiomático                                | 6-8             |
| 4      | Strings avanzado                         | Solo idiomático                                | 5-7             |
| 5      | Estructuras de datos: Map y Set          | Solo idiomático                                | 4-6             |
| 6      | Algoritmos clásicos básicos              | Solo idiomático                                | 6-8             |
| 7      | Fechas con `Date` nativo                 | Solo idiomático                                | 4-5             |
| 8      | Manejo de errores y type narrowing       | Solo idiomático                                | 5-7             |

**Total estimado**: 50-65 katas.

**Retrospectivas**: cada cinco katas, una entrada en `retrospectivas/retro-NN.md`.

---

## Bloque 1 — Lógica pura básica con números y strings

**Objetivo**: asentar los fundamentos del control de flujo en TypeScript (bucles, condicionales, índices, comparaciones), entrenar la descomposición previa con problemas manejables, y comparar la versión imperativa cruda con la versión idiomática del mismo problema. Al final del bloque, cualquiera de estos problemas debe poder resolverse en cualquiera de los dos estilos sin pensar.

**Estilo**: doble implementación. Cada kata se resuelve dos veces:

- **Versión A — Imperativo crudo**: prohibido usar `map`, `filter`, `reduce`, `find`, `some`, `every`. Solo bucles `for`/`while`, índices, condicionales, comparaciones manuales.
- **Versión B — Idiomático**: la solución que escribiría un desarrollador TypeScript moderno con la API correcta.

Después de implementar las dos, **discusión obligatoria** sobre trade-offs: legibilidad, eficiencia, expresividad, cuándo cada estilo es preferible.

### Lista de katas

#### `ej01_contar_caracteres`

**Concepto principal**: calentamiento. Asentar el flujo completo del método (descomposición previa, casos límite, tests, código, README).

**Problema**: contar el número de caracteres de una cadena.

**Casos límite**: cadena vacía, cadena con espacios, caracteres unicode complejos (emojis).

**Doble implementación significativa**: no realmente, es `string.length`. Sirve para asentar el flujo. Discusión post-kata: por qué `'👋'.length` da 2 y no 1 (introducción ligera a UTF-16 y code points).

**Dificultad**: ★

---

#### `ej02_invertir_string`

**Concepto principal**: primera doble implementación real. Recorrido manual con índice descendente vs encadenado de métodos.

**Problema**: dada una cadena, devolver la cadena invertida.

**Casos límite**: cadena vacía, un solo carácter, palabras con espacios, emojis.

**Versión A**: bucle `for` desde `string.length - 1` hasta `0`, concatenando caracteres en una variable acumuladora.

**Versión B**: `string.split('').reverse().join('')`.

**Discusión**: qué hace cada uno de los tres métodos encadenados, qué pasa con caracteres unicode complejos como emojis (`'👋'.split('')` da resultados raros), `[...string]` como alternativa que respeta code points completos.

**Dificultad**: ★

---

#### `ej03_palindromos`

**Concepto principal**: técnica de dos punteros vs comparación con reverso.

**Problema**: determinar si una cadena es palíndromo.

**Casos límite**: cadena vacía, un carácter, mayúsculas/minúsculas, espacios y signos.

**Decisión recomendada**: trabajar con cadena ya limpia para no mezclar dos problemas. Kata extra opcional con normalización completa.

**Versión A**: dos punteros, `i = 0` y `j = string.length - 1`, comparar caracteres avanzando hacia el centro.

**Versión B**: comparar `string === string.split('').reverse().join('')` reutilizando lógica del kata anterior.

**Discusión**: la versión A es marginalmente más eficiente (corta al encontrar desigualdad), la B es más legible.

**Dificultad**: ★

---

#### `ej04_contar_vocales`

**Concepto principal**: introducción del spread operator sobre strings y de `filter` sobre arrays.

**Problema**: contar cuántas vocales hay en una cadena.

**Dificultad**: ★

---

#### `ej05_factorial`

**Concepto principal**: bucle con acumulador. Diseño defensivo en casos negativos.

**Problema**: calcular el factorial de un número entero no negativo.

**Casos límite**: 0 (devuelve 1), números negativos (lanzar error o devolver `undefined`).

**Dificultad**: ★★

---

#### `ej06_suma_digitos`

**Concepto principal**: descomposición de número en dígitos. División entera y módulo vs conversión a string.

**Problema**: dado un número entero, devolver la suma de sus dígitos.

**Versión A**: bucle `while` con `n % 10` y `Math.floor(n / 10)`.

**Versión B**: `String(n).split('').reduce((sum, d) => sum + Number(d), 0)`.

**Discusión**: la versión A es matemáticamente más limpia, la B es más legible. Distintas escuelas.

**Dificultad**: ★★

---

#### `ej07_fibonacci`

**Concepto principal**: estado iterativo con dos variables, primera mención al problema de la recursión naive.

**Problema**: devolver los primeros N términos de la secuencia de Fibonacci como array.

**Casos límite**: N = 0 (array vacío), N = 1 (`[0]`), N = 2 (`[0, 1]`), N negativo.

**Versión A**: bucle con dos variables `a = 0`, `b = 1`, intercambio `[a, b] = [b, a + b]`.

**Versión B**: función iterativa idiomática que devuelve array.

**Discusión clave**: por qué la versión recursiva clásica `fib(n) = fib(n-1) + fib(n-2)` es catastróficamente ineficiente sin memoización (O(2^n)).

**Dificultad**: ★★

---

#### `ej08_es_primo`

**Concepto principal**: primer kata donde el imperativo gana al idiomático en claridad.

**Problema**: determinar si un número entero es primo.

**Casos límite**: 0, 1, 2, 3, números pares, números muy grandes.

**Versión A**: bucle `for (let i = 2; i <= Math.sqrt(n); i++)` comprobando divisibilidad. Si encuentra divisor, `return false`.

**Versión B**: `Array.from({length: Math.floor(Math.sqrt(n)) - 1}, (_, i) => i + 2).every(d => n % d !== 0)`.

**Discusión clave**: la versión A es más clara, más eficiente y más natural de leer. "Idiomático" no siempre es "mejor"; parte de la madurez técnica es saber cuándo cada estilo es preferible.

**Dificultad**: ★★

---

#### `ej09_fizzbuzz`

**Concepto principal**: cadena de condicionales vs ternarios anidados, cuándo extraer a función nombrada.

**Problema**: el clásico FizzBuzz. Para los números del 1 al N, devolver `"Fizz"` si es múltiplo de 3, `"Buzz"` si es múltiplo de 5, `"FizzBuzz"` si es múltiplo de ambos, el número en otro caso. Devolver array de strings.

**Casos límite**: N = 0, N = 1, N negativo.

**Discusión**: el ternario anidado se vuelve ilegible rápido. Cuándo extraer a función con nombre. Principio de "una función debe hacer una cosa".

**Dificultad**: ★★

---

#### `ej10_mayor_array`

**Concepto principal**: estado en variable acumuladora, decisión de diseño sobre casos límite.

**Problema**: dado un array de números, devolver el mayor.

**Casos límite**: array vacío, array con un solo elemento, array con todos iguales, array con negativos.

**Decisión recomendada**: lanzar error si el array está vacío. Devolver `undefined` o `-Infinity` traslada el problema al consumidor.

**Versión A**: bucle `for` con variable `max = arr[0]` y comparación.

**Versión B**: `Math.max(...arr)` o `arr.reduce((max, n) => n > max ? n : max)`.

**Discusión**: qué pasa con `Math.max(...arr)` cuando el array es enorme (límite del stack al spreader); `reduce` como alternativa más segura.

**Dificultad**: ★★

---

#### `ej11_contar_ocurrencias`

**Concepto principal**: contador en bucle vs filter sobre array de caracteres.

**Problema**: contar cuántas veces aparece un carácter en una cadena.

**Casos límite**: cadena vacía, carácter no presente, todos los caracteres iguales al objetivo, case-sensitive.

**Versión A**: bucle `for` con contador.

**Versión B**: `[...string].filter(c => c === objetivo).length`. Truco alternativo: `string.split(objetivo).length - 1`.

**Discusión**: el truco con `split` es ingenioso pero menos legible.

**Dificultad**: ★★

---

#### `ej12_eliminar_duplicados`

**Concepto principal**: introducción de `Set` como estructura de datos. Primer encuentro con el concepto de complejidad algorítmica.

**Problema**: dado un array de números, devolver un array sin duplicados (preservando orden de primera aparición).

**Casos límite**: array vacío, array sin duplicados, array todo iguales, array con un solo elemento.

**Versión A**: bucle anidado o uso de un objeto como diccionario auxiliar para marcar vistos.

**Versión B**: `[...new Set(arr)]`.

**Concepto nuevo**: `Set` como estructura de datos.

**Enlace obligatorio**: [Set](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Set).

**Discusión clave**: complejidad O(n²) del bucle anidado vs O(n) del `Set`. Primera mención explícita de complejidad algorítmica.

**Dificultad**: ★★★

---

### Cierre del bloque 1

Tras `ej12`, primera retrospectiva: `retrospectivas/retro-01.md`.

---

## Bloques 2-8

### Bloque 2 — Arrays: transformación y agregación

**Objetivo**: dominar `map`, `filter`, `reduce`, `find`, `some`, `every`, `flat`, `flatMap`, `sort` con comparator. Solo idiomático. Pensar en transformaciones de array como primera opción.

**Tipos de problemas**: filtrar por criterio, transformar formatos, agrupar por clave, encontrar máximos y mínimos con criterio, deduplicar por propiedad, particionar, ordenar con criterios complejos.

### Bloque 3 — Objetos y diccionarios

**Objetivo**: trabajar con objetos como estructuras de datos. Dominar `Object.entries`, `Object.fromEntries`, `Object.keys`, `Object.values`, `Object.groupBy` (ES2024), y `reduce` sobre objetos.

**Tipos de problemas**: contar frecuencias, indexar arrays por clave, transformar entre estructuras, merge de objetos con reglas.

### Bloque 4 — Strings avanzado

**Objetivo**: dominar operaciones de string más allá de lo básico. `split` con separadores complejos, `join`, `replace`, `replaceAll`, `slice`, `substring`, regex básica.

**Tipos de problemas**: parseo simple, formateo, transformación de casos, validación de formato, manipulación de patrones.

### Bloque 5 — Estructuras de datos: Map y Set

**Objetivo**: cuándo usar `Map`/`Set` en lugar de objetos y arrays. Diferencias semánticas, casos de uso.

**Tipos de problemas**: caches simples, conjuntos de elementos únicos con orden, índices con claves no string, operaciones de conjuntos.

### Bloque 6 — Algoritmos clásicos básicos

**Objetivo**: introducción honesta a la algoritmia.

**Tipos de problemas**: ordenación (insertion sort, bubble sort para entender, no para producción), búsqueda lineal y binaria, recursión simple (factorial, fibonacci con memoización), backtracking elemental.

**Concepto central**: complejidad algorítmica. Big O, casos típicos.

### Bloque 7 — Fechas con `Date` nativo

**Objetivo**: manejar fechas con la API nativa de JavaScript sin librerías externas para casos básicos.

**Tipos de problemas**: parsing de fechas, comparaciones, diferencias, formateo, días laborables, semanas del año.

### Bloque 8 — Manejo de errores y type narrowing

**Objetivo**: dominar el modelo de errores de JavaScript y el sistema de tipos de TypeScript para distinguir tipos en tiempo de ejecución de forma segura.

**Tipos de problemas**: `try/catch` con tipos, `instanceof`, type guards personalizados, discriminated unions, `unknown` vs `any`, validación de datos externos con tipos.
