import InputPersonalizado from "@/utils/inputPersonalizado";
import {
  Grid,
  GridItem,
  Center,
  Button,
  VStack,
  Box,
  useToast
} from "@chakra-ui/react";
import TablaGeneral from "./tablaGeneral";
import { Empresa } from "./empresa";
import { Buyer } from "./buyer";
import { Seller } from "./seller";
import { OperationType } from "./operationType";
import { DestinationPort } from "./destinationPort";
import { ShelfLife } from "./shelfLife";
import { ShipmentPeriod } from "./shipmentPeriod";
import { SelectBanco } from "./banco";
export default function GeneralForm({
  operation,
  fields,
  setFields,
  productos,
  setProductos,
  CarteraBancaria,
  CarteraProveedores,
  CarteraClientes,
  CarteraProducts,
  CarteraPacking,
  CarteraPaymentTerms,
  CarteraPuertos
}) {
  const toast = useToast()
  const saveFormHandler = () => {
    localStorage.setItem("operation", JSON.stringify(operation));
    toast({
      title: 'Operation - Comercial',
      description: "Se ha guardado correctamente.",
      status: 'success',
      position:"top-right",
      duration: 5000,
      isClosable: true,
    })
  };
  return (
    <Box w="100%">
        <VStack spacing="3">
          <Grid w="100%" templateColumns="repeat(3, 1fr)" gap={2}>
            <GridItem w="100%">
              <VStack spacing="3">
                <InputPersonalizado
                  type="text"
                  label="REF. NUMBER"
                  value={fields.empresaRefNumber}
                  onChange={(e) =>
                    setFields({
                      ...fields,
                      empresaRefNumber: e.target.value,
                    })
                  }
                />
                <Empresa
                  fields={fields}
                  setFields={setFields}
                  CarteraBancaria={CarteraBancaria}
                />
                <SelectBanco
                  fields={fields}
                  setFields={setFields}
                  CarteraBancaria={CarteraBancaria}
                />
              </VStack>
            </GridItem>
            <GridItem w="100%">
              <VStack spacing="3">
                <InputPersonalizado
                  type="date"
                  label="Date"
                  value={fields.date}
                  onChange={(e) =>
                    setFields({ ...fields, date: e.target.value })
                  }
                />
                <Seller
                  seller={fields.seller}
                  fields={fields}
                  setFields={setFields}
                  CarteraProveedores={CarteraProveedores}
                />
                <InputPersonalizado
                  type="text"
                  label="REF. NUMBER"
                  value={fields.seller.refNumber}
                  onChange={(e) =>
                    setFields({
                      ...fields,
                      seller: { ...fields.seller, refNumber: e.target.value },
                    })
                  }
                />
              </VStack>
            </GridItem>
            <GridItem w="100%">
              <VStack spacing="3">
                <OperationType fields={fields} setFields={setFields} />
                <Buyer fields={fields} setFields={setFields} CarteraClientes={CarteraClientes} />
                <InputPersonalizado
                  type="text"
                  label="REF. NUMBER"
                  value={fields.buyer ? fields.buyer.refNumber : ""}
                  onChange={(e) =>
                    setFields({
                      ...fields,
                      buyer: { ...fields.buyer, refNumber: e.target.value },
                    })
                  }
                />
              </VStack>
            </GridItem>
          </Grid>
          <TablaGeneral
            fields={fields}
            setFields={setFields}
            productos={productos}
            operationType={fields.operationType}
            setProductos={setProductos}
            CarteraProducts={CarteraProducts}
            CarteraPacking={CarteraPacking}
            CarteraPaymentTerms={CarteraPaymentTerms}
          />
                    <ShipmentPeriod
            value={fields.shipmentPeriod}
            setFields={setFields}
            fields={fields}
          />
          <Grid w="100%" templateColumns="repeat(2, 1fr)" gap={5}>
            <GridItem w="100%">
              <VStack spacing="3">
                <DestinationPort fields={fields} setFields={setFields} CarteraPuertos={CarteraPuertos} />
              </VStack>
            </GridItem>
            <GridItem w="100%">
              <VStack spacing="3">
              <InputPersonalizado
                  type="text"
                  label="DESTINATION COUNTRY"
                  value={fields.destinationCountry}
                  onChange={(e) =>
                    setFields({ ...fields, destinationCountry: e.target.value })
                  }
                />
              </VStack>
            </GridItem>
          </Grid>
          <InputPersonalizado
            type="text"
            label="PRODUCTION DATE"
            value={fields.productionDate}
            onChange={(e) =>
              setFields({ ...fields, productionDate: e.target.value })
            }
          />
          <Grid w="100%" templateColumns="repeat(2, 1fr)" gap={5}>
            <GridItem w="100%">
              <VStack spacing="3">
              <ShelfLife setFields={setFields} fields={fields} />
              </VStack>
            </GridItem>
            <GridItem w="100%">
              <VStack spacing="3">
              
              </VStack>
            </GridItem>
          </Grid>
          <Center>
            <Button colorScheme="orange" isDisabled={operation.comercial.completed !== 100 && true} onClick={saveFormHandler}>
              Guardar
            </Button>
          </Center>
        </VStack>
    </Box>
  );
}