import InputPersonalizado from "./inputPersonalizado";
import { convertirAMoneda } from "./convertInt";
export const ComisionesBox = ({value, handleChange, param,set }) => {
  
  return (
    <InputPersonalizado
      label="COMISIONES (USD)"
      value={value}
      onChange={(e) => handleChange(e, param,set)}
    />
  );
};
