export function convertirAMoneda(numero) {
    const formatoMoneda = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
  
    return formatoMoneda.format(numero);
}