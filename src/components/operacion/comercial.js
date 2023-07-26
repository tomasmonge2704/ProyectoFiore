import {
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Center,
} from "@chakra-ui/react";
import SaleForm from "@/components/sales/newSale";
import PurchaseForm from "../compras/newPurchase";
import { useContext } from "react";
import { OperationContext } from "../context/operationContext";
import GeneralForm from "../generalForm";
export const Comercial = () => {
  const {operation} = useContext(OperationContext); 
  return (
    <Tabs variant="soft-rounded" colorScheme="orange">
      <Center width="100%">
        <TabList>
          <Tab>Generales ({operation.comercial?.completedGeneral || 0}%)</Tab>
          <Tab>Orden de Compra ({operation.comercial?.completedPurchase}%)</Tab>
          <Tab>Confirmación de Venta ({operation.comercial?.completedInvoice}%)</Tab>
        </TabList>
      </Center>
      <TabPanels>
        <TabPanel>
          <GeneralForm/>
        </TabPanel>
        <TabPanel>
          <PurchaseForm  />
        </TabPanel>
        <TabPanel>
          <SaleForm />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
