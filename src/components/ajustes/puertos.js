import { TablePagination } from "@/utils/tablePagination";
import { DeleteIcon } from "@chakra-ui/icons";
import { FiSave } from "react-icons/fi";
import { Tr, Td, IconButton, Input, Tbody } from "@chakra-ui/react";
export const Puertos = ({ CarteraPuertos }) => {
  const params = ["PORT", "COUNTRY", "ACTIONS"];
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
          <Tr key={e.port}>
            <Td>
              <Input
                variant="filled"
                value={e.port ? e.port : ""}
                onChange={(event) => handleChangeInput(event, e.id, "quantity")}
              />
            </Td>
            <Td>
              <Input
                variant="filled"
                defaultValue={e.country && e.country}
                onChange={(event) => handleChangeInput(event, e.id, "packing")}
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
    <TablePagination
      data={CarteraPuertos}
      params={params}
      Estructura={Estructura}
    />
  );
};
