import InputPersonalizado from "@/utils/inputPersonalizado";
import { Select } from "@chakra-ui/react";

export const OperationType = ({ fields, setFields }) => {
  const handleIndexChange = (e) => {
    setFields({ ...fields, operationType: e.target.value })
  };
  return (
    <>
      <Select value={fields.operationType ? fields.operationType : ""} onChange={(e) => handleIndexChange(e)}>
      <option value="" disabled>
        Operation Type
      </option>
        <option value="Trading">Trading</option>
        <option value="Trading + Marketing">Trading + Marketing</option>
        <option value="Broker">Broker</option>
      </Select>
      {fields?.operationType == "Broker" && (
        <InputPersonalizado
          type="number"
          label="Comisión"
          value={fields.comision || ""}
          onChange={(e) => setFields({...fields,comision: e.target.value,})}
        />
      )}
    </>
  );
};
