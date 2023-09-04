import {
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Center,
} from "@chakra-ui/react";
import SaleForm from "@/components/operacion/comercial/confirmacionVenta";
import PurchaseForm from "./ordenCompra";
import GeneralForm from "./generales";
import useFetch from "@/hooks/useFetch";
export const Comercial = ({operation,fields,setFields,productos,setProductos}) => {
  const [CarteraBancaria] = useFetch(`${process.env.API_URL}/empresa`,[]);
  const [CarteraProveedores] = useFetch(`${process.env.API_URL}/proveedor`,[]);
  const [CarteraClients] = useFetch(`${process.env.API_URL}/client`,[]);
  const [CarteraPuertos] = useFetch(`${process.env.API_URL}/puertos`,[]);
  const [CarteraPaymentTerms] = useFetch(`${process.env.API_URL}/payment-terms`,[]);
  const [CarteraPacking] = useFetch(`${process.env.API_URL}/packing`,[]);
  const [CarteraProducts] = useFetch(`${process.env.API_URL}/products`,[]);
  const [CarteraEmpleados] = useFetch(`${process.env.API_URL}/empresa`,[]);

  return (
    <Tabs variant="soft-rounded" colorScheme="orange">
    <Center width="100%">
      <TabList>
        <Tab>General</Tab>
        <Tab>Purchase Confirmation</Tab>
        <Tab>Proforma Invoice</Tab>
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
            CarteraBancaria={CarteraBancaria}
            CarteraProveedores={CarteraProveedores}
            CarteraClientes={CarteraClients}
            CarteraProducts={CarteraProducts}
            CarteraPacking={CarteraPacking}
            CarteraPaymentTerms={CarteraPaymentTerms}
            CarteraPuertos={CarteraPuertos}
            CarteraEmpleados={CarteraEmpleados}
          />
        </TabPanel>
        <TabPanel>
          <PurchaseForm 
          fields={fields}
          productos={productos}
          />
        </TabPanel>
        <TabPanel>
          <SaleForm 
          fields={fields}
          productos={productos}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
