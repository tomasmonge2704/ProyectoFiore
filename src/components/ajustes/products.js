import {
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  IconButton,
  Input,
  Card,
  CardBody,
  Flex,
  InputGroup,
  InputLeftElement,
  Text
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import Pagination from "@choc-ui/paginator";
import { DeleteIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { FiSave } from "react-icons/fi";
export const AjustesProductos = ({ CarteraProducts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(60);
  const [searchResults, setSearchResults] = useState(CarteraProducts);
  const [itemsToDisplay, setItemsToDisplay] = useState(CarteraProducts);
  const [searchText, setSearchText] = useState("");
  const itemsPerPage = 7;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    setCurrentPage(1); // Reset current page when search results change
  };
  const endIndex = startIndex + itemsPerPage;
  const handleChangeInput = (event, id, parameter) => {
    const updatedProductos = itemsToDisplay.map((producto) => {
      if (producto.id === id) {
        return { ...producto, modified: true };
      }
      return producto;
    });
    setItemsToDisplay(updatedProductos);
  };
  useEffect(() => {
    if(searchText){
      setSearchResults(
        CarteraProducts.filter((product) =>
          product.description.toLowerCase().includes(searchText.toLowerCase())
        )
      );
      setItemsToDisplay(searchResults.slice(startIndex, endIndex));
      setTotalPages(searchResults.length * 2 - 10);
    }else{
      setItemsToDisplay(CarteraProducts.slice(startIndex, endIndex))
    }
    
  }, [currentPage, searchText]);
  return (
    <Card w="100%" mt={5} variant="elevated">
      <CardBody>
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
        {itemsToDisplay.length > 0 ? (
          <TableContainer w="100%">
            <Table variant="striped" colorScheme="orange">
              <Thead>
                <Tr>
                  <Th>FAMILY</Th>
                  <Th>FAMILY 2</Th>
                  <Th w="40%">DESCRIPCION</Th>
                  <Th>ACTIONS</Th>
                </Tr>
              </Thead>
              <Tbody>
                {itemsToDisplay.map((e, index) => (
                  <Tr key={index}>
                    <Td>
                      <Input
                        variant="filled"
                        defaultValue={e.family ? e.family : ""}
                        onChange={(event) =>
                          handleChangeInput(event, e.id, "quantity")
                        }
                      />
                    </Td>
                    <Td>
                      <Input
                        variant="filled"
                        defaultValue={e.famili2 ? e.famili2 : ""}
                        onChange={(event) =>
                          handleChangeInput(event, e.id, "packing")
                        }
                      />
                    </Td>
                    <Td>
                      <Input
                        variant="filled"
                        defaultValue={e.description ? e.description : ""}
                        onChange={(event) =>
                          handleChangeInput(event, e.id, "packing")
                        }
                      />
                    </Td>
                    <Td>
                        {e.modified ? (
                          <IconButton
                            colorScheme="blue"
                            variant="solid"
                            icon={<FiSave />}
                            aria-label="save"
                          />
                        ) :  (
                        <IconButton
                          colorScheme="red"
                          variant="solid"
                          icon={<DeleteIcon />}
                          aria-label="Delete"
                        />)}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        ) : (
          <Text mt={10}>No se han encontrado Resultados.</Text>
        )}
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
      </CardBody>
    </Card>
  );
};
