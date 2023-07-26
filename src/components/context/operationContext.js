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
            unitPrice: null,
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
    state:"doing"
  });
  // useEffect para guardar en localStorage cuando operation cambia
  useEffect(() => {
    const prevState = JSON.parse(localStorage.getItem("operation"));
    if(typeof prevState === 'object' && prevState !== null){
      prevState.restored = true;
      setOperation(prevState);
    }
  }, []);

  return (
    <OperationContext.Provider value={{ operation, setOperation }}>
      {children}
    </OperationContext.Provider>
  );
}
