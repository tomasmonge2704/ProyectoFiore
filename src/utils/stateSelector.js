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
  Select,
} from "@chakra-ui/react";
import { Loadder } from "./loadder";

export const StateSelector = ({ selected, refNumber }) => {
  const options = ["New", "Pending Shipment","Draft","Originals", "finished","Canceled"];
  // Objeto que mapea opciones a colores
  const colorMap = {
    New: "purple",
    "Pending Shipment": "blue",
    "Draft":"yellow",
    "Originals":"orange",
    finished: "green",
    "Canceled":"red"
  };

  const initialFocusRef = React.useRef();
  const [selectedValue, setSelectedValue] = useState(selected);
  const [isLoading, setIsLoading] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

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
    }).then((response) => {
        if (!response.ok) {
          throw new Error("La solicitud no fue exitosa");
        }
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        setSelectedValue(data);
        setIsPopoverOpen(false); // Cerrar el Popover cuando la petición sea exitosa
      })
      .catch((err) => {
        setIsLoading(false);
        alert(err)
      });
  };

  return (
    <Popover
      isOpen={isPopoverOpen}
      onOpen={() => setIsPopoverOpen(true)} // Abre el Popover cuando sea necesario
      initialFocusRef={initialFocusRef}
      placement="bottom"
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <Badge ml="1" fontSize="1em" colorScheme={colorMap[selectedValue]}>
          {selectedValue}
        </Badge>
      </PopoverTrigger>
      <PopoverContent color="white" bg="blue.800" borderColor="blue.800">
        <PopoverHeader pt={4} fontWeight="bold" border="0">
        </PopoverHeader>
        <PopoverArrow bg="blue.800" />
        <PopoverCloseButton onClick={() => setIsPopoverOpen(false)}/>
        <PopoverBody>
          {!isLoading ? (
            <Select
              value={selectedValue}
              onChange={(e) => handleChange(e, refNumber)}
            >
              {options.map((e) => (
                <option key={e} value={e}>
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
