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
import { useMemo, useState } from "react";
import { DeleteIcon, PlusSquareIcon } from "@chakra-ui/icons";
import InputPersonalizado from "@/utils/inputPersonalizado";
export default function TablePurchase({ productos, setProductos }) {
  const lessAdvancePayment = 0;
  const [pendingBalance, setPendingBalance] = useState(0);

  useMemo(() => {
    let balance = 0;
    for (let i = 0; i < productos.length; i++) {
      balance = balance + productos[i].unitPricePurchase * productos[i].quantity;
    }
    setPendingBalance(balance - lessAdvancePayment);
  }, [productos]);

  const handleNewRow = (id) => {
    const updatedProductos = [...productos, { id: id, amount: 0 }];
    setProductos(updatedProductos);
  };
  const handleDeleteRow = (id) => {
    const updatedProductos = productos.filter((e) => e.id !== id);
    setProductos(updatedProductos);
  };

  const handleChangeInput = (event, id,type) => {
    const updatedProductos = productos.map((producto) => {
      if (producto.id === id) {
        if(type == "Purchase"){
          return {
            ...producto,
            unitPricePurchase: parseFloat(event.target.value),
            amountPurchase:producto.quantity * parseFloat(event.target.value)
          };
        }
        if(type == "Quantity"){
          return {
            ...producto,
            quantity: parseFloat(event.target.value),
            amountPurchase: parseFloat(event.target.value) * producto.unitPricePurchase,
            amountSale:parseFloat(event.target.value) * producto.unitPriceSale
          };
        }
        if(type == "Desc"){
          return {
            ...producto,
            description:event.target.value,
          };
        }
        if(type == "Packing"){
          return {
            ...producto,
            packing: parseFloat(event.target.value),
          };
        }
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
                  onChange={(event) => handleChangeInput(event, e.id,"Quantity")}
                />
              </Td>
              <Td>
                <Input
                  variant="filled"
                  value={e.description ? e.description : ""}
                  onChange={(event) => handleChangeInput(event, e.id,"Desc")}
                />
              </Td>
              <Td>
                <InputPersonalizado
                  value={e.packing ? e.packing : ""}
                  type="number"
                  label="KGS"
                  onChange={(event) => handleChangeInput(event, e.id,"Packing")}
                />
              </Td>
              <Td>
                <InputPersonalizado
                  value={e.unitPricePurchase ? e.unitPricePurchase : ""}
                  label="$"
                  type="number"
                  onChange={(event) => handleChangeInput(event, e.id,"Purchase")}
                />
              </Td>
              <Td>
                $ {e.amountPurchase || 0}
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
            <Th isNumeric>{convertirAMoneda(pendingBalance)}</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
}
