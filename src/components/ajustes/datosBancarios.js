import {
  Center,
  Text,
  Card,
  CardHeader,
  CardBody,
  Button,
  Heading,
  Stack,
  Divider,
  Input,
  Grid,
  GridItem,
  useToast,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  VStack,
} from "@chakra-ui/react";
import useFetch from "@/hooks/useFetch";
import { useState } from "react";
import { Loadder } from "@/utils/loadder";
import InputPersonalizado from "@/utils/inputPersonalizado";
export const DatosBancarios = () => {
  const [CarteraBancaria, setCarteraBancaria] = useFetch(
    `${process.env.API_URL}/empresa`,
    undefined
  );
  const [dirtyIndexes, setDirtyIndexes] = useState([]);
  const toast = useToast();
  const handleInputChange = (element, index, parametro, indexBank) => {
    element.target.classList.add("modificado");
    setDirtyIndexes((prevDirtyIndexes) => {
      if (!prevDirtyIndexes.includes(index)) {
        return [...prevDirtyIndexes, index];
      }
      return prevDirtyIndexes;
    });
    const newDatos = [...CarteraBancaria];
    if (indexBank !== undefined) {
      // Si se proporciona indexBank, se está modificando una propiedad dentro de banks
      const updatedBank = { ...newDatos[index].banks[indexBank] };
      updatedBank[parametro] = element.target.value;
      newDatos[index].banks[indexBank] = updatedBank;
    } else {
      // Si no se proporciona indexBank, se está modificando una propiedad directamente en el elemento
      newDatos[index][parametro] = element.target.value;
    }
    setCarteraBancaria(newDatos);
  };

  const handleConfirmChanges = (index) => {
    const token = localStorage.getItem("token");
    const buscado = CarteraBancaria[index];
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
    <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} mt={2} mb={5} gap={4} w="full">
      {CarteraBancaria ? (
        CarteraBancaria.map((e, index) => (
          <GridItem w="full" key={index}>
            <Card variant="elevated" shadow="xl">
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
                <Divider mt={4} mb={4} />
                <Tabs variant="soft-rounded" colorScheme="orange">
                  <TabList justifyContent="center" flexWrap="wrap">
                    {e.banks &&
                      e.banks.map((bank, indexBank) => (
                        <Tab key={indexBank}>{bank.beneficiaryBank}</Tab>
                      ))}
                  </TabList>
                  <TabPanels>
                    {e.banks &&
                      e.banks.map((bank, indexBank) => (
                        <TabPanel w="100%" key={indexBank}>
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
                            <Input
                              variant="filled"
                              defaultValue={bank.swiftCode}
                              onChange={(element) =>
                                handleInputChange(
                                  element,
                                  index,
                                  "swiftCode",
                                  indexBank
                                )
                              }
                            />
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
                            <Grid
                              maxWidth="100%"
                              templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}                              gap={4}
                              mt={2}
                              rowGap="2"
                              border="2px"
                              borderStyle="dashed"
                              borderColor="blue.100"
                              p={1}
                              borderRadius="lg"
                            >
                              <GridItem>
                                <VStack>
                                  <Text as="b">Comisiones Pagos</Text>
                                  <InputPersonalizado
                                    label="Fijo (USD)"
                                    defaultValue={bank.fijo}
                                    onChange={(element) =>
                                      handleInputChange(
                                        element,
                                        index,
                                        "fijo",
                                        indexBank
                                      )
                                    }
                                  />
                                  <InputPersonalizado
                                    label="Porcentaje (%)"
                                    defaultValue={bank.porcentaje}
                                    onChange={(element) =>
                                      handleInputChange(
                                        element,
                                        index,
                                        "porcentaje",
                                        indexBank
                                      )
                                    }
                                  />
                                  <InputPersonalizado
                                    label="Minimo (USD)"
                                    defaultValue={bank.minimo}
                                    onChange={(element) =>
                                      handleInputChange(
                                        element,
                                        index,
                                        "minimo",
                                        indexBank
                                      )
                                    }
                                  />
                                </VStack>
                              </GridItem>
                              <GridItem>
                                <VStack>
                                  <Text as="b">Comisiones Cobranza</Text>
                                  <InputPersonalizado
                                    label="Fijo (USD)"
                                    defaultValue={bank.fijoCobranza}
                                    onChange={(element) =>
                                      handleInputChange(
                                        element,
                                        index,
                                        "fijoCobranza",
                                        indexBank
                                      )
                                    }
                                  />
                                  <InputPersonalizado
                                    label="Porcentaje (%)"
                                    defaultValue={bank.porcentajeCobranza}
                                    onChange={(element) =>
                                      handleInputChange(
                                        element,
                                        index,
                                        "porcentajeCobranza",
                                        indexBank
                                      )
                                    }
                                  />
                                  <InputPersonalizado
                                    label="Minimo (USD)"
                                    defaultValue={bank.minimoCobranza}
                                    onChange={(element) =>
                                      handleInputChange(
                                        element,
                                        index,
                                        "minimoCobranza",
                                        indexBank
                                      )
                                    }
                                  />
                                </VStack>
                              </GridItem>
                            </Grid>
                          </Stack>
                        </TabPanel>
                      ))}
                  </TabPanels>
                </Tabs>
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
          </GridItem>
        ))
      ) : (
        <Center>
          <Loadder />
        </Center>
      )}
    </Grid>
  );
};
