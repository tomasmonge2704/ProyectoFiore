import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
} from "@chakra-ui/react";
import { InputConsignee } from "./inputConsignee";
export const TableRestDocs = ({
  operation,
  setFieldsDocs,
  CarteraConsignee,
}) => {
  
  return (
    <TableContainer w="100%">
      <Table variant="unstyled" size="sm">
        <Thead>
          <Tr>
            <Th>INTRUCCIONES EMISIÓN: RESTO DE LOS DOCS</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>
              <Text as="b">CONSIGNEE</Text>
            </Td>
            <Td>
              <InputConsignee
                placeholder="Search consignee..."
                Cartera={CarteraConsignee}
                fields={operation.docs.fields}
                param="consigneeRest"
                defaultValue={operation.docs.fields.consigneeRest.nombre}
                setFields={setFieldsDocs}
              />
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};
