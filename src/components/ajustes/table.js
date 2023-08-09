import {
    Input,
    Card,
    CardBody,
    Flex,
    InputGroup,
    InputLeftElement,
    Text,
    TableContainer,
  } from "@chakra-ui/react";
  import { SearchIcon } from "@chakra-ui/icons";
  import Pagination from "@choc-ui/paginator";
  import { useEffect, useState } from "react";
  
  export const TableComponent = ({ data, setData, children }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(Math.ceil(data.length / 6) || 1);
    const [searchResults, setSearchResults] = useState(data);
    const [searchText, setSearchText] = useState("");
    const itemsPerPage = 6;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
  
    const handleSearchChange = (event) => {
      setSearchText(event.target.value);
      setCurrentPage(1);
    };
  
    useEffect(() => {
      const filteredResults = data.filter((product) =>
        product.description.toLowerCase().includes(searchText.toLowerCase())
      );
      setSearchResults(filteredResults);
  
      // Update total pages
      setTotalPages(Math.ceil(filteredResults.length / itemsPerPage) || 1);
  
      // Update the data count
      setData(filteredResults.length * 2 - 10);
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
          {searchResults.length >= 1 ? (
            <TableContainer w="100%">
              {children}
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