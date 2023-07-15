import Layout from "@/components/Layouts/main";
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
export const Comercial = () => {
  return (
    <Tabs variant="soft-rounded" colorScheme="orange">
      <Center width="100%">
        <TabList>
          <Tab>Orden de Compra</Tab>
          <Tab>Confirmación de Venta</Tab>
        </TabList>
      </Center>
      <TabPanels>
        <TabPanel>
          <PurchaseForm />
        </TabPanel>
        <TabPanel>
          <SaleForm />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
