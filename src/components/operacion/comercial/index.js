import {
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Center,
} from "@chakra-ui/react";
import SaleForm from "@/components/operacion/comercial/confirmacionVenta";
import PurchaseForm from "./ordenCompra";
import GeneralForm from "./generales";
import { useState,useEffect } from "react";
export const Comercial = ({operation,setOperation}) => {
  const [ fields, setFields] = useState(operation.comercial.fields);
  const [ productos, setProductos] = useState(operation.comercial.fields.productos);
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
    <Tabs variant="soft-rounded" colorScheme="orange">
      <Center width="100%">
        <TabList>
          <Tab>Generales</Tab>
          <Tab>Orden de Compra</Tab>
          <Tab>Confirmación de Venta</Tab>
        </TabList>
      </Center>
      <TabPanels>
        <TabPanel>
          <GeneralForm
            operation={operation}
            fields={fields}
            setFields={setFields}
            productos={productos}
            setProductos={setProductos}
          />
        </TabPanel>
        <TabPanel>
          <PurchaseForm 
          operation={operation}
          fields={fields}
          setFields={setFields}
          productos={productos}
          setProductos={setProductos}
          />
        </TabPanel>
        <TabPanel>
          <SaleForm 
          fields={fields}
          setFields={setFields}
          productos={productos}
          setProductos={setProductos}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
