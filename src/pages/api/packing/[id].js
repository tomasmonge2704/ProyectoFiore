import authMiddleware from "@/libs/auth";
import Controllers from "@/libs/controllers";
import PackingModel from "@/models/packing"; 
const controllers = new Controllers(PackingModel);
async function handler(req, res) {
    if (req.method === 'PUT') {
        controllers.updateById(req,res);
    };
    if(req.method === "GET"){
        controllers.getById(req,res);
    }
}
export default authMiddleware(handler);