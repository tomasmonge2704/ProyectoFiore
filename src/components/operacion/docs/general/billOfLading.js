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
import { InputConsignee } from "./inputConsignee";
export const TableBillOfLading = ({
  operation,
  setFieldsDocs,
  CarteraConsignee,
  setSelected
}) => {
  const descriptionOfGoods = operation.docs.fields.descriptionGoods !== ""
  ? operation.docs.fields.descriptionGoods
  : operation.comercial.fields.productos
  .map((e) => `-${e.description}`)
  .join("\n");
  const handleplaceBlChange = (event) => {
    if(event.target.value == "TELEX RELEASE"){
      const updatedFields = operation.docs.fields.documentRequested.map((element) => {
        if (element.label === "BILL OF LADING") {
          return {...element, copias:"TELEX RELEASE"}
        }
        return element;
      });
      setSelected(updatedFields);
    }
    setFieldsDocs({
      ...operation.docs.fields,
      placeBLIssue: event.target.value,
    })
  }
  return (
    <TableContainer w="100%">
      <Table variant="unstyled" size="sm">
        <Thead>
          <Tr>
            <Th>INTRUCCIONES EMISIÓN: BILL OF LADING</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>
              <Text as="b">SHIPPER</Text>
            </Td>
            <Td>
              <VStack>
                <Text>{operation.comercial.fields.seller.nombre}</Text>
                <Textarea
                  placeholder="Comentarios..."
                  variant="filled"
                  onChange={(e) =>
                    setFieldsDocs({
                      ...operation.docs.fields,
                      comentariosSeller: e.target.value,
                    })
                  }
                  defaultValue={operation.docs.fields.comentariosSeller}
                />
              </VStack>
            </Td>
          </Tr>
          <Tr>
            <Td>
              <Text as="b">CONSIGNEE</Text>
            </Td>
            <Td>
              <InputConsignee
                placeholder="Search consignee..."
                param="consignee"
                fields={operation.docs.fields}
                defaultValue={operation.docs.fields.consignee.nombre}
                setFields={setFieldsDocs}
                Cartera={CarteraConsignee}
              />
            </Td>
          </Tr>
          <Tr>
            <Td>
              <Text as="b">NOTIFY</Text>
            </Td>
            <Td>
              <InputConsignee
                placeholder="Search notify..."
                Cartera={CarteraConsignee}
                param="notify"
                fields={operation.docs.fields}
                defaultValue={operation.docs.fields.notify.nombre}
                setFields={setFieldsDocs}
              />
            </Td>
          </Tr>
          <Tr>
            <Td>
              <Text as="b">DESCRIPTION OF GOODS</Text>
            </Td>
            <Td>
              <Textarea
                defaultValue={descriptionOfGoods}
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
            <Td>
              <Text as="b">PLACE OF B/L ISSUE</Text>
            </Td>
            <Td>
              <Select
                variant="filled"
                value={operation.docs.fields.placeBLIssue}
                onChange={(e) => handleplaceBlChange(e)}
              >
                <option value="" disabled>
                  PLACE OF B/L ISSUE
                </option>
                <option value="OBL">OBL</option>
                <option value="TELEX RELEASE">TELEX RELEASE</option>
              </Select>
            </Td>
          </Tr>
          <Tr>
            <Td>
              <Text as="b">PORT</Text>
            </Td>
            <Td>
              <Input
                defaultValue={operation.comercial.fields.destinationPort}
                variant="filled"
                readOnly
              />
            </Td>
          </Tr>
          <Tr>
            <Td>
              <Text as="b">CONTAINER TYPE</Text>
            </Td>
            <Td>
              <Select
                variant="filled"
                value={operation.docs.fields.tipoContenedor}
                onChange={(e) =>
                  setFieldsDocs({
                    ...operation.docs.fields,
                    tipoContenedor: e.target.value,
                  })
                }
              >
                <option value="">CONTAINER TYPE</option>
                <option value="40' refeer HC">40&apos; refeer HC</option>
                <option value="40' dry">40&apos; dry</option>
                <option value="20' refeer">20&apos; refeer</option>
              </Select>
            </Td>
          </Tr>
          <Tr>
            <Td>
              <Text as="b">TEMPERATURE</Text>
            </Td>
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
          <Tr>
            <Td>
              <Text as="b">TERMINOS DE FLETE</Text>
            </Td>
            <Td>
              <Input
                variant="filled"
                defaultValue={operation.docs.fields.terminosFlete}
                onChange={(e) =>
                  setFieldsDocs({
                    ...operation.docs.fields,
                    terminosFlete: e.target.value,
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
