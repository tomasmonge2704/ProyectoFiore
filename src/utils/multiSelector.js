import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";


export const MultiSelector = ({ options, onChange,placeHolder }) => {
    const [selected, setSelected] = useState([]);

    return (
        <Box w="100%">
        <MultiSelect
          options={options}
          value={selected}
          onChange={setSelected}
          labelledBy={placeHolder}
        />
        </Box>
    );
  };

