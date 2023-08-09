import InputPersonalizado from "@/utils/inputPersonalizado";
import {
  Box,
  Grid,
  GridItem,
  Center,
  Text,
  Button,
  Card,
  CardBody,
  VStack,
} from "@chakra-ui/react";
import TablePurchase from "./tablePurchase";
import { useContext } from "react";
import { Buyer } from "./Buyer";
import { Seller } from "./seller";
import { PaymentTerms } from "../generalForm/paymentTerms";
import { CarteraProveedoresContext } from "../context/carterasContext";

export default function PurchaseForm({ operation, fields, setFields,productos,setProductos }) {
  const { CarteraProveedores } = useContext(CarteraProveedoresContext);
  const saveFormHandler = () => {
    localStorage.setItem("operation", JSON.stringify(operation));
  };
  return (
    <Card w="100%" p={4} variant="outline">
      <CardBody>
        <VStack spacing="10">
          <Center w="100%">
            <Text fontSize="3xl">PURCHASE CONFIRMATION Nr. 123421</Text>
          </Center>
          <Grid w="100%" templateColumns="repeat(2, 1fr)" gap={5}>
            <GridItem w="100%">
              <VStack spacing="7">
                <InputPersonalizado
                  type="text"
                  label="SUPPLIER REF. NUMBER"
                  value={fields.seller.refNumber}
                  onChange={(e) =>
                    setFields({
                      ...fields,
                      seller:{...fields.seller,refNumber:e.target.value},
                    })
                  }
                />
                <Text>SHIPPER / SELLER</Text>
                <Seller
                  fields={fields}
                  setFields={setFields}
                  CarteraProveedores={CarteraProveedores}
                  detailView={true}
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
                <Text>Buyer</Text>
                <Buyer fields={fields} setFields={setFields} detailView={true} />
                <Text as="b">CONSIGNEE</Text>
                <Text>(DOCS INSTRUCTION WILL FOLLOW SHORTLY)</Text>
              </VStack>
            </GridItem>
          </Grid>
          <Text as="b">WE CONFIRM HAVING PURCHASED</Text>
          <TablePurchase
            productos={productos}
            setProductos={setProductos}
            fields={fields}
          />
          <Grid w="100%" templateColumns="repeat(2, 1fr)" gap={5}>
            <GridItem w="100%">
              <VStack spacing="7">
                <InputPersonalizado
                  type="text"
                  label="ORIGIN"
                  value={fields.seller.origin}
                  onChange={(e) =>
                    setFields({ ...fields.seller, origin: e.target.value })
                  }
                />
                <InputPersonalizado
                  type="text"
                  label="PLANT NUMBER"
                  value={fields.seller.plantNumber}
                  onChange={(e) =>
                    setFields({ ...fields.seller, plantNumber: e.target.value })
                  }
                />
                <InputPersonalizado
                  type="text"
                  label="BRAND"
                  value={fields.seller.brand}
                  onChange={(e) =>
                    setFields({ ...fields.seller, brand: e.target.value })
                  }
                />
                <InputPersonalizado
                  type="text"
                  label="PRODUCTION DATE"
                  value={fields.productionDate}
                  onChange={(e) =>
                    setFields({ ...fields, productionDate: e.target.value })
                  }
                />
                <InputPersonalizado
                  type="text"
                  label="SHELF LIFE"
                  value={fields.shelfLife}
                  onChange={(e) =>
                    setFields({ ...fields, shelfLife: e.target.value })
                  }
                />
                <InputPersonalizado
                  type="text"
                  label="DESTINATION PORT"
                  value={fields.destinationPort}
                  onChange={(e) =>setFields({...fields,destinationPort:e.target.value,})}
                />
              </VStack>
            </GridItem>
            <GridItem w="100%">
              <VStack spacing="7">
                <InputPersonalizado
                  type="text"
                  label="DESTINATION COUNTRY"
                  value={fields.destinationCountry}
                  onChange={(e) =>setFields({...fields,destinationCountry:e.target.value})}
                />
                <InputPersonalizado
                  type="text"
                  label="SHIPMENT PERIOD"
                  value={fields.shipmentPeriod}
                  onChange={(e) =>
                    setFields({ ...fields, shipmentPeriod: e.target.value })
                  }
                />
                <InputPersonalizado
                  type="text"
                  label="DELIVERY TERMS"
                  value={fields.deliveryTermsPurchase}
                  onChange={(e) =>
                    setFields({ ...fields, deliveryTermsPurchase: e.target.value })
                  }
                />
                <PaymentTerms fields={fields} setFields={setFields} type="purchase"  />
              </VStack>
            </GridItem>
          </Grid>
          <InputPersonalizado
            type="text"
            label="INSPECTED, APPROVED & ELEGIBLE FOR EXPORT TO"
            value={fields.exportTo}
            onChange={(e) =>
              setFields({ ...fields, exportTo: e.target.value })
            }
          />
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
