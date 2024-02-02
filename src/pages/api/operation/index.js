import OperationModel from "@/models/operation";
import authMiddleware from "@/libs/auth";
async function handler(req, res) {
  try{
    const objetos = await OperationModel.find({});
    res.status(200).json(objetos);
  }catch (err){
    res.status(500).json({message:err})
  }
}
export default authMiddleware(handler);