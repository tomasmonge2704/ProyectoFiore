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
  export default function TablePurchase() {
    const [productos, setProductos] = useState([
      {
        id: "sdnkhqe12123142",
        description: "FROZEN BEEF LIVERS",
        packing:15,
        netWeight: 27.0,
        unitPrice: 850,
        amount: 22950,
      },
    ]);
  
    const lessAdvancePayment = 0;
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
    const handleChangePacking = (event, id) => {
        const packing = event.target.value;
        const updatedProductos = productos.map((producto) => {
          if (producto.id === id) {
            return {
              ...producto,
              packing: parseFloat(packing),
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
        <Table variant="striped" colorScheme='orange'>
          <Thead>
            <Tr>
              <Th>QUANTITY</Th>
              <Th>PRODUCT</Th>
              <Th isNumeric>PACKING</Th>
              <Th isNumeric>UNIT PRICE</Th>
              <Th isNumeric>TOTAL AMOUNT</Th>
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
                  <Input
                    defaultValue={e.packing && e.packing}
                    variant="filled"
                    type="number"
                    onChange={(event) => handleChangePacking(event, e.id)}
                  />
                  KGS{" "}
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
                    defaultValue={e.amount && e.amount}
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