import {  Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,Button } from "@chakra-ui/react"
export default function ModalCambios({isOpen,onClose,prevState,setOperation,setPurchase}) {
    const handlerContinuar = () => {
        prevState.restored = true;
        setOperation(prevState);
        setPurchase(prevState.comercial.fieldsPurchase);
        onClose()
    }
    return (
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader></ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              Se ha encontrado una operacion pendiente, deseas crear una nueva o continuar?
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={handlerContinuar}>
                Continuar
              </Button>
              <Button onClick={onClose}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    )
  }