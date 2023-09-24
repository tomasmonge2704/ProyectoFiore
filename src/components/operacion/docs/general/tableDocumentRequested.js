import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Input
} from "@chakra-ui/react";
export const TableDocumentRequested = ({ data }) => {
  return (
    <TableContainer w="100%">
      <Table variant="unstyled" colorScheme="orange" size="sm">
        <Thead>
          <Tr>
            <Th>Document Requested</Th>
            <Th>Copias</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((e, index) => (
            <Tr key={index}>
              <Td>{e.label}</Td>
              <Td><Input value={e.copias} variant="filled"/>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
