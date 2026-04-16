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

export function contarVocalesIdiomatico(string: string): number {
  const vocales = ['a', 'e', 'i', 'o', 'u', 'á', 'é', 'í', 'ó', 'ú', 'ü'];

  return [...string].filter((c) => vocales.includes(c)).length;
}
