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
  Center,
  Spinner
} from "@chakra-ui/react";
import { useState,useEffect } from "react";
export default function NuevaOperacion() {
  const [ operation, setOperation ] = useState(undefined);
  const [loadData, setLoadData] = useState(false);
  useEffect(() => {
      fetch(`${process.env.API_URL}/operation`)
      .then((response) => response.json())
      .then((data) => {
        setOperation(data);
        setLoadData(true)
      });
  },[]);
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
  return (
    <>
    {operation && loadData ? (<>
      <Text fontSize="xl" fontWeight="bold">
        Status
        <Badge ml="1" fontSize="0.8em" colorScheme="green">
          {operation && operation.status}
        </Badge>
      </Text>
      <Box m={4}>
        <Stepper size="lg" colorScheme="red" index={activeStep}>
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
      <Box m={1} mt={12}>
       <ContenedorOperaciones
          show={showStep}
          operation={operation}
          setOperation={setOperation}
        />
      </Box>
    </>) : (<Center h="80vh">
    <Spinner
  thickness='4px'
  speed='0.65s'
  emptyColor='gray.200'
  color='blue.500'
  size='xl'
/>
    </Center>)}
    </>
  );
}
