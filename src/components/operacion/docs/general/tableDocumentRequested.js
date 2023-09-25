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
export const TableDocumentRequested = ({ data,fields,setFieldsDocs }) => {
  const handleInput = (event,label) => {
    const updatedFields = data.map((element) => {
      if (element.label === label) {
        return {...element, copias:event.target.value}
      }
      return element;
    });
    setFieldsDocs({...fields,documentRequested:updatedFields});
  }
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
              <Td><Input defaultValue={e.copias} onChange={(event) => handleInput(event,e.label)} variant="filled"/>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
