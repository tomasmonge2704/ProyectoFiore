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
import { CarteraPuertosContext } from "@/components/context/carterasContext";
import { CarteraPaymentTermsContext } from "@/components/context/carterasContext";
export default function Ajustes() {
  const { CarteraBancaria } = useContext(CarteraBancariaContext);
  const { CarteraPuertos } = useContext(CarteraPuertosContext);
  const { CarteraPaymentTerms } = useContext(CarteraPaymentTermsContext);
  const [dirtyIndexes, setDirtyIndexes] = useState([]);
  const [updatedCarteraBancaria, setUpdatedCarteraBancaria] =
    useState(CarteraBancaria);

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
      <Flex justify="space-evenly" mt={10} mb={10}>
        {CarteraBancaria &&
          CarteraBancaria.map((e, index) => (
            <Card
              maxW="300px"
              key={index}
              variant="filled"
              backgroundColor={
                e.empresa == "Duplo" ? "orange.200" : "orange.300"
              }
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
      <Divider />
      <Center mt={10}>
        <Heading>Cartera de Puertos</Heading>
      </Center>
      <Flex justify="space-evenly" mt={10} mb={10}>
        {CarteraPuertos &&
          CarteraPuertos.map((e, index) => (
            <Card
              maxW="300px"
              key={index}
              variant="filled"
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
      <Divider />
      <Center mt={10}>
        <Heading>Cartera de Payment Terms</Heading>
      </Center>
      <Flex justify="space-evenly" mt={10} mb={10}>
        {CarteraPaymentTerms &&
          CarteraPaymentTerms.map((e, index) => (
            <Card
              minW="40%"
              key={index}
              variant="filled"
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
    </Layout>
  );
}
