import { MultiSelect } from "@/utils/multiSelector";
import { Box,VStack,Grid,GridItem } from "@chakra-ui/react";
export default function GeneralDocs({}) {
    const options = ["FACTURA","PACKING LIST", "CERT. DE ORIGEN", "BILL OF LADING - OBL -", "CERT. SANITARIO"]
  return (
    <Box w="100%">
      <VStack spacing="3">
        <Grid w="100%" templateColumns="repeat(3, 1fr)" gap={2}>
          <GridItem w="100%">
            <VStack spacing="3">
                <MultiSelect options={options} />
            </VStack>
          </GridItem>
        </Grid>
      </VStack>
    </Box>
  );
}
