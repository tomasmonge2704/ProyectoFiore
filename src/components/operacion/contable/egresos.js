import {
  Grid,
  GridItem,
  VStack,
  Badge,
  Divider,
  Textarea,
} from "@chakra-ui/react";
import InputPersonalizado from "@/utils/inputPersonalizado";
import { ComisionesBox } from "@/utils/comicionesBox";
import { useStore } from "@/store/operation";
import { convertirAMoneda } from "@/utils/convertInt";
import {
  calculateTotal,
  calculateAnticipo,
  calculateBalance,
  calculateCharges,
} from "@/components/controllers/financiera";
import { useState } from "react";
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
  const [montoFacturaPurchase, setMontoFacturaPurchase] = useState(
    calculateTotal(
      operation.logistica.fields.totalFacturaCompra,
      operation.comercial.fields.productos,
      "unitPricePurchase"
    )
  );

  const [montoFacturaSell, setMontoFacturaSell] = useState(
    calculateTotal(
      operation.logistica.fields.totalFacturaVenta,
      operation.comercial.fields.productos,
      "unitPriceSale"
    )
  );

  const [montoPagadoAnticipo, setMontoPagadoAnticipo] = useState(
    calculateAnticipo(
      operation.contableFinanciera.fields.montoAnticipoPurchase,
      operation.comercial.fields.paymentTermsPurchase,
      montoFacturaPurchase
    )
  );

  const [montoCobradoAnticipo, setMontoCobradoAnticipo] = useState(
    calculateAnticipo(
      operation.contableFinanciera.fields.montoAnticipoSale,
      operation.comercial.fields.paymentTermsSale,
      montoFacturaSell
    )
  );

  const [montoPagadoBalance, setMontoPagadoBalance] = useState(
    calculateBalance(
      montoPagadoAnticipo,
      montoFacturaPurchase,
      operation.contableFinanciera.fields.montoBalancePurchase
    )
  );

  const [montoCobradoBalance, setMontoCobradoBalance] = useState(
    calculateBalance(
      montoCobradoAnticipo,
      montoFacturaSell,
      operation.contableFinanciera.fields.montoBalanceSale
    )
  );

  const [intermediaryCharges, setIntermediaryCharges] = useState(
    calculateCharges(
      operation.contableFinanciera.fields.intermediaryCharges,
      montoCobradoAnticipo,
      montoCobradoBalance,
      montoFacturaSell
    )
  );
  return (
    <Grid w="100%" templateColumns="repeat(2, 1fr)" gap={2}>
      <GridItem w="full" display="grid" rowGap={3}>
        <VStack
          w="full"
          border="2px"
          borderColor="blue.100"
          borderStyle="dashed"
          borderRadius="lg"
          p={1}
          spacing={3}
        >
          <Badge colorScheme="blue" fontSize="lg" w="full" textAlign="center">
            Purchase
          </Badge>
          <InputPersonalizado
            label="Nro Factura Proveedor Frigorifico"
            defaultValue={
              operation.contableFinanciera.fields.nroFacturaProveedorFrigo
            }
            onChange={(e) => handleChange(e, "nroFacturaProveedorFrigo")}
          />
          <InputPersonalizado
            label="Monto Total Factura"
            defaultValue={convertirAMoneda(montoFacturaPurchase)}
            onChange={(e) => handleChange(e, "totalFacturaCompra")}
          />
          <InputPersonalizado
            label="Fecha de Pago Anticipo"
            type="date"
            defaultValue={
              operation.contableFinanciera.fields.fechaAnticipoPurchase
            }
            onChange={(e) => handleChange(e, "fechaAnticipoPurchase")}
          />
          <InputPersonalizado
            label="Monto Pagado Anticipo"
            defaultValue={convertirAMoneda(montoPagadoAnticipo)}
            onChange={(e) => handleChange(e, "montoAnticipoPurchase")}
          />
          <ComisionesBox
            text="COMISIONES"
            monto={montoPagadoAnticipo}
            bank={operation.comercial.fields.empresa.bank}
          />
          <Divider />
          <InputPersonalizado
            label="Fecha de Pago Balance / Total"
            defaultValue={
              operation.contableFinanciera.fields.fechaBalancePurchase
            }
            type="date"
            onChange={(e) => handleChange(e, "fechaBalancePurchase")}
          />
          <InputPersonalizado
            label="Monto Pagado Balance"
            defaultValue={convertirAMoneda(montoPagadoBalance)}
            onChange={(e) => handleChange(e, "montoBalancePurchase")}
          />
          <ComisionesBox
            text="COMISIONES"
            monto={montoPagadoBalance}
            bank={operation.comercial.fields.empresa.bank}
          />
        </VStack>
        {operation.comercial.fields.operationType == "Trading + Marketing" && (
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
            <Badge colorScheme="blue" fontSize="lg" w="full" textAlign="center">
              Marketing
            </Badge>
            <InputPersonalizado
              label="Nro Factura Proveedor Marketing"
              onChange={(e) => handleChange(e, "nroFacturaMarketing")}
            />
            <InputPersonalizado
              label="Monto Factura"
              defaultValue={convertirAMoneda(
                operation.comercial.fields.comisionMarketing
              )}
              onChange={(e) => handleChange(e, "montoFacturaMarketing")}
            />
            <InputPersonalizado
              label="Fecha de pago"
              type="date"
              onChange={(e) => handleChange(e, "fechaPagoMarketing")}
            />
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
            borderColor="blue.100"
            borderStyle="dashed"
            borderRadius="lg"
            p={1}
          >
            <Badge colorScheme="blue" fontSize="lg" w="full" textAlign="center">
              Freight
            </Badge>
            <InputPersonalizado
              label="Nro Factura Proveedor Flete internacional"
              defaultValue={operation.contableFinanciera.fields.nroFacturaFlete}
              onChange={(e) => handleChange(e, "nroFacturaFlete")}
            />
            <InputPersonalizado
              label="Monto Factura"
              onChange={(e) => handleChange(e, "montoFacturaFlete")}
            />
            <InputPersonalizado
              label="Fecha de pago"
              type="date"
              defaultValue={operation.contableFinanciera.fields.fechaPagoFlete}
              onChange={(e) => handleChange(e, "fechaPagoFlete")}
            />
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
            borderColor="blue.100"
            borderStyle="dashed"
            borderRadius="lg"
            p={1}
          >
            <Badge colorScheme="blue" fontSize="lg" w="full" textAlign="center">
              Insurance
            </Badge>
            <InputPersonalizado
              label="Nro Factura Proveedor Seguro internacional"
              onChange={(e) => handleChange(e, "nroFacturaSeguro")}
            />
            <InputPersonalizado
              label="Monto Factura"
              onChange={(e) => handleChange(e, "montoFacturaSeguro")}
            />
            <InputPersonalizado
              label="Fecha de pago"
              defaultValue={operation.contableFinanciera.fields.fechaPagoSeguro}
              type="date"
              onChange={(e) => handleChange(e, "fechaPagoSeguro")}
            />
            <ComisionesBox
              text="COMISIONES"
              bank={operation.comercial.fields.empresa.bank}
            />
          </VStack>
        )}
         <Textarea
            placeholder="Coments..."
            variant="filled"
            defaultValue={operation.contableFinanciera.fields.comentariosPurchase}
            onChange={(e) => handleChange(e, "comentariosPurchase")}
            />
      </GridItem>
      <GridItem w="full">
        <VStack w="full" spacing="3">
          <VStack
            w="full"
            spacing="3"
            border="2px"
            borderColor="green.100"
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
              Sell
            </Badge>
            <InputPersonalizado
              label="Nro Factura"
              defaultValue={operation.contableFinanciera.fields.nroFacturaSell}
              onChange={(e) => handleChange(e, "nroFacturaSell")}
            />
            <InputPersonalizado
              label="Monto total Factura"
              defaultValue={convertirAMoneda(montoFacturaSell)}
              onChange={(e) => handleChange(e, "totalFacturaVenta")}
            />
            <InputPersonalizado
              label="Fecha de cobro Anticipo"
              type="date"
              defaultValue={
                operation.contableFinanciera.fields.fechaCobroAnticipo
              }
              onChange={(e) => handleChange(e, "fechaCobroAnticipo")}
            />
            <InputPersonalizado
              label="Monto Cobrado Anticipo"
              defaultValue={convertirAMoneda(montoCobradoAnticipo)}
              onChange={(e) => handleChange(e, "montoAnticipoSale")}
            />
            <ComisionesBox
              text="COMISIONES"
              monto={montoCobradoAnticipo}
              bank={operation.comercial.fields.empresa.bank}
            />

            <Divider />
            <InputPersonalizado
              label="Fecha de cobro Balance"
              type="date"
              defaultValue={
                operation.contableFinanciera.fields.fechaCobroBalance
              }
              onChange={(e) => handleChange(e, "fechaCobroBalance")}
            />
            <InputPersonalizado
              label="Monto cobrado Balance"
              defaultValue={convertirAMoneda(montoCobradoBalance)}
              onChange={(e) => handleChange(e, "montoBalanceSale")}
            />

            <ComisionesBox
              text="COMISIONES"
              monto={montoCobradoBalance}
              bank={operation.comercial.fields.empresa.bank}
            />
            <InputPersonalizado
              label="Intermediary Charges"
              defaultValue={convertirAMoneda(intermediaryCharges)}
              onChange={(e) => handleChange(e, "intermediaryCharges")}
            />
          </VStack>
          {operation.comercial.fields.operationType == "Broker" && (
            <VStack
              spacing="3"
              w="full"
              shadow="lg"
              border="2px"
              borderColor="green.100"
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
              <InputPersonalizado
                label="Nro Factura"
                defaultValue={
                  operation.contableFinanciera.fields.nroFacturaBrokerage
                }
                onChange={(e) => handleChange(e, "nroFacturaBrokerage")}
              />
              <InputPersonalizado
                label="Monto Factura"
                defaultValue={convertirAMoneda(
                  operation.comercial.fields.comisionPurchase ||
                    operation.comercial.fields.comisionSale
                )}
              />
              <InputPersonalizado
                label="Fecha de Cobro"
                type="date"
                defaultValue={
                  operation.contableFinanciera.fields.fechaCobroBrokerage
                }
                onChange={(e) => handleChange(e, "fechaCobroBrokerage")}
              />
              <ComisionesBox
                text="COMISIONES"
                monto={
                  operation.comercial.fields.comisionPurchase ||
                  operation.comercial.fields.comisionSale
                }
                bank={operation.comercial.fields.empresa.bank}
              />
            </VStack>
          )}
          <Textarea
            placeholder="Coments..."
            variant="filled"
            defaultValue={operation.contableFinanciera.fields.comentariosSell}
            onChange={(e) => handleChange(e, "comentariosSell")}
            />
        </VStack>
      </GridItem>
    </Grid>
  );
};
