import { useStoreUser } from "@/store/user";
import {
  Center,
  Text
} from "@chakra-ui/react";
import useFetch from "@/hooks/useFetch";
import { ContenedorTablas } from "@/utils/contenedorTablas";
export default function Admin() {
  const user = useStoreUser((state) => state.user);
  const [Usuarios, setUsuarios] = useFetch(`${process.env.API_URL}/users`, []);
  const params = [{label:"User",param:"username"},{label:"Password",param:"password"},{label:"Mail",param:"mail"},{label:"role",param:"role"}]
  return (
    <>
      {user.role == "admin" ? (
        <ContenedorTablas
          modalTitle="User"
          variant="grid"
          data={Usuarios}
          setData={setUsuarios}
          params={params}
          url="users"
        />
      ) : (
        <Center h="100vh">
          <Text fontSize="2xl" as="b">
            Only administrators.
          </Text>
        </Center>
      )}
    </>
  );
}
