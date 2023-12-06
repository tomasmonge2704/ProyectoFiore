import { useStore } from "@/store/operation";
import {
  Grid,
  GridItem,
  VStack,
  Badge,
  Divider,
  Textarea,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Center,
} from "@chakra-ui/react";
import { LineValue } from "@/utils/lineValue";
import { ConfirmButton } from "@/utils/saveForm";
import InputPersonalizado from "@/utils/inputPersonalizado";
import { ComisionesBox } from "@/utils/comicionesBox";
import { convertirAMoneda } from "@/utils/convertInt";
import {
  calculateTotal,
  calculateAnticipo,
  calculateBalance,
  calculateCharges,
  calculateComision,
} from "@/components/controllers/financiera";
import { useEffect, useState } from "react";
export const Contable = () => {
  const operation = useStore((state) => state.operation);
  const setFieldsContableFinanciera = useStore(
    (state) => state.setFieldsContableFinanciera
  );
  const handleChange = (event, param, set) => {
    let value = event.target.value;
    if (typeof value === "string" && value.includes("USD")) {
      value = parseFloat(value.replace(/[^\d.]/g, "")) || 0;
    }
    setFieldsContableFinanciera({
      ...operation.contableFinanciera.fields,
      [param]: value,
    });
    //cuando modifica montos
    if (set) set(value);
  };
  const [montoFacturaPurchase, setMontoFacturaPurchase] = useState(
    calculateTotal(
      operation.contableFinanciera.fields.totalFacturaCompra,
      operation.comercial.fields.productos,
      "unitPricePurchase"
    ) || 0
  );

  const [montoFacturaSell, setMontoFacturaSell] = useState(
    calculateTotal(
      operation.contableFinanciera.fields.totalFacturaVenta,
      operation.comercial.fields.productos,
      "unitPriceSale"
    ) || 0
  );

  const [montoPagadoAnticipo, setMontoPagadoAnticipo] = useState(
    calculateAnticipo(
      operation.contableFinanciera.fields.montoAnticipoPurchase,
      operation.comercial.fields.paymentTermsPurchase,
      operation.comercial.fields.totalPurchase
    ) || 0
  );

  const [montoCobradoAnticipo, setMontoCobradoAnticipo] = useState(
    calculateAnticipo(
      operation.contableFinanciera.fields.montoAnticipoSale,
      operation.comercial.fields.paymentTermsSale,
      operation.comercial.fields.totalSale
    ) || 0
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
  const [montoPagadoFlete, setMontoPagadoFlete] = useState(
    operation.contableFinanciera.fields.montoFacturaFlete || operation.logistica.fields.freightAmount || 0
  );
  const [montoPagadoMarketing, setMontoPagadoMarketing] = useState(
    operation.contableFinanciera.fields.montoFacturaMarketing ||
      operation.logistica.fields.totalMarketing ||
      0
  );
  const [montoPagadoInsurance, setMontoPagadoInsurance] = useState(
    operation.contableFinanciera.fields.montoFacturaSeguro || operation.logistica.fields.insuranceAmount || 0
  );
  const [montoCobradoBrokerage, setMontoCobradoBrokerage] = useState(
    operation.contableFinanciera.fields.montoCobradoBrokerage || operation.logistica.fields.totalBroker || 0
  );
  const [intermediaryCharges, setIntermediaryCharges] = useState(
    calculateCharges(
      operation.contableFinanciera.fields.intermediaryCharges,
      montoCobradoAnticipo,
      montoCobradoBalance,
      montoFacturaSell
    )
  );
  const [comisionPagadoAnticipo, setComisionPagadoAnticipo] = useState(0);
  const [comisionPagadoBalance, setComisionPagadoBalance] = useState(0);
  const [comisionCobradoAnticipo, setComisionCobradoAnticipo] = useState(0);
  const [comisionCobradoBalance, setComisionCobradoBalance] = useState(0);
  const [comisionPagadoFlete, setComisionPagadoFlete] = useState(0);
  const [comisionPagadoInsurance, setComisionPagadoInsurance] = useState(0);
  const [comisionPagadoMarketing, setComisionPagadoMarketing] = useState(0);
  const [comisionCobradoBrokerage,setComisionCobradoBrokerage] = useState(0);
  const [totalComisionesEgresos, setTotalComisionesEgresos] = useState(0);
  const [totalComisionesIngresos, setTotalComisionesIngresos] = useState(0);
  useEffect(() => {
    const fields = operation.contableFinanciera.fields;
    const fijo = operation.comercial.fields.empresa.bank?.fijo || 0;
    const fijoCobranza =
      operation.comercial.fields.empresa.bank?.fijoCobranza || 0;
    const porcentaje = operation.comercial.fields.empresa.bank?.porcentaje || 0;
    const porcentajeCobranza =
      operation.comercial.fields.empresa.bank?.porcentajeCobranza || 0;
    setMontoPagadoBalance(calculateBalance(
      montoPagadoAnticipo,
      montoFacturaPurchase,
      operation.contableFinanciera.fields.montoBalancePurchase
    ));
    setMontoCobradoBalance(
      calculateBalance(
        montoCobradoAnticipo,
        montoFacturaSell,
        operation.contableFinanciera.fields.montoBalanceSale
      )
    )
    setComisionPagadoAnticipo(
      calculateComision(
        fields.comisionMontoPagadoAnticipo,
        montoPagadoAnticipo,
        porcentaje,
        fijo
      )
    );
    setComisionPagadoBalance(
      calculateComision(
        fields.comisionMontoPagadobalance,
        montoPagadoBalance,
        porcentaje,
        fijo
      )
    );
    setComisionCobradoAnticipo(
      calculateComision(
        fields.comisionMontoCobradoAnticipo,
        montoCobradoAnticipo,
        porcentajeCobranza,
        fijoCobranza
      )
    );
    setComisionCobradoBalance(
      calculateComision(
        fields.comisionMontoCobradoBalance,
        montoCobradoBalance,
        porcentajeCobranza,
        fijoCobranza
      )
    );
    setComisionPagadoFlete(
      calculateComision(
        fields.comisionPagadoFlete,
        montoPagadoFlete,
        porcentaje,
        fijo
      )
    );
    setComisionPagadoMarketing(
      calculateComision(
        fields.comisionMontoPagadoMarketing,
        montoPagadoMarketing,
        porcentaje,
        fijo
      )
    );
    setComisionPagadoInsurance(
      calculateComision(
        fields.comisionPagadoInsurance,
        montoPagadoInsurance,
        porcentaje,
        fijo
      )
    );
    setIntermediaryCharges( calculateCharges(
      operation.contableFinanciera.fields.intermediaryCharges,
      montoCobradoAnticipo,
      montoCobradoBalance,
      montoFacturaSell
    ))
    setComisionCobradoBrokerage(calculateComision(
      fields.comisionMontoCobradoBrokerage,
      montoCobradoBrokerage,
      porcentajeCobranza,
      fijoCobranza
    ))
    setTotalComisionesEgresos(
      comisionPagadoAnticipo +
        comisionPagadoBalance +
        comisionPagadoFlete +
        comisionPagadoMarketing +
        comisionPagadoInsurance
    );
    setTotalComisionesIngresos(
      comisionCobradoAnticipo + comisionCobradoBalance + comisionCobradoBrokerage
    );
    let profitNeto;
    if(operation.comercial.fields.operationType == "Broker"){
      profitNeto = montoCobradoBrokerage - comisionCobradoBrokerage;
    }else{
      profitNeto = montoFacturaSell -
      montoFacturaPurchase -
      montoPagadoFlete -
      montoPagadoMarketing -
      totalComisionesEgresos -
      totalComisionesIngresos;
    }
    
    setFieldsContableFinanciera({ ...fields, profitNeto: profitNeto });
  }, [
    operation.comercial.fields.bank,
    montoPagadoAnticipo,
    montoFacturaPurchase,
    montoFacturaSell,
    montoPagadoBalance,
    montoCobradoAnticipo,
    montoCobradoBalance,
    montoCobradoBrokerage,
    montoPagadoFlete,
    montoPagadoMarketing,
    montoPagadoInsurance,
    comisionCobradoAnticipo,
    comisionCobradoBalance,
    comisionPagadoAnticipo,
    comisionPagadoBalance,
    comisionCobradoBrokerage
  ]);
  return (
    <Tabs variant="soft-rounded" colorScheme="orange">
      <Center width="100%">
        <TabList>
          <Tab>General</Tab>
          <Tab>Resumen</Tab>
        </TabList>
      </Center>
      <TabPanels>
        <TabPanel>
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
                  value={
                    operation.contableFinanciera.fields.nroFacturaProveedorFrigo
                  }
                  onChange={(e) => handleChange(e, "nroFacturaProveedorFrigo")}
                />
                <InputPersonalizado
                  label="Monto Total Factura"
                  value={convertirAMoneda(montoFacturaPurchase)}
                  onChange={(e) =>
                    handleChange(
                      e,
                      "totalFacturaCompra",
                      setMontoFacturaPurchase
                    )
                  }
                />
                <InputPersonalizado
                  label="Fecha de Pago Anticipo"
                  type="date"
                  value={
                    operation.contableFinanciera.fields.fechaAnticipoPurchase
                  }
                  onChange={(e) => handleChange(e, "fechaAnticipoPurchase")}
                />
                <InputPersonalizado
                  label="Monto Pagado Anticipo"
                  value={convertirAMoneda(montoPagadoAnticipo)}
                  onChange={(e) =>
                    handleChange(
                      e,
                      "montoAnticipoPurchase",
                      setMontoPagadoAnticipo
                    )
                  }
                />
                <ComisionesBox
                  value={comisionPagadoAnticipo}
                  handleChange={handleChange}
                  param="comisionMontoPagadoAnticipo"
                  set={setComisionPagadoAnticipo}
                />
                <Divider />
                <InputPersonalizado
                  label="Fecha de Pago Balance / Total"
                  value={
                    operation.contableFinanciera.fields.fechaBalancePurchase
                  }
                  type="date"
                  onChange={(e) => handleChange(e, "fechaBalancePurchase")}
                />
                <InputPersonalizado
                  label="Monto Pagado Balance"
                  value={convertirAMoneda(montoPagadoBalance)}
                  onChange={(e) =>
                    handleChange(
                      e,
                      "montoBalancePurchase",
                      setMontoPagadoBalance
                    )
                  }
                />
                <ComisionesBox
                  value={comisionPagadoBalance}
                  handleChange={handleChange}
                  param="comisionMontoPagadobalance"
                  set={setComisionPagadoBalance}
                />
              </VStack>
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
                  <InputPersonalizado
                    label="Nro Factura Proveedor Marketing"
                    onChange={(e) => handleChange(e, "nroFacturaMarketing")}
                  />
                  <InputPersonalizado
                    label="Monto Factura"
                    value={convertirAMoneda(
                      montoPagadoMarketing
                    )}
                    onChange={(e) =>
                      handleChange(
                        e,
                        "montoFacturaMarketing",
                        setMontoPagadoMarketing
                      )
                    }
                  />
                  <InputPersonalizado
                    label="Fecha de pago"
                    type="date"
                    onChange={(e) => handleChange(e, "fechaPagoMarketing")}
                  />
                  <ComisionesBox
                    value={comisionPagadoMarketing}
                    set={setComisionPagadoMarketing}
                    handleChange={handleChange}
                    param="comisionMontoPagadoMarketing"
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
                  <Badge
                    colorScheme="blue"
                    fontSize="lg"
                    w="full"
                    textAlign="center"
                  >
                    Freight
                  </Badge>
                  <InputPersonalizado
                    label="Nro Factura Proveedor Flete internacional"
                    value={
                      operation.contableFinanciera.fields.nroFacturaFlete
                    }
                    onChange={(e) => handleChange(e, "nroFacturaFlete")}
                  />
                  <InputPersonalizado
                    label="Monto Factura"
                    value={convertirAMoneda(montoPagadoFlete)}
                    onChange={(e) =>
                      handleChange(e, "montoFacturaFlete", setMontoPagadoFlete)
                    }
                  />
                  <InputPersonalizado
                    label="Fecha de pago"
                    type="date"
                    value={
                      operation.contableFinanciera.fields.fechaPagoFlete
                    }
                    onChange={(e) => handleChange(e, "fechaPagoFlete")}
                  />
                  <ComisionesBox
                    value={comisionPagadoFlete}
                    param="comisionPagadoFlete"
                    set={setComisionPagadoFlete}
                    handleChange={handleChange}
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
                  <Badge
                    colorScheme="blue"
                    fontSize="lg"
                    w="full"
                    textAlign="center"
                  >
                    Insurance
                  </Badge>
                  <InputPersonalizado
                    label="Nro Factura Proveedor Seguro internacional"
                    onChange={(e) => handleChange(e, "nroFacturaSeguro")}
                  />
                  <InputPersonalizado
                    label="Monto Factura"
                    value={convertirAMoneda(montoPagadoInsurance)}
                    onChange={(e) =>
                      handleChange(
                        e,
                        "montoFacturaSeguro",
                        setMontoPagadoInsurance
                      )
                    }
                  />
                  <InputPersonalizado
                    label="Fecha de pago"
                    value={
                      operation.contableFinanciera.fields.fechaPagoSeguro
                    }
                    type="date"
                    onChange={(e) => handleChange(e, "fechaPagoSeguro")}
                  />
                  <ComisionesBox
                    value={comisionPagadoInsurance}
                    handleChange={handleChange}
                    param="comisionPagadoInsurance"
                    set={setComisionPagadoInsurance}
                  />
                </VStack>
              )}
              <Textarea
                placeholder="Coments..."
                variant="filled"
                value={
                  operation.contableFinanciera.fields.comentariosPurchase
                }
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
                    value={
                      operation.contableFinanciera.fields.nroFacturaSell
                    }
                    onChange={(e) => handleChange(e, "nroFacturaSell")}
                  />
                  <InputPersonalizado
                    label="Monto total Factura"
                    value={convertirAMoneda(montoFacturaSell)}
                    onChange={(e) =>
                      handleChange(e, "totalFacturaVenta", setMontoFacturaSell)
                    }
                  />
                  <InputPersonalizado
                    label="Fecha de cobro Anticipo"
                    type="date"
                    value={
                      operation.contableFinanciera.fields.fechaCobroAnticipo
                    }
                    onChange={(e) => handleChange(e, "fechaCobroAnticipo")}
                  />
                  <InputPersonalizado
                    label="Monto Cobrado Anticipo"
                    value={convertirAMoneda(montoCobradoAnticipo)}
                    onChange={(e) =>
                      handleChange(
                        e,
                        "montoAnticipoSale",
                        setMontoCobradoAnticipo
                      )
                    }
                  />
                  <ComisionesBox
                    value={comisionCobradoAnticipo}
                    handleChange={handleChange}
                    param="comisionMontoCobradoAnticipo"
                    set={setComisionCobradoAnticipo}
                  />

                  <Divider />
                  <InputPersonalizado
                    label="Fecha de cobro Balance"
                    type="date"
                    value={
                      operation.contableFinanciera.fields.fechaCobroBalance
                    }
                    onChange={(e) => handleChange(e, "fechaCobroBalance")}
                  />
                  <InputPersonalizado
                    label="Monto cobrado Balance"
                    value={convertirAMoneda(montoCobradoBalance)}
                    onChange={(e) =>
                      handleChange(
                        e,
                        "montoBalanceSale",
                        setMontoCobradoBalance
                      )
                    }
                  />

                  <ComisionesBox
                    handleChange={handleChange}
                    value={comisionCobradoBalance}
                    param="comisionMontoCobradoBalance"
                    set={setComisionCobradoBalance}
                  />
                  <InputPersonalizado
                    label="Intermediary Charges"
                    value={convertirAMoneda(intermediaryCharges)}
                    onChange={(e) =>
                      handleChange(
                        e,
                        "intermediaryCharges",
                        setIntermediaryCharges
                      )
                    }
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
                      value={
                        operation.contableFinanciera.fields.nroFacturaBrokerage
                      }
                      onChange={(e) => handleChange(e, "nroFacturaBrokerage")}
                    />
                    <InputPersonalizado
                      label="Monto Factura"
                      value={convertirAMoneda(montoCobradoBrokerage)}
                      onChange={(e) => handleChange(e, "montoCobradoBrokerage",setMontoCobradoBrokerage)}
                    />
                    <InputPersonalizado
                      label="Fecha de Cobro"
                      type="date"
                      value={
                        operation.contableFinanciera.fields.fechaCobroBrokerage
                      }
                      onChange={(e) => handleChange(e, "fechaCobroBrokerage")}
                    />
                    <ComisionesBox
                      value={comisionCobradoBrokerage}
                      handleChange={handleChange}
                      set={setComisionCobradoBrokerage}
                      param="comisionMontoCobradoBrokerage"
                    />
                  </VStack>
                )}
                <Textarea
                  placeholder="Coments..."
                  variant="filled"
                  value={
                    operation.contableFinanciera.fields.comentariosSell
                  }
                  onChange={(e) => handleChange(e, "comentariosSell")}
                />
              </VStack>
            </GridItem>
          </Grid>
        </TabPanel>
        <TabPanel>
          <VStack
            w="full"
            border="2px"
            borderColor="orange.100"
            borderStyle="dashed"
            borderRadius="lg"
            p={1}
            spacing={3}
          >
            <Badge
              colorScheme="orange"
              fontSize="lg"
              w="full"
              textAlign="center"
            >
              Profit Neto
            </Badge>
            {operation.comercial.fields.operationType == "Broker" ? <>
            <LineValue
              text="Monto Brokerage"
              type="+"
              value={montoCobradoBrokerage}
            />
            <LineValue
              text="Comisiones por Ingresos"
              value={totalComisionesIngresos}
            />
            </> :<>
            <LineValue
              text="Monto Total Factura de Venta"
              type="+"
              value={montoFacturaSell}
            />
            <LineValue
              text="Monto Total Factura de Compra"
              value={montoFacturaPurchase}
            />
            {operation.comercial.fields.operationType == "Trading + Marketing" && <LineValue
              text="Monto Factura de Marketing Services"
              value={montoPagadoMarketing}
            />}
            <LineValue
              text="Monto Factura de Flete Internacional"
              value={montoPagadoFlete}
            />
            <LineValue
              text="Total Comisiones Bancarias x Ingresos"
              value={totalComisionesIngresos}
            />
            <LineValue
              text="Total Comisiones Bancarias x Egresos"
              value={totalComisionesEgresos}
            />
            <LineValue
              text="Gastos Intermediary Charges"
              value={intermediaryCharges}
            />
            </>
            }
            <Divider />
            <Badge
              colorScheme="green"
              fontSize="lg"
              backgroundColor="transparent"
              w="full"
              mr={8}
              textAlign="right"
            >
              {convertirAMoneda(operation.contableFinanciera.fields.profitNeto)}
            </Badge>
          </VStack>
        </TabPanel>
      </TabPanels>
      <Center mt={10}>
        <ConfirmButton operation={operation} />
      </Center>
    </Tabs>
  );
};
