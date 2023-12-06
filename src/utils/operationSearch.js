import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Badge,
  Flex,
  Button,
  Input,
  Center,
} from "@chakra-ui/react";
import Router from "next/router";
export const OperationSearch = ({ operationId }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [refNumber, setRefnumber] = useState(operationId);
  const handleConfirm = () => {
    Router.push("/operation/" + refNumber);
  };

  return (
    <Popover
      isOpen={isPopoverOpen}
      onOpen={() => setIsPopoverOpen(true)} // Abre el Popover cuando sea necesario
      placement="bottom"
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <Badge
          ml="1"
          fontSize="1em"
          colorScheme="green"
          _hover={{ cursor: "pointer" }}
        >
          {operationId}
        </Badge>
      </PopoverTrigger>
      <PopoverContent
        bg="transparent"
        backdropFilter="blur(20px) saturate(1.5)"
        border="1px"
        borderColor="Background"
        shadow="md"
      >
        <PopoverHeader pt={4} fontWeight="bold" border="0">
          Change Operation
        </PopoverHeader>
        <PopoverArrow bg="transparent" />
        <PopoverCloseButton onClick={() => setIsPopoverOpen(false)} />
        <PopoverBody>
          <Flex>
            <Input
              defaultValue={refNumber}
              variant="filled"
              type="number"
              onChange={(e) => setRefnumber(e.target.value)}
            />
          </Flex>
          <Center><Button mt={5} onClick={handleConfirm} colorScheme="blue">Confirmar</Button></Center>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
