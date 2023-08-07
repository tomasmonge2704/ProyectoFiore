import Layout from "@/components/Layouts/main";
import {
  Center,
  Text,
  Card,
  CardBody,
  Button,
  Heading,
  Flex,
  Stack,
  Input,
  TabList,
  Tab,
  Tabs,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { CarteraBancariaContext } from "@/components/context/carterasContext";
import { CarteraPuertosContext } from "@/components/context/carterasContext";
import { CarteraPaymentTermsContext } from "@/components/context/carterasContext";
import { DatosBancarios } from "@/components/ajustes/datosBancarios";
import { PaymentTerms } from "@/components/ajustes/paymentTerms";
import { Puertos } from "@/components/ajustes/puertos";
export default function Ajustes() {
  const { CarteraBancaria } = useContext(CarteraBancariaContext);
  const { CarteraPuertos } = useContext(CarteraPuertosContext);
  const { CarteraPaymentTerms } = useContext(CarteraPaymentTermsContext);
  const [dirtyIndexes, setDirtyIndexes] = useState([]);

  const handleInputChange = (value, index, field) => {
    setDirtyIndexes((prevDirtyIndexes) => {
      if (!prevDirtyIndexes.includes(index)) {
        return [...prevDirtyIndexes, index];
      }
      return prevDirtyIndexes;
    });
    //aca deberia ir la logica para actualizar el campo
  };

  const handleConfirmChanges = (index) => {
    setDirtyIndexes((prevDirtyIndexes) =>
      prevDirtyIndexes.filter((dirtyIndex) => dirtyIndex !== index)
    );
  };
  return (
    <Layout title="Ajustes">
      <Tabs variant="soft-rounded" colorScheme="orange">
        <Center>
          <TabList>
            <Tab>Datos Bancarios</Tab>
            <Tab>Puertos</Tab>
            <Tab>Payment Terms</Tab>
          </TabList>
        </Center>
        <TabPanels>
          <TabPanel>
            <DatosBancarios CarteraBancaria={CarteraBancaria} />
          </TabPanel>
          <TabPanel>
            <Puertos CarteraPuertos={CarteraPuertos} />
          </TabPanel>
          <TabPanel>
            <PaymentTerms CarteraPaymentTerms={CarteraPaymentTerms} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>
  );
}
