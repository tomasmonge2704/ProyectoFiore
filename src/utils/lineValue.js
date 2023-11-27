import { convertirAMoneda } from "./convertInt";
import { Flex,IconButton,Badge,Text } from "@chakra-ui/react";
import { FiPlus,FiMinus } from "react-icons/fi";
export const LineValue = ({ text, type, value }) => {
    return (
      <Flex alignItems="center">
        <IconButton
          icon={type == "+" ? <FiPlus /> : <FiMinus />}
          colorScheme="orange"
          variant="ghost"
        />
        <Text as="samp">
          {text}
          <Badge colorScheme="orange" fontSize="md" ml={4}>
            {convertirAMoneda(value)}
          </Badge>
        </Text>
      </Flex>
    );
  };