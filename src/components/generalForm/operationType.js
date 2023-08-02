import InputPersonalizado from "@/utils/inputPersonalizado";
import { Select } from "@chakra-ui/react";

export const OperationType = ({ purchase, setPurchase }) => {
  const handleIndexChange = (e) => {
    setPurchase({ ...purchase, operationType: e.target.value })
  };
  return (
    <>
      <Select value={purchase.operationType ? purchase.operationType : ""} onChange={(e) => handleIndexChange(e)}>
      <option value="" disabled>
        Operation Type
      </option>
        <option value="Trading">Trading</option>
        <option value="Trading + Marketing">Trading + Marketing</option>
        <option value="Broker">Broker</option>
      </Select>
      {purchase?.operationType == "Broker" && (
        <InputPersonalizado
          type="number"
          label="Comisión"
          value={purchase.comision || ""}
          onChange={(e) => setPurchase({...purchase,comision: e.target.value,})}
        />
      )}
    </>
  );
};
