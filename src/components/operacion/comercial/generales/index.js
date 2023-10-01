import InputPersonalizado from "@/utils/inputPersonalizado";
import {
  Grid,
  GridItem,
  VStack,
  Box,
} from "@chakra-ui/react";
import TablaGeneral from "./tablaGeneral";
import { Empresa } from "./empresa";
import { Buyer } from "./buyer";
import { Seller } from "./seller";
import { OperationType } from "./operationType";
import { DestinationPort } from "./destinationPort";
import { ShelfLife } from "./shelfLife";
import { ShipmentPeriod } from "./shipmentPeriod";
import { SelectBanco } from "./banco";
import { EmpleadoComponent } from "./empleado";
import { ConfirmButton } from "@/utils/saveForm";
export default function GeneralForm({
  operation,
  fields,
  setFields,
  productos,
  setProductos,
  CarteraBancaria,
  CarteraProveedores,
  CarteraClientes,
  CarteraProducts,
  CarteraPacking,
  CarteraPaymentTerms,
  CarteraPuertos,
  CarteraEmpleados,
}) {
  const handleInputChange = (elemnt) => {
    setFields(elemnt);
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
                defaultValue={fields.empresaRefNumber}
                onChange={(e) =>
                  handleInputChange({
                    ...fields,
                    empresaRefNumber: e.target.value,
                  })
                }
              />
              <Empresa
                fields={operation.comercial.fields}
                setFields={setFields}
                CarteraBancaria={CarteraBancaria}
              />
              <SelectBanco
                fields={operation.comercial.fields}
                setFields={setFields}
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
                defaultValue={fields.date}
                onChange={(e) =>
                  handleInputChange({ ...fields, date: e.target.value })
                }
              />
              <Seller
                seller={fields.seller}
                fields={fields}
                setFields={setFields}
                CarteraProveedores={CarteraProveedores}
              />
              <InputPersonalizado
                type="text"
                label="REF. NUMBER"
                defaultValue={fields.seller.refNumber}
                onChange={(e) =>
                  handleInputChange({
                    ...fields,
                    seller: { ...fields.seller, refNumber: e.target.value },
                  })
                }
              />
            </VStack>
          </GridItem>
          <GridItem w="100%">
            <VStack spacing="3">
              <OperationType fields={fields} setFields={setFields} />
              <Buyer
                buyer={fields.buyer}
                fields={fields}
                setFields={setFields}
                CarteraClientes={CarteraClientes}
              />
              <InputPersonalizado
                type="text"
                label="REF. NUMBER"
                defaultValue={fields.buyer.refNumber}
                onChange={(e) =>
                  handleInputChange({
                    ...fields,
                    buyer: { ...fields.buyer, refNumber: e.target.value },
                  })
                }
              />
            </VStack>
          </GridItem>
        </Grid>
        <TablaGeneral
          fields={fields}
          setFields={setFields}
          productos={productos}
          operationType={fields.operationType}
          setProductos={setProductos}
          CarteraProducts={CarteraProducts}
          CarteraPacking={CarteraPacking}
          CarteraPaymentTerms={CarteraPaymentTerms}
        />
        <ShipmentPeriod
          value={fields.shipmentPeriod}
          setFields={setFields}
          fields={fields}
        />
        <Grid w="100%" templateColumns="repeat(2, 1fr)" gap={5}>
          <GridItem w="100%">
            <VStack spacing="3">
              <DestinationPort
                fields={fields}
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
                value={fields.destinationCountry}
                onChange={(e) =>
                  handleInputChange({
                    ...fields,
                    destinationCountry: e.target.value,
                  })
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
                value={fields.productionDate}
                onChange={(e) =>
                  handleInputChange({
                    ...fields,
                    productionDate: e.target.value,
                  })
                }
              />
            </VStack>
          </GridItem>
          <GridItem w="100%"></GridItem>
          <GridItem w="100%">
            <VStack spacing="3">
              <ShelfLife setFields={setFields} fields={fields} />
            </VStack>
          </GridItem>
        </Grid>
        <EmpleadoComponent
          fields={operation.comercial.fields}
          setFields={setFields}
          CarteraEmpleados={CarteraEmpleados}
        />
        <ConfirmButton operation={operation} />
      </VStack>
    </Box>
  );
}
