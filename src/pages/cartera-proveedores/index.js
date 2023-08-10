import React, { useState, useContext, useEffect } from "react";
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
import { CarteraProveedoresContext } from "@/components/context/carterasContext";
export default function CarteraProveedores() {
  const [searchText, setSearchText] = useState("");
  const { CarteraProveedores } = useContext(CarteraProveedoresContext);
  const [itemsToDisplay, setItemsToDisplay] = useState(CarteraProveedores);
  const [searchResults, setSearchResults] = useState(CarteraProveedores);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(CarteraProveedores.length * 3);
  const itemsPerPage = 4;
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    setCurrentPage(1); // Reset current page when search results change
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  useEffect(() => {
    setSearchResults(
      CarteraProveedores.filter((cliente) =>
        cliente.nombre.toLowerCase().includes(searchText.toLowerCase())
      )
    );
    if(searchText && searchResults.length > 4){
      setItemsToDisplay(searchResults.slice(startIndex, endIndex));
      setTotalPages(searchResults.length * 3);
    } 
    if(searchText && searchResults.length <= 4){
      setItemsToDisplay(searchResults);
      setTotalPages(1);
    } 
    if(searchText == ""){
      setItemsToDisplay(CarteraProveedores.slice(startIndex, endIndex));
      setTotalPages(CarteraProveedores.length * 3);
    } 
  }, [searchResults, currentPage]);
  const handleInputChange = () => {
    
  }

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
                backgroundColor="cyan.400"
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
                      defaultValue={e.taxId}
                      onChange={(value) =>
                        handleInputChange(value, index, "taxId")
                      }
                    />
                     <Text as="b">Plant No.</Text>
                    <Input
                      variant="filled"
                      defaultValue={e.plantNumber}
                      onChange={(value) =>
                        handleInputChange(value, index, "plantNumber")
                      }
                    />
                    <Text as="b">Brand</Text>
                    <Input
                      variant="filled"
                      defaultValue={e.brand}
                      onChange={(value) =>
                        handleInputChange(value, index, "brand")
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