import React from "react";
import {
  Card,
  CardBody,
  Grid,
  GridItem,
  Input,
  Text,
  VStack,
  IconButton,
  Center,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import InputPersonalizado from "@/utils/inputPersonalizado";

const Fila = ({ setDesc, setPorcentaje, handleNewPaymentTerm }) => {
  return (
    <Grid w="100%" templateColumns="repeat(12, 1fr)" gap={2}>
      <GridItem colSpan={3}>
        <InputPersonalizado
          label="%"
          type="number"
          onChange={(e) => setPorcentaje(e.target.value)}
        />
      </GridItem>
      <GridItem colSpan={7}>
        <Input
          variant="filled"
          type="text"
          onChange={(e) => setDesc(e.target.value)}
        />
      </GridItem>
      <GridItem colSpan={2}>
        <Center>
          <IconButton
            icon={<CheckIcon />}
            onClick={() => handleNewPaymentTerm()}
          />
        </Center>
      </GridItem>
    </Grid>
  );
};

export function PaymentTerms() {
  const [paymentTerms, setPaymentTerms] = React.useState([]);
  const [porcentaje, setPorcentaje] = React.useState(undefined);
  const [desc, setDesc] = React.useState(undefined);

  const handleNewPaymentTerm = () => {
    const newPaymentTerm = { porcentaje: porcentaje, descripcion: desc };
    setPaymentTerms([...paymentTerms, newPaymentTerm]);
  };

  const handleDeletePaymentTerm = (index) => {
    const updatedPaymentTerms = [...paymentTerms];
    updatedPaymentTerms.splice(index, 1);
    setPaymentTerms(updatedPaymentTerms);
  };

  return (
    <Card w="100%">
      <CardBody>
        <VStack spacing="10">
          <Text>Payment Terms</Text>
          <Fila
            setDesc={setDesc}
            setPorcentaje={setPorcentaje}
            handleNewPaymentTerm={handleNewPaymentTerm}
          />
          {paymentTerms.map((e, index) => (
            <Grid
              w="100%"
              templateColumns="repeat(12, 1fr)"
              gap={2}
              key={index}
            >
              <GridItem colSpan={3}>
                <Center>% {e.porcentaje}</Center>
              </GridItem>
              <GridItem colSpan={7}>
                <Center>{e.descripcion}</Center>
            </GridItem>
              <GridItem colSpan={2}>
                <Center>
                  <IconButton
                    icon={<CloseIcon />}
                    onClick={() => handleDeletePaymentTerm(index)}
                  />
                </Center>
              </GridItem>
            </Grid>
          ))}
        </VStack>
      </CardBody>
    </Card>
  );
}
