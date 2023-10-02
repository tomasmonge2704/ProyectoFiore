import { create } from "zustand";

export const useStore = create((set) => ({
  operation: undefined,
  setOperation: (newOperation) =>
    set(() => ({
      operation: newOperation,
    })),
  setFieldsDocs: (fields) => {
    let totalFields = 11;
    let completedFields = 0;
    if(fields.documentRequested.length > 0 ) completedFields += 1; 
    if(fields.date) completedFields += 1; 
    if(fields.terminosFlete) completedFields += 1; 
    if(fields.descriptionGoods) completedFields += 1; 
    if(fields.descriptionGoods2) completedFields += 1; 
    if(fields.temperature) completedFields += 1; 
    if(fields.consignee.nombre) completedFields += 1; 
    if(fields.notify.nombre) completedFields += 1; 
    if(fields.consigneeRest.nombre) completedFields += 1; 
    if(fields.placeBLIssue) completedFields += 1; 
    if(fields.tipoContenedor) completedFields += 1; 
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
    let totalFields = 23;
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
  setFieldsLogistica: (fields) => {
    let totalFields = 23;
    let completedFields = Object.values(fields).filter(Boolean).length;
    const completed = Math.floor((completedFields / totalFields) * 100);
    set((state) => ({
      operation: {
        ...state.operation,
        logistica: {
          ...state.operation.logistica,
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
