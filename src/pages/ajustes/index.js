import {
  Center,
  TabList,
  Tab,
  Tabs,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import { useContext } from "react";
import { CarteraBancariaContext, CarteraPackingContext,CarteraPuertosContext,CarteraPaymentTermsContext, CarteraProductsContext } from "@/components/context/carterasContext";
import { DatosBancarios } from "@/components/ajustes/datosBancarios";
import { PaymentTerms } from "@/components/ajustes/paymentTerms";
import { Puertos } from "@/components/ajustes/puertos";
import { AjustesPacking } from "@/components/ajustes/packing";
import { AjustesProductos } from "@/components/ajustes/products";
export default function Ajustes() {
  const { CarteraBancaria } = useContext(CarteraBancariaContext);
  const { CarteraPuertos } = useContext(CarteraPuertosContext);
  const { CarteraPaymentTerms } = useContext(CarteraPaymentTermsContext);
  const { CarteraPacking } = useContext(CarteraPackingContext);
  const { CarteraProducts } = useContext(CarteraProductsContext);
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
            <DatosBancarios CarteraBancaria={CarteraBancaria} />
          </TabPanel>
          <TabPanel>
            <PaymentTerms CarteraPaymentTerms={CarteraPaymentTerms} />
          </TabPanel>
          <TabPanel>
            <Puertos CarteraPuertos={CarteraPuertos} />
          </TabPanel>
          <TabPanel>
            <AjustesPacking CarteraPacking={CarteraPacking} />
          </TabPanel>
          <TabPanel>
            <AjustesProductos CarteraProducts={CarteraProducts}/>
          </TabPanel>
        </TabPanels>
      </Tabs>
  );
}
