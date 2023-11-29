import { useEffect, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  IconButton,
  Box,
  PopoverFooter,
  Button,
  ButtonGroup,
  VStack,
  Text,
} from "@chakra-ui/react";
import { Loadder } from "./loadder";
import { FiDownload } from "react-icons/fi";
import { Select } from "chakra-react-select";
import useFetch from "@/hooks/useFetch";
export default function ImportDocs({ operation,setOperation }) {
  const [options, setOptions] = useState(undefined);
  const [selectedValue, setSelectedValue] = useState(undefined);
  const [operations] = useFetch(
    `${process.env.API_URL}/operation/listado`,
    undefined
  );
  useEffect(() => {
    if (operations) {
      setOptions(
        operations.map(function (elemento) {
          return { label: elemento.refNumber, value: elemento.refNumber };
        })
      );
    }
  }, [operations]);
  const handleChange = (refNumber) => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.API_URL}/operation/by-ref/${refNumber}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) setSelectedValue(data);
      });
  };
  const handleConfirm = () => {
    if (selectedValue) setOperation({...operation,docs:selectedValue.docs});
  };
  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        <IconButton icon={<FiDownload />} />
      </PopoverTrigger>
      <PopoverContent
        bg="transparent"
        backdropFilter="blur(20px) saturate(1.5)"
        border="1px"
        borderColor="Background"
        shadow="md"
      >
        <PopoverHeader pt={4} fontWeight="bold" border="0">
          Import Data
        </PopoverHeader>
        <PopoverArrow bg="transparent" />
        <PopoverCloseButton/>
        <PopoverBody>
          {options ? (
            <Box w="full">
              <Select
                options={options}
                variant="filled"
                isSearchable
                onChange={(e) => handleChange(e.value)}
              />
              {selectedValue && (
                <VStack
                  spacing={3}
                  mt={3}
                  mb={3}
                  alignItems="flex-start"
                  borderRadius="lg"
                  backgroundColor="white"
                >
                  <Text>
                    Shipper: {selectedValue.comercial.fields.seller.nombre}
                  </Text>
                  <Text>
                    Consignee: {selectedValue.docs.fields.consignee.nombre}
                  </Text>
                  <Text>Notify: {selectedValue.docs.fields.notify.nombre}</Text>
                </VStack>
              )}
            </Box>
          ) : (
            <Loadder height={20} size="md" />
          )}
        </PopoverBody>
        <PopoverFooter display="flex" justifyContent="flex-end">
          <ButtonGroup size="sm">
            <Button colorScheme="red">Cancel</Button>
            <Button colorScheme="blue" onClick={handleConfirm}>
              Apply
            </Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}
