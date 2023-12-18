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
  try{
    const { filter } = req.query;
    const objetos = await OperationModel.find().sort({ timestamp: -1 });
    let listado = getListado(objetos);
    listado = listado.filter((e) => e.status !== "Finished");
    if (filter === "refNumber") {
      listado = listado.sort((a, b) => b.refNumber - a.refNumber);
    } else if (filter === "shipper") {
      listado = listado.sort((a, b) => a.shipper.localeCompare(b.shipper));
    } else if (filter === "buyer") {
      listado = listado.sort((a, b) => a.buyer.localeCompare(b.buyer));
    } else if (filter === "status") {
      listado = listado.sort((a, b) => a.status.localeCompare(b.status));
    } else if (filter === "date") {
      listado = listado.sort((a, b) => b.timestamp - a.timestamp);
    } else if (filter === "timeToArrival") {
      listado = listado.sort(compararFechas);
    }
    res.status(200).json(listado);
  }catch (err){
    res.status(500).json({message:err})
  }
}
export default authMiddleware(handler);