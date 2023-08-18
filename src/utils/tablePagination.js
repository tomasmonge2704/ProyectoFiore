import {
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Input,
  Card,
  CardBody,
  Flex,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import Pagination from "@choc-ui/paginator";

export const TablePagination = ({data,params,Estructura}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);
    const [searchResults, setSearchResults] = useState([]);
    const [itemsToDisplay, setItemsToDisplay] = useState([]);
    const [searchText, setSearchText] = useState("");
    const itemsPerPage = 6;
    const handleSearchChange = (event) => {
      setSearchText(event.target.value);
      setCurrentPage(1);
    };
    let startIndex = (currentPage - 1) * itemsPerPage;
    let endIndex = startIndex + itemsPerPage;
   
    useEffect(() => {
        setTotalPages(data.length * 10 / itemsPerPage)
    },[data])
    useEffect(() => {
        if (searchText) {
          setSearchResults(
            data.filter((product) =>
              Object.values(product).some((param) =>
                typeof param === 'string' && param.toLowerCase().includes(searchText.toLowerCase())
              )
            )
          );
          setTotalPages(Math.ceil(searchResults.length * 10 / itemsPerPage));
          setItemsToDisplay(searchResults.slice(startIndex, endIndex));
        } else {
          setItemsToDisplay(data.slice(startIndex, endIndex));
        }
      }, [currentPage, searchText]);
  return (
    <Card w="100%" mt={5} variant="unstyled">
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
                  {params.map((e,index) => (
                    <Th w={e == "DESCRIPCION" && "50%"} key={index}>{e}</Th>
                  ))}
                </Tr>
              </Thead>
              {Estructura(itemsToDisplay,setItemsToDisplay)}
            </Table>
          </TableContainer>
        ) : (
          <Text mt={10}>No se han encontrado Resultados.</Text>
        )}
        {data.length > 6 && <Flex w="full" p={50} alignItems="center" justifyContent="center">
          <Pagination
            current={currentPage}
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
        </Flex>}
      </CardBody>
    </Card>
  );
};
