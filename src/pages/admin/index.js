import { useStoreUser } from "@/store/user";
import { EditIcon } from "@chakra-ui/icons";
import { Center, Table,Thead,Tr,Th,Td,IconButton, TableContainer, Tbody, Text,Box, Avatar } from "@chakra-ui/react";
import useFetch from "@/hooks/useFetch";
export default function Admin() {
  const user = useStoreUser((state) => state.user);
  const [Usuarios] = useFetch(`${process.env.API_URL}/users`, []);
  return (
    <>
      {user.role !== "admin" ? (
        <Center h="100vh">
          <Text fontSize="2xl" as="b">
            Only administrators.
          </Text>
        </Center>
      ) : (
        <Box shadow="lg" borderRadius={10} minH="96vh">
        <TableContainer w="full">
          <Table size="lg">
            <Thead>
              <Tr>
                <Th>User</Th>
                <Th>Mail</Th>
                <Th>Role</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {Usuarios.map((e, index) => (
                  <Tr key={index}>
                    <Td display="flex" alignItems="center">
                        <Avatar src={e.avatar} mr={3}/>
                      <Text as="b">{e.username}</Text>
                    </Td>
                    <Td>
                      <Text as="b">{e.mail}</Text>
                    </Td>
                    <Td>
                      <Text as="b">{e.role}</Text>
                    </Td>
                    <Td>
                      <IconButton
                        colorScheme="orange"
                        variant="solid"
                        icon={<EditIcon />}
                        aria-label="save"
                      />
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
        </Box>
      )}
    </>
  );
}
