import InputPersonalizado from "@/utils/inputPersonalizado";
import {
  Box,
  VStack,
  Grid,
  GridItem,
  Divider,
  Textarea,
  Text,
  Center,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SelectComponent } from "@/utils/select";
import { TableDocumentRequested } from "./tableDocumentRequested";
import { TableBillOfLading } from "./billOfLading";
import { TableRestDocs } from "./restDocs";
import { TableFacturaComercial } from "./facturaComercial";
import useFetch from "@/hooks/useFetch";
import { ConfirmButton } from "@/utils/saveForm";
import PdfDocsIntructions from "../pdf";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Select } from "chakra-react-select";
export default function GeneralDocs({
  operation,
  setFieldsComercial,
  setFieldsDocs,
  fieldsDocs,
  fieldsComercial,
}) {
  const options = [
    { label: "FACTURA", value: "FACTURA", copias: "1 Original + 1 Copia" },
    {
      label: "PACKING LIST",
      value: "PACKING LIST",
      copias: "1 Original + 3 Copias",
    },
    {
      label: "CERT. DE ORIGEN",
      value: "CERT. DE ORIGEN",
      copias: "1 Original + 3 Copias",
    },
    {
      label: "BILL OF LADING",
      value: "BILL OF LADING",
      copias: "3 Originales + 3 Copias",
    },
    {
      label: "CERT. SANITARIO",
      value: "CERT. SANITARIO",
      copias: "1 Original + 2 Copias",
    },
    {
      label: "CERT. HALAL",
      value: "CERT. HALAL",
      copias: "1 Original + 1 Copia",
    },
  ];
  const handleIndexChangeResponsable = (event) => {
    const buscado = CarteraEmpleados.find(
      (e) => e.nombre == event.target.value
    );
    setFieldsDocs({ ...fieldsDocs, responsable: buscado.nombre });
  };
  const [selected, setSelected] = useState(fieldsDocs.documentRequested);
  const handleChangeSelected = (event) => {
    if(typeof Object == event){
      setSelected([event]);
    }else{
      setSelected(event)
    }
  }
  useEffect(() => {
    setFieldsDocs({ ...fieldsDocs, documentRequested: selected });
  }, [selected]);
  const [CarteraConsignee] = useFetch(`${process.env.API_URL}/consignee`, []);
  const [CarteraEmpleados] = useFetch(`${process.env.API_URL}/empleados`,[]);
  return (
    <Box w="100%">
      <VStack spacing="3">
        <Grid w="100%" templateColumns="repeat(2, 1fr)" gap={2}>
          <GridItem w="100%">
            <VStack spacing="3">
              <InputPersonalizado
                value={fieldsComercial.seller.refNumber}
                label="Sup Ref. Number"
                onChange={(e) =>
                  setFieldsComercial({
                    ...fieldsComercial,
                    seller: {
                      ...fieldsComercial.seller,
                      refNumber: e.target.value,
                    },
                  })
                }
              />
              <Box w="full">
              <Select
                options={options}
                placeholder="Document Requested..."
                variant="filled"
                value={selected}
                styles={{width:"100%"}}
                isMulti={true}
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                selectedOptionStyle="check"
                onChange={(e) => handleChangeSelected(e)}
              />
              </Box>    
            </VStack>
          </GridItem>
          <GridItem w="100%">
            <VStack spacing="3">
              <InputPersonalizado
                value={fieldsDocs.date}
                label="Date"
                type="date"
                onChange={(e) =>
                  setFieldsDocs({ ...fieldsDocs, date: e.target.value })
                }
              />
              <SelectComponent
                options={CarteraEmpleados}
                value={fieldsDocs.responsable}
                handleIndexChange={handleIndexChangeResponsable}
                textDefault="Employee"
                param="nombre"
              />
            </VStack>
          </GridItem>
        </Grid>
        {selected.length > 0 && (
          <TableDocumentRequested data={selected} setSelected={setSelected} />
        )}
        <Divider orientation="horizontal" />
        <TableBillOfLading
          operation={operation}
          setFieldsDocs={setFieldsDocs}
          CarteraConsignee={CarteraConsignee}
          setSelected={setSelected}
        />
        <Divider orientation="horizontal" />
        <TableRestDocs
          operation={operation}
          setFieldsDocs={setFieldsDocs}
          CarteraConsignee={CarteraConsignee}
        />
        <Divider orientation="horizontal" />
        <TableFacturaComercial
          operation={operation}
          setFieldsDocs={setFieldsDocs}
        />
        <Divider orientation="horizontal" />
        <Text as="b">Comentarios adicionales</Text>
        <Textarea
          placeholder="Comentarios..."
          variant="filled"
          value={fieldsDocs.comentarios}
          onChange={(e) =>
            setFieldsDocs({ ...fieldsDocs, comentarios: e.target.value })
          }
        />
        <Center>
        <ConfirmButton operation={operation} />
        <PDFDownloadLink document={<PdfDocsIntructions
            operation={operation}
            fieldsComercial={fieldsComercial}
            fieldsDocs={fieldsDocs}
          />} fileName={"DOCS INSTRUCTIONS " + operation.id}>
            <Button colorScheme="red" ml={5}>DOCS INSTRUCTIONS {operation.id}</Button>
        </PDFDownloadLink>
        </Center>
      </VStack>
    </Box>
  );
}
