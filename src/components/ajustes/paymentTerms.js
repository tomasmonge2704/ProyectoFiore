import { TablePagination } from "@/utils/tablePagination";
import { DeleteIcon } from "@chakra-ui/icons";
import { FiSave } from "react-icons/fi";
import { Tr, Td, IconButton, Input,Tbody } from "@chakra-ui/react";
export const PaymentTerms = ({ CarteraPaymentTerms }) => {
  const params = ["NAME"];
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
            defaultValue={e.name ? e.name : ""}
            onChange={(event) =>
              handleChangeInput(event, e.id, "quantity")
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
      data={CarteraPaymentTerms}
      params={params}
      Estructura={Estructura}
    />
  );
};