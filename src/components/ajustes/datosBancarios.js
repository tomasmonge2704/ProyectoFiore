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
  const [datos, setDatos] = useState(CarteraBancaria);
  const handleInputChange = (element, index, parametro, indexBank) => {
    setDirtyIndexes((prevDirtyIndexes) => {
      if (!prevDirtyIndexes.includes(index)) {
        return [...prevDirtyIndexes, index];
      }
      return prevDirtyIndexes;
    });
    const newDatos = datos;
    if (indexBank) {
      newDatos[index].banks[indexBank][parametro] = element.target.value;
    } else {
      newDatos[index][parametro] = element.target.value;
    }
    setDatos(newDatos)
  };

  const handleConfirmChanges = (index) => {
    setDirtyIndexes((prevDirtyIndexes) =>
      prevDirtyIndexes.filter((dirtyIndex) => dirtyIndex !== index)
    );
    const token = localStorage.getItem("token");

    fetch(`${process.env.API_URL}/empleados/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(buscado),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        return response.json();
      })
      .then((data) => {
        toast({
          title: "Cliente",
          description: `Se ha guardado correctamente ${data[params[0].param]}.`,
          status: "success",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: "Error",
          description: "Se ha producido un error en la solicitud.",
          status: "error",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
      })
      .finally(() => {
        // Realizar tareas finales aquí, como limpiar estados o ejecutar acciones después de la solicitud
      });
  };
  return (
    <Flex justify="space-evenly" mt={10} mb={10}>
      {datos.length > 0 &&
        datos.map((e, index) => (
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
                  onChange={(element) =>
                    handleInputChange(element, index, "direccion")
                  }
                />
                <Text as="b">Direccion 2</Text>
                <Input
                  variant="filled"
                  defaultValue={e.direccion2}
                  onChange={(element) =>
                    handleInputChange(element, index, "direccion2")
                  }
                />
                <Text as="b">VAT NUMBER</Text>
                <Input
                  variant="filled"
                  defaultValue={e.vatNumber}
                  onChange={(element) =>
                    handleInputChange(element, index, "vatNumber")
                  }
                />
              </Stack>
              <Divider mt={5} mb={5} />
              <Grid w="100%" templateColumns="repeat(2, 1fr)" gap={5}>
                {e.banks &&
                  e.banks.map((bank, indexBank) => (
                    <GridItem w="100%" key={indexBank}>
                      <Stack spacing="2">
                        <Text as="b">Beneficiary Bank {indexBank + 1}</Text>
                        <Input
                          variant="filled"
                          defaultValue={bank.beneficiaryBank}
                          onChange={(element) =>
                            handleInputChange(
                              element,
                              index,
                              "beneficiaryBank",
                              indexBank
                            )
                          }
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
