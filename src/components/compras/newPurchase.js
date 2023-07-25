import InputPersonalizado from "@/utils/inputPersonalizado";
import {
  Box,
  Grid,
  GridItem,
  Center,
  Text,
  Button,
  Card,
  CardBody,
  VStack,
} from "@chakra-ui/react";

import TablePurchase from "./tablePurchase";
import { useContext, useState, useEffect } from "react";
import { OperationContext } from "../context/operationContext";
import { Buyer } from "./Buyer";
import { Seller } from "./seller";
import { PaymentTerms } from "./paymentTerms";
export default function PurchaseForm() {
  const { setOperation } = useContext(OperationContext);
  const [orderNumber, setOrderNumber] = useState("");
  const [supplierRefNumber, setSupplierRefNumber] = useState("");
  const [date, setDate] = useState("");
  const [direccion, setDireccion] = useState("");
  const [direccion2, setDireccion2] = useState("");
  const [vatNumber, setVatNumber] = useState("");
  //seller
  const [nombreSeller, setNombreSeller] = useState("");
  const [direccionSeller, setDireccionSeller] = useState("");
  const [codigoPostaleSeller, setCodigoPostaleSeller] = useState("");
  const [paisSeller, setPaisSeller] = useState("");
  const [cuitSeller, setCuitSeller] = useState("");
  //productos
  const [productos, setProductos] = useState([
    {
      id: "",
      description: "",
      packing:null,
      quantity:null,
      unitPrice:null,
      amount:null,
    },
  ]);
  // extras
  const [origin, setOrigin] = useState("");
  const [plantNumber, setPlantNumber] = useState("");
  const [brand, setBrand] = useState("");
  const [productionDate, setProductionDate] = useState("");
  const [shelfLife, setShelfLife] = useState("");
  const [destinationPort, setDestinationPort] = useState("");
  const [destinationCountry, setDestinationCountry] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipmentPeriod, setShipmentPeriod] = useState("");
  const [deliveryTerms, setDeliveryTerms] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("");
  const fields = [
    direccion,
    direccion2,
    vatNumber,
    orderNumber,
    supplierRefNumber,
    date,
    nombreSeller,
    direccionSeller,
    codigoPostaleSeller,
    paisSeller,
    cuitSeller,
    productos,
    origin,
    plantNumber,
    brand,
    productionDate,
    shelfLife,
    destinationPort,
    destinationCountry,
    quantity,
    shipmentPeriod,
    deliveryTerms,
    paymentTerms
  ]
  useEffect(() => {
    const totalFields = 24; // Total de campos del formulario
    const completedFields = fields.filter(Boolean).length;
    const completedPurchase = Math.floor((completedFields / totalFields) * 100);
    setOperation((prevOperation) => ({
      ...prevOperation,
      comercial: {
        ...prevOperation.comercial,
        completedPurchase,
        fieldsPurchase:fields,
      },
    }));
  }, fields);

  return (
    <Card w="100%" p={4} variant="outline">
      <CardBody>
        <VStack spacing="10">
          <Center w="100%">
            <Text fontSize="3xl">PURCHASE CONFIRMATION Nr. 123421</Text>
          </Center>
          <Grid w="100%" templateColumns="repeat(2, 1fr)" gap={5}>
            <GridItem w="100%">
              <VStack spacing="7">
                <InputPersonalizado
                  type="text"
                  label="ORDER NUMBER"
                  onChange={(e) => setOrderNumber(e.target.value)}
                />
                <InputPersonalizado
                  type="text"
                  label="SUPPLIER REF. NUMBER"
                  onChange={(e) => setSupplierRefNumber(e.target.value)}
                />
                <Text>SHIPPER / SELLER</Text>
                <Seller
                  nombre={nombreSeller}
                  setNombre={setNombreSeller}
                  direccion={direccionSeller}
                  setDireccion={setDireccionSeller}
                  cuit={cuitSeller}
                  setCuit={setCuitSeller}
                  codigoPostal={codigoPostaleSeller}
                  setCodigoPostal={setCodigoPostaleSeller}
                  pais={paisSeller}
                  setPais={setPaisSeller}
                />
              </VStack>
            </GridItem>
            <GridItem w="100%">
              <VStack spacing="7">
                <InputPersonalizado
                  type="date"
                  label="Date"
                  onChange={(e) => setDate(e.target.value)}
                />
                <Box h={10}></Box>
                <Text>Buyer</Text>
                <Buyer
                  direccion={direccion}
                  setDireccion={setDireccion}
                  direccion2={direccion2}
                  setDireccion2={setDireccion2}
                  vatNumber={vatNumber}
                  setVatNumber={setVatNumber}
                />
                <Text as="b">CONSIGNEE</Text>
                <Text>(DOCS INSTRUCTION WILL FOLLOW SHORTLY)</Text>
              </VStack>
            </GridItem>
          </Grid>
          <Text as="b">WE CONFIRM HAVING PURCHASED</Text>
          <TablePurchase productos={productos} setProductos={setProductos} />
          <Grid w="100%" templateColumns="repeat(2, 1fr)" gap={5}>
            <GridItem w="100%">
              <VStack spacing="7">
                <InputPersonalizado type="text" label="ORIGIN" onChange={(e) => setOrigin(e.target.value)} />
                <InputPersonalizado type="text" label="PLANT NUMBER" onChange={(e) => setPlantNumber(e.target.value)} />
                <InputPersonalizado type="text" label="BRAND" onChange={(e) => setBrand(e.target.value)} />
                <InputPersonalizado type="text" label="PRODUCTION DATE" onChange={(e) => setProductionDate(e.target.value)} />
                <InputPersonalizado type="text" label="SHELF LIFE" onChange={(e) => setShelfLife(e.target.value)} />
                <InputPersonalizado type="text" label="DESTINATION PORT" onChange={(e) => setDestinationPort(e.target.value)} />
              </VStack>
            </GridItem>
            <GridItem w="100%">
              <VStack spacing="7">
                <InputPersonalizado type="text" label="DESTINATION COUNTRY" onChange={(e) => setDestinationCountry(e.target.value)} />
                <InputPersonalizado type="text" label="QUANTITY" onChange={(e) => setQuantity(e.target.value)} />
                <InputPersonalizado type="text" label="SHIPMENT PERIOD" onChange={(e) => setShipmentPeriod(e.target.value)} />
                <InputPersonalizado type="text" label="DELIVERY TERMS" onChange={(e) => setDeliveryTerms(e.target.value)} />
                <PaymentTerms setPaymentTerms={setPaymentTerms}/>
              </VStack>
            </GridItem>
          </Grid>
          <InputPersonalizado
            type="text"
            label="INSPECTED, APPROVED & ELEGIBLE FOR EXPORT TO"
          />
          <Center>
            <Button colorScheme="orange">Guardar</Button>
          </Center>
        </VStack>
      </CardBody>
    </Card>
  );
}
