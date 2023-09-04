import { create } from "zustand";

function obtenerFechaActual() {
  const hoy = new Date();
  const dia = hoy.getDate().toString().padStart(2, "0");
  const mes = (hoy.getMonth() + 1).toString().padStart(2, "0"); // Los meses comienzan en 0 (enero=0, febrero=1, etc.)
  const anio = hoy.getFullYear();

  return `${anio}-${mes}-${dia}`;
}
const operationObjet = {
  comercial: {
    title: "Comercial",
    completed: 0,
    fields: {
      orderNumber: "",
      supplierRefNumber: "",
      date: obtenerFechaActual(),
      empresa: {
        nombre: "",
        empresa: "",
        direccion: "",
        direccion2: "",
        vatNumber: "",
        bank: {
          beneficiaryBank: "",
          bankAdress: "",
          swiftCode: "",
          beneficiaryName: "",
          beneficiaryAccountNumber: "",
        },
      },
      seller: {
        nombre: "",
        direccion: "",
        direccion2: "",
        pais: "",
        cuit: "",
        refNumber: "",
      },
      buyer: {
        direccion: "",
        direccion2: "",
        vatNumber: "",
        refNumber: "",
      },
      productos: [
        {
          id: "",
          description: "",
          packing: "",
          quantity: "",
          unitPricePurchase: "",
          unitPriceSale: "",
          amountSale: "",
          amountPurchase: "",
        },
      ],
      totalPurchase: 0,
      totalSale: 0,
      totalWeight: 0,
      productionDate: "",
      shelfLife: "",
      destinationPort: "",
      destinationCountry: "",
      quantity: "",
      shipmentPeriod: "",
      deliveryTermsSale: "",
      deliveryTermsPurchase: "",
      paymentTermsSale: "",
      paymentTermsPurchase: "",
      exportTo: "",
    },
  },
  docs: {
    title: "Docs",
    completed: 0,
    fields: {
      date: obtenerFechaActual(),
      documentRequested: [],
      instruccionsToIssue: "",
    },
  },
  logistica: { title: "Logistica", completed: 0 },
  contableFinanciera: { title: "Contable financiera", completed: 0 },
  status: "New",
};
export const useStore = create((set) => ({
  operation: operationObjet,
  fieldsComercial: operationObjet.comercial.fields,
  productosComercial:operationObjet.comercial.fields.productos,
  fieldsDocs: operationObjet.docs.fields,
  setOperation: (newOperation) =>
    set(() => ({
      operation: newOperation,
    })),
  setFieldsComercial: (fields) =>
    set((state) => ({
      operation: {
        ...state.operation,
        comercial: {
          ...state.operation.comercial,
          fields: {
            fields
          },
        },
      },
    })),
  setProductsComercial: (products) =>
    set((state) => ({
      operation: {
        ...state.operation,
        comercial: {
          ...state.operation.comercial,
          fields: { ...state.operation.comercial.fields, products: products },
        },
      },
    })),
}));
