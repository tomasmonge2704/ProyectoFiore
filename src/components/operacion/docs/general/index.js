import InputPersonalizado from "@/utils/inputPersonalizado";
import { MultiSelector } from "@/utils/multiSelector";
import { Box, VStack, Grid, GridItem } from "@chakra-ui/react";
import { useStore } from "@/store/operation";
export default function GeneralDocs() {
  const options = [
    { label: "FACTURA", value: "FACTURA" },
    { label: "PACKING LIST", value: "PACKING LIST" },
    { label: "CERT. DE ORIGEN", value: "CERT. DE ORIGEN" },
    { label: "BILL OF LADING", value: "BILL OF LADING - OBL -" },
    { label: "CERT. SANITARIO", value: "CERT. SANITARIO" },
    { label: "CERT. HALAL", value: "CERT. HALAL" }
  ];
  const optionsInstructions = [
    { label: "FACTURA", value: "FACTURA" },
    { label: "PACKING LIST", value: "PACKING LIST" },
    { label: "CERT. DE ORIGEN", value: "CERT. DE ORIGEN" },
    { label: "BILL OF LADING - OBL -", value: "BILL OF LADING - OBL -" },
    { label: "CERT. SANITARIO", value: "CERT. SANITARIO" },
    { label: "CERT. HALAL", value: "CERT. HALAL" }
  ]
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
              <MultiSelector options={options} />
            </VStack>
          </GridItem>
          <GridItem w="100%">
            <VStack spacing="3">
              <InputPersonalizado
                value={fieldsDocs.date}
                label="Date"
                onChange={(e) => setFields({...fieldsDocs,date:e.target.value})}
              />
              <MultiSelector
                options={optionsInstructions}
                placeHolder="Document Requested"
              />
            </VStack>
          </GridItem>
        </Grid>
      </VStack>
    </Box>
  );
}
