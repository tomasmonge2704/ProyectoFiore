import { Center, useToast, Button } from "@chakra-ui/react";
export const ConfirmButton = ({ operation }) => {
  const toast = useToast();
  const saveFormHandler = () => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.API_URL}/operation/by-ref/${operation.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(operation),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("La solicitud no fue exitosa");
        }
        return response.json();
      })
      .then((data) => {
        toast({
          title: "Operation",
          description: `Se ha guardado correctamente (${data.id}).`,
          status: "success",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.error(err);
        toast({
          title: "Operation",
          description: `Se ha producido un error.`,
          status: "error",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
      });
  };
  return (
    <Center>
      <Button colorScheme="orange" onClick={saveFormHandler}>
        Guardar
      </Button>
    </Center>
  );
};
