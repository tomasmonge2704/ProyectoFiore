import InputPersonalizado from "@/utils/inputPersonalizado";
import { MultiSelector } from "@/utils/multiSelector";
import { Box, VStack, Grid, GridItem } from "@chakra-ui/react";
import { useStore } from "@/store/operation";
import { useState } from "react";
import { TableDocumentRequested } from "./tableDocumentRequested";
import { TableBillOfLading } from "./billOfLading";
export default function GeneralDocs() {
  const options = [
    { label: "FACTURA", value: "FACTURA",copias:"1 Original + 1 Copia" },
    { label: "PACKING LIST", value: "PACKING LIST",copias:"1 Original + 3 Copias - Indicando fechas de Prod y Vto." },
    { label: "CERT. DE ORIGEN", value: "CERT. DE ORIGEN",copias:"1 Original + 3 Copias" },
    { label: "BILL OF LADING", value: "BILL OF LADING - OBL -",copias:"3 Originales + 3 Copias" },
    { label: "CERT. SANITARIO", value: "CERT. SANITARIO",copias:"1 Original + 2 Copias" },
    { label: "CERT. HALAL", value: "CERT. HALAL",copias:"1" }
  ];
  const [selected,setSelected] = useState([]);
  const operation = useStore((state) => state.operation);
  const fieldsComercial = operation.comercial.fields;
  const fieldsDocs = operation.docs.fields;
  return (
    <Box w="100%">
      <VStack spacing="3">
        <Grid w="100%" templateColumns="repeat(2, 1fr)" gap={2}>
          <GridItem w="100%">
            <VStack spacing="3">
              <InputPersonalizado
                value={fieldsComercial.seller.refNumber}
                label="Sup Ref. Number"
              />
              <MultiSelector options={options} value={selected} onChange={setSelected} labelledBy="Select"/>
            </VStack>
          </GridItem>
          <GridItem w="100%">
            <VStack spacing="3">
              <InputPersonalizado
                value={fieldsDocs.date}
                label="Date"
                type="date"
                onChange={(e) => setFields({...fieldsDocs,date:e.target.value})}
              />
              <InputPersonalizado
                label="Responsable"
              />
            </VStack>
          </GridItem>
        </Grid>
        {selected.length > 0 && <TableDocumentRequested data={selected} />}
        <TableBillOfLading operation={operation} />
      </VStack>
    </Box>
  );
}
