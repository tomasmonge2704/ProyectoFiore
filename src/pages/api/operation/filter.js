import OperationModel from "@/models/operation";
import { getListado } from "@/utils/functions";
import authMiddleware from "@/libs/auth";
function compararFechas(a, b) {
  // Manejar el caso de "no tiene fecha ETA"
  if (a.timeToArrival === "No tiene fecha ETA" || a.timeToArrival === "Arrived") {
    return 1;
  }
  if (b.timeToArrival === "No tiene fecha ETA" || b.timeToArrival === "Arrived") {
    return -1;
  }

  // Extraer el número de días de la cadena y convertirlo a número
  const diasA = parseInt(a.timeToArrival);
  const diasB = parseInt(b.timeToArrival);

  // Comparar los números de días
  return diasA - diasB;
}
async function handler(req, res) {
    try {
      const { param, status } = req.body;
      const objetos = await OperationModel.find({});
      let listado = getListado(objetos).sort((a, b) => b.refNumber - a.refNumber);
      const sortFunctions = {
        refNumber: (a, b) => b.refNumber - a.refNumber,
        shipper: (a, b) => {
          if (!a.shipper && !b.shipper) return 0;
          if (!a.shipper) return 1;
          if (!b.shipper) return -1;
          return a.shipper.localeCompare(b.shipper);
        },
        buyer: (a, b) => {
          if (!a.buyer && !b.buyer) return 0;
          if (!a.buyer) return 1;
          if (!b.buyer) return -1;
          return a.buyer.localeCompare(b.buyer);
        },
        date: (a, b) => b.timestamp - a.timestamp,
        timeToArrival: compararFechas
      };
  
      if (param && sortFunctions[param]) listado = listado.sort(sortFunctions[param]);
      if (status && status.length > 0) listado = listado.filter(option => status.includes(option.status));
      res.status(200).json(listado);
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: err });
    }
}


  
export default authMiddleware(handler);