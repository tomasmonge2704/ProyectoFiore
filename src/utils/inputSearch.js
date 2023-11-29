import { Select } from "chakra-react-select";
import { useEffect, useState } from "react";

export const InputSearch = ({
  cartera,
  placeholder,
  searchParam,
  selectChangeLogic,
  defaultValue,
}) => {
  const [options, setOptions] = useState([]);
  const [value,setValue] = useState(defaultValue)
  useEffect(() => {
    if (cartera) {
      setOptions(
        cartera.map(function (elemento) {
          return { label: elemento[searchParam], value: elemento[searchParam] };
        })
      );
    }
  },[cartera]);
  useEffect(() => {
    setValue({label:defaultValue,value:defaultValue})
  },[defaultValue])
  const handleChange = (event) => {
    setValue(event);
    event.target = {value:event.value};
    selectChangeLogic(event);
  }
  return (
    <div style={{ width: "100%" }}>
      <Select
        styles={{width:"100%"}}
        variant="filled"
        value={value}
        isSearchable
        options={options}
        placeholder={placeholder}
        onChange={(event) => handleChange(event)}
      />
    </div>
  );
};
