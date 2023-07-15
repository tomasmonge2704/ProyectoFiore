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
  const [updatedCarteraBancaria, setUpdatedCarteraBancaria] = useState(
    CarteraBancaria
  );

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
        <Card minW="400px">
          <CardHeader>
            <Heading size="md">
              {CarteraBancaria && CarteraBancaria[0].empresa}
            </Heading>
          </CardHeader>
          <CardBody>
            <Stack spacing="2">
              <Text as="b">CUIT</Text>
              <Text>{CarteraBancaria && CarteraBancaria[0].cuit}</Text>
              <Editable
                defaultValue={CarteraBancaria && CarteraBancaria[0].cuit}
                onChange={(value) =>
                  handleInputChange(value, 0, "cuit")
                }
              >
                <EditablePreview />
                <EditableInput />
              </Editable>
              <Text as="b">Direccion</Text>
              <Editable
                defaultValue={CarteraBancaria && CarteraBancaria[0].direccion}
                onChange={(value) =>
                  handleInputChange(value, 0, "direccion")
                }
              >
                <EditablePreview />
                <EditableInput />
              </Editable>
              <Text as="b">VAT NUMBER</Text>
              <Editable
                defaultValue={CarteraBancaria && CarteraBancaria[0].vatNumber}
                onChange={(value) =>
                  handleInputChange(value, 0, "vatNumber")
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
        <Card minW="400px">
          <CardHeader>
            <Heading size="md">
              {CarteraBancaria && CarteraBancaria[1].empresa}
            </Heading>
          </CardHeader>
          <CardBody>
            <Stack spacing="2">
              <Text as="b">CUIT</Text>
              <Editable
                defaultValue={CarteraBancaria && CarteraBancaria[1].cuit}
                onChange={(value) =>
                  handleInputChange(value, 1, "cuit")
                }
              >
                <EditablePreview />
                <EditableInput />
              </Editable>
              <Text as="b">Direccion</Text>
              <Editable
                defaultValue={CarteraBancaria && CarteraBancaria[1].direccion}
                onChange={(value) =>
                  handleInputChange(value, 1, "direccion")
                }
              >
                <EditablePreview />
                <EditableInput />
              </Editable>
              <Text as="b">VAT NUMBER</Text>
              <Editable
                defaultValue={CarteraBancaria && CarteraBancaria[1].vatNumber}
                onChange={(value) =>
                  handleInputChange(value, 1, "vatNumber")
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
      </Flex>
    </Layout>
  );
}
