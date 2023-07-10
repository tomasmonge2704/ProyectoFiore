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
import { PaymentTerms } from "../sales/paymentTerms";
import TablePurchase from "./tablePurchase";
export default function PurchaseForm() {
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
                <InputPersonalizado type="text" label="ORDER NUMBER"/>
                <InputPersonalizado type="text" label="SUPPLIER REF. NUMBER"/>
                <Text>SHIPPER / SELLER</Text>
                <InputPersonalizado type="text" label="Nombre"/>
                <InputPersonalizado type="text" label="Direccion"/>
                <InputPersonalizado type="text" label="Codigo postal"/>
                <InputPersonalizado type="text" label="Pais"/>
                <InputPersonalizado type="text" label="Cuit"/>
              </VStack>
            </GridItem>
            <GridItem w="100%">
              <VStack spacing="7">
              <InputPersonalizado type="date" label="Date" />
              <Box h={10}></Box>
              <Text>Buyer</Text>
              <Text as="b">DPL Trading LLC</Text>
              <InputPersonalizado type="text" label="Cuit"/>
              <InputPersonalizado type="text" label="Direccion"/>
              <InputPersonalizado type="text" label="VAT NUMBER"/>
              <Text as="b">CONSIGNEE</Text>
              <Text >(DOCS INSTRUCTION WILL FOLLOW SHORTLY)</Text>
              </VStack>
            </GridItem>
          </Grid>
          <Text as="b">WE CONFIRM HAVING PURCHASED</Text>
          <TablePurchase />
          <Grid w="100%" templateColumns="repeat(2, 1fr)" gap={5}>
            <GridItem w="100%">
              <VStack spacing="7">
              <InputPersonalizado type="text" label="ORIGIN"/>
              <InputPersonalizado type="text" label="PLANT NUMBER"/>
              <InputPersonalizado type="text" label="BRAND"/>
              <InputPersonalizado type="text" label="PRODUCTION DATE"/>
              <InputPersonalizado type="text" label="SHELF LIFE"/>
              <InputPersonalizado type="text" label="DESTINATION PORT"/>
              </VStack>
            </GridItem>
            <GridItem w="100%">
              <VStack spacing="7">
              <InputPersonalizado type="text" label="DESTINATION COUNTRY"/>
              <InputPersonalizado type="text" label="QUANTITY"/>
              <InputPersonalizado type="text" label="SHIPMENT PERIOD"/>
              <InputPersonalizado type="text" label="DELIVERY TERMS"/>
              <PaymentTerms/>
              </VStack>
            </GridItem>
          </Grid>
          <InputPersonalizado type="text" label="INSPECTED, APPROVED & ELEGIBLE FOR EXPORT TO"/>			
          <Center><Button colorScheme='orange'>Finalizar</Button></Center>
        </VStack>
      </CardBody>
    </Card>
  );
}
