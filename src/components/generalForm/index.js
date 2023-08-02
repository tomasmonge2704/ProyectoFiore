import InputPersonalizado from "@/utils/inputPersonalizado";
import {
  Grid,
  GridItem,
  Center,
  Button,
  Card,
  CardBody,
  VStack,
} from "@chakra-ui/react";
import TablaGeneral from "./tablaGeneral";
import { useContext, useEffect } from "react";
import { OperationContext } from "../context/operationContext";
import { Buyer } from "../compras/Buyer";
import { Seller } from "../compras/seller";
import { PaymentTerms } from "../compras/paymentTerms";
import { CarteraProveedoresContext } from "../context/carterasContext";
import { OperationType } from "./operationType";
import { DestinationPort } from "./destinationPort";
import { ShelfLife } from "./shelfLife";
import { DeliveryTerms } from "./deliveryTerms";
export default function GeneralForm() {
  const { operation, setOperation, purchase, setPurchase,productos,setProductos } = useContext(OperationContext);
  const { CarteraProveedores } = useContext(CarteraProveedoresContext);
  useEffect(() => {
    const totalFields = 16; // Total de campos del formulario
    let completedFields = Object.values(purchase).filter(Boolean).length;
    const completedGeneral = Math.floor((completedFields / totalFields) * 100);
    setOperation((prevOperation) => ({
      ...prevOperation,
      comercial: {
        ...prevOperation.comercial,
        completedGeneral,
        fieldsPurchase: purchase,
      },
    }));
  }, [purchase]);
  const saveFormHandler = () => {
    localStorage.setItem("operation", JSON.stringify(operation));
  };
  return (
    <Card w="100%" p={4} variant="outline">
      <CardBody>
        <VStack spacing="10">
          <Grid w="100%" templateColumns="repeat(3, 1fr)" gap={5}>
            <GridItem w="100%">
              <VStack spacing="7">
                <InputPersonalizado
                  type="text"
                  label="ORDER NUMBER"
                  value={purchase.orderNumber}
                  onChange={(e) =>
                    setPurchase({ ...purchase, orderNumber: e.target.value })
                  }
                />
                <InputPersonalizado
                  type="text"
                  label="SUPPLIER REF. NUMBER"
                  value={purchase.supplierRefNumber}
                  onChange={(e) =>
                    setPurchase({
                      ...purchase,
                      supplierRefNumber: e.target.value,
                    })
                  }
                />
              </VStack>
            </GridItem>
            <GridItem w="100%">
              <VStack spacing="7">
                <OperationType
                  purchase={purchase}
                  setPurchase={setPurchase}
                />
                <Buyer purchase={purchase} setPurchase={setPurchase} />
              </VStack>
            </GridItem>
            <GridItem w="100%">
              <VStack spacing="7">
                <InputPersonalizado
                  type="date"
                  label="Date"
                  value={purchase.date}
                  onChange={(e) =>
                    setPurchase({ ...purchase, date: e.target.value })
                  }
                />
                <Seller
                  seller={purchase.seller}
                  purchase={purchase}
                  setPurchase={setPurchase}
                  CarteraProveedores={CarteraProveedores}
                />
              </VStack>
            </GridItem>
          </Grid>
          <TablaGeneral
            productos={productos}
            comision={purchase.comision}
            setProductos={setProductos}
          />
          <Grid w="100%" templateColumns="repeat(2, 1fr)" gap={5}>
            <GridItem w="100%">
              <VStack spacing="7">
                <InputPersonalizado
                  type="date"
                  label="PRODUCTION DATE"
                  value={purchase.productionDate}
                  onChange={(e) =>
                    setPurchase({ ...purchase, productionDate: e.target.value })
                  }
                />
                <ShelfLife setPurchase={setPurchase} purchase={purchase} />
                <DestinationPort purchase={purchase} setPurchase={setPurchase} />
                <InputPersonalizado
                  type="text"
                  label="DESTINATION COUNTRY"
                  value={purchase.destinationCountry}
                  onChange={(e) => setPurchase({...purchase,destinationCountry:e.target.value})}
                />
                <InputPersonalizado
                  type="text"
                  label="QUANTITY"
                  value={purchase.quantity}
                  onChange={(e) =>
                    setPurchase({ ...purchase, quantity: e.target.value })
                  }
                />
              </VStack>
            </GridItem>
            <GridItem w="100%">
              <VStack spacing="7">
                <InputPersonalizado
                  type="date"
                  label="SHIPMENT PERIOD"
                  value={purchase.shipmentPeriod}
                  onChange={(e) =>
                    setPurchase({ ...purchase, shipmentPeriod: e.target.value })
                  }
                />
                <DeliveryTerms setPurchase={setPurchase} purchase={purchase} />
                <PaymentTerms purchase={purchase} setPurchase={setPurchase} />
              </VStack>
            </GridItem>
          </Grid>
          <Center>
            <Button colorScheme="orange" onClick={saveFormHandler}>
              Guardar
            </Button>
          </Center>
        </VStack>
      </CardBody>
    </Card>
  );
}
