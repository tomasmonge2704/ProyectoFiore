import React, { useState, useEffect } from "react";
import {
  Card,
  Text,
  Stack,
  CardHeader,
  Heading,
  CardBody,
  Center,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import Pagination from "@choc-ui/paginator";
export default function CarteraClientes() {
  useEffect(() => {
    fetch(`${process.env.API_URL}/cartera-clientes`)
      .then((response) => response.json())
      .then((data) => {
        setCarteraClientes(data);
        setLoadData(true)
      });
  },[]);
  const [loadData, setLoadData] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [CarteraClientes, setCarteraClientes] = useState([]);
  const [itemsToDisplay, setItemsToDisplay] = useState(CarteraClientes);
  const [searchResults, setSearchResults] = useState(CarteraClientes);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(CarteraClientes.length * 3);
  const itemsPerPage = 4;
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    setCurrentPage(1); // Reset current page when search results change
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  useEffect(() => {
    setSearchResults(
      CarteraClientes.filter((cliente) =>
        cliente.nombre.toLowerCase().includes(searchText.toLowerCase())
      )
    );
    if (searchText && searchResults.length > 4) {
      setItemsToDisplay(searchResults.slice(startIndex, endIndex));
      setTotalPages(searchResults.length * 3);
    }
    if (searchText && searchResults.length <= 4) {
      setItemsToDisplay(searchResults);
      setTotalPages(1);
    }
    if (searchText == "") {
      setItemsToDisplay(CarteraClientes.slice(startIndex, endIndex));
      setTotalPages(CarteraClientes.length * 3);
    }
  }, [loadData,searchText, currentPage]);
  const handleInputChange = () => {};

  return (
    <>
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
      {searchResults.length >= 1 ? (
        <>
          <Flex justify="space-evenly" mt={10} mb={10}>
            {itemsToDisplay.map((e, index) => (
              <Card
                maxW="300px"
                key={index}
                variant="elevated"
                backgroundColor="orange.300"
              >
                <CardHeader>
                  <Center>
                    <Heading size="md">{e.nombre}</Heading>
                  </Center>
                </CardHeader>
                <CardBody>
                  <Stack spacing="2">
                    <Text as="b">Address Line</Text>
                    <Input
                      variant="filled"
                      defaultValue={e.direccion}
                      onChange={(value) =>
                        handleInputChange(value, index, "direccion")
                      }
                    />
                    <Text as="b">Address Line 2</Text>
                    <Input
                      variant="filled"
                      defaultValue={e.direccion2}
                      onChange={(value) =>
                        handleInputChange(value, index, "direccion2")
                      }
                    />
                    <Text as="b">Country</Text>
                    <Input
                      variant="filled"
                      defaultValue={e.country}
                      onChange={(value) =>
                        handleInputChange(value, index, "country")
                      }
                    />
                    <Text as="b">Tax Id</Text>
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
          </Flex>
          <Flex w="full" p={50} alignItems="center" justifyContent="center">
            <Pagination
              defaultCurrent={currentPage}
              onChange={(page) => setCurrentPage(page)}
              total={totalPages}
              paginationProps={{
                display: "flex",
              }}
              activeStyles={{
                bg: "orange.400",
              }}
              hoverStyles={{
                bg: "cyan.300",
              }}
            />
          </Flex>
        </>
      ) : (
        <Text mt={10}>No se han encontrado Resultados.</Text>
      )}
    </>
  );
}
