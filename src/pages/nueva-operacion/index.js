import { OperationContext } from "@/components/context/operationContext";
import Layout from "@/components/Layouts/main";
import { ContenedorOperaciones } from "@/components/operacion/contenedor";
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
} from "@chakra-ui/react";
import { useContext, useState } from "react";
export default function NuevaOperacion() {
  const { operation, fields, setFields, productos, setProductos } = useContext(OperationContext);
  const steps = [
    {
      title: "Comercial",
      description: `${Math.floor(operation.comercial.completed)}% completado`,
    },
    {
      title: "Docs",
      description: `${operation.docs?.completed || 0}% completado`,
    },
    {
      title: "Logistica",
      description: `${operation.logistica?.completed || 0}% completado`,
    },
    {
      title: "Contable financiera",
      description: `${
        operation.contableFinanciera?.completed || 0
      }% completado`,
    },
  ];
  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length,
  });
  const [showStep, setShowStep] = useState("Comercial");
  return (
    <Layout title="Operacion">
      <Text fontSize="xl" fontWeight="bold">
        Status
        <Badge ml="1" fontSize="0.8em" colorScheme="green">
          {operation.status}
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
        <ContenedorOperaciones show={showStep} operation={operation} fields={fields} setFields={setFields} productos={productos} setProductos={setProductos} />
      </Box>
    </Layout>
  );
}
