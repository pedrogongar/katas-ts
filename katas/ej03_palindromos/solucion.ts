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

export function esPalindromoIdiomatico(string: string): boolean {
  return [...string].reverse().join('') === string;
}
