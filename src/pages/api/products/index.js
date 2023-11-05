import authMiddleware from "@/libs/auth";
import Controllers from "@/libs/controllers";
import ProductModel from "@/models/products";
const controllers = new Controllers(ProductModel);
async function handler(req, res) {
    if (req.method === 'POST') {
        controllers.create(req,res);
    };
    if(req.method === "GET"){
        controllers.getAll(req, res);    
    }
};

export default authMiddleware(handler);