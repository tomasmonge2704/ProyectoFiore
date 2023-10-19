import { useStore } from "@/store/operation";
import {
    Tabs,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Center,
  } from "@chakra-ui/react";
import { EgresosForm } from "./egresos";
import { ResumenFinanciera } from "./resumen";

export const Contable = () => {
    const operation = useStore((state) => state.operation);
    const setOperation = useStore((state) => state.setOperation);

    return(
        <Tabs variant="soft-rounded" colorScheme="orange">
    <Center width="100%">
      <TabList>
        <Tab>General</Tab>
        <Tab>Resumen</Tab>
      </TabList>
    </Center>
      <TabPanels>
        <TabPanel>
         <EgresosForm operation={operation} setOperation={setOperation} />
        </TabPanel>
        <TabPanel>
          <ResumenFinanciera operation={operation} />
        </TabPanel>
      </TabPanels>
    </Tabs>
    )
}