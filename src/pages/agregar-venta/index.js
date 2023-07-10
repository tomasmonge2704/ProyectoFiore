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
export default function Home() {
  return (
    <Layout title="Ventas">
      <Tabs variant="soft-rounded" colorScheme='orange'>
        <Center width="100%">
          <TabList>
            <Tab>Manualmente</Tab>
            <Tab>Importar PDF</Tab>
          </TabList>
        </Center>
        <TabPanels>
          <TabPanel>
            <SaleForm />
          </TabPanel>
          <TabPanel>
           
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>
  );
}
