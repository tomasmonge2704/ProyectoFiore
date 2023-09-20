import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  Textarea,
  VStack,
  Input,
  Select,
} from "@chakra-ui/react";
export const TableBillOfLading = ({ operation }) => {
  return (
    <TableContainer w="100%">
      <Table variant="striped" colorScheme="orange">
        <Thead>
          <Tr>
            <Th>INTRUCCIONES EMISIÓN: BILL OF LADING</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>SHIPPER</Td>
            <Td>
              <VStack>
                <Text>{operation.comercial.fields.seller.nombre}</Text>
                <Textarea placeholder="Comentarios..." variant="filled" />
              </VStack>
            </Td>
          </Tr>
          <Tr>
            <Td>CONSIGNEE</Td>
            <Td></Td>
          </Tr>
          <Tr>
            <Td>NOTIFY</Td>
            <Td></Td>
          </Tr>
          <Tr>
            <Td>DESCRIPTION OF GOODS</Td>
            <Td><Textarea value={operation.comercial.fields.productos[0].description && operation.comercial.fields.productos.map((e) => (
            e.description
            ))} variant="filled" /></Td>
          </Tr>
          <Tr>
            <Td>PLACE OF B/L ISSUE</Td>
            <Td>
                <Select variant="filled">
                <option value="OBL">OBL</option>
                <option value="TELEX RELEASE">TELEX RELEASE</option>
              </Select>
            </Td>
          </Tr>
          <Tr>
            <Td>PORT</Td>
            <Td>{operation.comercial.fields.destinationPort}</Td>
          </Tr>
          <Tr>
            <Td>CONTAINER TYPE</Td>
            <Td>
              <Select variant="filled">
                <option value="40' refeer HC">40' refeer HC</option>
                <option value="40' dry">40' dry</option>
                <option value="20' refeer">20' refeer</option>
              </Select>
            </Td>
          </Tr>
          <Tr>
            <Td>TEMPERATURE</Td>
            <Td>
              <Input
                variant="filled"
                value={operation.docs.fields.temperature}
              />
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};
