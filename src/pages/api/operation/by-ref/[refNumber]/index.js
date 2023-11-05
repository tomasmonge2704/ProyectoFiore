import OperationModel from "@/models/operation";
import authMiddleware from "@/libs/auth";
async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const objeto = await OperationModel.findOne({ id: req.query.refNumber });
      if (!objeto) {
        return res.status(404).json({ error: "Objeto no encontrado" });
      }
      res.json(objeto);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  if(req.method === "PUT"){
    try {
        const objetoActualizado = await OperationModel.findOneAndUpdate(
          { id: req.query.refNumber }, // El campo para buscar el documento
          req.body, // Los datos con los que actualizar el documento
          { new: true } // Opciones para devolver el documento actualizado
        );
        res.json(objetoActualizado);
      } catch (error) {
        res.status(500).json({ error: error });
      }
  }
}

export default authMiddleware(handler);
