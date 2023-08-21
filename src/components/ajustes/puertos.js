import { TablePagination } from "@/utils/tablePagination";
import { DeleteIcon } from "@chakra-ui/icons";
import { FiSave } from "react-icons/fi";
import { Tr, Td, IconButton, Input, Tbody,useToast } from "@chakra-ui/react";
export const Puertos = ({ CarteraPuertos }) => {
  const params = ["POD","PORT", "COUNTRY","REGION", "ACTIONS"];
  const toast = useToast();
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
      fetch(`${process.env.API_URL}/puertos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        }})
      .then((response) => response.json())
      .then((data) => {
        toast({
          title: "Puertos",
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
      fetch(`${process.env.API_URL}/puertos/${id}`, {
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
          title: "Puertos",
          description: `Se ha guardado correctamente ${data.pod}.`,
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
                value={e.pod ? e.pod : ""}
                onChange={(event) => handleChangeInput(event, e._id, "pod")}
              />
            </Td>
            <Td>
              <Input
                variant="filled"
                defaultValue={e.port && e.port}
                onChange={(event) => handleChangeInput(event, e._id, "port")}
              />
            </Td>
            <Td>
              <Input
                variant="filled"
                defaultValue={e.country && e.country}
                onChange={(event) => handleChangeInput(event, e._id, "country")}
              />
            </Td>
            <Td>
              <Input
                variant="filled"
                defaultValue={e.region && e.region}
                onChange={(event) => handleChangeInput(event, e._id, "region")}
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
    <TablePagination
      data={CarteraPuertos}
      params={params}
      Estructura={Estructura}
    />
  );
};
