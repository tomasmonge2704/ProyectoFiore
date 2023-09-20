import {
  Center,
  TabList,
  Tab,
  Tabs,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import { Loadder } from "@/utils/loadder";
import useFetch from "@/hooks/useFetch";
import { DatosBancarios } from "@/components/ajustes/datosBancarios";
import { PaymentTerms } from "@/components/ajustes/paymentTerms";
import { Puertos } from "@/components/ajustes/puertos";
import { AjustesPacking } from "@/components/ajustes/packing";
import { AjustesProductos } from "@/components/ajustes/products";
import { AjustesEmpleados } from "@/components/ajustes/empleados";
export default function Ajustes() {
  const [CarteraBancaria] = useFetch(`${process.env.API_URL}/empresa`,[]);
  const [CarteraPuertos] = useFetch(`${process.env.API_URL}/puertos`,[]);
  const [CarteraPaymentTerms] = useFetch(`${process.env.API_URL}/payment-terms`,[]);
  const [CarteraPacking] = useFetch(`${process.env.API_URL}/packing`,[]);
  const [CarteraProducts] = useFetch(`${process.env.API_URL}/products`,[]);
  const [CarteraEmpleados] = useFetch(`${process.env.API_URL}/empleados`,[]);


  return (
    <Tabs variant="soft-rounded" colorScheme="orange">
      <Center>
        <TabList>
          <Tab>Datos Bancarios</Tab>
          <Tab>Payment Terms</Tab>
          <Tab>Puertos</Tab>
          <Tab>Packing</Tab>
          <Tab>Products</Tab>
          <Tab>Employees</Tab>
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
        <TabPanel>
          {CarteraEmpleados.length > 0 ? (
            <AjustesEmpleados CarteraEmpleados={CarteraEmpleados} />
          ) : (
            <Loadder />
          )}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
