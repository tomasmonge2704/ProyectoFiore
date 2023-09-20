import { Box } from "@chakra-ui/react";
import { MultiSelect } from "react-multi-select-component";


export const MultiSelector = ({ options,value,onChange,placeHolder }) => {

    return (
        <Box w="100%">
        <MultiSelect
          options={options}
          value={value}
          onChange={onChange}
          labelledBy={placeHolder}
        />
        </Box>
    );
  };

