export function transformDate(date) {
  const partesFecha = date.split("-");
  const año = partesFecha[0];
  const mes = partesFecha[1];
  const dia = partesFecha[2];
  return dia + "/" + mes + "/" + año;
}
export function handleDuplicateOperation(id, setOperations, operations, toast) {
  const token = localStorage.getItem("token");
  fetch(`${process.env.API_URL}/operation/duplicate/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.error) setOperations([data,...operations]);
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
        description: error,
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

function calcularDiasHastaFecha(fecha) {
  if(!fecha) return "No tiene fecha ETA";
  const fechaObjetivo = new Date(fecha);
  const fechaActual = new Date();
  const diferenciaEnMilisegundos = fechaObjetivo - fechaActual;
  const diasRestantes = Math.ceil(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));
  if(diasRestantes < 0) return "Ya arrivo"
    return `${diasRestantes} días`;
}
export function getListado(objetos) {
  return objetos.map((elemento) => ({
    status: elemento.status,
    refNumber: elemento.id,
    empleado: elemento.comercial.fields.empleadoBuyer,
    shipper: elemento.comercial.fields.seller.nombre,
    buyer: elemento.comercial.fields.buyer.nombre,
    empresa: elemento.comercial.fields.empresa.empresa,
    timeToArrival:calcularDiasHastaFecha(elemento.logistica.fields.eta)
  }));
}