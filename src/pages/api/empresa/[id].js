import authMiddleware from "@/libs/auth";
import Controllers from "@/libs/controllers";
import EmpresaModel from "@/models/empresa";
const controllers = new Controllers(EmpresaModel);
async function handler(req, res) {
    if (req.method === 'PUT') {
        controllers.updateById(req,res);
    };
    if(req.method === "GET"){
        controllers.getById(req,res);
    }
}
export default authMiddleware(handler);