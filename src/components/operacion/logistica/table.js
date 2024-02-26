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
  import { DeleteIcon } from "@chakra-ui/icons";
  import { AiOutlinePlus } from "react-icons/ai";
import { convertDecimales } from "@/utils/convertInt";

  export default function TablaLogistica({
    operation,
    productos,
    setFieldsComercial,
  }) {
    const setProductos = (value) => {
      setFieldsComercial({...operation.comercial.fields,productos:value})
    };
    const handleNewRow = (id) => {
      const updatedProductos = [...productos, {
        id:id,
        description: "",
        packing: "",
        quantity:0,
        quantityCartons:0,
        netWeight:0,
        netWeightLogistica:0,
        grossWeight:0,
        unitPricePurchase:0,
        unitPriceSale:0,
        amountSale: "",
        amountPurchase: "",
      }];
      setProductos(updatedProductos);
    };
    const handleDeleteRow = (id) => {
      const updatedProductos = productos.filter((e) => e.id !== id);
      setProductos(updatedProductos);
    };
    const handleChangeInput = (event, id, parameter) => {
      const updatedProductos = productos.map((producto) => {
        if (producto.id === id) {
          return { ...producto, [parameter]: Number(event.target.value) };
        }
        return producto;
      });
      setProductos(updatedProductos);
    };
  
    return (
      <TableContainer w="100%">
        <Table variant="striped" colorScheme="orange" size="md">
          <Thead>
            <Tr>
              <Th w="20%">QUANTITY (CARTONS)</Th>
              <Th w="40%">PRODUCT</Th>
              <Th w="25%">PACKING</Th>
              <Th>Net Weight (MT)</Th>
              <Th>GROSS WEIGHT</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {productos.length &&
              productos.map((e, index) => (
                <Tr key={index}>
                  <Td>
                    <Input
                      type="number"
                      variant="filled"
                      defaultValue={e.quantityCartons}
                      onChange={(event) =>
                        handleChangeInput(event, e.id, "quantityCartons")
                      }
                    />
                  </Td>
                  <Td>
                   {e.description}
                  </Td>
  
                  <Td>
                    {e.packing}
                  </Td>
                  <Td>
                    <Input
                      variant="filled"
                      defaultValue={e.netWeightLogistica}
                      type="number"
                      onChange={(event) =>
                        handleChangeInput(event, e.id, "netWeightLogistica")
                      }
                    />
                  </Td>
                  <Td>
                    <Input
                      variant="filled"
                      defaultValue={e.grossWeight}
                      type="number"
                      onChange={(event) =>
                        handleChangeInput(event, e.id, "grossWeight")
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
              <Th>Total {convertDecimales(operation.logistica.fields.totalQuantityCartons)}</Th>
              <Th></Th>
              <Th></Th>
              <Th isNumeric>{convertDecimales(operation.logistica.fields.totalNetWeightLogistica)}</Th>
              <Th isNumeric>{convertDecimales(operation.logistica.fields.totalGrossWeight)}</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    );
  }
  