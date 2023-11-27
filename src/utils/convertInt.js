export function convertirAMoneda(numero) {
  const formatoMoneda = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "code", // Utiliza el código de la moneda en lugar del símbolo
    maximumFractionDigits: 5, // Define el número máximo de decimales
  });
  if(numero == undefined || numero == NaN) return "USD 0";
  return formatoMoneda.format(numero);
}
