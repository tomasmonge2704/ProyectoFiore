import OperationModel from "@/models/operation";
import { getListado } from "@/utils/functions";
import authMiddleware from "@/libs/auth";
import operationObjet from "@/libs/operationObjet"
async function handler(req, res) {
    try {
        const objetos = await OperationModel.find({});
        const id = String(210500 + objetos.length + 1);
        const objetoExistente = await OperationModel.findOne({ id: req.query.refNumber });
        if (!objetoExistente) {
          return res.status(404).json({ error: "Objeto no encontrado" });
        }
        const duplicatedObject = new OperationModel(objetoExistente.toObject());
        duplicatedObject.id = id;
        duplicatedObject.status = "New"
        duplicatedObject.comercial.fields.empresaRefNumber = id;
        duplicatedObject.comercial.fields.productos = duplicatedObject.comercial.fields.productos.map((e) => ({...e,netWeightLogistica:0,grossWeight:0,quantityCartons:0}));
        duplicatedObject._id = undefined;
        duplicatedObject.comercial.fields._id = undefined;
        duplicatedObject.docs = operationObjet.docs;
        duplicatedObject.logistica = operationObjet.logistica;
        duplicatedObject.contableFinanciera = operationObjet.contableFinanciera;
        const response = await duplicatedObject.save();
        res.status(200).json(getListado([response])[0]);
      } catch (error) {
        console.log(error)
        res.status(500).json({ error: error });
      }
  }

export default authMiddleware(handler);