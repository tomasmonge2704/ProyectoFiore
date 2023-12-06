import {
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Center,
} from "@chakra-ui/react";
import PurchaseForm from "../pdfs/comercial-ordenCompra";
import SaleForm from "../pdfs/comercial-proformaInvoice";
import GeneralForm from "./form";
import useFetch from "@/hooks/useFetch";
import { useStore } from "@/store/operation";
import ContenedoPDFs from "@/components/contenedorPDFs";
export const Comercial = () => {
  const operation = useStore((state) => state.operation);
  const setFields = useStore((state) => state.setFieldsComercial);
  const [CarteraBancaria] = useFetch(`${process.env.API_URL}/empresa`,[]);
  const [CarteraProveedores] = useFetch(`${process.env.API_URL}/proveedor`,[]);
  const [CarteraClients] = useFetch(`${process.env.API_URL}/client`,[]);
  const [CarteraPuertos] = useFetch(`${process.env.API_URL}/puertos`,[]);
  const [CarteraPaymentTerms] = useFetch(`${process.env.API_URL}/payment-terms`,[]);
  const [CarteraPacking] = useFetch(`${process.env.API_URL}/packing`,[]);
  const [CarteraProducts] = useFetch(`${process.env.API_URL}/products`,[]);
  const [CarteraEmpleados] = useFetch(`${process.env.API_URL}/empleados`,[]);

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
            setFields={setFields}
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
          <ContenedoPDFs>
          <PurchaseForm 
          fields={operation.comercial.fields}
          productos={operation.comercial.fields.productos}
          />
          </ContenedoPDFs>
        </TabPanel>
        <TabPanel>
          <ContenedoPDFs>
          <SaleForm 
          fields={operation.comercial.fields}
          productos={operation.comercial.fields.productos}
          />
          </ContenedoPDFs>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
