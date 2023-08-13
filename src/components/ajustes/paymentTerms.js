import {
  Center,
  Text,
  Card,
  CardBody,
  Button,
  Flex,
  Stack,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
export const PaymentTerms = ({ CarteraPaymentTerms }) => {
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
      {CarteraPaymentTerms.length > 0 &&
        CarteraPaymentTerms.map((e, index) => (
          <Card
            minW="40%"
            key={index}
            variant="elevated"
            backgroundColor={e.empresa == "Duplo" ? "cyan.300" : "cyan.400"}
          >
            <CardBody>
              <Stack spacing="2">
                <Text as="b">Title</Text>
                <Input
                  variant="filled"
                  defaultValue={e.title}
                  onChange={(value) =>
                    handleInputChange(value, index, "direccion")
                  }
                />
                <Text as="b">Items</Text>
                <Flex justify="space-evenly">
                  {e.items.map((e, index) => (
                    <Input
                      key={index}
                      variant="filled"
                      width="48%"
                      defaultValue={e.porcentaje}
                      onChange={(value) =>
                        handleInputChange(value, index, "direccion2")
                      }
                    />
                  ))}
                </Flex>
                <Flex justify="space-evenly">
                  {e.items.map((e, index) => (
                    <Input
                      key={index}
                      variant="filled"
                      width="48%"
                      defaultValue={e.descripcion}
                      onChange={(value) =>
                        handleInputChange(value, index, "direccion2")
                      }
                    />
                  ))}
                </Flex>
              </Stack>
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
