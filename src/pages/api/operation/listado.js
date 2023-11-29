import OperationModel from "@/models/operation";
import { getListado } from "@/utils/functions";
import authMiddleware from "@/libs/auth";
async function handler(req, res) {
  try{
    const objetos = await OperationModel.find({});
    const listado = getListado(objetos).sort((a, b) => b.refNumber - a.refNumber);
    res.status(200).json(listado);
  }catch (err){
    console.log(err)
    res.status(500).json({message:err})
  }
}
export default authMiddleware(handler);