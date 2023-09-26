import {
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Center,
} from "@chakra-ui/react";
import GeneralDocs from "./general";
import PdfDocsIntructions from "./pdf";
import { useStore } from "@/store/operation";
export const Docs = () => {
  const operation = useStore((state) => state.operation);
  const setFieldsDocs = useStore((state) => state.setFieldsDocs);
  const setFieldsComercial = useStore((state) => state.setFieldsComercial);
  const fieldsComercial = operation.comercial.fields;
  const fieldsDocs = operation.docs.fields;
  return (
    <Tabs variant="soft-rounded" colorScheme="orange">
      <Center width="100%">
        <TabList>
          <Tab>General</Tab>
          <Tab>Docs Instructions</Tab>
        </TabList>
      </Center>
      <TabPanels>
        <TabPanel>
          <GeneralDocs
            operation={operation}
            setFieldsDocs={setFieldsDocs}
            setFieldsComercial={setFieldsComercial}
            fieldsComercial={fieldsComercial}
            fieldsDocs={fieldsDocs}
          />
        </TabPanel>
        <TabPanel>
          <PdfDocsIntructions
            operation={operation}
            fieldsComercial={fieldsComercial}
            fieldsDocs={fieldsDocs}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
