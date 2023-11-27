import InputPersonalizado from "./inputPersonalizado";
import { convertirAMoneda } from "./convertInt";
export const ComisionesBox = ({value, handleChange, param,set }) => {
  
  return (
    <InputPersonalizado
      label="COMISIONES"
      value={convertirAMoneda(value)}
      onChange={(e) => handleChange(e, param,set)}
    />
  );
};
