import { Box, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { FiEye } from "react-icons/fi";
import InputPersonalizado from "./inputPersonalizado";
import { useState } from "react";

export const ComisionesBox = ({value, handleChange, defaultValue, param, set, hoverEffect, detalle}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  return (
    <Box w='full' display='flex'>
      <InputPersonalizado
        label="COMISIONES"
        defaultValue={defaultValue}
        hoverEffect={hoverEffect}
        value={value}
        onChange={(e) => handleChange(e, param, set)}
      />
      <IconButton icon={<FiEye />} onClick={handleModalOpen} />
      <Modal isOpen={isOpen} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Detalles de Comisiones</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {value}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
