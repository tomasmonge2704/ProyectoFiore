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
} from "@chakra-ui/react";
import { convertirAMoneda } from "@/utils/convertInt";
import { DeliveryTerms } from "./deliveryTerms";
import { DeleteIcon } from "@chakra-ui/icons";
import { AiOutlinePlus } from "react-icons/ai";
import InputPersonalizado from "@/utils/inputPersonalizado";
import InputRightPersonalizado from "@/utils/inputRightAddon";
import { SelectPacking } from "./packing";
import { PaymentTerms } from "./paymentTerms";
import { SelectProducts } from "./products";
export default function TablaGeneral({ fields,setFields,productos, setProductos,operationType }) {
  const handleNewRow = (id) => {
    const updatedProductos = [...productos, { id: id, amount: 0 }];
    setProductos(updatedProductos);
  };
  const handleDeleteRow = (id) => {
    const updatedProductos = productos.filter((e) => e.id !== id);
    setProductos(updatedProductos);
  };
  const handleChangeInput = (event, id,parameter) => {
    console.log(event.target.value)
    const updatedProductos = productos.map((producto) => {
      if (producto.id === id) {
        return {...producto, [parameter]:Number(event.target.value)}
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
            <Th w="40%">PRODUCT</Th>
            <Th w="20%">PACKING</Th>
            <Th>UNIT PRICE PURCHASE</Th>
            <Th>UNIT PRICE SALE</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {productos.length && productos.map((e, index) => (
            <Tr key={index}>
              <Td>
                <InputRightPersonalizado
                  label="MT"
                  type="number"
                  value={e.quantity ? e.quantity : ""}
                  onChange={(event) => handleChangeInput(event, e.id,"quantity")}
                />
              </Td>
              <Td>
                <SelectProducts productos={productos} setProductos={setProductos} id={e.id} index={index} />
                </Td>
              <Td>
               <SelectPacking productos={productos} setProductos={setProductos} id={e.id} index={index} />
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
                <InputPersonalizado
                  defaultValue={e.unitPriceSale && e.unitPriceSale}
                  label="$"
                  type="number"
                  onChange={(event) => handleChangeInput(event, e.id,"unitPriceSale")}
                />
              </Td>
              <Td>
                <IconButton
                  icon={index < 1 ? <AiOutlinePlus /> : <DeleteIcon />}
                  variant="solid"
                  colorScheme={index < 1 ? "orange" : "red"}
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
           {operationType == "Broker" && 
          <Tr>
          <Th>COMISSION</Th>
          <Th></Th>
          <Th></Th>
          <Th><InputPersonalizado label="$" type="number" /></Th>
          <Th><InputPersonalizado label="$" type="number" /></Th>
          <Th></Th>
        </Tr>
          }
          <Tr>
            <Th>Total</Th>
            <Th></Th>
            <Th></Th>
            <Th isNumeric>{convertirAMoneda(fields.totalPurchase)}</Th>
            <Th isNumeric>{convertirAMoneda(fields.totalSale)}</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
}
