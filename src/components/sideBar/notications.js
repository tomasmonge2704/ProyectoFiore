import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  IconButton,
  useDisclosure,
  VStack,
  Box,
  Text,
  Badge,
  Divider
} from "@chakra-ui/react";
import { FiBell } from "react-icons/fi";

export default function NotificationsIcon ({ notificaciones,cantidadNotificaciones }) {
  const { isOpen,onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButton icon={<FiBell/>} onClick={onOpen}/>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Notificaciones</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          {cantidadNotificaciones > 0 ? (
                notificaciones.map((notificacion, index) => (
                  <VStack key={index} spacing={3}>
                    <Box
                    w="full"
                    p={2}
                    mt={2}
                      borderLeft="5px solid orange"
                      _hover={{ shadow: "md"}}
                    >
                      <Text as="b">{notificacion.refNumber}</Text>
                      <Text alignItems="center">Is arriving in <Badge ml={1} colorScheme="orange">{notificacion.timeToArrival}</Badge></Text>
                    </Box>
                    <Divider />
                  </VStack>
                ))
              ) : (
                <Text>No hay notificaciones</Text>
              )}
          </ModalBody>

          <ModalFooter>

          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
