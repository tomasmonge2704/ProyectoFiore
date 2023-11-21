import { Badge } from "@chakra-ui/react";

export const ComisionesBox = ({ text,fontSize,colorScheme }) => {
  return (
        <Badge colorScheme={colorScheme || "telegram"} fontSize={fontSize || "md"} w="full" textAlign="center" borderRadius="lg" p={1}>
        {text}
        </Badge>
  );
}

