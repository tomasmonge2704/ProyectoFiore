import {
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Center,
  IconButton,
  Input,
} from "@chakra-ui/react";
import { convertirAMoneda } from "@/utils/convertInt";
import { useMemo, useState } from "react";
import { DeleteIcon, PlusSquareIcon } from "@chakra-ui/icons";
export default function SaleTable({productos, setProductos}) {
  const lessAdvancePayment = 0;
  const [pendingBalance, setPendingBalance] = useState(0);

  useMemo(() => {
    let balance = 0;
    for (let i = 0; i < productos.length; i++) {
      balance = balance + productos[i].unitPriceSale * productos[i].quantity;
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
        if(type == "Sale"){
          return {
            ...producto,
            unitPriceSale: parseFloat(event.target.value),
            amountSale:producto.quantity * parseFloat(event.target.value)
          };
        }
        if(type == "Quantity"){
          return {
            ...producto,
            quantity: parseFloat(event.target.value),
            amountSale: parseFloat(event.target.value) * producto.unitPriceSale
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
      <Table variant="striped" colorScheme='orange'>
        <Thead>
          <Tr>
            <Th>Description</Th>
            <Th>Net Weight</Th>
            <Th isNumeric>Unit price</Th>
            <Th isNumeric>Amount</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {productos.map((e, index) => (
            <Tr key={index}>
              <Td>
                <Input
                  value={e.description ? e.description : ""}
                  variant="filled"
                  onChange={(event) => handleChangeInput(event, e.id,"Desc")}
                />
              </Td>
              <Td>
                <Input
                  value={e.netWeight ? e.netWeight : ""}
                  variant="filled"
                  onChange={(event) => handleChangeInput(event, e.id,"")}
                />{" "}
                MT
              </Td>
              <Td isNumeric>
                ${" "}
                <Input
                  value={e.unitPriceSale ? e.unitPriceSale : ""}
                  variant="filled"
                  type="number"
                  onChange={(event) => handleChangeInput(event, e.id,"Sale")}
                />
              </Td>
              <Td isNumeric>
              $ {e.amountSale || 0}
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
          <Tr>
            <Th></Th>
            <Th></Th>
            <Th isNumeric>LESS ADVANCE PAYMENT 3/2/23</Th>
            <Th isNumeric>-{convertirAMoneda(lessAdvancePayment)}</Th>
            <Th></Th>
          </Tr>
        </Tbody>
        <Tfoot>
          <Tr>
            <Th></Th>
            <Th></Th>
            <Th isNumeric>PENDING BALANCE</Th>
            <Th isNumeric>{convertirAMoneda(pendingBalance)}</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
}
