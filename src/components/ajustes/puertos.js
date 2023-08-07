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
export const Puertos = ({CarteraPuertos}) => {
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
      {CarteraPuertos &&
        CarteraPuertos.map((e, index) => (
          <Card
            maxW="300px"
            key={index}
            variant="elevated"
            backgroundColor={e.empresa == "Duplo" ? "blue.300" : "blue.400"}
          >
            <CardBody>
              <Stack spacing="2">
                <Text as="b">Port</Text>
                <Input
                  variant="filled"
                  defaultValue={e.port}
                  onChange={(value) =>
                    handleInputChange(value, index, "direccion")
                  }
                />
                <Text as="b">Country</Text>
                <Input
                  variant="filled"
                  defaultValue={e.country}
                  onChange={(value) =>
                    handleInputChange(value, index, "direccion2")
                  }
                />
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
