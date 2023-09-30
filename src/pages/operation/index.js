import {
  Box,
  Text,
  Button,
  Flex,
} from "@chakra-ui/react";
import Router from "next/router";

export default function NuevaOperacion() {
  const handleConfirm = () => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.API_URL}/operation/new-operation`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.json())
      .then((data) => Router.push(`operation/${data.id}`))
  };
  return (
    <Box
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      borderRadius={"15px"}
      minHeight="96vh"
      p={2}
    >
        <Flex h="70vh" align="center" justifyContent="center" flexDirection="column" flexWrap="wrap">
          <Text marginBottom="1%">Desea crear una nueva operacion?</Text>
          <Button onClick={handleConfirm}>Confirmar</Button>
        </Flex>
    </Box>
  );
}
