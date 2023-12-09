import { verify } from "jsonwebtoken";
import connectMongoDb from "./mongodb";
import mongoose from "mongoose";
const secretKey = process.env.CLAVE_TOKEN;

export default function authMiddleware(handler) {
  return async (req, res) => {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).json({ error: 'Acceso no autorizado' });
    }

    verify(token.replace("Bearer ", ""), secretKey, (err,user) => {
      if (err) {
        return res.status(403).json({ error: 'Token inválido' });
      }
      if(user.user.role !== "admin"){
        return res.status(401).json({ error: 'No tiene permiso de administrador' });
      }
    });

    // Comprobar si ya estamos conectados a la base de datos
    if (mongoose.connection.readyState === 0) {
      await connectMongoDb();
    }

    return handler(req, res);
  };
}
