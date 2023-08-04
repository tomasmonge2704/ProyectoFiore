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
import { DeliveryTerms } from "./deliveryTerms";
import { DeleteIcon, PlusSquareIcon } from "@chakra-ui/icons";
import InputPersonalizado from "@/utils/inputPersonalizado";
import { PaymentTerms } from "./paymentTerms";
export default function TablaGeneral({ fields,setFields,productos, setProductos,operationType }) {
  const [pendingBalanceSale, setPendingBalanceSale] = useState(0);
  const [pendingBalancePurchase, setPendingBalancePurchase] = useState(0);
  useMemo(() => {
    let balanceSale = 0;
    let balancePurchase = 0;
    for (let i = 0; i < productos.length; i++) {
      balanceSale = balanceSale + productos[i].unitPriceSale * productos[i].quantity;
      balancePurchase = balancePurchase + productos[i].unitPricePurchase * productos[i].quantity;
    }
    setPendingBalanceSale(balanceSale);
    setPendingBalancePurchase(balancePurchase)
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
            amountPurchase: parseFloat(event.target.value) * producto.quantity
          };
        }
        if(type == "Sale"){
          return {
            ...producto,
            unitPriceSale: parseFloat(event.target.value),
            amountSale:parseFloat(event.target.value) * producto.quantity
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
                  onChange={(event) => handleChangeInput(event, e.id,"Quantity")}
                />
              </Td>
              <Td>
                <Input
                  type="text"
                  variant="filled"
                  value={e.description ? e.description : ""}
                  onChange={(event) => handleChangeInput(event, e.id,"Desc")}
                />
              </Td>
              <Td>
                <InputPersonalizado
                  defaultValue={e.packing && e.packing}
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
                <InputPersonalizado
                  defaultValue={e.unitPriceSale && e.unitPriceSale}
                  label="$"
                  type="number"
                  onChange={(event) => handleChangeInput(event, e.id,"Sale")}
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
            <Th><DeliveryTerms setFields={setFields} fields={fields} type="purchase" /></Th>
            <Th><DeliveryTerms setFields={setFields} fields={fields} type="sale"/></Th>
            <Th></Th>
          </Tr>
          <Tr>
            <Th>Payment Terms</Th>
            <Th></Th>
            <Th></Th>
            <Th><PaymentTerms fields={fields} setFields={setFields} type="purchase"/></Th>
            <Th><PaymentTerms fields={fields} setFields={setFields} type="sale"/></Th>
            <Th></Th>
          </Tr>
          {operationType == "Trading + Marketing" && 
          <Tr>
          <Th>Marketing</Th>
          <Th></Th>
          <Th></Th>
          <Th><InputPersonalizado label="$" type="number" /></Th>
          <Th></Th>
          <Th></Th>
        </Tr>
          }
          <Tr>
            <Th>Total</Th>
            <Th></Th>
            <Th></Th>
            <Th isNumeric>{convertirAMoneda(pendingBalancePurchase)}</Th>
            <Th isNumeric>{convertirAMoneda(pendingBalanceSale)}</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
}
