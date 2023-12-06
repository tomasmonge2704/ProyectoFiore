import { Select } from "@chakra-ui/react";
export const ShelfLife = ({ fields, handleChange }) => {
  return (
    <Select
      value={fields.shelfLife ? fields.shelfLife : ""}
      onChange={(e) => handleChange(e.target.value, "shelfLife")}
    >
      <option value="" disabled>
        SHELF LIFE
      </option>
      <option value="12 Months">12 Months</option>
      <option value="18 Months">18 Months</option>
      <option value="24 Months">24 Months</option>
    </Select>
  );
};
