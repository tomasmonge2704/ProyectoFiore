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
    if(fields.documentRequested.length > 0 ) {
      completedFields += 1;
      totalFields += 1;
    } 
    if(fields.date) completedFields += 1; 
    if(fields.responsable) completedFields += 1; 
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
    let totalFields = 25;
    if(fields?.comision) totalFields = totalFields + 1;
    let completedFields = Object.values(fields).filter(Boolean).length;
    if(fields.comentarios) completedFields -= 1;
    if(fields.shipmentPeriod) completedFields -= 1;
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
    let totalFields = 13;
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
  setFieldsContableFinanciera: (fields) => {
    let totalFields = 13;
    let completedFields = Object.values(fields).filter(Boolean).length;
    const completed = Math.floor((completedFields / totalFields) * 100);
    set((state) => ({
      operation: {
        ...state.operation,
        contableFinanciera: {
          ...state.operation.contableFinanciera,
          fields: fields,
          completed:completed
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
    let totalFacturaCompra = 0;
    let totalFacturaVenta = 0;
    for (let i = 0; i < productos.length; i++) {
      balanceSale += productos[i].unitPriceSale * productos[i].netWeight;
      balancePurchase += productos[i].unitPricePurchase * productos[i].netWeight;
      totalNetWeight += Number(productos[i].netWeight);
      totalNetWeightLogistica += Number(productos[i].netWeightLogistica);
      totalGrossWeight += Number(productos[i].grossWeight);
      totalQuantityCartons += Number(productos[i].quantityCartons);
      totalFacturaCompra += Number(productos[i].unitPricePurchase * productos[i].netWeightLogistica);
      totalFacturaVenta += Number(productos[i].unitPriceSale * productos[i].netWeightLogistica);
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
        },
        contableFinanciera:{
          ...state.operation.contableFinanciera,
          fields:{
            ...state.operation.contableFinanciera.fields,
            totalFacturaCompra:totalFacturaCompra,
            totalFacturaVenta:totalFacturaVenta
          }
        }
      }
    }));
  },
}));
