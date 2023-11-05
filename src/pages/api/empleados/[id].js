import authMiddleware from "@/libs/auth";
import Controllers from "@/libs/controllers";
import EmpleadoModel from "@/models/empleados";
const controllers = new Controllers(EmpleadoModel);
async function handler(req, res) {
    if (req.method === 'PUT') {
        controllers.updateById(req,res);
    };
    if(req.method === "GET"){
        controllers.getById(req,res);
    }
}
export default authMiddleware(handler);