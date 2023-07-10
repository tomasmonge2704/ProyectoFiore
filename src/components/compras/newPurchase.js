import {
  Box,
  Flex,
  Grid,
  GridItem,
  Center,
  Text,
  Input,
  InputGroup,
  InputLeftAddon,
  Card,
  CardBody,
  VStack,
} from "@chakra-ui/react";
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
                <InputGroup>
                  <InputLeftAddon children="ORDER NUMBER" />
                  <Input type="tel" placeholder="phone number" />
                </InputGroup>
                <InputGroup>
                  <InputLeftAddon children="SUPPLIER REF. NUMBER:	" />
                  <Input type="tel" placeholder="phone number" />
                </InputGroup>
                <Text>SHIPPER / SELLER</Text>
              </VStack>
            </GridItem>
            <GridItem w="100%">
              <VStack spacing="7">
              <InputGroup>
                <InputLeftAddon children="Date" />
                <Input type="date" />
              </InputGroup>
              <Box h={10}></Box>
              <Text>Buyer</Text>
              </VStack>
            </GridItem>
          </Grid>
        </VStack>
      </CardBody>
    </Card>
  );
}
