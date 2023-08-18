import { TablePagination } from "@/utils/tablePagination";
import { DeleteIcon } from "@chakra-ui/icons";
import { FiSave } from "react-icons/fi";
import { Tr, Td, IconButton, Input,Tbody } from "@chakra-ui/react";
export const AjustesProductos = ({ CarteraProducts }) => {
  const params = ["FAMILY", "FAMILY 2", "DESCRIPCION", "ACTIONS"];
  const Estructura = (itemsToDisplay,setItemsToDisplay) => {
    const handleChangeInput = (event, id, parameter) => {
      const updatedProductos = itemsToDisplay.map((producto) => {
        if (producto.id === id) {
          return { ...producto, modified: true };
        }
        return producto;
      });
      setItemsToDisplay(updatedProductos);
    };
    return  (
      <Tbody>
        {itemsToDisplay.map((e) => (
      <Tr key={e.id}>
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
      data={CarteraProducts}
      params={params}
      Estructura={Estructura}
    />
  );
};
