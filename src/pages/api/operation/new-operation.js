import OperationModel from "@/models/operation";
import authMiddleware from "@/libs/auth";
import operationObjet from "@/libs/operationObjet"
async function handler(req, res) {
    try {
        let objetos = await OperationModel.find({});
        const id = String(210500 + objetos.length + 1);
        operationObjet.id = id;
        operationObjet.comercial.fields.empresaRefNumber = id;
        await OperationModel.create(operationObjet);
        res.status(200).json({ id: id });
      } catch (error) {
        res.status(500).json({ error: error });
      }
}
export default authMiddleware(handler);
