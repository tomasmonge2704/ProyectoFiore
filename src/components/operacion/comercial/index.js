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
  const [CarteraBancaria, setCarteraBancaria] = useState([]);
  const [CarteraProveedores, setCarteraProveedores] = useState([]);
  const [CarteraClients, setCarteraClients] = useState([]);
  const [CarteraPuertos, setCarteraPuertos] = useState([]);
  const [CarteraPaymentTerms, setCarteraPaymentTerms] = useState([]);
  const [CarteraPacking, setCarteraPacking] = useState([]);
  const [CarteraProducts, setCarteraProducts] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.API_URL}/proveedor`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCarteraProveedores(data);
      });
    fetch(`${process.env.API_URL}/client`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCarteraClients(data);
      });
    fetch(`${process.env.API_URL}/empresa`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCarteraBancaria(data);
      });
    fetch(`${process.env.API_URL}/puertos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCarteraPuertos(data);
      });
    fetch(`${process.env.API_URL}/payment-terms`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCarteraPaymentTerms(data);
      });
    fetch(`${process.env.API_URL}/packing`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCarteraPacking(data);
      });
    fetch(`${process.env.API_URL}/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCarteraProducts(data);
      });
  }, []);
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
    <Tabs variant="soft-rounded" colorScheme="orange">
    <Center width="100%">
      <TabList>
        <Tab>General</Tab>
        <Tab>Purchase Confirmation</Tab>
        <Tab>Proforma Invoice</Tab>
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
            CarteraBancaria={CarteraBancaria}
            CarteraProveedores={CarteraProveedores}
            CarteraClientes={CarteraClients}
            CarteraProducts={CarteraProducts}
            CarteraPacking={CarteraPacking}
            CarteraPaymentTerms={CarteraPaymentTerms}
            CarteraPuertos={CarteraPuertos}
          />
        </TabPanel>
        <TabPanel>
          <PurchaseForm 
          operation={operation}
          CarteraProveedores={CarteraProveedores}
          CarteraBancaria={CarteraBancaria}
          CarteraPaymentTerms={CarteraPaymentTerms}
          fields={fields}
          setFields={setFields}
          productos={productos}
          setProductos={setProductos}
          />
        </TabPanel>
        <TabPanel>
          <SaleForm 
          CarteraClientes={CarteraClients}
          fields={fields}
          setFields={setFields}
          productos={productos}
          setProductos={setProductos}
          CarteraBancaria={CarteraBancaria}
          CarteraPaymentTerms={CarteraPaymentTerms}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
