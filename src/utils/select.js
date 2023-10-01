import { Select } from "@chakra-ui/react";

export const SelectComponent = ({options,textDefault,value,param,handleIndexChange}) => {
    return (
        <Select value={value} onChange={handleIndexChange}>
      <option value="" disabled>
        {textDefault}
      </option>
        {options.map((e, index) => (
          <option value={e[param]} key={index}>
            {e[param]}
          </option>
        ))}
      </Select>
    )
}