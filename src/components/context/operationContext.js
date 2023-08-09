import { createContext, useState, useEffect } from "react";

export const OperationContext = createContext();
function obtenerFechaActual() {
  const hoy = new Date();
  const dia = hoy.getDate().toString().padStart(2, '0');
  const mes = (hoy.getMonth() + 1).toString().padStart(2, '0'); // Los meses comienzan en 0 (enero=0, febrero=1, etc.)
  const anio = hoy.getFullYear();

  return `${anio}-${mes}-${dia}`;
}
export function OperationProvider({ children }) {
  const [operation, setOperation] = useState({
    comercial: {
      title: "Comercial",
      completed: 0,
      fields:{
        orderNumber: "",
        supplierRefNumber: "",
        date: obtenerFechaActual(),
        empresa: {
          nombre: "",
          empresa:"",
          direccion: "",
          direccion2: "",
          vatNumber: "",
          bank:{
            beneficiaryBank:"",
            bankAdress:"",
            swiftCode:"",
            beneficiaryName:"",
            beneficiaryAccountNumber:""
          }
        },
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
            amountSale: null,
            amountPurchase:null
          },
        ],
        totalPurchase:0,
        totalSale:0,
        totalWeight:0,
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
        exportTo: ""
      }
    },
    docs: { title: "Docs", completed: 0 },
    logistica: { title: "Logistica", completed: 0 },
    contableFinanciera: { title: "Contable financiera", completed: 0 },
    status:"New"
  });
  const [ fields, setFields] = useState(operation.comercial.fields);
  const [ productos, setProductos] = useState(fields.productos);
  useEffect(() => {
    let totalFields = 17;
    if(fields.comision) totalFields = totalFields + 1;
    let completedFields = Object.values(fields).filter(Boolean).length;
    const completed = Math.floor((completedFields / totalFields) * 100);
    setOperation({
      ...operation,
      comercial: {
        ...operation.comercial,
        completed,
        fields: fields,
      },
    })
    localStorage.setItem('fields', JSON.stringify(fields));
  }, [fields]);
  let balanceSale = 0;
  let balancePurchase = 0;
  let totalWeight = 0;
  useEffect(() => {
    for (let i = 0; i < productos.length; i++) {
      balanceSale += productos[i].unitPriceSale * productos[i].quantity;
      balancePurchase += productos[i].unitPricePurchase * productos[i].quantity;
      totalWeight += Number(productos[i].quantity);
    }
    setFields((prevFields) => ({
      ...prevFields,
      productos: productos,
      totalPurchase: balancePurchase,
      totalSale: balanceSale,
      totalWeight: totalWeight,
    }));
  }, [productos]);

  return (
    <OperationContext.Provider value={{ operation, setOperation, fields, setFields,productos,setProductos }}>
      {children}
    </OperationContext.Provider>
  );
}
