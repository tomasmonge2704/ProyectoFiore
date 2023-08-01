import { flattenTokens } from "@chakra-ui/react";
import { createContext, useState, useEffect } from "react";

export const OperationContext = createContext();

export function OperationProvider({ children }) {
  const [operation, setOperation] = useState({
    comercial: {
      title: "Comercial",
      completed: 0,
      completedPurchase: 0,
      completedInvoice: 0,
      completedGeneral:0,
      fieldsPurchase:{
        orderNumber: "",
        supplierRefNumber: "",
        date: "",
        seller:{
          nombre: "",
          direccion: "",
          direccion2: "",
          pais: "",
          cuit: ""
        },
        buyer:{
          direccion: "",
          direccion2: "",
          vatNumber: ""
        }
        ,
        productos: [
          {
            id: "",
            description: "",
            packing: null,
            quantity: null,
            unitPricePurchase: null,
            unitPriceSale: null,
            amount: null,
          },
        ],
        origin: "",
        plantNumber: "",
        brand: "",
        productionDate: "",
        shelfLife: "",
        destinationPort: "",
        destinationCountry: "",
        quantity: "",
        shipmentPeriod: "",
        deliveryTerms: "",
        paymentTerms: "",
        exportTo: "",
      }
    },
    docs: { title: "Docs", completed: 0 },
    logistica: { title: "Logistica", completed: 0 },
    contableFinanciera: { title: "Contable financiera", completed: 0 },
    status:"New"
  });
  const [ purchase, setPurchase] = useState(operation.comercial.fieldsPurchase);
  const [ productos, setProductos] = useState(purchase.productos);
  useEffect(() => {
    localStorage.setItem('purchase', JSON.stringify(purchase));
  }, [purchase]);
  useEffect(() => {
    setPurchase({...purchase,productos:productos})
  }, [productos]);

  return (
    <OperationContext.Provider value={{ operation, setOperation, purchase, setPurchase,productos,setProductos }}>
      {children}
    </OperationContext.Provider>
  );
}
