import mongoose from "mongoose";

const proveedorSchema = new mongoose.Schema({
    nombre: {
      type: String,
      required: true
    },
    direccion: {
      type: String,
      required: true
    },
    direccion2: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    taxId: {
      type: String,
      required: true
    },
    plantNumber: {
      type: String,
      required: true
    },
    brand: {
      type: String,
      required: true
    },
    emoji:{
      type:String
    }
  });

const ProveedorModel = mongoose.models.Proveedores || mongoose.model('Proveedores', proveedorSchema);
export default ProveedorModel;