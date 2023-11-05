import { sign } from "jsonwebtoken";
import UserModel from "@/models/user";
import { compare } from "bcrypt";
import connectMongoDb from "@/libs/mongodb";
export default async function handler(req, res) {
    const secretKey = process.env.CLAVE_TOKEN;
    const { username, password } = req.body;
    await connectMongoDb();
    if (req.method === 'POST') {
        try {
            const user = await UserModel.findOne({ username });
            if (!user) {
              return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            const isPasswordValid = await compare(password, user.password);
            if (!isPasswordValid) {
              return res.status(401).json({ error: 'Contraseña incorrecta' });
            }
            user.password = undefined;
            const token = sign({ user }, secretKey);
            res.json({ message: 'Inicio de sesión exitoso', token });
          } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error en el servidor' });
          }
    }
  }