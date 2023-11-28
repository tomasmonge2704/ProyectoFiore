import { convertirAMoneda } from "./convertInt";
import { Flex,IconButton,Badge,Text, Box } from "@chakra-ui/react";
import { FiPlus,FiMinus } from "react-icons/fi";
export const LineValue = ({ text, type, value }) => {
    return (
      <Flex display="flex" justifyContent="space-between" w="full">
        <Box>
        <IconButton
          icon={type == "+" ? <FiPlus /> : <FiMinus />}
          colorScheme="orange"
          variant="ghost"
        />
        <Text as="samp">
          {text}
        </Text>
        </Box>
        
        <Badge colorScheme="orange" fontSize="md" ml={4} mr={5} backgroundColor="transparent">
            {convertirAMoneda(value)}
          </Badge>
      </Flex>
    );
  };