import authMiddleware from "@/libs/auth";
import Controllers from "@/libs/controllers";
import PuertosModel from "@/models/puertos";
const controllers = new Controllers(PuertosModel);
async function handler(req, res) {
    if (req.method === 'PUT') {
        controllers.updateById(req,res);
    };
    if(req.method === "GET"){
        controllers.getById(req,res);
    }
}
export default authMiddleware(handler);