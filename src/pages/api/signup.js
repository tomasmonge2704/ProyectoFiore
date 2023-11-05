import connectMongoDb from "@/libs/mongodb";
import UserModel from "@/models/user";
import { genSalt } from "bcrypt";
import { hash } from "bcrypt";
export default async function handler(req, res) {
  await connectMongoDb();
  if (req.method === 'POST') {
  const { username, password, mail } = req.body;
  try {
    // Verificar si ya existe un usuario con el mismo username o correo electrónico
    const existingUser = await UserModel.findOne({
      $or: [{ username }, { mail }],
    });
    if (existingUser) {
      return res
        .status(409)
        .json({
          error: "El nombre de usuario o el correo electrónico ya están en uso",
        });
    }

    // Crear una instancia del nuevo usuario utilizando el esquema de usuario
    const newUser = new UserModel({
      username,
      password,
      mail,
    });

    // Cifrar la contraseña antes de guardarla en la base de datos
    const salt = await genSalt(10);
    const hashedPassword = await hash(newUser.password, salt);
    newUser.password = hashedPassword;

    // Guardar el nuevo usuario en la base de datos
    await newUser.save();

    res.status(201).json({ message: "Registro exitoso" });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
}
}
