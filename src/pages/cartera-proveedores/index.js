import { TablePagination } from "@/utils/tablePagination";
import { DeleteIcon } from "@chakra-ui/icons";
import { FiSave } from "react-icons/fi";
import { Tr, Td, IconButton, Input, Tbody,Center,Spinner, VStack,Text } from "@chakra-ui/react";
import { useEffect,useState } from "react";
export default function Proveedores () {
  const params = ["Company Name", "Address Line 1", "Address Line 2", "Country","Tax ID","ACTIONS"];
  const [CarteraProveedores, setCarteraProveedores] = useState(undefined);
  const [loadData, setLoadData] = useState(false);
  useEffect(() => {
    fetch(`${process.env.API_URL}/cartera-proveedores`)
      .then((response) => response.json())
      .then((data) => {
        setCarteraProveedores(data);
        setLoadData(true);
      });
  }, []);
  const Estructura = (itemsToDisplay, setItemsToDisplay) => {
    const handleChangeInput = (event, id, parameter) => {
      const updatedProductos = itemsToDisplay.map((producto) => {
        if (producto.id === id) {
          return { ...producto, modified: true };
        }
        return producto;
      });
      setItemsToDisplay(updatedProductos);
    };
    return (
      <Tbody>
        {itemsToDisplay.map((e) => (
          <Tr key={e.id}>
            <Td>
              <Input
                variant="filled"
                defaultValue={e.nombre ? e.nombre : ""}
                onChange={(event) => handleChangeInput(event, e.id, "nombre")}
              />
            </Td>
            <Td>
              <Input
                variant="filled"
                defaultValue={e.direccion ? e.direccion : ""}
                onChange={(event) => handleChangeInput(event, e.id, "direccion")}
              />
            </Td>
            <Td>
              <Input
                variant="filled"
                defaultValue={e.direccion2 ? e.direccion2 : ""}
                onChange={(event) => handleChangeInput(event, e.id, "direccion2")}
              />
            </Td>
            <Td>
              <Input
                variant="filled"
                defaultValue={e.country ? e.country : ""}
                onChange={(event) => handleChangeInput(event, e.id, "country")}
              />
            </Td>
            <Td>
              <Input
                variant="filled"
                defaultValue={e.taxId ? e.taxId : ""}
                onChange={(event) => handleChangeInput(event, e.id, "taxId")}
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
              ) : (
                <IconButton
                  colorScheme="red"
                  variant="solid"
                  icon={<DeleteIcon />}
                  aria-label="Delete"
                />
              )}
            </Td>
          </Tr>
        ))}
      </Tbody>
    );
  };
  return (
    <VStack alignItems="flex-start">
      <Text as='b' fontSize='5xl'>SHIPPERS</Text>
      {loadData ? (
        <TablePagination
          data={CarteraProveedores}
          params={params}
          Estructura={Estructura}
        />
      ) : (
        <Center h="80vh">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Center>
      )}
    </VStack>
  );
};
