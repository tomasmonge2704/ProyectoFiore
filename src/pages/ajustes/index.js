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
import { AjustesConsignee } from "@/components/ajustes/consignee";
export default function Ajustes() {
  const [CarteraBancaria] = useFetch(`${process.env.API_URL}/empresa`,undefined);
  const [CarteraPuertos] = useFetch(`${process.env.API_URL}/puertos`,undefined);
  const [CarteraPaymentTerms] = useFetch(`${process.env.API_URL}/payment-terms`,undefined);
  const [CarteraPacking] = useFetch(`${process.env.API_URL}/packing`,undefined);
  const [CarteraProducts] = useFetch(`${process.env.API_URL}/products`,undefined);
  const [CarteraEmpleados] = useFetch(`${process.env.API_URL}/empleados`,undefined);
  const [CarteraConsignee] = useFetch(`${process.env.API_URL}/consignee`,undefined);

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
          <Tab>Consignee</Tab>
        </TabList>
      </Center>
      <TabPanels>
        <TabPanel>
          {CarteraBancaria ? (
            <DatosBancarios CarteraBancaria={CarteraBancaria} />
          ) : (
            <Loadder />
          )}
        </TabPanel>
        <TabPanel>
          {CarteraPaymentTerms ? (
            <PaymentTerms CarteraPaymentTerms={CarteraPaymentTerms} />
          ) : (
            <Loadder />
          )}
        </TabPanel>
        <TabPanel>
          {CarteraPuertos ? (
            <Puertos CarteraPuertos={CarteraPuertos} />
          ) : (
            <Loadder />
          )}
        </TabPanel>
        <TabPanel>
          {CarteraPacking ? (
            <AjustesPacking CarteraPacking={CarteraPacking} />
          ) : (
            <Loadder />
          )}
        </TabPanel>
        <TabPanel>
          {CarteraProducts ? (
            <AjustesProductos CarteraProducts={CarteraProducts} />
          ) : (
            <Loadder />
          )}
        </TabPanel>
        <TabPanel>
          {CarteraEmpleados ? (
            <AjustesEmpleados CarteraEmpleados={CarteraEmpleados} />
          ) : (
            <Loadder />
          )}
        </TabPanel>
        <TabPanel>
          {CarteraEmpleados ? (
            <AjustesConsignee CarteraConsignee={CarteraConsignee} />
          ) : (
            <Loadder />
          )}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}