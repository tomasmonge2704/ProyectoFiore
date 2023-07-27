import Layout from "@/components/Layouts/main";
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
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { CarteraBancariaContext } from "@/components/context/carterasContext";

export default function Ajustes() {
  const { CarteraBancaria, setCarteraBancaria } = useContext(
    CarteraBancariaContext
  );
  const [dirtyIndexes, setDirtyIndexes] = useState([]);
  const [updatedCarteraBancaria, setUpdatedCarteraBancaria] = useState(CarteraBancaria);

  const handleInputChange = (value, index, field) => {
    setDirtyIndexes((prevDirtyIndexes) => {
      if (!prevDirtyIndexes.includes(index)) {
        return [...prevDirtyIndexes, index];
      }
      return prevDirtyIndexes;
    });

    setUpdatedCarteraBancaria((prevCarteraBancaria) => {
      const updatedData = [...prevCarteraBancaria];
      updatedData[index][field] = value;
      return updatedData;
    });
  };

  const handleConfirmChanges = (index) => {
    setDirtyIndexes((prevDirtyIndexes) =>
      prevDirtyIndexes.filter((dirtyIndex) => dirtyIndex !== index)
    );
  };
  return (
    <Layout title="Ajustes">
      <Center>
        <Heading>Cartera de datos Bancarios</Heading>
      </Center>
      <Flex justify="space-evenly" mt={10}>
        {CarteraBancaria &&
          CarteraBancaria.map((e, index) => (
            <Card maxW="300px" key={index} variant="filled" backgroundColor={ e.empresa == "Duplo" ? "orange.200" : "orange.300"}>
              <CardHeader>
                <Center>
                  <Heading size="md">{e.nombre}</Heading>
                </Center>
              </CardHeader>
              <CardBody>
                <Stack spacing="2">
                  <Text as="b">Direccion</Text>
                  <Input
                    variant="outline"
                    defaultValue={e.direccion}
                    onChange={(value) =>
                      handleInputChange(value, index, "direccion")
                    }
                  />
                  <Text as="b">Direccion 2</Text>
                  <Input
                    variant="outline"
                    defaultValue={e.direccion2}
                    onChange={(value) =>
                      handleInputChange(value, index, "direccion2")
                    }
                  />
                  <Text as="b">VAT NUMBER</Text>
                  <Input
                    variant="outline"
                    defaultValue={e.vatNumber}
                    onChange={(value) =>
                      handleInputChange(value, index, "vatNumber")
                    }
                  />
                </Stack>

                {dirtyIndexes.includes(index) && (
                  <Center mt={7}>
                    <Button colorScheme="orange" onClick={() => handleConfirmChanges(index)}>
                      Guardar
                    </Button>
                  </Center>
                )}
              </CardBody>
            </Card>
          ))}
      </Flex>
    </Layout>
  );
}
