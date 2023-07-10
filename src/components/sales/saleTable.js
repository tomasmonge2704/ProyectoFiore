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
export default function SaleTable() {
  const [productos, setProductos] = useState([
    {
      id: "sdnkhqe12123142",
      description: "FROZEN BEEF LIVERS",
      netWeight: 27.0,
      unitPrice: 850,
      amount: 22950,
    },
  ]);

  const lessAdvancePayment = 6885;
  const [pendingBalance, setPendingBalance] = useState(0);

  useMemo(() => {
    let balance = 0;
    for (let i = 0; i < productos.length; i++) {
      balance = balance + productos[i].amount;
    }
    setPendingBalance(balance - lessAdvancePayment);
  }, [productos]);

  const handleNewRow = (id) => {
    const updatedProductos = [...productos, { id: id, amount: 0 }];
    setProductos(updatedProductos);
  };

  const handleChangeAmount = (event, id) => {
    const amount = event.target.value;
    const updatedProductos = productos.map((producto) => {
      if (producto.id === id) {
        return {
          ...producto,
          amount: parseFloat(amount),
        };
      }
      return producto;
    });
    setProductos(updatedProductos);
  };

  const handleChangeUnitPrice = (event, id) => {
    const unitPrice = event.target.value;
    const updatedProductos = productos.map((producto) => {
      if (producto.id === id) {
        return {
          ...producto,
          unitPrice: parseFloat(unitPrice),
        };
      }
      return producto;
    });
    setProductos(updatedProductos);
  };

  const handleDeleteRow = (id) => {
    const updatedProductos = productos.filter((e) => e.id !== id);
    setProductos(updatedProductos);
  };

  return (
    <TableContainer w="100%">
      <Table variant="striped" colorScheme="teal">
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
                  defaultValue={e.description && e.description}
                  variant="filled"
                />
              </Td>
              <Td>
                <Input
                  defaultValue={e.netWeight && e.netWeight}
                  variant="filled"
                />{" "}
                MT
              </Td>
              <Td isNumeric>
                ${" "}
                <Input
                  defaultValue={e.unitPrice && e.unitPrice}
                  variant="filled"
                  type="number"
                  onChange={(event) => handleChangeUnitPrice(event, e.id)}
                />
              </Td>
              <Td isNumeric>
                ${" "}
                <Input
                  defaultValue={e.unitPrice && e.amount}
                  variant="filled"
                  type="number"
                  onChange={(event) => handleChangeAmount(event, e.id)}
                />
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
