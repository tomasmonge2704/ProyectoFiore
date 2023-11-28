export const calculateAnticipo = (anticipo, paymentTerm, total) => {
  if (!anticipo && anticipo !== 0) {
    if (paymentTerm.includes("in advance")) {
      const porcentajeMatch = paymentTerm.match(/(\d+(\.\d+)?)%/);
      return (parseFloat(porcentajeMatch[1]) * total) / 100;
    }
  }
  return anticipo;
};
export const calculateBalance = (anticipo, total, balance) => {
  if (!balance && balance !== 0) {
    return total - anticipo;
  }
  return balance;
};
export const calculateTotal = (total, productos, param) => {
  if (!total && total !== 0) {
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
export const calculateComision = (comision,monto,porcentaje,fijo) => {
    if(!comision && comision !== 0 && monto > 0){
    const calc = (porcentaje * monto || 0) + (fijo || 0);
    return calc
    }
    return comision || 0
};