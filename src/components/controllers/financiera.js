export const calculateAnticipo = (anticipo, paymentTerm, total) => {
  if (!anticipo) {
    if (paymentTerm.includes("in advance")) {
      const porcentajeMatch = paymentTerm.match(/(\d+(\.\d+)?)%/);
      return (parseFloat(porcentajeMatch[1]) * total) / 100;
    }
  }
  return anticipo;
};
export const calculateBalance = (anticipo, total, balance) => {
  if (!balance) {
    return total - anticipo;
  }
  return balance;
};
export const calculateTotal = (total, productos, param) => {
  if (!total) {
    let sum = 0;
    for (let i = 0; i < productos.length; i++) {
      sum += Number(productos[i][param] * productos[i].netWeightLogistica);
    }
    return sum;
  }
  return total;
};
export const calculateCharges = (charges, anticipo, balance, total) => {
  if (!charges) {
    return total - anticipo - balance;
  }
  return charges;
};