import {
  Box,
  Grid,
  GridItem,
  Center,
  Text,
  Card,
  CardBody,
  VStack,
  Button,
} from "@chakra-ui/react";
import SaleTable from "./saleTable";
import InputPersonalizado from "@/utils/inputPersonalizado";
import { PaymentTerms } from "../generalForm/paymentTerms";

export default function SaleForm({
  fields,
  setFields,
  productos,
  setProductos,
}) {
  return (
    <Card w="100%" p={4} variant="outline">
      <CardBody>
        <VStack spacing="10">
          <Center w="100%">
            <Text fontSize="3xl">PROFORMA INVOICE Nr. 34532</Text>
          </Center>
          <Grid w="100%" templateColumns="repeat(2, 1fr)" gap={5}>
            <GridItem w="100%">
              <VStack spacing="7">
                <InputPersonalizado label="ORDER NUMBER" type="text" />
                <Text>Buyer</Text>
                <InputPersonalizado
                  label="Name"
                  type="text"
                  value={fields.buyer.nombre}
                  onChange={(e) =>
                    setFields({
                      ...fields,
                      buyer: { ...fields.buyer, nombre: e.target.value },
                    })
                  }
                />
                <InputPersonalizado
                  label="Adress"
                  type="text"
                  value={fields.buyer.direccion}
                  onChange={(e) =>
                    setFields({
                      ...fields,
                      buyer: { ...fields.buyer, direccion: e.target.value },
                    })
                  }
                />
                <InputPersonalizado
                  label="City"
                  type="text"
                  value={fields.buyer.direccion2}
                  onChange={(e) =>
                    setFields({
                      ...fields,
                      buyer: { ...fields.buyer, direccion2: e.target.value },
                    })
                  }
                />
                <InputPersonalizado
                  label="VAT Nr"
                  type="text"
                  value={fields.buyer.vatNumber}
                  onChange={(e) =>
                    setFields({
                      ...fields,
                      buyer: { ...fields.buyer, vatNumber: e.target.value },
                    })
                  }
                />
                <InputPersonalizado
                  label="BUYER REF. NUMBER"
                  type="text"
                  value={fields.buyer.refNumber}
                  onChange={(e) =>
                    setFields({
                      ...fields,
                      buyer: { ...fields.buyer, refNumber: e.target.value },
                    })
                  }
                />
              </VStack>
            </GridItem>
            <GridItem w="100%">
              <VStack spacing="7">
                <InputPersonalizado label="Date" type="date" />
                <Text>Seller</Text>
                <InputPersonalizado
                  label="Name"
                  type="text"
                  value={fields.empresa.nombre}
                  onChange={(e) =>
                    setFields({
                      ...fields,
                      empresa: { ...fields.empresa, nombre: e.target.value },
                    })
                  }
                />
                <InputPersonalizado
                  label="Adress"
                  type="text"
                  value={fields.empresa.direccion}
                  onChange={(e) =>
                    setFields({
                      ...fields,
                      empresa: { ...fields.empresa, direccion: e.target.value },
                    })
                  }
                />
                <InputPersonalizado
                  label="Adress 2"
                  type="text"
                  value={fields.empresa.direccion2}
                  onChange={(e) =>
                    setFields({
                      ...fields,
                      empresa: { ...fields.empresa, direccion2: e.target.value },
                    })
                  }
                />
                <InputPersonalizado
                  label="VAT Nr"
                  type="text"
                  value={fields.empresa.vatNumber}
                  onChange={(e) =>
                    setFields({
                      ...fields,
                      empresa: { ...fields.empresa, vatNumber: e.target.value },
                    })
                  }
                />
                <Text>BANK DETAILS</Text>
                <InputPersonalizado
                  label="Beneficiary Bank"
                  type="text"
                  value={
                    fields.empresa.bank && fields.empresa.bank.beneficiaryBank
                  }
                  onChange={(e) =>
                    setFields({
                      ...fields,
                      empresa: { ...fields.empresa,bank:{...fields.empresa.bank,beneficiaryBank: e.target.value }},
                    })
                  }
                />
                <InputPersonalizado
                  label="Bank Adress"
                  type="text"
                  value={fields.empresa.bank && fields.empresa.bank.bankAdress}
                  onChange={(e) =>
                    setFields({
                      ...fields,
                      empresa: { ...fields.empresa,bank:{...fields.empresa.bank,bankAdress: e.target.value }},
                    })
                  }
                />
                <InputPersonalizado
                  label="Swift Code"
                  type="text"
                  value={fields.empresa.bank && fields.empresa.bank.swiftCode}
                  onChange={(e) =>
                    setFields({
                      ...fields,
                      empresa: { ...fields.empresa,bank:{...fields.empresa.bank,swiftCode: e.target.value }},
                    })
                  }
                />
                <InputPersonalizado
                  label="Beneficiary Name"
                  type="text"
                  value={
                    fields.empresa.bank && fields.empresa.bank.beneficiaryName
                  }
                  onChange={(e) =>
                    setFields({
                      ...fields,
                      empresa: { ...fields.empresa,bank:{...fields.empresa.bank,beneficiaryName: e.target.value }},
                    })
                  }
                />
                <InputPersonalizado
                  label="Beneficiary Account Number"
                  type="text"
                  value={
                    fields.empresa.bank &&
                    fields.empresa.bank.beneficiaryAccountNumber
                  }
                  onChange={(e) =>
                    setFields({
                      ...fields,
                      empresa: { ...fields.empresa,bank:{...fields.empresa.bank,beneficiaryAccountNumber: e.target.value }},
                    })
                  }
                />
              </VStack>
            </GridItem>
          </Grid>
          <SaleTable productos={productos} setProductos={setProductos}/>
          <Grid w="100%" templateColumns="repeat(2, 1fr)" gap={5}>
            <GridItem w="100%">
              <VStack spacing="7">
                <InputPersonalizado
                  label="Origin"
                  type="text"
                  value={fields.seller ? fields.seller.origin : ""}
                  onChange={(e) =>
                    setFields({
                      ...fields,
                      seller: { ...fields.seller, origin: e.target.value },
                    })
                  }
                />
                <InputPersonalizado
                  label="PLANT NUMBER"
                  type="text"
                  value={fields.seller ? fields.seller.plantNumber : ""}
                  onChange={(e) =>
                    setFields({
                      ...fields,
                      seller: { ...fields.seller, plantNumber: e.target.value },
                    })
                  }
                />
                <InputPersonalizado
                  label="BRAND"
                  type="text"
                  value={fields.seller ? fields.seller.brand : ""}
                  onChange={(e) =>
                    setFields({
                      ...fields,
                      seller: { ...fields.seller, brand: e.target.value },
                    })
                  }
                />
                <InputPersonalizado
                  label="PRODUCTION DATE"
                  type="text"
                  value={fields.productionDate ? fields.productionDate : ""}
                  onChange={(e) =>
                    setFields({
                      ...fields,productionDate:e.target.value,
                    })
                  }
                />
                <InputPersonalizado
                  label="SHELF LIFE"
                  type="text"
                  value={fields.shelfLife ? fields.shelfLife : ""}
                  onChange={(e) =>
                    setFields({
                      ...fields,shelfLife:e.target.value,
                    })
                  }
                />
                <InputPersonalizado
                  label="DESTINATION PORT"
                  type="text"
                  value={fields.destinationPort ? fields.destinationPort : ""}
                  onChange={(e) =>
                    setFields({
                      ...fields,destinationPort:e.target.value,
                    })
                  }
                />
                <InputPersonalizado
                  label="DESTINATION COUNTRY"
                  type="text"
                  value={fields.destinationCountry ? fields.destinationCountry : ""}
                  onChange={(e) =>
                    setFields({
                      ...fields,destinationCountry:e.target.value,
                    })
                  }
                />
                <InputPersonalizado
                  label="QUANTITY"
                  type="text"
                  value={fields.quantity ? fields.quantity : ""}
                  onChange={(e) =>
                    setFields({
                      ...fields,quantity:e.target.value,
                    })
                  }
                />
                <InputPersonalizado
                  label="SHIPMENT PERIOD"
                  type="text"
                  value={fields.shipmentPeriod ? fields.shipmentPeriod : ""}
                  onChange={(e) =>
                    setFields({
                      ...fields,shipmentPeriod:e.target.value,
                    })
                  }
                />
              </VStack>
            </GridItem>
            <GridItem w="100%">
              <VStack spacing="7">
                <InputPersonalizado
                  label="DELIVERY TERMS"
                  type="text"
                  value={
                    fields.deliveryTermsSale ? fields.deliveryTermsSale : ""
                  }
                  onChange={(e) =>
                    setFields({
                      ...fields,deliveryTermsSale:e.target.value,
                    })
                  }
                />
                <PaymentTerms
                  fields={fields}
                  setFields={setFields}
                  type="sale"
                />
                <InputPersonalizado
                  label="TOTAL PURCHASE"
                  type="text"
                  value={fields.totalPurchase ? fields.totalPurchase : ""}
                  onChange={(e) =>
                    setFields({
                      ...fields,totalPurchase:e.target.value,
                    })
                  }
                />
                <InputPersonalizado
                  label="TOTAL NET WEIGHT"
                  type="text"
                  value={fields.totalWeight ? fields.totalWeight : ""}
                  onChange={(e) =>
                    setFields({
                      ...fields,totalWeight:e.target.value,
                    })
                  }
                />
                <InputPersonalizado
                  label="COMISSION"
                  type="text"
                  value={fields.comision ? fields.comision : ""}
                />
                <InputPersonalizado
                  label="SOLD BY"
                  type="text"
                  value={fields.exportTo ? fields.exportTo : ""}
                />
                <InputPersonalizado
                  label="CONTACT NUMBER"
                  type="text"
                  value={fields.exportTo ? fields.exportTo : ""}
                />
              </VStack>
            </GridItem>
          </Grid>
          <Center>
            <Button colorScheme="orange">Finalizar</Button>
          </Center>
        </VStack>
      </CardBody>
    </Card>
  );
}
