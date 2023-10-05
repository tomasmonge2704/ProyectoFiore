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
  Center,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useStore } from "@/store/operation";
import { Loadder } from "@/utils/loadder";
import { useRouter } from "next/router";
import { StateSelector } from "@/utils/stateSelector";
export default function NuevaOperacion() {
  const operation = useStore((state) => state.operation);
  const setOperation = useStore((state) => state.setOperation);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (router.query.id) {
      fetch(`${process.env.API_URL}/operation/by-ref/${router.query.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) setOperation(data);
        })
        .finally(() => setIsLoading(false));
    }
  }, [router.query]);
  const steps = [
    {
      title: "Commercial",
      description: `${
        operation ? operation.comercial.completed : 0
      }% completado`,
    },
    {
      title: "Docs",
      description: `${operation ? operation.docs.completed : 0}% completado`,
    },
    {
      title: "Logistics",
      description: `${
        operation ? operation.logistica.completed : 0
      }% completado`,
    },
    {
      title: "Finance",
      description: `${
        operation ? operation.contableFinanciera.completed : 0
      }% completado`,
    },
  ];
  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length,
  });
  const [showStep, setShowStep] = useState("Commercial");

  return (
    <Box
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      borderRadius={"15px"}
      minHeight="96vh"
      p={2}
    >
      {isLoading == true ? (
        <Center>
        <Loadder />
        </Center>
      ) : !operation ? (
        <Center h="100%">
            <Text>No se ha encontrado la Operacion {router.query.refNumber}</Text>
        </Center>
        
      ) : (
        <>
          <Grid w="100%" templateColumns="repeat(3, 1fr)" h={7} gap={4}>
            <GridItem w="100%">
              <Text fontSize="2xl" fontWeight="bold">
                Status
                <StateSelector selected={operation.status} refNumber={operation.id} />
              </Text>
            </GridItem>
            <GridItem w="100%" display="flex" justifyContent="center">
                <Text fontSize="2xl" fontWeight="bold">
                  REF. Number
                  <Badge ml="1" fontSize="1em" colorScheme="green">
                    {operation.id}
                  </Badge>
                </Text>
            </GridItem>
            <GridItem w="100%" display="flex" justifyContent="center">
              {operation.comercial.fields.empresa.nombre && (
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
            <ContenedorOperaciones show={showStep} />
          </Box>
        </>
      )}
    </Box>
  );
}
