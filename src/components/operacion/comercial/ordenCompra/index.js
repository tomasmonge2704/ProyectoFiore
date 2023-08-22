import InputPersonalizado from "@/utils/inputPersonalizado";
import { Grid, GridItem, Center, Text, Box, VStack } from "@chakra-ui/react";
import TablePurchase from "./tablePurchase";
import { Buyer } from "./Buyer";
import { Seller } from "./seller";
import { PaymentTerms } from "../generales/paymentTerms";

export default function PurchaseForm({
  CarteraProveedores,
  CarteraBancaria,
  CarteraPaymentTerms,
  fields,
  setFields,
  productos,
  setProductos,
}) {
  return (
    <Box w="100%" boxShadow="2xl" p="6" rounded="md">
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
                value={fields.seller ? fields.seller.refNumber : ""}
                onChange={(e) =>
                  setFields({
                    ...fields,
                    seller: { ...fields.seller, refNumber: e.target.value },
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
                value={fields.date ? fields.date : ""}
                onChange={(e) => setFields({ ...fields, date: e.target.value })}
              />
              <Text>Buyer</Text>
              <Buyer fields={fields} setFields={setFields} detailView={true} CarteraBancaria={CarteraBancaria}/>
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
                value={fields.seller ? fields.seller.origin : ""}
                onChange={(e) =>
                  setFields({ ...fields.seller, origin: e.target.value })
                }
              />
              <InputPersonalizado
                type="text"
                label="PLANT NUMBER"
                value={fields.seller ? fields.seller.plantNumber : ""}
                onChange={(e) =>
                  setFields({ ...fields.seller, plantNumber: e.target.value })
                }
              />
              <InputPersonalizado
                type="text"
                label="BRAND"
                value={fields.seller ? fields.seller.brand : ""}
                onChange={(e) =>
                  setFields({ ...fields.seller, brand: e.target.value })
                }
              />
              <InputPersonalizado
                type="text"
                label="PRODUCTION DATE"
                value={fields.productionDate ? fields.productionDate : ""}
                onChange={(e) =>
                  setFields({ ...fields, productionDate: e.target.value })
                }
              />
              <InputPersonalizado
                type="text"
                label="SHELF LIFE"
                value={fields.shelfLife ? fields.shelfLife : ""}
                onChange={(e) =>
                  setFields({ ...fields, shelfLife: e.target.value })
                }
              />
              <InputPersonalizado
                type="text"
                label="DESTINATION PORT"
                value={fields.destinationPort ? fields.destinationPort : ""}
                onChange={(e) =>
                  setFields({ ...fields, destinationPort: e.target.value })
                }
              />
            </VStack>
          </GridItem>
          <GridItem w="100%">
            <VStack spacing="7">
              <InputPersonalizado
                type="text"
                label="DESTINATION COUNTRY"
                value={
                  fields.destinationCountry ? fields.destinationCountry : ""
                }
                onChange={(e) =>
                  setFields({ ...fields, destinationCountry: e.target.value })
                }
              />
              <InputPersonalizado
                type="text"
                label="SHIPMENT PERIOD"
                value={fields.shipmentPeriod ? fields.shipmentPeriod : ""}
                onChange={(e) =>
                  setFields({ ...fields, shipmentPeriod: e.target.value })
                }
              />
              <InputPersonalizado
                type="text"
                label="DELIVERY TERMS"
                value={
                  fields.deliveryTermsPurchase
                    ? fields.deliveryTermsPurchase
                    : ""
                }
                onChange={(e) =>
                  setFields({
                    ...fields,
                    deliveryTermsPurchase: e.target.value,
                  })
                }
              />
              <PaymentTerms
                fields={fields}
                setFields={setFields}
                type="purchase"
                CarteraPaymentTerms={CarteraPaymentTerms}
              />
            </VStack>
          </GridItem>
        </Grid>
        <InputPersonalizado
          type="text"
          label="INSPECTED, APPROVED & ELEGIBLE FOR EXPORT TO"
          value={fields.exportTo ? fields.exportTo : ""}
          onChange={(e) => setFields({ ...fields, exportTo: e.target.value })}
        />
      </VStack>
    </Box>
  );
}
