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
export const TableBillOfLading = ({ operation, setFieldsDocs }) => {
  return (
    <TableContainer w="100%">
      <Table variant="striped" colorScheme="orange" size="sm">
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
                <Textarea
                  placeholder="Comentarios..."
                  size="sm"
                  variant="filled"
                />
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
            <Td>
              <Textarea
                defaultValue={
                  operation.docs.fields.descriptionGoods !== ""
                    ? operation.docs.fields.descriptionGoods
                    : operation.comercial.fields.productos.map(
                        (e) => e.description
                      )
                }
                size="xs"
                onChange={(e) =>
                  setFieldsDocs({
                    ...operation.docs.fields,
                    descriptionGoods: e.target.value,
                  })
                }
                variant="filled"
              />
            </Td>
          </Tr>
          <Tr>
            <Td>PLACE OF B/L ISSUE</Td>
            <Td>
              <Select variant="filled" 
              value={operation.docs.fields.placeBLIssue}
              onChange={(e) =>
                setFieldsDocs({
                  ...operation.docs.fields,
                  placeBLIssue: e.target.value,
                })
              }>
                <option value="" disabled>PLACE OF B/L ISSUE</option>
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
              <Select
                variant="filled"
                onChange={(e) =>
                  setFieldsDocs({
                    ...operation.docs.fields,
                    tipoContenedor: e.target.value,
                  })
                }
              >
                <option value="40' refeer HC">40&apos; refeer HC</option>
                <option value="40' dry">40&apos; dry</option>
                <option value="20' refeer">20&apos; refeer</option>
              </Select>
            </Td>
          </Tr>
          <Tr>
            <Td>TEMPERATURE</Td>
            <Td>
              <Input
                variant="filled"
                defaultValue={operation.docs.fields.temperature}
                onChange={(e) =>
                  setFieldsDocs({
                    ...operation.docs.fields,
                    temperature: e.target.value,
                  })
                }
              />
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};
