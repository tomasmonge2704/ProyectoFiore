import { Grid, GridItem, VStack, Text, Center } from "@chakra-ui/react";
import InputPersonalizado from "@/utils/inputPersonalizado";
import { ComisionesBox } from "@/utils/comicionesBox";
import { useStore } from "@/store/operation";
import { convertirAMoneda } from "@/utils/convertInt";
export const EgresosForm = ({ operation, setOperation }) => {
  const setFieldsContableFinanciera = useStore(
    (state) => state.setFieldsContableFinanciera
  );
  const handleChange = (event, param) => {
    setFieldsContableFinanciera({
      ...operation.contableFinanciera.fields,
      [param]: event.target.value,
    });
  };
  return (
    <VStack w="full" spacing="3">
      <Grid w="100%" templateColumns="repeat(2, 1fr)" gap={2}>
        <GridItem w="full">
          <VStack w="full" spacing="3">
            <Center>
              <Text as="b">Egresos</Text>
            </Center>
            <InputPersonalizado
              label="Nro Factura Proveedor Frigorifico"
              onChange={(e) => handleChange(e, "nroFacturaProveedorFrigo")}
            />
            <InputPersonalizado
              label="Monto Total Factura"
              value={convertirAMoneda(operation.contableFinanciera.fields.totalFacturaCompra)}
              onChange={(e) => handleChange(e, "MontoTotalFactura")}
            />
            <InputPersonalizado label="Fecha de Pago Anticipo" />
            <InputPersonalizado label="Monto Pagado Anticipo" />
            <ComisionesBox text="COMISIONES USD 1500" />
            <InputPersonalizado label="Fecha de Pago Balance / Total" />
            <InputPersonalizado label="Monto Pagado Balance" />
            <ComisionesBox text="COMISIONES USD 1500" />
            {operation.comercial.fields.operationType ==
              "Trading + Marketing" && (
              <VStack
                spacing="3"
                w="full"
                shadow="lg"
                border="2px"
                borderColor="blue.100"
                borderStyle="dashed"
                borderRadius="lg"
                p={1}
              >
                <InputPersonalizado label="Nro Factura Proveedor Marketing" />
                <InputPersonalizado label="Monto Factura" value={convertirAMoneda(operation.comercial.fields.comisionMarketing)}/>
                <InputPersonalizado label="Fecha de pago" />
                <ComisionesBox text="COMISIONES USD 1500" />
              </VStack>
            )}
            {(operation.comercial.fields.deliveryTermsSale == "CIF" ||
              operation.comercial.fields.deliveryTermsSale == "CFR") && (
              <VStack
                spacing="3"
                w="full"
                shadow="lg"
                border="2px"
                borderColor="purple.100"
                borderStyle="dashed"
                borderRadius="lg"
                p={1}
              >
                <InputPersonalizado label="Nro Factura Proveedor Flete internacional" />
                <InputPersonalizado label="Monto Factura" />
                <InputPersonalizado label="Fecha de pago" />
                <ComisionesBox text="COMISIONES USD 1500" />
              </VStack>
            )}
            {operation.comercial.fields.deliveryTermsSale == "CIF" && (
              <VStack
                spacing="3"
                w="full"
                border="2px"
                shadow="lg"
                borderColor="red.100"
                borderStyle="dashed"
                borderRadius="lg"
                p={1}
              >
                <InputPersonalizado label="Nro Factura Proveedor Seguro internacional" />
                <InputPersonalizado label="Monto Factura" />
                <InputPersonalizado label="Fecha de pago" />
                <ComisionesBox text="COMISIONES USD 1500" />
              </VStack>
            )}
          </VStack>
        </GridItem>
        <GridItem w="full">
          <VStack w="full" spacing="3">
            <Center>
              <Text as="b">Ingresos</Text>
            </Center>
            <InputPersonalizado label="Nro Factura" />
            <InputPersonalizado
              label="Monto total Factura"
              value={convertirAMoneda(operation.contableFinanciera.fields.totalFacturaVenta)}
            />
            <InputPersonalizado label="Fecha de cobro Anticipo" />
            <InputPersonalizado label="Monto Cobrado Anticipo" />
            <Grid w="100%" templateColumns="repeat(2, 1fr)" gap={2}>
              <GridItem>
                <ComisionesBox text="COMISIONES USD 1500" />
              </GridItem>
              <GridItem>
                <ComisionesBox text="CHARGES USD 1200" colorScheme="green" />
              </GridItem>
            </Grid>
            <InputPersonalizado label="Fecha de cobro Balance" />
            <InputPersonalizado label="Monto cobrado Balance" />
            <Grid w="100%" templateColumns="repeat(2, 1fr)" gap={2}>
              <GridItem>
                <ComisionesBox text="COMISIONES USD 1500" />
              </GridItem>
              <GridItem>
                <ComisionesBox text="CHARGES USD 1200" colorScheme="green" />
              </GridItem>
            </Grid>
          </VStack>
        </GridItem>
      </Grid>
    </VStack>
  );
};
