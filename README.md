# katas-ts

Katas de TypeScript organizados en bloques temáticos progresivos. El objetivo del repositorio es construir fluidez activa con la API estándar de JavaScript y TypeScript a base de práctica deliberada y consulta directa a documentación primaria (MDN).

## Filosofía

- **Descomposición previa al código**. Cada kata se piensa antes de escribirse. La descomposición ocurre fuera del repositorio, en notas privadas; el repositorio contiene el resultado pulido.
- **Tests propios**. No hay tests pre-escritos. Los tests se derivan de los casos límite identificados en la fase de descomposición.
- **Documentación oficial como fuente primaria**. Cada README de kata enlaza a la entrada de MDN correspondiente para los métodos nuevos utilizados.
- **Conventional Commits** en todo el historial.

## Estructura

```
katas-ts/
├── katas/
│   ├── ej01_contar_caracteres/
│   │   ├── README.md
│   │   ├── solucion.ts
│   │   └── solucion.test.ts
│   └── ...
├── retrospectivas/
│   └── retro-NN.md      ← cada 5 katas
├── scripts/
│   └── new-kata.ts      ← creador automático (pendiente)
├── ROADMAP-KATAS.md
└── README.md
```

## Convenciones

- Numeración: `ejNN_nombre_descriptivo`, padding de dos cifras, empezando en `ej01`.
- Nombres de funciones, variables, archivos y carpetas en español.
- Cada README de kata abre con una línea de metadatos del tipo `Tipo: doble · Bloque: 1 · Dificultad: ★`.

## Setup local

Requisitos: Node 24 LTS y pnpm 10. Si usas `fnm`, la versión se aplica automáticamente al entrar en la carpeta gracias al archivo `.node-version`.

```bash
pnpm install
pnpm test          # ejecuta Vitest una vez
pnpm test:watch    # Vitest en modo watch
pnpm lint          # ESLint sobre todo el repo
pnpm format        # Prettier sobre todo el repo
pnpm typecheck     # TypeScript sin emitir
```

## Roadmap

Ver [`ROADMAP-KATAS.md`](./ROADMAP-KATAS.md) para la planificación completa de bloques y la lista detallada de katas.

## Índice de katas

| Kata                                                        | Bloque | Dificultad | Estado     |
| ----------------------------------------------------------- | ------ | ---------- | ---------- |
| [ej01 — contar_caracteres](./katas/ej01_contar_caracteres/) | 1      | ★          | Completado |
