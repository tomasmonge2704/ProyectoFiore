import { Box,VStack,Grid,GridItem, } from "@chakra-ui/react";
import { ConfirmButton } from "@/utils/saveForm";
import { useStore } from "@/store/operation";
export const Logistica = () => {
    const operation = useStore((state) => state.operation);
    const setFieldsDocs = useStore((state) => state.setFieldsDocs);
    const setFieldsComercial = useStore((state) => state.setFieldsComercial);
    const fieldsComercial = operation.comercial.fields;
    const fieldsDocs = operation.docs.fields;
    return(
        <Box w="100%">
        <VStack spacing="3">
          <Grid w="100%" templateColumns="repeat(2, 1fr)" gap={2}>
            <GridItem w="100%">
              <VStack spacing="3">
               
              </VStack>
            </GridItem>
            <GridItem w="100%">
              <VStack spacing="3">
                
              </VStack>
            </GridItem>
          </Grid>
          <ConfirmButton operation={operation} />
        </VStack>
      </Box>
    )
}