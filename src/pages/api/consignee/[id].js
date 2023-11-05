import authMiddleware from "@/libs/auth";
import Controllers from "@/libs/controllers";
import ConsigneeModel from "@/models/consignee";
const controllers = new Controllers(ConsigneeModel);
async function handler(req, res) {
    if (req.method === 'PUT') {
        controllers.updateById(req,res);
    };
    if(req.method === "GET"){
        controllers.getById(req,res);
    }
}
export default authMiddleware(handler);