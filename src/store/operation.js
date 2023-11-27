import { create } from "zustand";

export const useStore = create((set) => ({
  operation: undefined,
  setOperation: (newOperation) =>
    set(() => ({
      operation: newOperation,
    })),
  setFieldsDocs: (fields) => {
    set((state) => ({
      operation: {
        ...state.operation,
        docs: {
          ...state.operation.docs,
          fields: fields
        },
      },
    }))},
  setFieldsComercial: (fields) => {
    set((state) => ({
      operation: {
        ...state.operation,
        comercial: {
          ...state.operation.comercial,
          fields: fields
        },
      },
    }));
  },
  setFieldsLogistica: (fields) => {
    set((state) => ({
      operation: {
        ...state.operation,
        logistica: {
          ...state.operation.logistica,
          fields: fields
        },
      },
    }));
  },
  setFieldsContableFinanciera: (fields) => {
    set((state) => ({
      operation: {
        ...state.operation,
        contableFinanciera: {
          ...state.operation.contableFinanciera,
          fields: fields
        },
      },
    }));
  },
  setProductsComercial: (productos) => {
    let balanceSale = 0;
    let balancePurchase = 0;
    let totalNetWeight = 0;
    let totalNetWeightLogistica = 0;
    let totalGrossWeight= 0;
    let totalQuantityCartons = 0;
    for (let i = 0; i < productos.length; i++) {
      balanceSale += productos[i].unitPriceSale * productos[i].netWeight;
      balancePurchase += productos[i].unitPricePurchase * productos[i].netWeight;
      totalNetWeight += Number(productos[i].netWeight);
      totalNetWeightLogistica += Number(productos[i].netWeightLogistica);
      totalGrossWeight += Number(productos[i].grossWeight);
      totalQuantityCartons += Number(productos[i].quantityCartons);
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
            totalGrossWeight: totalGrossWeight,
            totalNetWeight:totalNetWeight,
            totalNetWeightLogistica:totalNetWeightLogistica,
            totalQuantityCartons:totalQuantityCartons
          },
        }
      }
    }));
  },
}));
