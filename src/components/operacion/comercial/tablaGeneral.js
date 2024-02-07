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
import { DeliveryTerms } from "./deliveryTerms";
import { DeleteIcon } from "@chakra-ui/icons";
import { AiOutlinePlus } from "react-icons/ai";
import { SelectPacking } from "./packing";
import { PaymentTerms } from "./paymentTerms";
import { SelectProducts } from "./products";
export default function TablaGeneral({
  fields,
  handleChange,
  operationType,
  CarteraProducts,
  CarteraPacking,
  CarteraPaymentTerms,
}) {
  const handleNewRow = (id) => {
    const updatedProductos = [
      ...fields.productos,
      {
        id: id,
        description: "",
        packing: "",
        family:"",
        famili2:"",
        quantity: 1,
        quantityCartons: 0,
        netWeight: 0,
        netWeightLogistica:0,
        grossWeight: 0,
        unitPricePurchase: 0,
        unitPriceSale: 0,
        amountSale: "",
        amountPurchase: "",
        comisionMarketing:0,
        comisionPurchase:0
      },
    ];
    handleChange(updatedProductos, "productos");
  };
  const handleDeleteRow = (id) => {
    const updatedProductos = fields.productos.filter((e) => e.id !== id);
    handleChange(updatedProductos, "productos");
  };
  const handleChangeInput = (event, id, parameter) => {
    const updatedProductos = fields.productos.map((producto) => {
      if (producto.id === id) {
        return { ...producto, [parameter]: Number(event.target.value) };
      }
      return producto;
    });
    handleChange(updatedProductos, "productos");
  };

  return (
    <TableContainer w="100%">
      <Table variant="striped" colorScheme="orange" size="md">
        <Thead>
          <Tr>
            <Th w="20%">Net Weight (MT)</Th>
            <Th w="40%">PRODUCT</Th>
            <Th w="25%">PACKING</Th>
            {operationType == "Broker" && <Th>Broker</Th>}
            {operationType == "Trading + Marketing" && <Th>Marketing</Th>}
            <Th>UNIT PRICE PURCHASE</Th>
            <Th>UNIT PRICE SALE</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {fields.productos.length &&
            fields.productos.map((e, index) => (
              <Tr key={index}>
                <Td>
                  <Input
                    type="number"
                    variant="filled"
                    value={e.netWeight ? e.netWeight : ""}
                    onChange={(event) =>
                      handleChangeInput(event, e.id, "netWeight")
                    }
                  />
                </Td>
                <Td>
                  <SelectProducts
                    productos={fields.productos}
                    handleChange={handleChange}
                    id={e.id}
                    index={index}
                    CarteraProducts={CarteraProducts}
                  />
                </Td>

                <Td>
                  <SelectPacking
                    productos={fields.productos}
                    handleChange={handleChange}
                    id={e.id}
                    index={index}
                    CarteraPacking={CarteraPacking}
                  />
                </Td>
                {operationType == "Broker" && 
                <Td>
                  <Input
                  type="number"
                  variant="filled"
                  defaultValue={e.comisionPurchase || fields.comisionPurchase}
                  onChange={(event) =>
                    handleChangeInput(event, e.id, "comisionPurchase")}
                />
                  </Td>}
                  {operationType == "Trading + Marketing" && 
                <Td>
                  <Input
                  type="number"
                  variant="filled"
                  defaultValue={e.comisionMarketing ||fields.comisionMarketing}
                  onChange={(event) =>
                    handleChangeInput(event, e.id, "comisionMarketing")}
                />
                  </Td>}
                <Td>
                  <Input
                    variant="filled"
                    defaultValue={e.unitPricePurchase}
                    type="number"
                    onChange={(event) =>
                      handleChangeInput(event, e.id, "unitPricePurchase")
                    }
                  />
                </Td>
                <Td>
                  <Input
                    variant="filled"
                    defaultValue={e.unitPriceSale}
                    type="number"
                    onChange={(event) =>
                      handleChangeInput(event, e.id, "unitPriceSale")
                    }
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
            {operationType == "Broker" && <Th></Th>}
            {operationType == "Trading + Marketing" && <Th></Th>}
            <Th>
              <DeliveryTerms
                handleChange={handleChange}
                fields={fields}
                type="purchase"
              />
            </Th>
            <Th>
              <DeliveryTerms
                handleChange={handleChange}
                fields={fields}
                type="sale"
              />
            </Th>
            <Th></Th>
          </Tr>
          <Tr>
            <Th>Payment Terms</Th>
            <Th></Th>
            <Th></Th>
            {operationType == "Broker" && <Th></Th>}
            {operationType == "Trading + Marketing" && <Th></Th>}
            <Th>
              <PaymentTerms
                fields={fields}
                handleChange={handleChange}
                type="purchase"
                CarteraPaymentTerms={CarteraPaymentTerms}
              />
            </Th>
            <Th>
              <PaymentTerms
                fields={fields}
                handleChange={handleChange}
                type="sale"
                CarteraPaymentTerms={CarteraPaymentTerms}
              />
            </Th>
            <Th></Th>
          </Tr>
          <Tr>
            <Th>Total</Th>
            <Th></Th>
            <Th></Th>
            {operationType == "Broker" && <Th isNumeric>{convertirAMoneda(fields.totalBroker)}</Th>}
            {operationType == "Trading + Marketing" && <Th isNumeric>{convertirAMoneda(fields.totalMarketing)}</Th>}
            <Th isNumeric>{convertirAMoneda(fields.totalPurchase)}</Th>
            <Th isNumeric>{convertirAMoneda(fields.totalSale)}</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
}
