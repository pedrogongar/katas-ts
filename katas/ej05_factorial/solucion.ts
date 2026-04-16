export function calcularFactorialImperativo(input: number): number {
  if (input < 0 || input > 20) throw 'Se debe introducir un número entero positivo entre 0 y 20';

  let acumulador = 1;

  for (let i = 1; i <= input; i++) {
    acumulador *= i;
  }
  return acumulador;
}

export function calcularFactorialIdiomatico(input: number): number {
  if (input < 0 || input > 20) throw 'Se debe introducir un número entero positivo entre 0 y 20';

  return Array.from({ length: input }, (_, i) => i + 1).reduce(
    (acumulador, actual) => acumulador * actual,
    1,
  );
}
