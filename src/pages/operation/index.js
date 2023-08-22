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
} from "@chakra-ui/react";
import { useState } from "react";

export default function NuevaOperacion() {
  function obtenerFechaActual() {
    const hoy = new Date();
    const dia = hoy.getDate().toString().padStart(2, "0");
    const mes = (hoy.getMonth() + 1).toString().padStart(2, "0"); // Los meses comienzan en 0 (enero=0, febrero=1, etc.)
    const anio = hoy.getFullYear();

    return `${anio}-${mes}-${dia}`;
  }
  const [operation, setOperation] = useState({
    comercial: {
      title: "Comercial",
      completed: 0,
      fields: {
        orderNumber: "",
        supplierRefNumber: "",
        date: obtenerFechaActual(),
        empresa: {
          nombre: "",
          empresa: "",
          direccion: "",
          direccion2: "",
          vatNumber: "",
          bank: {
            beneficiaryBank: "",
            bankAdress: "",
            swiftCode: "",
            beneficiaryName: "",
            beneficiaryAccountNumber: "",
          },
        },
        seller: {
          nombre: "",
          direccion: "",
          direccion2: "",
          pais: "",
          cuit: "",
          refNumber: "",
        },
        buyer: {
          direccion: "",
          direccion2: "",
          vatNumber: "",
          refNumber: "",
        },
        productos: [
          {
            id: "",
            description: "",
            packing: "",
            quantity: "",
            unitPricePurchase: "",
            unitPriceSale: "",
            amountSale: "",
            amountPurchase: "",
          },
        ],
        totalPurchase: 0,
        totalSale: 0,
        totalWeight: 0,
        productionDate: "",
        shelfLife: "",
        destinationPort: "",
        destinationCountry: "",
        quantity: "",
        shipmentPeriod: "",
        deliveryTermsSale: "",
        deliveryTermsPurchase: "",
        paymentTermsSale: "",
        paymentTermsPurchase: "",
        exportTo: "",
      },
    },
    docs: { title: "Docs", completed: 0 },
    logistica: { title: "Logistica", completed: 0 },
    contableFinanciera: { title: "Contable financiera", completed: 0 },
    status: "New",
  });
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
      <Text fontSize="xl" fontWeight="bold">
        Status
        <Badge ml="1" fontSize="0.8em" colorScheme="green">
          {operation && operation.status}
        </Badge>
      </Text>
      <Box m={4}>
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
      <Box m={1} mt={12}>
        <ContenedorOperaciones
          show={showStep}
          operation={operation}
          setOperation={setOperation}
        />
      </Box>
    </>
  );
}
