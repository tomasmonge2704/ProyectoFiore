import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  Alert,
  AlertIcon,
  Select
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import InputPersonalizado from "./inputPersonalizado";
export const EditModal = ({
  isOpen,
  onClose,
  title,
  params,
  element,
  onSave,
  response,
  countries
}) => {
  const [newElement,setNewElement] = useState(element);
  useEffect(() => {
    setNewElement(element)
  },[element])
  const hanleSave = () => {
    onSave(newElement);
    setNewElement(undefined);
  };
  const handleChange = (event,param) => {
    setNewElement({...newElement,[param]:event.target.value});
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{element ? "Edit " : "Create "}{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
        {countries && <Select defaultValue={element && element.emoji} onChange={(event) => handleChange(event,"emoji")}>
            <option>Emoji</option>
            {countries.map((country,index) => 
            <option value={country.value} key={index}>{country.emoji} {country.value}</option>
            )}
        </Select>}
            {params.map((e, index) => (
                <InputPersonalizado
                  label={e.label}
                  key={index}
                  value={newElement ? newElement[e.param] : ""}
                  onChange={(event) => handleChange(event,e.param)}
                />
              ))}
            {response && (
              <Alert status={response.status} variant="left-accent">
                <AlertIcon />
                {response.message}
              </Alert>
            )}
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" onClick={hanleSave}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
