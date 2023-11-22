import {
  Grid,
  GridItem,
  VStack,
  Text,
  Center,
  Heading,
  Badge,
  Divider,
  Box,
} from "@chakra-ui/react";
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
          <VStack spacing="3">
            <Box
              w="full"
              border="2px"
              borderColor="blue.100"
              borderStyle="dashed"
              borderRadius="lg"
              p={1}
            >
              <VStack spacing="3">
                <Badge
                  colorScheme="blue"
                  fontSize="lg"
                  w="full"
                  textAlign="center"
                >
                  Purchase
                </Badge>
                <InputPersonalizado
                  label="Nro Factura Proveedor Frigorifico"
                  onChange={(e) => handleChange(e, "nroFacturaProveedorFrigo")}
                />
                <InputPersonalizado
                  label="Monto Total Factura"
                  value={convertirAMoneda(
                    operation.contableFinanciera.fields.totalFacturaCompra
                  )}
                  onChange={(e) => handleChange(e, "MontoTotalFactura")}
                />
                <InputPersonalizado
                  label="Fecha de Pago Anticipo"
                  type="date"
                />
                <InputPersonalizado label="Monto Pagado Anticipo" />
                <ComisionesBox
                  text="COMISIONES"
                  monto={200}
                  bank={operation.comercial.fields.empresa.bank}
                />
                <Divider />
                <InputPersonalizado
                  label="Fecha de Pago Balance / Total"
                  type="date"
                />
                <InputPersonalizado label="Monto Pagado Balance" />
                <ComisionesBox
                  text="COMISIONES"
                  monto={200}
                  bank={operation.comercial.fields.empresa.bank}
                />
              </VStack>
            </Box>
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
                <Badge
                  colorScheme="blue"
                  fontSize="lg"
                  w="full"
                  textAlign="center"
                >
                  Marketing
                </Badge>
                <InputPersonalizado label="Nro Factura Proveedor Marketing" />
                <InputPersonalizado
                  label="Monto Factura"
                  value={convertirAMoneda(
                    operation.comercial.fields.comisionMarketing
                  )}
                />
                <InputPersonalizado label="Fecha de pago" type="date" />
                <ComisionesBox
                  text="COMISIONES"
                  bank={operation.comercial.fields.empresa.bank}
                />
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
                <Badge
                  colorScheme="blue"
                  fontSize="lg"
                  w="full"
                  textAlign="center"
                >
                  Freight
                </Badge>
                <InputPersonalizado label="Nro Factura Proveedor Flete internacional" />
                <InputPersonalizado label="Monto Factura" />
                <InputPersonalizado label="Fecha de pago" />
                <ComisionesBox
                  text="COMISIONES"
                  bank={operation.comercial.fields.empresa.bank}
                />
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
                <Badge
                  colorScheme="blue"
                  fontSize="lg"
                  w="full"
                  textAlign="center"
                >
                  Insurance
                </Badge>
                <InputPersonalizado label="Nro Factura Proveedor Seguro internacional" />
                <InputPersonalizado label="Monto Factura" />
                <InputPersonalizado label="Fecha de pago" type="date" />
                <ComisionesBox
                  text="COMISIONES"
                  bank={operation.comercial.fields.empresa.bank}
                />
              </VStack>
            )}
          </VStack>
        </GridItem>
        <GridItem w="full">
          <VStack w="full"
            spacing="3">

          
          <VStack
            w="full"
            spacing="3"
            border="2px"
            borderColor="green.100"
            borderStyle="dashed"
            borderRadius="lg"
            p={1}
          >
            <Badge colorScheme="green" fontSize="lg" w="full" textAlign="center">
              Sell
            </Badge>
            <InputPersonalizado label="Nro Factura" />
            <InputPersonalizado
              label="Monto total Factura"
              value={convertirAMoneda(
                operation.contableFinanciera.fields.totalFacturaVenta
              )}
            />
            <InputPersonalizado label="Fecha de cobro Anticipo" type="date" />
            <InputPersonalizado label="Monto Cobrado Anticipo" />
            <Grid w="100%" templateColumns="repeat(2, 1fr)" gap={2}>
              <GridItem>
                <ComisionesBox
                  text="COMISIONES"
                  bank={operation.comercial.fields.empresa.bank}
                />
              </GridItem>
              <GridItem>
                <ComisionesBox
                  text="CHARGES"
                  colorScheme="green"
                  bank={operation.comercial.fields.empresa.bank}
                />
              </GridItem>
            </Grid>
            <Divider/>
            <InputPersonalizado label="Fecha de cobro Balance" type="date" />
            <InputPersonalizado label="Monto cobrado Balance" />
            <Grid w="100%" templateColumns="repeat(2, 1fr)" gap={2}>
              <GridItem>
                <ComisionesBox
                  text="COMISIONES"
                  bank={operation.comercial.fields.empresa.bank}
                />
              </GridItem>
              <GridItem>
                <ComisionesBox
                  text="CHARGES"
                  colorScheme="green"
                  bank={operation.comercial.fields.empresa.bank}
                />
              </GridItem>
            </Grid>
          </VStack>
          {operation.comercial.fields.operationType ==
              "Broker" && (
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
                <Badge
                  colorScheme="green"
                  fontSize="lg"
                  w="full"
                  textAlign="center"
                >
                  Brokerage
                </Badge>
                <InputPersonalizado label="Nro Factura" />
                <InputPersonalizado
                  label="Monto Factura"
                  value={convertirAMoneda(
                    operation.comercial.fields.comisionPurchase || operation.comercial.fields.comisionSale
                  )}
                />
                <InputPersonalizado label="Fecha de Cobro" type="date" />
                <ComisionesBox
                  text="COMISIONES"
                  bank={operation.comercial.fields.empresa.bank}
                />
              </VStack>
            )}
            </VStack>
        </GridItem>
      </Grid>
    </VStack>
  );
};
