import InputPersonalizado from "@/utils/inputPersonalizado";
import {
  Grid,
  GridItem,
  Center,
  Button,
  Card,
  CardBody,
  VStack,
} from "@chakra-ui/react";
import TablaGeneral from "./tablaGeneral";
import { useContext } from "react";
import { Empresa } from "./empresa";
import { Buyer } from "./buyer";
import { Seller } from "../compras/seller";
import { PaymentTerms } from "../compras/paymentTerms";
import { CarteraProveedoresContext,CarteraBancariaContext } from "../context/carterasContext";
import { OperationType } from "./operationType";
import { DestinationPort } from "./destinationPort";
import { ShelfLife } from "./shelfLife";
import { DeliveryTerms } from "./deliveryTerms";
import { SelectBanco } from "./banco";
export default function GeneralForm({
  operation,
  fields,
  setFields,
  productos,
  setProductos,
}) {
  const { CarteraBancaria } = useContext(CarteraBancariaContext);
  const { CarteraProveedores } = useContext(CarteraProveedoresContext);
  const saveFormHandler = () => {
    localStorage.setItem("operation", JSON.stringify(operation));
  };
  return (
    <Card w="100%" p={4} variant="outline">
      <CardBody>
        <VStack spacing="10">
          <Grid w="100%" templateColumns="repeat(4, 1fr)" gap={5}>
            <GridItem w="100%">
              <VStack spacing="7">
                <Empresa fields={fields} setFields={setFields} CarteraBancaria={CarteraBancaria} />
                <SelectBanco fields={fields} setFields={setFields} CarteraBancaria={CarteraBancaria}/> 
              </VStack>
            </GridItem>
            <GridItem w="100%">
              <VStack spacing="7">
                <Seller
                  seller={fields.seller}
                  fields={fields}
                  setFields={setFields}
                  CarteraProveedores={CarteraProveedores}
                />
                <InputPersonalizado
                  type="text"
                  label="SUPPLIER REF. NUMBER"
                  value={fields.supplierRefNumber}
                  onChange={(e) =>
                    setFields({
                      ...fields,
                      supplierRefNumber: e.target.value,
                    })
                  }
                />
              </VStack>
            </GridItem>
            <GridItem w="100%">
              <VStack spacing="7">
                <Buyer fields={fields} setFields={setFields} />
                <InputPersonalizado
                  type="date"
                  label="Date"
                  value={fields.date}
                  onChange={(e) =>
                    setFields({ ...fields, date: e.target.value })
                  }
                />
              </VStack>
            </GridItem>
            <GridItem w="100%">
              <VStack spacing="7">
                <OperationType fields={fields} setFields={setFields} />
              </VStack>
            </GridItem>
          </Grid>
          <TablaGeneral
            productos={productos}
            operationType={fields.operationType}
            setProductos={setProductos}
          />
          <Grid w="100%" templateColumns="repeat(2, 1fr)" gap={5}>
            <GridItem w="100%">
              <VStack spacing="7">
                <InputPersonalizado
                  type="date"
                  label="PRODUCTION DATE"
                  value={fields.productionDate}
                  onChange={(e) =>
                    setFields({ ...fields, productionDate: e.target.value })
                  }
                />
                <ShelfLife setFields={setFields} fields={fields} />
                <DestinationPort fields={fields} setFields={setFields} />
                <InputPersonalizado
                  type="text"
                  label="DESTINATION COUNTRY"
                  value={fields.destinationCountry}
                  onChange={(e) =>
                    setFields({ ...fields, destinationCountry: e.target.value })
                  }
                />
                <InputPersonalizado
                  type="text"
                  label="QUANTITY"
                  value={fields.quantity}
                  onChange={(e) =>
                    setFields({ ...fields, quantity: e.target.value })
                  }
                />
              </VStack>
            </GridItem>
            <GridItem w="100%">
              <VStack spacing="7">
                <InputPersonalizado
                  type="date"
                  label="SHIPMENT PERIOD"
                  value={fields.shipmentPeriod}
                  onChange={(e) =>
                    setFields({ ...fields, shipmentPeriod: e.target.value })
                  }
                />
                <DeliveryTerms setFields={setFields} fields={fields} />
                <PaymentTerms fields={fields} setFields={setFields} />
              </VStack>
            </GridItem>
          </Grid>
          <Center>
            <Button colorScheme="orange" onClick={saveFormHandler}>
              Guardar
            </Button>
          </Center>
        </VStack>
      </CardBody>
    </Card>
  );
}
