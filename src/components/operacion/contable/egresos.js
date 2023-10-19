import { Grid, GridItem, VStack, Text, Center } from "@chakra-ui/react";
import InputPersonalizado from "@/utils/inputPersonalizado";
export const EgresosForm = ({ operation, setOperation }) => {
  return (
    <VStack w="full" spacing="3">
      <Grid w="100%" templateColumns="repeat(2, 1fr)" gap={2}>
        <GridItem w="full">
          <VStack w="full" spacing="3">
            <Center>
              <Text as="b">Egresos</Text>
            </Center>
            <InputPersonalizado label="Nro Frigorifico" />
            <InputPersonalizado label="Monto total Factura" />
            <InputPersonalizado label="Monto Pagado Anticipo" />
            <InputPersonalizado label="Fecha de pago" />
            <InputPersonalizado label="Monto Pagado Balance" />
          </VStack>
        </GridItem>
        <GridItem w="full">
          <VStack w="full" spacing="3">
            <Center>
              <Text as="b">Ingresos</Text>
            </Center>
            <InputPersonalizado label="Nro Frigorifico" />
            <InputPersonalizado label="Monto total Factura" />
            <InputPersonalizado label="Monto Pagado Anticipo" />
            <InputPersonalizado label="Fecha de pago" />
            <InputPersonalizado label="Monto Pagado Balance" />
          </VStack>
        </GridItem>
      </Grid>
    </VStack>
  );
};
