import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Badge,
  Select,
  useColorModeValue
} from "@chakra-ui/react";
import { Loadder } from "./loadder";

export const StateSelector = ({ selected, refNumber }) => {
  const options = ["New", "Pending Shipment","Draft","Originals", "Finished","Canceled"];
  // Objeto que mapea opciones a colores
  const colorMap = {
    New: "purple",
    "Pending Shipment": "blue",
    "Draft":"yellow",
    "Originals":"orange",
    Finished: "green",
    "Canceled":"red"
  };

  const [selectedValue, setSelectedValue] = useState(selected);
  useEffect(() => {
    setSelectedValue(selected)
  },[selected])
  const [isLoading, setIsLoading] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const color = useColorModeValue('black','white');
  const handleChange = (event, refNumber) => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    const selectedOption = event.target.value;
    
    fetch(`${process.env.API_URL}/operation/by-ref/${refNumber}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: selectedOption }),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("La solicitud no fue exitosa");
      }
      return response.json();
    })
    .then(() => {
      setIsLoading(false);
      setSelectedValue(selectedOption); // Update with the selected option
      setIsPopoverOpen(false); // Close the Popover when the request is successful
    })
    .catch((err) => {
      setIsLoading(false);
      console.log(err);
    });
  };
  

  return (
    <Popover
      isOpen={isPopoverOpen}
      onOpen={() => setIsPopoverOpen(true)} // Abre el Popover cuando sea necesario
      placement="bottom"
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <Badge ml="1" fontSize="1em" colorScheme={colorMap[selectedValue]} _hover={{cursor:"pointer"}}>
          {selectedValue}
        </Badge>
      </PopoverTrigger>
      <PopoverContent bg="transparent" backdropFilter="blur(20px) saturate(1.5)" border="1px" borderColor="Background" shadow="md" >
        <PopoverHeader pt={4} fontWeight="bold" border="0">
          {refNumber}
        </PopoverHeader>
        <PopoverArrow bg="transparent"/>
        <PopoverCloseButton onClick={() => setIsPopoverOpen(false)}/>
        <PopoverBody>
          {!isLoading ? (
            <Select
              value={selectedValue}
              variant="filled"
              mt={4}
              onChange={(e) => handleChange(e, refNumber)}
            >
              {options.map((e) => (
                <option key={e} value={e} style={{color:color}}>
                    {e}
                </option>
              ))}
            </Select>
          ) : (
            <Loadder height={20} size="md"/>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
