export function convertirAMoneda(numero) {
  const formatoMoneda = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "code", // Utiliza el código de la moneda en lugar del símbolo
  });
  if(numero == undefined) return "USD 0";
  return formatoMoneda.format(numero);
}
