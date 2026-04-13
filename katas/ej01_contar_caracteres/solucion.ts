export function contarCaracteresImperativo(string: string): number {
  let contador = 0;

  for (let i = 0; i < string.length; i++) {
    contador++;
  }

  return contador;
}

export function contarCaracteresIdiomatico(string: string): number {
  return [...string].length;
}
