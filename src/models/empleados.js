import mongoose from "mongoose";
const empleadosSchema = new mongoose.Schema({
  nombre:String,
  apellido:String,
  celular:String,
  mail:String
});


const EmpleadoModel = mongoose.models.Empleados || mongoose.model('Empleados', empleadosSchema);
export default EmpleadoModel;