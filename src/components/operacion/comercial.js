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

import GeneralForm from "../generalForm";
export const Comercial = ({operation,fields,setFields,productos,setProductos}) => {

  return (
    <Tabs variant="soft-rounded" colorScheme="orange">
      <Center width="100%">
        <TabList>
          <Tab>Generales</Tab>
          <Tab>Orden de Compra</Tab>
          <Tab>Confirmación de Venta</Tab>
        </TabList>
      </Center>
      <TabPanels>
        <TabPanel>
          <GeneralForm
            operation={operation}
            fields={fields}
            setFields={setFields}
            productos={productos}
            setProductos={setProductos}
          />
        </TabPanel>
        <TabPanel>
          <PurchaseForm 
          operation={operation}
          fields={fields}
          setFields={setFields}
          productos={productos}
          setProductos={setProductos}
          />
        </TabPanel>
        <TabPanel>
          <SaleForm 
          fields={fields}
          setFields={setFields}
          productos={productos}
          setProductos={setProductos}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
