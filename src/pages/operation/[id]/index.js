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
  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: 4,
  });
  const [showStep, setShowStep] = useState("Commercial");
  const [completadoComercial, setCompletadoComercial] = useState(0);
  const [completadoDocs, setCompletadoDocs] = useState(0);
  const [completadoLogistica, setCompletadoLogistica] = useState(0);
  const [completadoContable, setCompletadoContable] = useState(0);

  useEffect(() => {
    if (operation) {
      setCompletadoComercial(() => {
        let totalFields = 25;
        const fields = operation.comercial.fields;
        if (fields?.comision) totalFields = totalFields + 1;
        let completedFields = Object.values(fields).filter(Boolean).length;
        if (fields.comentarios) completedFields -= 1;
        if (fields.shipmentPeriod) completedFields -= 1;
        return Math.floor((completedFields / totalFields) * 100);
      });
      setCompletadoDocs(() => {
        let totalFields = 11;
        const fields = operation.docs.fields;
        let completedFields = 0;
        if (fields.documentRequested.length > 0) {
          completedFields += 1;
          totalFields += 1;
        }
        if (fields.date) completedFields += 1;
        if (fields.responsable) completedFields += 1;
        if (fields.terminosFlete) completedFields += 1;
        if (fields.descriptionGoods) completedFields += 1;
        if (fields.descriptionGoods2) completedFields += 1;
        if (fields.temperature) completedFields += 1;
        if (fields.consignee.nombre) completedFields += 1;
        if (fields.notify.nombre) completedFields += 1;
        if (fields.consigneeRest.nombre) completedFields += 1;
        if (fields.placeBLIssue) completedFields += 1;
        if (fields.tipoContenedor) completedFields += 1;
        return Math.floor((completedFields / totalFields) * 100);
      });
      setCompletadoLogistica(() => {
        let totalFields = 13;
        const fields = operation.logistica.fields;
        let completedFields = Object.values(fields).filter(Boolean).length;
        return Math.floor((completedFields / totalFields) * 100);
      });
      setCompletadoContable(() => {
        let totalFields = 21;
        const fields = operation.contableFinanciera.fields;
        let completedFields = Object.values(fields).filter(Boolean).length;
        return Math.floor((completedFields / totalFields) * 100);
      });
    }
  }, [operation]);
  const steps = [
    {
      title: "Commercial",
      description: `${completadoComercial}% completado`,
    },
    {
      title: "Docs",
      description: `${completadoDocs}% completado`,
    },
    {
      title: "Logistics",
      description: `${completadoLogistica}% completado`,
    },
    {
      title: "Finance",
      description: `${completadoContable}% completado`,
    },
  ];
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
          <Grid w="100%" templateColumns="repeat(4, 1fr)" h={7} gap={4}>
            <GridItem w="100%">
              <Text fontSize="2xl" fontWeight="bold">
                Status
                <StateSelector
                  selected={operation.status}
                  refNumber={operation.id}
                />
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
                  <Badge ml="1" fontSize="1em" colorScheme="green">
                    {operation.comercial.fields.empresa.nombre}
                  </Badge>
                </Text>
              )}
            </GridItem>
            <GridItem w="100%" display="flex" justifyContent="center">
              {operation.comercial.fields.operationType && (
                <Text fontSize="2xl" fontWeight="bold">
                  <Badge ml="1" fontSize="1em" colorScheme="green">
                    {operation.comercial.fields.operationType}
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
