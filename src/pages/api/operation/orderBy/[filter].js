import OperationModel from "@/models/operation";
import { getListado } from "@/utils/functions";
import authMiddleware from "@/libs/auth";
async function handler(req, res) {
  try{
    const { filter } = req.query;
    let objetos = await OperationModel.find().sort({ timestamp: -1 });
    const listado = getListado(objetos);
    if (filter === "refNumber") {
      objetos = listado.sort((a, b) => b.refNumber - a.refNumber);
    } else if (filter === "shipper") {
      objetos = listado.sort((a, b) => a.shipper.localeCompare(b.shipper));
    } else if (filter === "buyer") {
      objetos = listado.sort((a, b) => a.buyer.localeCompare(b.buyer));
    } else if (filter === "status") {
      objetos = listado.sort((a, b) => a.status.localeCompare(b.status));
    } else if (filter === "date") {
      objetos = listado.sort((a, b) => b.timestamp - a.timestamp);
    } else if (filter === "timeToArrival") {
      objetos = listado.sort((a, b) => b.timestamp - a.timestamp);
    }
    res.status(200).json(listado);
  }catch (err){
    res.status(500).json({message:err})
  }
}
export default authMiddleware(handler);