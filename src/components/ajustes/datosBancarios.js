import {
  Center,
  Text,
  Card,
  CardHeader,
  CardBody,
  Button,
  Heading,
  Flex,
  Stack,
  Divider,
  Input,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useState } from "react";
export const DatosBancarios = ({ CarteraBancaria }) => {
  const [dirtyIndexes, setDirtyIndexes] = useState([]);
  const handleInputChange = (value, index, field) => {
    setDirtyIndexes((prevDirtyIndexes) => {
      if (!prevDirtyIndexes.includes(index)) {
        return [...prevDirtyIndexes, index];
      }
      return prevDirtyIndexes;
    });
    //aca deberia ir la logica para actualizar el campo
  };

  const handleConfirmChanges = (index) => {
    setDirtyIndexes((prevDirtyIndexes) =>
      prevDirtyIndexes.filter((dirtyIndex) => dirtyIndex !== index)
    );
  };
  return (
    <Flex justify="space-evenly" mt={10} mb={10}>
      {CarteraBancaria &&
        CarteraBancaria.map((e, index) => (
          <Card
            minW="47%"
            key={index}
            variant="elevated"
            backgroundColor={e.empresa == "Duplo" ? "orange.200" : "orange.300"}
          >
            <CardHeader>
              <Center>
                <Heading size="md">{e.nombre}</Heading>
              </Center>
            </CardHeader>
            <CardBody>
              <Stack spacing="2">
                <Text as="b">Direccion</Text>
                <Input
                  variant="filled"
                  defaultValue={e.direccion}
                  onChange={(value) =>
                    handleInputChange(value, index, "direccion")
                  }
                />
                <Text as="b">Direccion 2</Text>
                <Input
                  variant="filled"
                  defaultValue={e.direccion2}
                  onChange={(value) =>
                    handleInputChange(value, index, "direccion2")
                  }
                />
                <Text as="b">VAT NUMBER</Text>
                <Input
                  variant="filled"
                  defaultValue={e.vatNumber}
                  onChange={(value) =>
                    handleInputChange(value, index, "vatNumber")
                  }
                />
              </Stack>
              <Divider mt={5} mb={5} />
              <Grid w="100%" templateColumns="repeat(2, 1fr)" gap={5}>
                {e.banks &&
                  e.banks.map((bank, index) => (
                    <GridItem w="100%" key={index}>
                      <Stack spacing="2">
                        <Text as="b">Beneficiary Bank {index ? "2" : ""}</Text>
                        <Input
                          variant="filled"
                          defaultValue={bank.beneficiaryBank}
                        />
                        <Text as="b">Bank Adress</Text>
                        <Input
                          variant="filled"
                          defaultValue={bank.bankAdress}
                        />
                        <Text as="b">Swift Code</Text>
                        <Input variant="filled" defaultValue={bank.swiftCode} />
                        <Text as="b">Beneficiary Name</Text>
                        <Input
                          variant="filled"
                          defaultValue={bank.beneficiaryName}
                        />
                        <Text as="b">Beneficiary Account Number</Text>
                        <Input
                          variant="filled"
                          defaultValue={bank.beneficiaryAccountNumber}
                        />
                      </Stack>
                    </GridItem>
                  ))}
              </Grid>
              {dirtyIndexes.includes(index) && (
                <Center mt={7}>
                  <Button
                    colorScheme="orange"
                    onClick={() => handleConfirmChanges(index)}
                  >
                    Guardar
                  </Button>
                </Center>
              )}
            </CardBody>
          </Card>
        ))}
    </Flex>
  );
};
