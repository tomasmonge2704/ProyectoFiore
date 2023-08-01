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
import { CarteraProveedoresContext } from "../context/carterasContext";

export default function PurchaseForm() {
  const { operation, setOperation, purchase, setPurchase } =
    useContext(OperationContext);
  const { CarteraProveedores } = useContext(CarteraProveedoresContext);
  useEffect(() => {
    const totalFields = 18; // Total de campos del formulario
    let completedFields = Object.values(purchase).filter(Boolean).length;
    const completedPurchase = Math.floor((completedFields / totalFields) * 100);
    setOperation((prevOperation) => ({
      ...prevOperation,
      comercial: {
        ...prevOperation.comercial,
        completedPurchase,
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
          <Center w="100%">
            <Text fontSize="3xl">PURCHASE CONFIRMATION Nr. 123421</Text>
          </Center>
          <Grid w="100%" templateColumns="repeat(2, 1fr)" gap={5}>
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
                <Text>SHIPPER / SELLER</Text>
                <Seller
                  purchase={purchase}
                  setPurchase={setPurchase}
                  CarteraProveedores={CarteraProveedores}
                  detailView={true}
                />
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
                <Box h={10}></Box>
                <Text>Buyer</Text>
                <Buyer purchase={purchase} setPurchase={setPurchase} detailView={true} />
                <Text as="b">CONSIGNEE</Text>
                <Text>(DOCS INSTRUCTION WILL FOLLOW SHORTLY)</Text>
              </VStack>
            </GridItem>
          </Grid>
          <Text as="b">WE CONFIRM HAVING PURCHASED</Text>
          <TablePurchase
            productos={purchase.productos}
            setProductos={(value) =>
              setPurchase({ ...purchase, productos: value })
            }
          />
          <Grid w="100%" templateColumns="repeat(2, 1fr)" gap={5}>
            <GridItem w="100%">
              <VStack spacing="7">
                <InputPersonalizado
                  type="text"
                  label="ORIGIN"
                  value={purchase.origin}
                  onChange={(e) =>
                    setPurchase({ ...purchase, origin: e.target.value })
                  }
                />
                <InputPersonalizado
                  type="text"
                  label="PLANT NUMBER"
                  value={purchase.plantNumber}
                  onChange={(e) =>
                    setPurchase({ ...purchase, plantNumber: e.target.value })
                  }
                />
                <InputPersonalizado
                  type="text"
                  label="BRAND"
                  value={purchase.brand}
                  onChange={(e) =>
                    setPurchase({ ...purchase, brand: e.target.value })
                  }
                />
                <InputPersonalizado
                  type="text"
                  label="PRODUCTION DATE"
                  value={purchase.productionDate}
                  onChange={(e) =>
                    setPurchase({ ...purchase, productionDate: e.target.value })
                  }
                />
                <InputPersonalizado
                  type="text"
                  label="SHELF LIFE"
                  value={purchase.shelfLife}
                  onChange={(e) =>
                    setPurchase({ ...purchase, shelfLife: e.target.value })
                  }
                />
                <InputPersonalizado
                  type="text"
                  label="DESTINATION PORT"
                  value={purchase.destinationPort}
                  onChange={(e) =>setPurchase({...purchase,destinationPort:e.target.value,})}
                />
              </VStack>
            </GridItem>
            <GridItem w="100%">
              <VStack spacing="7">
                <InputPersonalizado
                  type="text"
                  label="DESTINATION COUNTRY"
                  value={purchase.destinationCountry}
                  onChange={(e) =>setPurchase({...purchase,destinationCountry:e.target.value})}
                />
                <InputPersonalizado
                  type="text"
                  label="QUANTITY"
                  value={purchase.quantity}
                  onChange={(e) =>
                    setPurchase({ ...purchase, quantity: e.target.value })
                  }
                />
                <InputPersonalizado
                  type="text"
                  label="SHIPMENT PERIOD"
                  value={purchase.shipmentPeriod}
                  onChange={(e) =>
                    setPurchase({ ...purchase, shipmentPeriod: e.target.value })
                  }
                />
                <InputPersonalizado
                  type="text"
                  label="DELIVERY TERMS"
                  value={purchase.deliveryTerms}
                  onChange={(e) =>
                    setPurchase({ ...purchase, deliveryTerms: e.target.value })
                  }
                />
                <PaymentTerms purchase={purchase} setPurchase={setPurchase} />
              </VStack>
            </GridItem>
          </Grid>
          <InputPersonalizado
            type="text"
            label="INSPECTED, APPROVED & ELEGIBLE FOR EXPORT TO"
            value={purchase.exportTo}
            onChange={(e) =>
              setPurchase({ ...purchase, exportTo: e.target.value })
            }
          />
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
