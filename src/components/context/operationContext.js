import { createContext, useState, useEffect } from "react";

export const OperationContext = createContext();
export function OperationProvider({ children }) {
  const [operation, setOperation] = useState(undefined);
  const [ fields, setFields] = useState(undefined);
  const [ productos, setProductos] = useState([
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
  ]);
  useEffect(() => {
    fetch(`${process.env.API_URL}/operation`)
    .then((response) => response.json())
      .then((operation) => {
        setOperation(operation);
        setFields(operation.comercial.fields);
        setProductos(operation.comercial.fields.productos)
      });
  },[])
  useEffect(() => {
    if(operation){
    let totalFields = 17;
    if(fields?.comision) totalFields = totalFields + 1;
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
  }
  }, [fields]);
  let balanceSale = 0;
  let balancePurchase = 0;
  let totalWeight = 0;
  useEffect(() => {
    if(productos){
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
  }
  }, [productos]);

  return (
    <OperationContext.Provider value={{ operation, setOperation, fields, setFields,productos,setProductos }}>
      {children}
    </OperationContext.Provider>
  );
}
