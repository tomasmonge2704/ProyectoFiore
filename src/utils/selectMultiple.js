import { Select } from "chakra-react-select";
export const MultipleSelector = ({ options, set,defaultValue }) => {
  return (
    <div style={{minWidth:"35%"}}>
    <Select
      placeholder="Status..."
      options={options}
      defaultValue={defaultValue}
      onChange={(e) => set(e)}
      hideSelectedOptions={true}
      variant="filled"
      tagVariant="solid"
      isMulti
      closeMenuOnSelect={false}
      selectedOptionStyle="check"
    />
    </div>
  );
};
