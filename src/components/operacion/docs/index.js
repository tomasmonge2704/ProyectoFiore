import { Tabs,Tab,TabList,TabPanels,TabPanel,Center } from "@chakra-ui/react";
import GeneralDocs from "./general";

export const Docs = () => {
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
            <GeneralDocs />
        </TabPanel>
        <TabPanel></TabPanel>
      </TabPanels>
    </Tabs>
  );
};
