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
import {
  CarteraProveedoresContext,
  CarteraBancariaContext,
} from "../context/carterasContext";
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
          <Grid w="100%" templateColumns="repeat(3, 1fr)" gap={5}>
            <GridItem w="100%">
              <VStack spacing="7">
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
              <VStack spacing="7">
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
              <VStack spacing="7">
                <OperationType fields={fields} setFields={setFields} />
                <Buyer fields={fields} setFields={setFields} />
                <InputPersonalizado
                  type="text"
                  label="REF. NUMBER"
                  value={fields.buyer.refNumber}
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
          />
          <InputPersonalizado
            type="text"
            label="PRODUCTION DATE"
            value={fields.productionDate}
            onChange={(e) =>
              setFields({ ...fields, productionDate: e.target.value })
            }
          />
          <ShipmentPeriod
            value={fields.shipmentPeriod}
            setFields={setFields}
            fields={fields}
          />
          <Grid w="100%" templateColumns="repeat(2, 1fr)" gap={5}>
            <GridItem w="100%">
              <VStack spacing="7">
                <DestinationPort fields={fields} setFields={setFields} />
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
            <GridItem w="100%">
              <VStack spacing="7">
                <ShelfLife setFields={setFields} fields={fields} />
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
