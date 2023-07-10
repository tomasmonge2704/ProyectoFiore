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
import { PaymentTerms } from "./paymentTerms";

export default function SaleForm() {
  return (
    <Card w="100%" p={4} variant="outline">
      <CardBody>
        <VStack spacing="10">
          <Center w="100%">
            <Text fontSize="3xl">INVOICE</Text>
          </Center>
          <Grid w="100%" templateColumns="repeat(2, 1fr)" gap={5}>
            <GridItem w="100%">
              <VStack spacing="7">
                <Box h={10}></Box>
                <Box h={10}></Box>
                <Text>Buyer</Text>
                <InputPersonalizado label="Invoice Nr." type="text" />
                <InputPersonalizado label="Name" type="text" />
                <InputPersonalizado label="Adress" type="text" />
                <InputPersonalizado label="City" type="text" />
                <InputPersonalizado label="VAT Nr" type="text" />
              </VStack>
            </GridItem>
            <GridItem w="100%">
              <VStack spacing="7">
                <InputPersonalizado label="Invoice Nr." type="text" />
                <InputPersonalizado label="Date" type="date" />
                <Box h={10}></Box>
              </VStack>
            </GridItem>
          </Grid>
          <SaleTable />
          <Grid w="100%" templateColumns="repeat(2, 1fr)" gap={5}>
            <GridItem w="100%">
              <VStack spacing="7">
                <InputPersonalizado label="Delivery terms" type="text" />
                <InputPersonalizado label="Origin" type="text" />
                <InputPersonalizado label="BRAND | PLANT NR." type="text" />
                <InputPersonalizado label="Destination" type="text" />
                <InputPersonalizado label="Vessel" type="text" />
                <InputPersonalizado label="Container NR." type="text" />
              </VStack>
            </GridItem>
            <GridItem w="100%">
              <VStack spacing="7">
                <InputPersonalizado label="Seals" type="text" />
                <InputPersonalizado label="Purchase order NR." type="text" />
                <InputPersonalizado label="Sales order" type="text" />
                <PaymentTerms />
              </VStack>
            </GridItem>
          </Grid>
          <Text>Bank details</Text>
          <Grid w="100%" templateColumns="repeat(2, 1fr)" gap={5}>
            <GridItem w="100%">
              <VStack spacing="7">
                <Text as="b">RECEIVING BANK</Text>
                <Text as='i'>57D Account with institution</Text>
              </VStack>
            </GridItem>
            <GridItem w="100%">
              <VStack spacing="7">
                <InputPersonalizado label="SWIFT" type="text" />
                <InputPersonalizado label="Bank name" type="text" />
                <InputPersonalizado label="Bank adress" type="text" />
              </VStack>
            </GridItem>
          </Grid>
          <Grid w="100%" templateColumns="repeat(2, 1fr)" gap={5}>
            <GridItem w="100%">
              <VStack spacing="7">
                <Text as="b">BENFICIARY</Text>
                <Text as='i'>(59 Beneficiary customer name & address)</Text>
              </VStack>
            </GridItem>
            <GridItem w="100%">
              <VStack spacing="7">
                <InputPersonalizado label="IBAN / Account Number" type="text" />
                <InputPersonalizado label="Beneficiary Name" type="text" />
                <InputPersonalizado label="Beneficiary Address" type="text" />
              </VStack>
            </GridItem>
          </Grid>
          <Center><Button colorScheme='teal'>Finalizar</Button></Center>
        </VStack>
      </CardBody>
    </Card>
  );
}
