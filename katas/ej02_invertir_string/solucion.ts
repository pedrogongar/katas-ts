export function invertirStringImperativo(string: string): string {
  let cadenaInvertida = '';

  for (let i = string.length - 1; i >= 0; i--) {
    cadenaInvertida += string[i];
  }

  return cadenaInvertida;
}

export function invertirStringIdiomatico(string: string): string {
  return [...string].reverse().join('');
}
