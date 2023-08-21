import {
  Center,
  TabList,
  Tab,
  Tabs,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import { Loadder } from "@/utils/loadder";
import { useState, useEffect } from "react";
import { DatosBancarios } from "@/components/ajustes/datosBancarios";
import { PaymentTerms } from "@/components/ajustes/paymentTerms";
import { Puertos } from "@/components/ajustes/puertos";
import { AjustesPacking } from "@/components/ajustes/packing";
import { AjustesProductos } from "@/components/ajustes/products";
export default function Ajustes() {
  useEffect(() => {
    const token = localStorage.getItem("token");
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
    fetch(`${process.env.API_URL}/catalogo-payment-terms`, {
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
    fetch(`${process.env.API_URL}/catalogo-products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCarteraProducts(data);
      });
  }, []);
  const [CarteraBancaria, setCarteraBancaria] = useState([]);
  const [CarteraPuertos, setCarteraPuertos] = useState([]);
  const [CarteraPaymentTerms, setCarteraPaymentTerms] = useState([]);
  const [CarteraPacking, setCarteraPacking] = useState([]);
  const [CarteraProducts, setCarteraProducts] = useState([]);
  return (
    <Tabs variant="soft-rounded" colorScheme="orange">
      <Center>
        <TabList>
          <Tab>Datos Bancarios</Tab>
          <Tab>Payment Terms</Tab>
          <Tab>Puertos</Tab>
          <Tab>Packing</Tab>
          <Tab>Products</Tab>
        </TabList>
      </Center>
      <TabPanels>
        <TabPanel>
          {CarteraBancaria.length > 0 ? (
            <DatosBancarios CarteraBancaria={CarteraBancaria} />
          ) : (
            <Loadder />
          )}
        </TabPanel>
        <TabPanel>
          {CarteraPaymentTerms.length > 0 ? (
            <PaymentTerms CarteraPaymentTerms={CarteraPaymentTerms} />
          ) : (
            <Loadder />
          )}
        </TabPanel>
        <TabPanel>
          {CarteraPuertos.length > 0 ? (
            <Puertos CarteraPuertos={CarteraPuertos} />
          ) : (
            <Loadder />
          )}
        </TabPanel>
        <TabPanel>
          {CarteraPacking.length > 0 ? (
            <AjustesPacking CarteraPacking={CarteraPacking} />
          ) : (
            <Loadder />
          )}
        </TabPanel>
        <TabPanel>
          {CarteraProducts.length > 0 ? (
            <AjustesProductos CarteraProducts={CarteraProducts} />
          ) : (
            <Loadder />
          )}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
