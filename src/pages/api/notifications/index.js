import OperationModel from "@/models/operation";
import { getListado } from "@/utils/functions";
import authMiddleware from "@/libs/auth";
async function handler(req, res) {
  try{
    const objetos = await OperationModel.find({});
    const listado = getListado(objetos);
    const proximos = listado.filter(item => {
        if(item.timeToArrival !== "Arrived"){
        const primerosDosCaracteres = parseInt(item.timeToArrival.substring(0, 2), 10);
        return !isNaN(primerosDosCaracteres) && primerosDosCaracteres >= 1 && primerosDosCaracteres <= 15;
        }
      });
    res.status(200).json(proximos);
  }catch (err){
    console.log(err)
    res.status(500).json({message:err})
  }
}
export default authMiddleware(handler);