import authMiddleware from "@/libs/auth";
import Controllers from "@/libs/controllers";
import PackingModel from "@/models/packing"; 
const controllers = new Controllers(PackingModel);
async function handler(req, res) {
    if (req.method === 'POST') {
        controllers.create(req,res);
    };
    if(req.method === "GET"){
        controllers.getAll(req, res);    
    }
};

export default authMiddleware(handler);