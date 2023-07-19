import Layout from "@/components/Layouts/main";
import {
  Center,
  Text,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Heading,
  Flex,
  Editable,
  EditablePreview,
  EditableInput,
  Stack,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { CarteraBancariaContext } from "@/components/context/carterasContext";

export default function Ajustes() {
  const { CarteraBancaria, setCarteraBancaria } = useContext(
    CarteraBancariaContext
  );
  const [isDirty, setIsDirty] = useState(false);
  const [updatedCarteraBancaria, setUpdatedCarteraBancaria] =
    useState(CarteraBancaria);

  const handleInputChange = (value, index, field) => {
    setIsDirty(true);
    setUpdatedCarteraBancaria((prevCarteraBancaria) => {
      const updatedData = [...prevCarteraBancaria];
      updatedData[index][field] = value;
      return updatedData;
    });
  };

  const handleConfirmChanges = () => {
    setIsDirty(false);
    setCarteraBancaria(updatedCarteraBancaria);
  };

  return (
    <Layout title="Ajustes">
      <Center>
        <Text as="b">Cartera de datos Bancarios</Text>
      </Center>
      <Flex justify="space-evenly" mt={20}>
        {CarteraBancaria &&
          CarteraBancaria.map((e, index) => (
            <Card minW="400px" key={index}>
              <CardHeader>
                <Heading size="md">{e.empresa}</Heading>
              </CardHeader>
              <CardBody>
                <Stack spacing="2">
                  <Text as="b">Direccion</Text>
                  <Editable
                    defaultValue={e.direccion}
                    onChange={(value) =>
                      handleInputChange(value, index, "direccion")
                    }
                  >
                    <EditablePreview />
                    <EditableInput />
                  </Editable>
                  <Text as="b">Direccion 2</Text>
                  <Editable
                    defaultValue={e.direccion2}
                    onChange={(value) =>
                      handleInputChange(value, index, "cuit")
                    }
                  >
                    <EditablePreview />
                    <EditableInput />
                  </Editable>
                  <Text as="b">VAT NUMBER</Text>
                  <Editable
                    defaultValue={e.vatNumber}
                    onChange={(value) =>
                      handleInputChange(value, index, "vatNumber")
                    }
                  >
                    <EditablePreview />
                    <EditableInput />
                  </Editable>
                </Stack>
              </CardBody>
              {isDirty && (
                <CardFooter>
                  <Button colorScheme="blue" onClick={handleConfirmChanges}>
                    Confirmar cambios
                  </Button>
                </CardFooter>
              )}
            </Card>
          ))}
      </Flex>
    </Layout>
  );
}
