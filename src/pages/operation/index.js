import { ContenedorOperaciones } from "@/components/operacion";
import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Box,
  Badge,
  Text,
  Grid,
  GridItem,
  Button,
  Flex,
} from "@chakra-ui/react";
import useFetch from "@/hooks/useFetch";
import { useState } from "react";
import { useStore } from "@/store/operation";
import { Loadder } from "@/utils/loadder";
export default function NuevaOperacion() {
  const operation = useStore((state) => state.operation);
  const setOperation = useStore((state) => state.setOperation);
  const steps = [
    {
      title: "Comercial",
      description: `${
        operation ? operation.comercial.completed : 0
      }% completado`,
    },
    {
      title: "Docs",
      description: `${operation ? operation.docs.completed : 0}% completado`,
    },
    {
      title: "Logistica",
      description: `${
        operation ? operation.logistica.completed : 0
      }% completado`,
    },
    {
      title: "Contable financiera",
      description: `${
        operation ? operation.contableFinanciera.completed : 0
      }% completado`,
    },
  ];
  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length,
  });
  const [showStep, setShowStep] = useState("Comercial");
  const [newOperation] = useFetch("/api/operation", undefined);
  const handleConfirm = () => {
    setOperation(newOperation);
  };
  return (
    <Box
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      borderRadius={"15px"}
      minHeight="96vh"
      p={2}
    >
      {!operation ? (
        <Flex h="70vh" align="center" justifyContent="center" flexDirection="column" flexWrap="wrap">
          <Text marginBottom="1%">Desea crear una nueva operacion?</Text>
          <Button onClick={handleConfirm}>Confirmar</Button>
        </Flex>
      ) : (
        <>
          <Grid w="100%" templateColumns="repeat(3, 1fr)" h={7} gap={4}>
            <GridItem w="100%">
              <Text fontSize="2xl" fontWeight="bold">
                Status
                <Badge ml="1" fontSize="1em" colorScheme="green">
                  {operation && operation.status}
                </Badge>
              </Text>
            </GridItem>
            <GridItem w="100%" display="flex" justifyContent="center">
              {operation && (
                <Text fontSize="2xl" fontWeight="bold">
                  REF. Number
                  <Badge ml="1" fontSize="1em" colorScheme="green">
                    {operation.comercial.fields.empresaRefNumber}
                  </Badge>
                </Text>
              )}
            </GridItem>
            <GridItem w="100%" display="flex" justifyContent="center">
              {operation && (
                <Text fontSize="2xl" fontWeight="bold">
                  Company
                  <Badge ml="1" fontSize="1em" colorScheme="green">
                    {operation.comercial.fields.empresa.nombre}
                  </Badge>
                </Text>
              )}
            </GridItem>
          </Grid>

          <Box mt={4}>
            <Stepper size="lg" colorScheme="orange" index={activeStep}>
              {steps.map((step, index) => (
                <Step
                  key={index}
                  onClick={() => {
                    setShowStep(step.title);
                    setActiveStep(index);
                  }}
                >
                  <StepIndicator>
                    <StepStatus
                      complete={
                        step.description == "100% completado" ? (
                          <StepIcon />
                        ) : (
                          <StepNumber />
                        )
                      }
                      incomplete={<StepNumber />}
                      active={<StepNumber />}
                    />
                  </StepIndicator>
                  <Box flexShrink="0">
                    <StepTitle>{step.title}</StepTitle>
                    <StepDescription>{step.description}</StepDescription>
                  </Box>
                  <StepSeparator />
                </Step>
              ))}
            </Stepper>
          </Box>
          <Box mt={5}>
            {operation ? (
              <ContenedorOperaciones
                show={showStep}
                operation={operation}
                setOperation={setOperation}
              />
            ) : (
              <Loadder />
            )}
          </Box>
        </>
      )}
    </Box>
  );
}
