import {
  Box,
  Grid,
  GridItem,
  Center,
  Text,
  Card,
  CardBody,
  VStack,
  Button,
} from "@chakra-ui/react";
import SaleTable from "./saleTable";
import InputPersonalizado from "@/utils/inputPersonalizado";
import { PaymentTerms } from "../compras/paymentTerms";

export default function SaleForm({fields,setFields,productos,setProductos,}) {
  return (
    <Card w="100%" p={4} variant="outline">
      <CardBody>
        <VStack spacing="10">
          <Center w="100%">
            <Text fontSize="3xl">PROFORMA INVOICE Nr. 34532</Text>
          </Center>
          <Grid w="100%" templateColumns="repeat(2, 1fr)" gap={5}>
            <GridItem w="100%">
              <VStack spacing="7">
                <InputPersonalizado label="ORDER NUMBER" type="text" />
                <InputPersonalizado label="BUYER REF. NUMBER" type="text" />
                <Text>Buyer</Text>
                <InputPersonalizado label="Name" type="text" />
                <InputPersonalizado label="Adress" type="text" />
                <InputPersonalizado label="City" type="text" />
                <InputPersonalizado label="VAT Nr" type="text" />
                
              </VStack>
            </GridItem>
            <GridItem w="100%">
              <VStack spacing="7">
                <InputPersonalizado label="Date" type="date" />
                <Box h={10}></Box>
                <Text>Seller</Text>
                <InputPersonalizado label="Name" type="text" />
                <InputPersonalizado label="Adress" type="text" />
                <InputPersonalizado label="Adress 2" type="text" />
                <InputPersonalizado label="VAT Nr" type="text" />
                <Text>BANK DETAILS</Text>
                <InputPersonalizado label="Beneficiary Bank" type="text" value={fields.empresa.bank && fields.empresa.bank.beneficiaryBank} />
                <InputPersonalizado label="Bank Adress" type="text" value={fields.empresa.bank && fields.empresa.bank.bankAdress} />
                <InputPersonalizado label="Swift Code" type="text" value={fields.empresa.bank && fields.empresa.bank.swiftCode} />
                <InputPersonalizado label="Beneficiary Name" type="text" value={fields.empresa.bank && fields.empresa.bank.beneficiaryName} />
                <InputPersonalizado
                  label="Beneficiary Account Number"
                  type="text"
                  value={fields.empresa.bank && fields.empresa.bank.beneficiaryAccountNumber}
                />
              </VStack>
            </GridItem>
          </Grid>
          <SaleTable productos={productos} setProductos={setProductos} />
          <Grid w="100%" templateColumns="repeat(2, 1fr)" gap={5}>
            <GridItem w="100%">
              <VStack spacing="7">
                <InputPersonalizado
                  label="Origin"
                  type="text"
                  value={fields.seller ? fields.seller.origin : ""}
                />
                <InputPersonalizado
                  label="PLANT NUMBER"
                  type="text"
                  value={fields.seller ? fields.seller.plantNumber : ""}
                />
                <InputPersonalizado
                  label="BRAND"
                  type="text"
                  value={fields.seller ? fields.seller.brand : ""}
                />
                <InputPersonalizado
                  label="PRODUCTION DATE"
                  type="text"
                  value={fields.seller ? fields.seller.brand : ""}
                />
                <InputPersonalizado
                  label="SHELF LIFE"
                  type="text"
                  value={fields.seller ? fields.seller.brand : ""}
                />
                <InputPersonalizado
                  label="DESTINATION PORT"
                  type="text"
                  value={fields.exportTo ? fields.exportTo : ""}
                />
                <InputPersonalizado
                  label="DESTINATION COUNTRY"
                  type="text"
                  value={fields.exportTo ? fields.exportTo : ""}
                />
                <InputPersonalizado
                  label="QUANTITY"
                  type="text"
                  value={fields.exportTo ? fields.exportTo : ""}
                />
                <InputPersonalizado
                  label="SHIPMENT PERIOD"
                  type="text"
                  value={fields.exportTo ? fields.exportTo : ""}
                />
              </VStack>
            </GridItem>
            <GridItem w="100%">
              <VStack spacing="7">
                <InputPersonalizado
                  label="DELIVERY TERMS"
                  type="text"
                  value={fields.deliveryTerms ? fields.deliveryTerms : ""}
                />
                <PaymentTerms fields={fields} setFields={setFields} />
                <InputPersonalizado
                  label="TOTAL PURCHASE"
                  type="text"
                  value={fields.exportTo ? fields.exportTo : ""}
                />
                <InputPersonalizado
                  label="TOTAL NET WEIGHT"
                  type="text"
                  value={fields.exportTo ? fields.exportTo : ""}
                />
                <InputPersonalizado
                  label="COMISSION"
                  type="text"
                  value={fields.exportTo ? fields.exportTo : ""}
                />
                <InputPersonalizado
                  label="SOLD BY"
                  type="text"
                  value={fields.exportTo ? fields.exportTo : ""}
                />
                <InputPersonalizado
                  label="CONTACT NUMBER"
                  type="text"
                  value={fields.exportTo ? fields.exportTo : ""}
                />
              </VStack>
            </GridItem>
          </Grid>
          <Center>
            <Button colorScheme="orange">Finalizar</Button>
          </Center>
        </VStack>
      </CardBody>
    </Card>
  );
}
