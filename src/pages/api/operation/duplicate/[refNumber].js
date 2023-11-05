import OperationModel from "@/models/operation";
import { getListado } from "@/utils/functions";
import authMiddleware from "@/libs/auth";
async function handler(req, res) {
    try {
        let objetos = await OperationModel.find({});
        const id = String(210500 + objetos.length + 1);
        const objetoExistente = await OperationModel.findOne({ id: req.query.refNumber });
        if (!objetoExistente) {
          return res.status(404).json({ error: "Objeto no encontrado" });
        }
        const duplicatedObject = new OperationModel(objetoExistente.toObject());
        duplicatedObject.id = id;
        duplicatedObject.comercial.fields.empresaRefNumber = id;
        duplicatedObject._id = undefined;
        duplicatedObject.comercial.fields._id = undefined;
        duplicatedObject.docs.fields._id = undefined;
        duplicatedObject.logistica.fields._id = undefined;
        duplicatedObject.contableFinanciera.fields._id = undefined;
        const response = await duplicatedObject.save();
        await duplicatedObject.save();
        res.status(200).json(getListado([response])[0]);
      } catch (error) {
        console.log(error)
        res.status(500).json({ error: error });
      }
  }

export default authMiddleware(handler);