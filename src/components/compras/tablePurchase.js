import {
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  IconButton,
  Input,
} from "@chakra-ui/react";
import { convertirAMoneda } from "@/utils/convertInt";
import { DeleteIcon, PlusSquareIcon } from "@chakra-ui/icons";
import InputPersonalizado from "@/utils/inputPersonalizado";
export default function TablePurchase({ productos, setProductos,fields }) {
  const handleNewRow = (id) => {
    const updatedProductos = [...productos, { id: id, amount: 0 }];
    setProductos(updatedProductos);
  };
  const handleDeleteRow = (id) => {
    const updatedProductos = productos.filter((e) => e.id !== id);
    setProductos(updatedProductos);
  };
  const handleChangeInput = (event, id,parameter) => {
    const updatedProductos = productos.map((producto) => {
      if (producto.id === id) {
        return {...producto, [parameter]:event.target.value}
      }
      return producto;
    });
    setProductos(updatedProductos);
  };
  return (
    <TableContainer w="100%">
      <Table variant="striped" colorScheme="orange">
        <Thead>
          <Tr>
            <Th>QUANTITY</Th>
            <Th>PRODUCT</Th>
            <Th>PACKING</Th>
            <Th>UNIT PRICE</Th>
            <Th>AMOUNT</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {productos.length && productos.map((e, index) => (
            <Tr key={index}>
              <Td>
                <InputPersonalizado
                  label="MT"
                  value={e.quantity ? e.quantity : ""}
                  onChange={(event) => handleChangeInput(event, e.id,"quantity")}
                />
              </Td>
              <Td>
                <Input
                  variant="filled"
                  value={e.description ? e.description : ""}
                  onChange={(event) => handleChangeInput(event, e.id,"description")}
                />
              </Td>
              <Td>
                <InputPersonalizado
                  value={e.packing ? e.packing : ""}
                  type="number"
                  label="KGS"
                  onChange={(event) => handleChangeInput(event, e.id,"packing")}
                />
              </Td>
              <Td>
                <InputPersonalizado
                  value={e.unitPricePurchase ? e.unitPricePurchase : ""}
                  label="$"
                  type="number"
                  onChange={(event) => handleChangeInput(event, e.id,"unitPricePurchase")}
                />
              </Td>
              <Td>
                $ {e.unitPricePurchase * e.quantity || 0}
              </Td>
              <Td>
                <IconButton
                  icon={index < 1 ? <PlusSquareIcon /> : <DeleteIcon />}
                  onClick={
                    index > 0
                      ? () => handleDeleteRow(e.id)
                      : () => handleNewRow(Math.random())
                  }
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th></Th>
            <Th></Th>
            <Th></Th>
            <Th isNumeric>Total</Th>
            <Th isNumeric>{convertirAMoneda(fields.totalPurchase)}</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
}
