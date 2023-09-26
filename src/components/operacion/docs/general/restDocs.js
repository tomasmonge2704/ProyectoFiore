import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Text,
    VStack,
  } from "@chakra-ui/react";
  export const TableRestDocs = ({ operation }) => {
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
                <VStack alignItems="flex-start">
                  <Text>{operation.comercial.fields.empresa.nombre}</Text>
                  <Text>{operation.comercial.fields.empresa.direccion}</Text>
                  <Text>{operation.comercial.fields.empresa.direccion2}</Text>
                  <Text>{operation.comercial.fields.empresa.vatNumber && "TAX ID:" + operation.comercial.fields.empresa.vatNumber}</Text>
                </VStack>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    );
  };