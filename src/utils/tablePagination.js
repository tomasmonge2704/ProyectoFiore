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
  Button,
  Td,
  IconButton,
  Tbody,
  Skeleton,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import Pagination from "@choc-ui/paginator";
import { EditModal } from "./editModal";
const ObjectID = require("bson-objectid");

function generateRandomObjectId() {
  const objectId = new ObjectID();
  return objectId.toString();
}

export const TablePagination = ({ data, setData, params, url, modalTitle }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [itemsToDisplay, setItemsToDisplay] = useState([]);
  const [selected, setSelected] = useState(undefined);
  const [response, setResponse] = useState(undefined);
  const itemsPerPage = 6;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleOpenModal = (element) => {
    setSelected(element);
    onOpen();
  };
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    setCurrentPage(1);
  };
  let startIndex = (currentPage - 1) * itemsPerPage;
  let endIndex = startIndex + itemsPerPage;
  useEffect(() => {
    if (data) {
      setItemsToDisplay(data.slice(0, itemsPerPage));
      setTotalPages((data.length * 10) / itemsPerPage);
    }
  }, [data]);
  useEffect(() => {
    if (data) setItemsToDisplay(data.slice(startIndex, endIndex));
  }, [currentPage]);
  useEffect(() => {
    if (data) {
      const filteredData = data.filter((product) =>
        Object.values(product).some(
          (param) =>
            typeof param === "string" &&
            param.toLowerCase().includes(searchText.toLowerCase())
        )
      );
      setItemsToDisplay(filteredData);
      setTotalPages((filteredData.length * 10) / itemsPerPage);
    }
  }, [searchText]);
  const handleCreate = () => {
    const newElement = { _id: generateRandomObjectId() };
    setData([newElement, ...data.slice(startIndex, endIndex - 1)]);
    handleOpenModal(newElement);
  };

  const handleUpdate = (element) => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.API_URL}/${url}/${element._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(element),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        return response.json();
      })
      .then((res) => {
        const newArray = data.map((existingElement) => {
          if (existingElement._id === res._id) return res;
          return existingElement;
        });
        setData(newArray);
        setResponse({
          status: "success",
          message: `Se actualizo con exito ${res[params[0].param]}!`,
        });
      })
      .catch((error) => {
        setResponse({ status: "error", message: error });
      });
  };
  return (
    <Box
      w="100%"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      p="6"
      rounded="md"
      minH="96vh"
    >
      <EditModal
        response={response}
        title={modalTitle}
        onSave={handleUpdate}
        params={params}
        onClose={onClose}
        isOpen={isOpen}
        element={selected}
      />
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
      <TableContainer w="100%">
        <Table size="lg">
          <Thead>
            <Tr>
              {params.map((e, index) => (
                <Th w={e.label == "DESCRIPCION" && "50%"} key={index}>
                  {e.label}
                </Th>
              ))}
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {data ? (
              itemsToDisplay.length > 0 &&
              itemsToDisplay.map((e) => (
                <Tr key={e._id} w="full">
                  {params.map((param, index) => (
                    <Td key={index}>
                      <Text as="b">{e[param.param]}</Text>
                    </Td>
                  ))}
                  <Td>
                    <IconButton
                      colorScheme="orange"
                      variant="solid"
                      icon={<EditIcon />}
                      aria-label="save"
                      onClick={() => handleOpenModal(e)}
                    />
                  </Td>
                </Tr>
              ))
            ) : (
              <>
                <Tr>
                  {params.map((e, index) => (
                    <Td key={index}>
                      <Skeleton h={10} />
                    </Td>
                  ))}
                  <Td>
                    <Skeleton h={10} />
                  </Td>
                </Tr>
                <Tr>
                  {params.map((e, index) => (
                    <Td key={index}>
                      <Skeleton h={10} />
                    </Td>
                  ))}
                  <Td>
                    <Skeleton h={10} />
                  </Td>
                </Tr>
              </>
            )}
          </Tbody>
        </Table>
      </TableContainer>
      {itemsToDisplay && (
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
