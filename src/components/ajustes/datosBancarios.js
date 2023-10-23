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
  useToast
} from "@chakra-ui/react";
import { useState } from "react";
export const DatosBancarios = ({ CarteraBancaria }) => {
  const [dirtyIndexes, setDirtyIndexes] = useState([]);
  const [datos, setDatos] = useState(CarteraBancaria);
  const toast = useToast();
  const handleInputChange = (element, index, parametro, indexBank) => {
    setDirtyIndexes((prevDirtyIndexes) => {
      if (!prevDirtyIndexes.includes(index)) {
        return [...prevDirtyIndexes, index];
      }
      return prevDirtyIndexes;
    });
    const newDatos = [...datos];
    if (indexBank !== undefined) {
      // Si se proporciona indexBank, se está modificando una propiedad dentro de banks
      const updatedBank = { ...newDatos[index].banks[indexBank] };
      updatedBank[parametro] = element.target.value;
      newDatos[index].banks[indexBank] = updatedBank;
    } else {
      // Si no se proporciona indexBank, se está modificando una propiedad directamente en el elemento
      newDatos[index][parametro] = element.target.value;
    }
    setDatos(newDatos)
  };

  const handleConfirmChanges = (index) => {
    const token = localStorage.getItem("token");
    const buscado = datos[index];
    fetch(`${process.env.API_URL}/empresa/${buscado._id}`, {
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
          title: "Empresa",
          description: `Se ha guardado correctamente ${data.nombre}.`,
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
        setDirtyIndexes((prevDirtyIndexes) =>
          prevDirtyIndexes.filter((dirtyIndex) => dirtyIndex !== index)
        );
      });
  };
  return (
    <Flex justify="space-evenly" mt={2} mb={5}>
      {datos.length > 0 &&
        datos.map((e, index) => (
          <Card
            minW="47%"
            key={index}
            variant="elevated"
            backgroundColor={e.empresa == "Duplo" ? "orange.200" : "orange.300"}
          >
            <CardHeader h={5}>
              <Center>
                <Heading size="md">{e.nombre}</Heading>
              </Center>
            </CardHeader>
            <CardBody>
              <Stack spacing="1">
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
              <Divider mt={2} mb={2} />
              <Grid w="100%" templateColumns="repeat(2, 1fr)" gap={2}>
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
                          onChange={(element) =>
                            handleInputChange(
                              element,
                              index,
                              "bankAdress",
                              indexBank
                            )
                          }
                        />
                        <Text as="b">Swift Code</Text>
                        <Input variant="filled" defaultValue={bank.swiftCode}  onChange={(element) =>
                            handleInputChange(
                              element,
                              index,
                              "swiftCode",
                              indexBank
                            )
                          }/>
                        <Text as="b">Beneficiary Name</Text>
                        <Input
                          variant="filled"
                          defaultValue={bank.beneficiaryName}
                          onChange={(element) =>
                            handleInputChange(
                              element,
                              index,
                              "beneficiaryName",
                              indexBank
                            )
                          }
                        />
                        <Text as="b">Beneficiary Account Number</Text>
                        <Input
                          variant="filled"
                          defaultValue={bank.beneficiaryAccountNumber}
                          onChange={(element) =>
                            handleInputChange(
                              element,
                              index,
                              "beneficiaryAccountNumber",
                              indexBank
                            )
                          }
                        />
                        <Text as="b">Correspondent Bank</Text>
                        <Input
                          variant="filled"
                          defaultValue={bank.correspondentBank}
                          onChange={(element) =>
                            handleInputChange(
                              element,
                              index,
                              "correspondentBank",
                              indexBank
                            )
                          }
                        />
                         <Text as="b">ABA</Text>
                        <Input
                          variant="filled"
                          defaultValue={bank.ABA}
                          onChange={(element) =>
                            handleInputChange(
                              element,
                              index,
                              "ABA",
                              indexBank
                            )
                          }
                        />
                         <Text as="b">SWIFT Code</Text>
                        <Input
                          variant="filled"
                          defaultValue={bank.swift}
                          onChange={(element) =>
                            handleInputChange(
                              element,
                              index,
                              "swift",
                              indexBank
                            )
                          }
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
