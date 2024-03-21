export function convertirAMoneda(numero) {
  const formatoMoneda = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "code", // Utiliza el código de la moneda en lugar del símbolo
    maximumFractionDigits: 2, // Define el número máximo de decimales
  });
  if(numero == undefined || numero == NaN) return "USD 0";
  return formatoMoneda.format(numero);
}
export  function convertMonedaWUsd(numero) {
  const formatoMoneda = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2, // Define el número máximo de decimales
  });
  if(numero == undefined || numero == NaN) return "0";
  return formatoMoneda.format(numero).replace(/^\D+/g, ''); // Elimina todos los caracteres que no sean dígitos al principio
}
export function convertDecimales(numero, cantidadDecimales) {
  if (cantidadDecimales && cantidadDecimales > 0) {
    return parseFloat(numero).toFixed(cantidadDecimales).replace(/\.?0+$/, '');
  }
  return parseFloat(numero).toFixed(2).replace(/\.?0+$/, '');
}

