import { Select } from "@chakra-ui/react";

export const OperationType = ({ fields, handleChange }) => {

  return (
      <Select value={fields.operationType ? fields.operationType : ""} onChange={(e) => handleChange(e.target.value,"operationType")}>
      <option value="" disabled>
        Operation Type
      </option>
        <option value="Trading">Trading</option>
        <option value="Trading + Marketing">Trading + Marketing</option>
        <option value="Broker">Broker</option>
      </Select>
  );
};
