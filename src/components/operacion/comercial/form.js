import InputPersonalizado from "@/utils/inputPersonalizado";
import {
  Grid,
  GridItem,
  VStack,
  Box,
  Textarea,
  Center,
  Button,
} from "@chakra-ui/react";
import TablaGeneral from "./tablaGeneral";
import { Empresa } from "./empresa";
import { Buyer } from "./buyer";
import { Seller } from "./seller";
import { OperationType } from "./operationType";
import { DestinationPort } from "./destinationPort";
import { ShelfLife } from "./shelfLife";
import { SelectBanco } from "./banco";
import { EmpleadoComponent } from "./empleado";
import { ConfirmButton } from "@/utils/saveForm";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PurchaseForm from "../pdfs/comercial-ordenCompra";
import SaleForm from "../pdfs/comercial-proformaInvoice";
export default function GeneralForm({
  operation,
  setFields,
  CarteraBancaria,
  CarteraProveedores,
  CarteraClientes,
  CarteraProducts,
  CarteraPacking,
  CarteraPaymentTerms,
  CarteraPuertos,
  CarteraEmpleados,
}) {
  const handleChange = (value, param) => {
    setFields({
      ...operation.comercial.fields,
      [param]: value,
    });
  };
  return (
    <Box w="100%">
      <VStack spacing="3">
        <Grid w="100%" templateColumns="repeat(3, 1fr)" gap={2}>
          <GridItem w="100%">
            <VStack spacing="3">
              <InputPersonalizado
                type="text"
                label="REF. NUMBER"
                defaultValue={operation.comercial.fields.empresaRefNumber}
                onChange={(e) =>
                  handleChange(e.target.value, "empresaRefNumber")
                }
              />
              <Empresa
                operation={operation}
                operationType={operation}
                handleChange={handleChange}
                CarteraBancaria={CarteraBancaria}
              />
              <SelectBanco
                fields={operation.comercial.fields}
                handleChange={handleChange}
                empresa={operation.comercial.fields.empresa.empresa}
                CarteraBancaria={CarteraBancaria}
              />
            </VStack>
          </GridItem>
          <GridItem w="100%">
            <VStack spacing="3">
              <InputPersonalizado
                type="date"
                label="Date"
                defaultValue={operation.comercial.fields.date}
                onChange={(e) => handleChange(e.target.value, "date")}
              />
              <Seller
                fields={operation.comercial.fields}
                handleChange={handleChange}
                CarteraProveedores={CarteraProveedores}
              />
              <InputPersonalizado
                type="text"
                label="REF. NUMBER"
                defaultValue={operation.comercial.fields.seller.refNumber}
                onChange={(e) =>
                  handleChange({...operation.comercial.fields.seller,refNumber:e.target.value}, "seller")
                }
              />
            </VStack>
          </GridItem>
          <GridItem w="100%">
            <VStack spacing="3">
              <OperationType
                fields={operation.comercial.fields}
                handleChange={handleChange}
              />
              <Buyer
                fields={operation.comercial.fields}
                handleChange={handleChange}
                CarteraClientes={CarteraClientes}
              />
              <InputPersonalizado
                type="text"
                label="REF. NUMBER"
                defaultValue={operation.comercial.fields.buyer.refNumber}
                onChange={(e) =>
                  handleChange({...operation.comercial.fields.buyer,refNumber:e.target.value}, "buyer")
                }
              />
            </VStack>
          </GridItem>
        </Grid>
        <TablaGeneral
          fields={operation.comercial.fields}
          operationType={operation.comercial.fields.operationType }
          handleChange={handleChange}
          CarteraProducts={CarteraProducts}
          CarteraPacking={CarteraPacking}
          CarteraPaymentTerms={CarteraPaymentTerms}
        />
        <Grid w="100%" templateColumns="repeat(2, 1fr)" gap={5}>
          <GridItem w="100%">
            <InputPersonalizado
              type="date"
              label="SHIPMENT PERIOD FROM"
              defaultValue={operation.comercial.fields.shipmentPeriodFrom}
              onChange={(e) =>
                handleChange(e.target.value, "shipmentPeriodFrom")
              }
            />
          </GridItem>
          <GridItem w="100%">
            <InputPersonalizado
              type="date"
              label="SHIPMENT PERIOD TO"
              defaultValue={operation.comercial.fields.shipmentPeriodTo}
              onChange={(e) => handleChange(e.target.value, "shipmentPeriodTo")}
            />
          </GridItem>
        </Grid>
        <Grid w="100%" templateColumns="repeat(2, 1fr)" gap={5}>
          <GridItem w="100%">
            <VStack spacing="3">
              <DestinationPort
                fields={operation.comercial.fields}
                setFields={setFields}
                CarteraPuertos={CarteraPuertos}
              />
            </VStack>
          </GridItem>
          <GridItem w="100%">
            <VStack spacing="3">
              <InputPersonalizado
                type="text"
                label="DESTINATION COUNTRY"
                value={operation.comercial.fields.destinationCountry}
                onChange={(e) =>
                  handleChange(e.target.value, "destinationCountry")
                }
              />
            </VStack>
          </GridItem>
        </Grid>
        <Grid w="100%" templateColumns="repeat(3, 1fr)" gap={2}>
          <GridItem w="200%">
            <VStack spacing="3">
              <InputPersonalizado
                type="text"
                label="PRODUCTION DATE"
                value={operation.comercial.fields.productionDate}
                onChange={(e) => handleChange(e.target.value, "productionDate")}
              />
            </VStack>
          </GridItem>
          <GridItem w="100%"></GridItem>
          <GridItem w="100%">
            <VStack spacing="3">
              <ShelfLife
                handleChange={handleChange}
                fields={operation.comercial.fields}
              />
            </VStack>
          </GridItem>
        </Grid>
        <EmpleadoComponent
          fields={operation.comercial.fields}
          handleChange={handleChange}
          CarteraEmpleados={CarteraEmpleados}
        />
        <Textarea
          onChange={(e) => handleChange(e.target.value, "comentarios")}
          placeholder="Comentarios..."
          defaultValue={operation.comercial.fields.comentarios}
          variant="filled"
        />
        <Center>
          <ConfirmButton operation={operation} />
          <PDFDownloadLink
            document={
              <PurchaseForm
                fields={operation.comercial.fields}
                productos={operation.comercial.fields.productos}
              />
            }
            fileName={`Purchase Confirmation${
              operation.comercial.fields.empresaRefNumber &&
              " " + operation.comercial.fields.empresaRefNumber
            }.pdf`}
          >
            <Button ml={5} colorScheme="red">
              Purchase Confirmation{" "}
              {operation.comercial.fields.empresaRefNumber}.pdf
            </Button>
          </PDFDownloadLink>
          <PDFDownloadLink
            document={
              <SaleForm
                fields={operation.comercial.fields}
                productos={operation.comercial.fields.productos}
              />
            }
            fileName={`Proforma Invoice${
              operation.comercial.fields.empresaRefNumber &&
              " " + operation.comercial.fields.empresaRefNumber
            }.pdf`}
          >
            <Button ml={5} colorScheme="red">
              Proforma Invoice {operation.comercial.fields.empresaRefNumber}.pdf
            </Button>
          </PDFDownloadLink>
        </Center>
      </VStack>
    </Box>
  );
}
