import authMiddleware from "@/libs/auth";
import Controllers from "@/libs/controllers";
import PaymentTermModel from "@/models/payment-term"; 
const controllers = new Controllers(PaymentTermModel);
async function handler(req, res) {
    if (req.method === 'PUT') {
        controllers.updateById(req,res);
    };
    if(req.method === "GET"){
        controllers.getById(req,res);
    }
}
export default authMiddleware(handler);