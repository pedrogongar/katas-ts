# Retrospectiva 01 — Katas ej01 a ej05

## Contexto

Primeros cinco katas del bloque 1, todos con doble implementación (imperativo + idiomático). Cubren strings, números, bucles, condicionales, y los primeros métodos de array.

## Qué sale ya con fluidez

Los tests son lo que más se ha asentado. La estructura de `describe`, `it`, `expect` y el flujo TDD (rojo → verde → refactor) salen sin necesidad de consultar katas anteriores. La transición a `it.each` en `ej04` fue natural.

Las estructuras básicas de control (`for`, `if`, condicionales encadenados) están interiorizadas. Los bucles con índice, contadores y acumuladores no requieren pensar: salen por instinto.

El spread operator sobre strings está presente como herramienta cuando necesito un array de caracteres. No es automático todavía, pero sí lo tengo en el radar y lo elijo conscientemente.

## Qué aún cuesta

`Array.from` es lo que más fricción genera. Solo lo he usado una vez (`ej05`) y la sintaxis con `{length: N}` y el mapper `(_, i) => i + 1` no se siente natural. Necesita más repetición hasta que deje de requerir consulta.

`reduce` está un paso por delante: entiendo qué hace y cómo funciona (el debugger ayudó mucho a visualizar el acumulador paso a paso), pero todavía tengo que pensar demasiado para construirlo desde cero. Igual que con `filter` e `includes`: los tengo presentes como opciones, pero falta camino hasta que salgan por reflejo.

`while` apenas lo he usado. El kata de los dos punteros (`ej03`) fue el único y me resultó muy interesante, pero me preocupa que se quede en el olvido si no lo practico más.

## Descomposición

La evolución es real aunque lenta. Del primer kata, donde la descomposición me resultaba casi incomprensible como ejercicio, al quinto hay una diferencia clara: el proceso es más rápido, sé qué secciones rellenar y empiezo a anticipar los casos límite antes de que me los señalen.

Sigue dando pereza. Mi reacción instintiva sigue siendo abrir el editor y teclear. Pero empiezo a notar que tener escrito lo que hay que hacer, aunque parezca obvio, elimina ruido cuando llega el momento de implementar.

Lo que más se resiste es lo que yo llamo "el hilo conector": entiendo qué tengo que hacer, pero me falta la traducción directa entre el razonamiento en lenguaje natural y el código. A veces eso se convierte en ensayo y error, que no es necesariamente malo, pero delata que la descomposición aún no está suficientemente afinada.

## Errores recurrentes

- **`includes` al revés**: en `ej04` escribí `caracter.includes(vocales)` en lugar de `vocales.includes(caracter)`. La regla mental "pajar.includes(aguja)" me la llevo para adelante.
- **Copiar el segundo `describe` sin cambiar la función**: apareció en `ej01` y volvió en `ej04`. Es un error mecánico, no conceptual, pero peligroso porque los tests pasan sin verificar lo que deberían.
- **`<=` vs `<` en condiciones de bucle**: apareció en `ej02`. Confundir si el límite es inclusivo o exclusivo. Cada vez que escribo un bucle necesito pararme un segundo a pensar si el último valor debe entrar o no.
- **Variables intermedias innecesarias**: en `ej01` creé dos variables para lo que era una sola línea. Tendencia a descomponer en pasos de más cuando la expresión encadenada es más clara.

## TDD

Hacer los tests antes de la implementación me aporta mucho más de lo que esperaba. Es como mezclar ingeniería con ingeniería inversa: primero defines a dónde quieres llegar, después construyes el camino. La tranquilidad de saber si tu función es válida o no mientras la escribes cambia la forma de trabajar.

## Debugger

Ha pasado de "algo que está ahí pero no toco" a una herramienta que considero imprescindible. La sesión de `reduce` en `ej05` fue la que lo desbloqueó: ver el acumulador crecer paso a paso hizo que el concepto encajara de una forma que la lectura de documentación sola no consiguió.

## Doble implementación

Me ayuda a ser consciente de algo que antes no veía: lo fácil que es construir algo de una forma básica, pero lo difícil que puede ser optimizarlo usando los métodos que la API de TypeScript ofrece. Las dos versiones del mismo problema hacen visible esa distancia.

El kata donde más valor ha aportado es `ej03` (palíndromos): la versión imperativa con dos punteros y la idiomática con invertir-y-comparar son soluciones genuinamente distintas, no solo la misma idea con distinta sintaxis.

## De cara a los próximos katas

Necesito machacar más. Tengo un hambre voraz de escribir código y siento que los conceptos nuevos (`Array.from`, `reduce`, `filter`, dos punteros) necesitan repetición sostenida para pasar de "lo entiendo" a "me sale solo". Los siguientes siete katas del bloque 1 y el bloque 2 entero son exactamente eso.
