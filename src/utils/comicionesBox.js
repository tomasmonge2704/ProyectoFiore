import { Text, Tooltip } from "@chakra-ui/react";
import InputPersonalizado from "./inputPersonalizado";

export const ComisionesBox = ({ text,monto,bank,fontSize,colorScheme }) => {
    const porcentaje = text === "COMISIONES" ? (bank?.porcentaje * monto || 0) : (bank?.porcentajeCobranza * monto || 0);
    const minimo = text === "COMISIONES" ? (bank?.minimo || 0) : (bank?.minimoCobranza || 0);
    const fijo = text === "COMISIONES" ? (bank?.fijo || 0) : (bank?.fijoCobranza || 0);
    const calc = monto > minimo ? monto + porcentaje + fijo : "No supera el mínimo";
    
  return (
    <Tooltip label={calc ? `comision = ${monto} + ${porcentaje} + ${fijo}` : ""} aria-label={text}>
        <InputPersonalizado label={text} defaultValue={`${monto ? calc : "0 USD"}`} />
    </Tooltip>
  );
}

