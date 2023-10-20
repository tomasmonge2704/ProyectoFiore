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
  const hanleSave = () => {
    onSave(element);
  };
  const handleChange = (event,param) => {
    element = {...element,[param]:event.target.value};
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
        {countries && <Select defaultValue={element && element.emoji} onChange={(event) => handleChange(event,"emoji")}>
            <option>Emoji</option>
            {countries.map((country,index) => 
            <option value={country.value} key={index}>{country.emoji} {country.value}</option>
            )}
        </Select>}
            {element &&
              params.map((e, index) => (
                <InputPersonalizado
                  label={e.label}
                  key={index}
                  defaultValue={element[e.param]}
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
