import { Comercial } from "./comercial";
import { Contable } from "./contable";
import { Logistica } from "./logistica";
import { Docs } from "./docs";
import { useState,useEffect } from "react";
export const ContenedorOperaciones = ({
  show,
  operation,
  setOperation
}) => {
  const [ fields, setFields] = useState(operation.comercial.fields);
  const [ productos, setProductos] = useState(operation.comercial.fields.productos);
  useEffect(() => {
    if(operation){
    let totalFields = 20;
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
    <>
      {show == "Comercial" && (
        <Comercial
          operation={operation}
          setOperation={setOperation}
          fields={fields}
          setFields={setFields}
          productos={productos}
          setProductos={setProductos}
        />
      )}
      {show == "Contable financiera" && <Contable />}
      {show == "Logistica" && <Logistica />}
      {show == "Docs" && (
        <Docs
          operation={operation}
          setOperation={setOperation}
          fields={fields}
          setFields={setFields}
        />
      )}
    </>
  );
};
