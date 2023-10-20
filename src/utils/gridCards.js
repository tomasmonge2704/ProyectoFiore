import {
  Text,
  Skeleton,
  Card,
  Heading,
  CardBody,
  Box,
  Flex,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  Avatar,
  useDisclosure,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { EditModal } from "./editModal";
import { countries } from "./countries";
export const GridCards = ({ data, params, url }) => {
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
  const handleCreate = () => {
    setItemsToDisplay([{}, ...itemsToDisplay]);
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
      .then((data) => {
        const newArray = itemsToDisplay.map((existingElement) => {
          if (existingElement._id === data._id)return data;
          return existingElement;
        });
        setItemsToDisplay(newArray);    
        setResponse({status:"success",message:`Se actualizo con exito (${data.nombre})!`})
      })
      .catch((error) => {
        setResponse({status:"error",message:"Ocurrio un error en la actualizacion"})
      });
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleOpenModal = (element) => {
    setSelectedCard(element);
    setResponse(undefined);
    onOpen();
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
        countries={countries}
        title="Edit Client"
        onSave={handleUpdate}
        params={params}
        onClose={onClose}
        isOpen={isOpen}
        element={selectedCard}
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
      <Flex w="full" justify="flex-start" mt={10} wrap="wrap" gap={5}>
        {itemsToDisplay == undefined ? (
          <>
            <Skeleton h="40" w="48" />
            <Skeleton h="40" w="48" />
            <Skeleton h="40" w="48" />
            <Skeleton h="40" w="48" />
            <Skeleton h="40" w="48" />
            <Skeleton h="40" w="48" />
          </>
        ) : (
          itemsToDisplay.map((e, index) => (
            <Card
              w="56"
              key={index}
              shadow="md"
              variant="elevated"
              _hover={{ shadow: "xl", bottom: "1", bgColor: "orange.200" }}
              bgColor="orange.100"
              onClick={() => handleOpenModal(e)}
            >
              <CardBody>
                <VStack spacing={2} textAlign="center">
                  {e.emoji ? <Text fontSize="4xl">{countries.find((country) => country.value == e.emoji).emoji}</Text> : <Avatar />}
                  <Heading size="sm">{e._id ? e.nombre.slice(0, 15) : "New CLient"}</Heading>
                  {e._id && params.slice(1,3).map((param,index) => (
                    <Text as="samp" key={index}>{e[param.param].slice(0, 15)}</Text>
                  ))}                  
                </VStack>
              </CardBody>
            </Card>
          ))
        )}
      </Flex>
    </Box>
  );
};
