import OperationModel from "@/models/operation";
import { getListado } from "@/utils/functions";
import authMiddleware from "@/libs/auth";
async function handler(req, res) {
  try{
    const { params } = req.query;
    let objetos = await OperationModel.find().sort({ timestamp: -1 });
    const listado = getListado(objetos);
    if (params.length > 0) {
        const receivedArray = params.split('-');
        const filteredOptions = listado.filter(option => receivedArray.includes(option.status));
        return res.status(200).json(filteredOptions.sort((a, b) => a.status.localeCompare(b.status)));
    }
    return res.status(200).json(listado);    
  }catch (err){
    res.status(500).json({message:err})
  }
}
export default authMiddleware(handler);