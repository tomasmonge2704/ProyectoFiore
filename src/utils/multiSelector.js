import React, { useState } from 'react';
import { Box, Checkbox, VStack, Text, HStack } from '@chakra-ui/react';

export const MultiSelect = ({ options, onChange }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const handleOptionChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }

    // Llama a la función onChange con las opciones seleccionadas
    if (onChange) {
      onChange(selectedOptions);
    }
  };

  return (
    <VStack align="start" spacing={2}>
      {!isEditing && (
        <HStack spacing={2}>
          {selectedOptions.map((option) => (
            <Box key={option}>
              <Text>{option}</Text>
            </Box>
          ))}
          <Box>
            <button onClick={() => setIsEditing(true)}>Editar</button>
          </Box>
        </HStack>
      )}

      {isEditing && (
        <>
          {options.map((option) => (
            <Box key={option}>
              <Checkbox
                isChecked={selectedOptions.includes(option)}
                onChange={() => handleOptionChange(option)}
              >
                <Text>{option}</Text>
              </Checkbox>
            </Box>
          ))}
          <Box>
            <button onClick={() => setIsEditing(false)}>Guardar</button>
          </Box>
        </>
      )}
    </VStack>
  );
};

