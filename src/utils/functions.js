export function handleDuplicateOperation(id, setOperations, operations,toast) {
    const token = localStorage.getItem("token");
    fetch(`${process.env.API_URL}/operation/duplicate/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) setOperations([...operations, data]);
        toast({
            title: "Operation",
            description: `Se ha duplicado correctamente la operacion ${data.refNumber}.`,
            status: "success",
            position: "top-right",
            duration: 5000,
            isClosable: true,
          });
      })
      .catch((error) => {
        toast({
            title: "Operation",
            description:error,
            status: "error",
            position: "top-right",
            duration: 5000,
            isClosable: true,
          });
      });
  }
  
  export const handleOrderBy = (param, setFilter, setData) => {
    const token = localStorage.getItem("token");
    setFilter(param);
    fetch(`${process.env.API_URL}/operation/orderBy/${param}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => {
        console.error("Error al ordenar las operaciones:", error);
        // Aquí puedes agregar código para manejar el error, como mostrar un mensaje al usuario.
      });
  };
  