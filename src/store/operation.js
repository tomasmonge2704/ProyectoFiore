import { create } from "zustand";

export const useStore = create((set) => ({
  operation: undefined,
  setOperation: (newOperation) =>
    set(() => ({
      operation: newOperation,
    })),
  setFieldsDocs: (fields) => {
    let totalFields = 12;
    let completedFields = Object.values(fields).filter(Boolean).length;
    if(fields.documentRequested.length > 0) {
      completedFields = completedFields + 1;
    }
    if(fields.placeBLIssue == ""){
      completedFields = completedFields - 1;
    }
    const completed = Math.floor((completedFields / totalFields) * 100);
    set((state) => ({
      operation: {
        ...state.operation,
        docs: {
          ...state.operation.docs,
          fields: fields,
          completed:completed
        },
      },
    }))},
  setFieldsComercial: (fields) => {
    let totalFields = 22;
    if(fields?.comision) totalFields = totalFields + 1;
    let completedFields = Object.values(fields).filter(Boolean).length;
    const completed = Math.floor((completedFields / totalFields) * 100);
    set((state) => ({
      operation: {
        ...state.operation,
        comercial: {
          ...state.operation.comercial,
          fields: fields,
          completed:completed
        },
      },
    }));
  },
  setProductsComercial: (productos) => {
    let balanceSale = 0;
    let balancePurchase = 0;
    let totalWeight = 0;
    for (let i = 0; i < productos.length; i++) {
      balanceSale += productos[i].unitPriceSale * productos[i].quantity;
      balancePurchase += productos[i].unitPricePurchase * productos[i].quantity;
      totalWeight += Number(productos[i].quantity);
    }
    set((state) => ({
      operation: {
        ...state.operation,
        comercial: {
          ...state.operation.comercial,
          fields: {
            ...state.operation.comercial.fields,
            productos: productos,
            totalPurchase: balancePurchase,
            totalSale: balanceSale,
            totalWeight: totalWeight,
          },
        },
      },
    }));
  },
}));
