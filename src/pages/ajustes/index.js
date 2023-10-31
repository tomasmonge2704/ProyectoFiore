import {
  Center,
  TabList,
  Tab,
  Tabs,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import { DatosBancarios } from "@/components/ajustes/datosBancarios";
import { PaymentTerms } from "@/components/ajustes/paymentTerms";
import { Puertos } from "@/components/ajustes/puertos";
import { AjustesPacking } from "@/components/ajustes/packing";
import { AjustesProductos } from "@/components/ajustes/products";
import { AjustesEmpleados } from "@/components/ajustes/empleados";
import { AjustesConsignee } from "@/components/ajustes/consignee";
export default function Ajustes() {

  return (
    <Tabs variant="soft-rounded" colorScheme="orange" isLazy>
      <Center>
        <TabList>
          <Tab>Datos Bancarios</Tab>
          <Tab>Payment Terms</Tab>
          <Tab>Puertos</Tab>
          <Tab>Packing</Tab>
          <Tab>Products</Tab>
          <Tab>Employees</Tab>
          <Tab>Consignee</Tab>
          <Tab>Forwarders</Tab>
        </TabList>
      </Center>
      <TabPanels>
        <TabPanel>
          <DatosBancarios/>
        </TabPanel>
        <TabPanel>
          <PaymentTerms/>
        </TabPanel>
        <TabPanel>
          <Puertos/>
        </TabPanel>
        <TabPanel>
          <AjustesPacking/>
        </TabPanel>
        <TabPanel>
          <AjustesProductos/>
        </TabPanel>
        <TabPanel>
          <AjustesEmpleados/>
        </TabPanel>
        <TabPanel>
          <AjustesConsignee />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
