import Layout from "@/components/Layouts/main";
import { Tabs,Tab,TabList,TabPanel,TabPanels, Container, Flex, Center } from "@chakra-ui/react";
import PurchaseForm from "@/components/compras/newPurchase";
export default function Home() {
  return (
    <Layout title="Ventas">
     <Tabs variant='soft-rounded' colorScheme='green'>
        <Center width="100%">
  <TabList>
    <Tab>Manualmente</Tab>
    <Tab>Importar PDF</Tab>
  </TabList>
  </Center>
  <TabPanels>
    <TabPanel>
      <PurchaseForm />
    </TabPanel>
    <TabPanel>
      
    </TabPanel>
  </TabPanels>
</Tabs>
    </Layout>
  );
}
