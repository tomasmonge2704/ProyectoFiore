import { Select } from "chakra-react-select";
export const MultipleSelector = ({ options, set }) => {
  return (
    <Select
      placeholder="Status..."
      options={options}
      onChange={(e) => set(e)}
      hideSelectedOptions={false}
      variant="filled"
      tagVariant="solid"
      isMulti
      closeMenuOnSelect={false}
      selectedOptionStyle="check"
    />
  );
};
