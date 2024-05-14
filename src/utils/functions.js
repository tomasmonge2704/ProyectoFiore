export function transformDate(date) {
  if(!date) return "";
  const partesFecha = date.split("-");
  const año = partesFecha[0];
  const mes = partesFecha[1];
  const dia = partesFecha[2];
  return (dia + "/" + mes + "/" + año);
}
export function transformDateExcel(date) {
  // Separa la fecha en año, mes y día
  if(!date) return undefined
  const [year, month, day] = date.split('-').map(Number);
  return new Date(year, month - 1, day);
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

export const handleOrderBy = (param, setFilter, setData, status) => {
  const token = localStorage.getItem("token");
  setFilter(param);
  let url = `${process.env.API_URL}/operation/filter`;
  const body = { param };
  if (status) body.status = status.map(elemento => elemento.value);;
  fetch(url, {
    method: "POST", // Método POST para enviar datos
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Especificamos JSON como tipo de contenido
    },
    body: JSON.stringify(body), // Convertimos el cuerpo a formato JSON
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
  if(diasRestantes < 0) return "Arrived"
    return `${diasRestantes} days`;
}
export function getListado(objetos) {
  return objetos.map((elemento) => ({
    status: elemento.status,
    refNumber: elemento.id,
    empleado: elemento.docs.fields.responsable,
    shipper: elemento.comercial.fields.seller.nombre,
    buyer: elemento.comercial.fields.buyer.nombre,
    buyerRef: elemento.comercial.fields.buyer.refNumber,
    empresa: elemento.comercial.fields.empresa.empresa,
    timeToArrival:calcularDiasHastaFecha(elemento.logistica.fields.eta),
    pay:transformDate(elemento.contableFinanciera.fields.fechaBalancePurchase),
    charged:transformDate(elemento.contableFinanciera.fields.fechaCobroBalance),
    containerNr:elemento.logistica.fields.containerNr
  }));
}