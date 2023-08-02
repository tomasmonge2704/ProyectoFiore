import Layout from "@/components/Layouts/main";
import React, { useState,useContext } from "react";
import { Card,Text,Stack,CardHeader,Heading, CardBody, Center, Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { CarteraClientesContext } from "@/components/context/carterasContext";
export default function CarteraClientes() {
  const [searchText, setSearchText] = useState("");
  const {CarteraClientes} = useContext(CarteraClientesContext);
  const [searchResults, setSearchResults] = useState(CarteraClientes);
  const handleSearchChange = (event) => {
    const searchValue = event.target.value;
    setSearchText(searchValue);
    const filteredResults = CarteraClientes.filter(
        (cliente) => cliente.nombre.toLowerCase().includes(searchValue.toLowerCase())
      );    
    setSearchResults(filteredResults);
  };
  return (
    <Layout title="Cartea Clientes">
      <Center>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Buscar..."
            value={searchText}
            onChange={handleSearchChange}
            borderRadius="full"
          />
        </InputGroup>
      </Center>
      {searchResults.length >= 1 ? 
      (<Flex justify="space-evenly" mt={10} mb={10}>
        {searchResults.map((e, index) => (
            <Card
              maxW="300px"
              key={index}
              variant="filled"
              backgroundColor="green.300">
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
              </CardBody>
            </Card>
          ))}
      </Flex>):(<Text mt={10}>No se han encontrado Resultados.</Text>)}
    </Layout>
  );
}
