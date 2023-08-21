import { TablePagination } from "@/utils/tablePagination";
import { DeleteIcon } from "@chakra-ui/icons";
import { FiSave } from "react-icons/fi";
import {
  Tr,
  Td,
  IconButton,
  Input,
  Tbody,
  Center,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Proveedores() {
  const params = [
    "Company Name",
    "Address Line 1",
    "Address Line 2",
    "Country",
    "Tax ID",
    "ACTIONS",
  ];
  const [CarteraClientes, setCarteraClientes] = useState(undefined);
  const [loadData, setLoadData] = useState(false);
  const toast = useToast();
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.API_URL}/client`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCarteraClientes(data);
        setLoadData(true);
      });
  }, []);
  const Estructura = (itemsToDisplay, setItemsToDisplay) => {
    const token = localStorage.getItem("token");
    const handleChangeInput = (event, id, parameter) => {
      const updatedProductos = itemsToDisplay.map((producto) => {
        if (producto._id === id) {
          return {
            ...producto,
            modified: true,
            [parameter]: event.target.value,
          };
        }
        return producto;
      });
      setItemsToDisplay(updatedProductos);
    };
    const handleDelete = (id) => { 
      fetch(`${process.env.API_URL}/client/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        }})
      .then((response) => response.json())
      .then((data) => {
        toast({
          title: "Cliente",
          description: `Se ha borrado correctamente.`,
          status: "success",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
      })
      .finally(() => {
        const filtered = itemsToDisplay.filter((e) => e._id !== id);
        setItemsToDisplay(filtered)
      });
    };
    const handleUpdate = (id) => {
      const buscado = itemsToDisplay.find((element) => element._id === id);
      fetch(`${process.env.API_URL}/client/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(buscado)
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        return response.json();
      })
      .then((data) => {
        toast({
          title: "Cliente",
          description: `Se ha guardado correctamente ${data.nombre}.`,
          status: "success",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: "Error",
          description: "Se ha producido un error en la solicitud.",
          status: "error",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
      })
      .finally(() => {
        // Realizar tareas finales aquí, como limpiar estados o ejecutar acciones después de la solicitud
      });
    };
    return (
      <Tbody>
        {itemsToDisplay.map((e) => (
          <Tr key={e._id}>
            <Td>
              <Input
                variant="filled"
                defaultValue={e.nombre ? e.nombre : ""}
                onChange={(event) => handleChangeInput(event, e._id, "nombre")}
              />
            </Td>
            <Td>
              <Input
                variant="filled"
                defaultValue={e.direccion ? e.direccion : ""}
                onChange={(event) =>
                  handleChangeInput(event, e._id, "direccion")
                }
              />
            </Td>
            <Td>
              <Input
                variant="filled"
                defaultValue={e.direccion2 ? e.direccion2 : ""}
                onChange={(event) =>
                  handleChangeInput(event, e._id, "direccion2")
                }
              />
            </Td>
            <Td>
              <Input
                variant="filled"
                defaultValue={e.country ? e.country : ""}
                onChange={(event) => handleChangeInput(event, e._id, "country")}
              />
            </Td>
            <Td>
              <Input
                variant="filled"
                defaultValue={e.vatNumber ? e.vatNumber : ""}
                onChange={(event) =>
                  handleChangeInput(event, e._id, "vatNumber")
                }
              />
            </Td>
            <Td>
              {e.modified ? (
                <IconButton
                  colorScheme="blue"
                  variant="solid"
                  icon={<FiSave />}
                  aria-label="save"
                  onClick={() => handleUpdate(e._id)}
                />
              ) : (
                <IconButton
                  colorScheme="red"
                  variant="solid"
                  icon={<DeleteIcon />}
                  aria-label="Delete"
                  onClick={() => handleDelete(e._id)}
                />
              )}
            </Td>
          </Tr>
        ))}
      </Tbody>
    );
  };
  return (
    <>
      {loadData ? (
        <TablePagination
          data={CarteraClientes}
          params={params}
          Estructura={Estructura}
        />
      ) : (
        <Center h="80vh">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Center>
      )}
    </>
  );
}
