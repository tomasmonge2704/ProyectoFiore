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
export default function TablaGeneral({ productos, setProductos,comision }) {
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

  const handleChangeUnitPrice = (event, id,type) => {
    const unitPrice = event.target.value;
    const updatedProductos = productos.map((producto) => {
      if (producto.id === id) {
        if(type == "Purchase"){
          return {
            ...producto,
            unitPricePurchase: parseFloat(unitPrice),
          };
        }
        if(type == "Sale"){
          return {
            ...producto,
            unitPriceSale: parseFloat(unitPrice),
          };
        }
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
      <Table variant="striped" colorScheme="orange">
        <Thead>
          <Tr>
            <Th>QUANTITY</Th>
            <Th>PRODUCT</Th>
            <Th>PACKING</Th>
            <Th>UNIT PRICE PURCHASE</Th>
            <Th>UNIT PRICE SALE</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {productos.map((e, index) => (
            <Tr key={index}>
              <Td>
                <InputPersonalizado
                  label="MT"
                  value={e.quantity ? e.quantity : ""}
                />
              </Td>
              <Td>
                <Input
                  variant="filled"
                  value={e.description ? e.description : ""}
                />
              </Td>
              <Td>
                <InputPersonalizado
                  defaultValue={e.packing && e.packing}
                  type="number"
                  label="KGS"
                  onChange={(event) => handleChangePacking(event, e.id)}
                />
              </Td>
              <Td>
                <InputPersonalizado
                  value={e.unitPricePurchase ? e.unitPricePurchase : ""}
                  label="$"
                  type="number"
                  onChange={(event) => handleChangeUnitPrice(event, e.id,"Purchase")}
                />
              </Td>
              <Td>
                <InputPersonalizado
                  defaultValue={e.unitPriceSale && e.unitPriceSale}
                  label="$"
                  type="number"
                  onChange={(event) => handleChangeUnitPrice(event, e.id,"Sale")}
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
            <Th>Incoterm</Th>
            <Th></Th>
            <Th></Th>
            <Th><InputPersonalizado label="$" type="number" /></Th>
            <Th><InputPersonalizado label="$" type="number" /></Th>
            <Th></Th>
          </Tr>
          <Tr>
            <Th>Payment Terms</Th>
            <Th></Th>
            <Th></Th>
            <Th><InputPersonalizado label="$" type="number" /></Th>
            <Th><InputPersonalizado label="$" type="number" /></Th>
            <Th></Th>
          </Tr>
          {comision && 
          <Tr>
          <Th>Comision</Th>
          <Th></Th>
          <Th></Th>
          <Th isNumeric></Th>
          <Th isNumeric>{convertirAMoneda(comision)}</Th>
        </Tr>
          }
          <Tr>
            <Th>Total</Th>
            <Th></Th>
            <Th></Th>
            <Th isNumeric></Th>
            <Th isNumeric>{convertirAMoneda(pendingBalance)}</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
}
