import {
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Input,
  Box,
  Flex,
  InputGroup,
  InputLeftElement,
  Text,
  Button,
  Td,
  IconButton,
  Tbody,
  useToast,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { FiSave } from "react-icons/fi";
import { useEffect, useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import Pagination from "@choc-ui/paginator";

export const TablePagination = ({ data, params,url }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [searchResults, setSearchResults] = useState([]);
  const [itemsToDisplay, setItemsToDisplay] = useState([]);
  const [searchText, setSearchText] = useState("");
  const itemsPerPage = 6;
  const toast = useToast();
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    setCurrentPage(1);
  };
  let startIndex = (currentPage - 1) * itemsPerPage;
  let endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    setTotalPages((data.length * 10) / itemsPerPage);
  }, [data]);
  useEffect(() => {
    if (searchText) {
      setSearchResults(
        data.filter((product) =>
          Object.values(product).some(
            (param) =>
              typeof param === "string" &&
              param.toLowerCase().includes(searchText.toLowerCase())
          )
        )
      );
      setTotalPages(Math.ceil((searchResults.length * 10) / itemsPerPage));
      setItemsToDisplay(searchResults.slice(startIndex, endIndex));
    } else {
      setItemsToDisplay(data.slice(startIndex, endIndex));
    }
  }, [currentPage, searchText]);
  const handleCreate = () => {
    setItemsToDisplay([
      ...itemsToDisplay.slice(startIndex, endIndex - 1),
      { _id: Math.random() * 100, state: "nuevo" },
    ]);
  };
  const token = localStorage.getItem("token");
  const handleChangeInput = (event, id, parameter) => {
    const updatedProductos = itemsToDisplay.map((producto) => {
      if (producto._id === id) {
        return {
          ...producto,
          modified: true,
          [parameter]: event.target.value,
        };
      }
      return producto;
    });
    setItemsToDisplay(updatedProductos);
  };
  const handleDelete = (id) => {
    fetch(`${process.env.API_URL}/${url}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        toast({
          title: "Cliente",
          description: `Se ha borrado correctamente.`,
          status: "success",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
      })
      .finally(() => {
        const filtered = itemsToDisplay.filter((e) => e._id !== id);
        setItemsToDisplay(filtered);
      });
  };
  const handleUpdate = (id) => {
    const buscado = itemsToDisplay.find((element) => element._id === id);
    fetch(`${process.env.API_URL}/${url}/${id}`, {
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
        // Realizar tareas finales aquí, como limpiar estados o ejecutar acciones después de la solicitud
      });
  };
  return (
    <Box w="100%" boxShadow="2xl" p="6" rounded="md">
      <Flex justify="space-between">
        <InputGroup w="87%">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            type="text"
            variant="filled"
            placeholder="Buscar..."
            value={searchText}
            onChange={handleSearchChange}
            borderRadius="full"
          />
        </InputGroup>
        <Button w="12%" colorScheme="orange" onClick={handleCreate}>
          Nuevo elemento
        </Button>
      </Flex>
      {itemsToDisplay.length > 0 ? (
        <TableContainer w="100%">
          <Table variant="striped" colorScheme="orange">
            <Thead>
              <Tr>
                {params.map((e, index) => (
                  <Th w={e.label == "DESCRIPCION" && "50%"} key={index}>
                    {e.label}
                  </Th>
                ))}
                <Th>ACTIONS</Th>
              </Tr>
            </Thead>
            <Tbody>
              {itemsToDisplay.map((e) => (
                <Tr key={e._id}>
                  {params.map((param, index) => (
                    <Td key={index}>
                      <Input
                        variant="filled"
                        defaultValue={e[param.param] ? e[param.param] : ""}
                        onChange={(event) =>
                          handleChangeInput(event, e._id, param.param)
                        }
                      />
                    </Td>
                  ))}
                  <Td>
                    {e.modified ? (
                      <IconButton
                        colorScheme="blue"
                        variant="solid"
                        icon={<FiSave />}
                        aria-label="save"
                        onClick={() => handleUpdate(e._id)}
                      />
                    ) : (
                      <IconButton
                        colorScheme="red"
                        variant="solid"
                        icon={<DeleteIcon />}
                        aria-label="Delete"
                        onClick={() => handleDelete(e._id)}
                      />
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Text mt={10}>No se han encontrado Resultados.</Text>
      )}
      {itemsToDisplay.length > 0 && (
        <Flex w="full" p={50} alignItems="center" justifyContent="center">
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
        </Flex>
      )}
    </Box>
  );
};
