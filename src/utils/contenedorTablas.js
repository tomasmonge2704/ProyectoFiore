import { GridCards } from "./gridCards";
import { TablePagination } from "./tablePagination";
import {
  Box,
  Flex,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { EditModal } from "./editModal";
import { countries } from "./countries";
import { FiGrid, FiList } from "react-icons/fi";
import { ErrorMessage } from "./mensajeError";
export const ContenedorTablas = ({
  variant,
  data,
  params,
  url,
  modalTitle,
  hasCountries,
}) => {
  const [type, setType] = useState(variant);
  const [searchText, setSearchText] = useState("");
  const [itemsToDisplay, setItemsToDisplay] = useState(data);
  const [selectedCard, setSelectedCard] = useState(undefined);
  const [response, setResponse] = useState(undefined);
  useEffect(() => {
    setItemsToDisplay(data);
  }, [data]);
  useEffect(() => {
    if (data) {
      setItemsToDisplay(
        data.filter((product) =>
          Object.values(product).some(
            (param) =>
              typeof param === "string" &&
              param.toLowerCase().includes(searchText.toLowerCase())
          )
        )
      );
    }
  }, [searchText]);
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  const handleCreate = (element) => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.API_URL}/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(element),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          setResponse({
            status: "error",
            message: data.error,
          });
        } else {
          setItemsToDisplay([data, ...itemsToDisplay]);
          setResponse({
            status: "success",
            message: `Se creo con exito ${data[params[0].param]}`,
          });
        }
      });
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
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          setResponse({
            status: "error",
            message: data.error,
          });
        } else {
          const newArray = itemsToDisplay.map((existingElement) => {
            if (existingElement._id === data._id) return data;
            return existingElement;
          });
          setItemsToDisplay(newArray);
          setResponse({
            status: "success",
            message: `Se actualizó con éxito (${data[params[0].param]})!`,
          });
        }
      });
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleOpenModal = (element) => {
    setSelectedCard(element);
    setResponse(undefined);
    onOpen();
  };
  return (
    <>
      {itemsToDisplay?.error ? (
        <ErrorMessage message={itemsToDisplay.error} />
      ) : (
        <Box
          w="100%"
          boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
          p="6"
          rounded="md"
          minH="96vh"
        >
          <EditModal
            response={response}
            countries={hasCountries && countries}
            title={modalTitle}
            onSave={selectedCard ? handleUpdate : handleCreate}
            params={params}
            onClose={onClose}
            isOpen={isOpen}
            element={selectedCard}
          />
          <Flex justify="space-evenly" flexWrap="wrap" rowGap={5}>
            <InputGroup width={["100%", "70%"]}>
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
            <Button
              colorScheme="orange"
              onClick={() => handleOpenModal(undefined)}
            >
              Nuevo elemento
            </Button>
            <IconButton
              onClick={() =>
                type == "grid" ? setType("table") : setType("grid")
              }
              icon={type == "grid" ? <FiGrid /> : <FiList />}
            />
          </Flex>
          {type == "grid" && (
            <GridCards
              data={itemsToDisplay}
              params={params}
              handleOpenModal={handleOpenModal}
            />
          )}
          {type == "table" && (
            <TablePagination
              data={itemsToDisplay}
              params={params}
              handleOpenModal={handleOpenModal}
            />
          )}
        </Box>
      )}
    </>
  );
};
