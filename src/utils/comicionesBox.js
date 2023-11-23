import { Flex, IconButton, Tooltip } from "@chakra-ui/react";
import InputPersonalizado from "./inputPersonalizado";
import { convertirAMoneda } from "./convertInt";
import { FiEye } from "react-icons/fi";
export const ComisionesBox = ({ text,monto,bank}) => {
    monto = Number(monto);
    const porcentaje = text === "COMISIONES" ? ((bank?.porcentaje * monto) / 100 || 0) : ((bank?.porcentajeCobranza * monto) / 100 || 0);
    const minimo = text === "COMISIONES" ? (bank?.minimo || 0) : (bank?.minimoCobranza || 0);
    const fijo = text === "COMISIONES" ? (bank?.fijo || 0) : (bank?.fijoCobranza || 0);
    const calc = monto > minimo ? porcentaje + fijo : 0;
  return (
    <Flex justifyContent="space-between" w="full">
      <InputPersonalizado label={text} value={convertirAMoneda(calc)} readOnly={true}/>
      <Tooltip label={calc ? `comision = ${convertirAMoneda(porcentaje)} + ${fijo !== 0 && convertirAMoneda(fijo) + " (fijo)"}` : ""} aria-label={text}>
         <IconButton colorScheme="blue" variant="link" icon={<FiEye/>}/>
         </Tooltip>
    </Flex>

  );
}

