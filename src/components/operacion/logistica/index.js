import {
  Box,
  VStack,
  Grid,
  GridItem,
  Tabs,
  Center,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
} from "@chakra-ui/react";
import { ConfirmButton } from "@/utils/saveForm";
import { useStore } from "@/store/operation";
import { SelectComponent } from "@/utils/select";
import InputPersonalizado from "@/utils/inputPersonalizado";
import SaleForm from "./pdfs/invoice";
import ShipmentPeriodPDF from "./pdfs/shipmentDetails";
import TablaLogistica from "./table";
import useFetch from "@/hooks/useFetch";
export const Logistica = () => {
  const operation = useStore((state) => state.operation);
  const setFieldsLogistica = useStore((state) => state.setFieldsLogistica);
  const setProductos = useStore((state) => state.setProductsComercial);
  const fieldsComercial = operation.comercial.fields;
  const handleIndexChange = (event, param) => {
    setFieldsLogistica({
      ...operation.logistica.fields,
      [param]: event.target.value,
    });
  };
  const handleInputChange = (event, param) => {
    setFieldsLogistica({
      ...operation.logistica.fields,
      [param]: event.target.value,
    });
  };
  const [CarteraForwarder] = useFetch(`${process.env.API_URL}/forwarder`,[]);
  const [CarteraMaritima] = useFetch(`${process.env.API_URL}/shipping-line`,[]);

  return (
    <Tabs variant="soft-rounded" colorScheme="orange">
      <Center width="100%">
        <TabList>
          <Tab>General</Tab>
          <Tab>SHIPMENT DETAILS</Tab>
          <Tab>INVOICE</Tab>
        </TabList>
      </Center>
      <TabPanels>
        <TabPanel>
          <Box w="100%">
            <VStack spacing="3">
              <Grid w="100%" templateColumns="repeat(2, 1fr)" gap={2}>
                <GridItem w="100%">
                  <VStack spacing="3">
                    <SelectComponent
                      options={CarteraForwarder}
                      value={operation.logistica.fields.freightForwarder}
                      handleIndexChange={(e) =>
                        handleIndexChange(e, "freightForwarder")
                      }
                      textDefault="Freight Forwarder"
                      param="name"
                    />
                    <SelectComponent
                      options={CarteraMaritima}
                      value={operation.logistica.fields.ShippingLine}
                      handleIndexChange={(e) =>
                        handleIndexChange(e, "ShippingLine")
                      }
                      textDefault="Shipping Line"
                      param="name"
                    />
                    <InputPersonalizado
                      type="text"
                      label="Booking Nr"
                      defaultValue={operation.logistica.fields.bookingNr}
                      onChange={(event) =>
                        handleInputChange(event, "bookingNr")
                      }
                    />
                    <InputPersonalizado
                      type="text"
                      label="Vessel Name"
                      defaultValue={operation.logistica.fields.vesselName}
                      onChange={(event) =>
                        handleInputChange(event, "vesselName")
                      }
                    />
                    <InputPersonalizado
                      type="text"
                      label="Voyage Nr"
                      defaultValue={operation.logistica.fields.voyageNr}
                      onChange={(event) => handleInputChange(event, "voyageNr")}
                    />
                    <InputPersonalizado
                      type="date"
                      label="ETD"
                      defaultValue={operation.logistica.fields.etd}
                      onChange={(event) => handleInputChange(event, "etd")}
                    />
                     
                    
                  </VStack>
                </GridItem>
                <GridItem w="100%">
                  <VStack spacing="3">
                  <InputPersonalizado
                      type="date"
                      label="ETA"
                      defaultValue={operation.logistica.fields.eta}
                      onChange={(event) => handleInputChange(event, "eta")}
                    />
                    <InputPersonalizado
                      type="text"
                      label="Container Nr"
                      defaultValue={operation.logistica.fields.containerNr}
                      onChange={(event) =>
                        handleInputChange(event, "containerNr")
                      }
                    />
                    <InputPersonalizado
                      type="text"
                      label="Seals"
                      defaultValue={operation.logistica.fields.seals}
                      onChange={(event) => handleInputChange(event, "seals")}
                    />
                    <InputPersonalizado
                      type="text"
                      label="B/L Nr"
                      defaultValue={operation.logistica.fields.blNr}
                      onChange={(event) => handleInputChange(event, "blNr")}
                    />
                    {(operation.comercial.fields.deliveryTermsSale === "CFR" ||
                      operation.comercial.fields.deliveryTermsSale ===
                        "CIF") && (
                      <InputPersonalizado
                        type="number"
                        label="Freight Amount"
                        defaultValue={operation.logistica.fields.freightAmount}
                        onChange={(event) =>
                          handleInputChange(event, "freightAmount")
                        }
                      />
                    )}
                    {operation.comercial.fields.deliveryTermsSale === "CIF" && (
                      <InputPersonalizado
                        type="number"
                        label="Insurance Amount"
                        defaultValue={
                          operation.logistica.fields.insuranceAmount
                        }
                        onChange={(event) =>
                          handleInputChange(event, "insuranceAmount")
                        }
                      />
                    )}
                    <InputPersonalizado
                    type="text"
                    label="AWB Nr"
                    defaultValue={operation.logistica.fields.awbNr}
                    onChange={(event) =>
                      handleInputChange(event, "awbNr")
                    }
                  />
                  { operation.docs.fields.placeBLIssue == "TELEX RELEASE" && <InputPersonalizado
                    type="text"
                    label="Telex Release"
                    defaultValue={operation.logistica.fields.telexRelease}
                    onChange={(event) =>
                      handleInputChange(event, "telexRelease")
                    }
                  />}
                  </VStack>
                </GridItem>
              </Grid>
              <TablaLogistica fields={fieldsComercial} productos={fieldsComercial.productos} setProductos={setProductos}/>
              <Box h={5} />
              <ConfirmButton operation={operation} />
            </VStack>
          </Box>
        </TabPanel>
        <TabPanel><ShipmentPeriodPDF operation={operation} fields={fieldsComercial} productos={fieldsComercial.productos}/></TabPanel>
        <TabPanel><SaleForm operation={operation} fields={fieldsComercial} productos={fieldsComercial.productos}/></TabPanel>
      </TabPanels>
    </Tabs>
  );
};
