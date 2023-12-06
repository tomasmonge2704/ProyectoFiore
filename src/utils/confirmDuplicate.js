import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  IconButton,
  Text,
  VStack,
  Button,
} from "@chakra-ui/react";
import { Loadder } from "./loadder";
import { handleDuplicateOperation } from "./functions";
import { FiCopy } from "react-icons/fi";
export const ConfirmDuplicate = ({
  refNumber,
  toast,
  operations,
  setOperations,
}) => {
  const initialFocusRef = React.useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  return (
    <Popover
      isOpen={isPopoverOpen}
      onOpen={() => setIsPopoverOpen(true)} // Abre el Popover cuando sea necesario
      initialFocusRef={initialFocusRef}
      placement="left"
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <IconButton
          colorScheme="blue"
          variant="solid"
          icon={<FiCopy />}
          aria-label="Duplicate"
        />
      </PopoverTrigger>
      <PopoverContent
        bg="transparent"
        backdropFilter="blur(30px) saturate(1.5)"
        border="1px"
        borderColor="Background"
        shadow="md"
      >
        <PopoverHeader pt={4} fontWeight="bold" border="0"></PopoverHeader>
        <PopoverArrow bg="transparent" />
        <PopoverCloseButton onClick={() => setIsPopoverOpen(false)} />
        <PopoverBody >
          {!isLoading ? (
            <VStack spacing={5} textAlign="center" mt={2}>
              <Text fontSize="sm">Esta seguro de duplicar esta operacion {refNumber}?</Text>
              <Button
                onClick={() =>
                  handleDuplicateOperation(
                    refNumber,
                    setOperations,
                    operations,
                    toast
                  )
                }
                colorScheme="cyan"
              >
                Confirmar
              </Button>
            </VStack>
          ) : (
            <Loadder height={20} size="md" />
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
