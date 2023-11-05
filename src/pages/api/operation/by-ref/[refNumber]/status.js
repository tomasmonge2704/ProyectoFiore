import OperationModel from "@/models/operation";
import authMiddleware from "@/libs/auth";
async function handler(req, res) {
  if(req.method === "PUT"){
    try {
        const objetoActualizado = await OperationModel.findOneAndUpdate(
          { id: req.query.refNumber }, // El campo para buscar el documento
          {status:req.body.status}, // Los datos con los que actualizar el documento
          { new: true } // Opciones para devolver el documento actualizado
        );
        res.json(objetoActualizado.status);
      } catch (error) {
        res.status(500).json({ error: error });
      }
  }
}

export default authMiddleware(handler);
