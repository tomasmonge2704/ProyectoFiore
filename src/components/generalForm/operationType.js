import InputPersonalizado from "@/utils/inputPersonalizado";
import { Select } from "@chakra-ui/react";

export const OperationType = ({ operation, setOperation }) => {
  const handleIndexChange = (e) => {
    setOperation((prevOperation) => ({
      ...prevOperation,
      operationType: e.target.value,
    }));
  };
  return (
    <>
      <Select value={operation.operationType ? operation.operationType : ""} onChange={(e) => handleIndexChange(e)}>
      <option value="" disabled>
        Operation Type
      </option>
        <option value="Trading">Trading</option>
        <option value="Trading + Marketing">Trading + Marketing</option>
        <option value="Broker">Broker</option>
      </Select>
      {operation?.operationType == "Trading + Marketing" && (
        <InputPersonalizado
          type="number"
          label="Comision"
          value={operation.comision}
          onChange={(e) => setOperation((prevOperation) => ({
            ...prevOperation,
            comision: e.target.value,
          }))}
        />
      )}
    </>
  );
};
