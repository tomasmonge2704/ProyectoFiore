import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Text,
    Textarea
  } from "@chakra-ui/react";
  export const TableFacturaComercial = ({ operation,setFieldsDocs }) => {
    const descriptionOfGoods =
    operation.docs.fields.descriptionGoods !== ""
      ? operation.docs.fields.descriptionGoods
      : operation.comercial.fields.productos
          .map((e) => `${e.description}`)
          .join("\n");
    return (
      <TableContainer w="100%">
        <Table variant="unstyled" size="sm">
          <Thead>
            <Tr>
              <Th>INTRUCCIONES EMISIÓN: FACTURA COMERCIAL</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>
                <Text as="b">CONSIGNEE</Text>
              </Td>
              <Td w="45%">
                  <Text>{operation.comercial.fields.empresa.nombre}</Text>
              </Td>
            </Tr>
            <Tr>
            <Td><Text as="b">DESCRIPTION OF GOODS</Text></Td>
            <Td>
            <Textarea
              defaultValue={descriptionOfGoods}
              onChange={(e) =>
                setFieldsDocs({
                  ...operation.docs.fields,
                  descriptionGoods2: e.target.value,
                })
              }
              variant="filled"
            />
            </Td>
          </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    );
  };