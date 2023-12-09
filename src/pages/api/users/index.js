import authMiddleware from "@/libs/auth";
import Controllers from "@/libs/controllers";
import UserModel from "@/models/user";
const controllers = new Controllers(UserModel);
import { genSalt } from "bcrypt";
import { hash } from "bcrypt";
async function handler(req, res) {
  if (req.method === "POST") {
    // Cifrar la contraseña antes de guardarla en la base de datos
    if(req.body.password){
    const salt = await genSalt(10);
    const hashedPassword = await hash(req.body.password, salt);
    req.body.password = hashedPassword;
    }
    try {
      for (const key in req.body) {
        if (typeof req.body[key] === "string" && req.body[key].trim() === "") {
          throw new Error(`El parámetro ${key} está vacío`);
        }
      }
      const nuevoObjeto = await UserModel.create(req.body);
      res.status(201).json(nuevoObjeto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  if (req.method === "GET") {
    controllers.getAll(req, res);
  }
}

export default authMiddleware(handler);
