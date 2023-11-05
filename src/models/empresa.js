import mongoose from "mongoose";
const bankSchema = new mongoose.Schema({
    beneficiaryBank: String,
    bankAdress: String,
    swiftCode: String,
    beneficiaryName: String,
    beneficiaryAccountNumber: String,
    correspondentBank: String,
    ABA: String,
    swift: String
  });
  
const objetoSchema = new mongoose.Schema({
    nombre: {
      type: String,
      required: true
    },
    empresa: String,
    direccion: {
      type: String,
      required: true
    },
    direccion2: String,
    vatNumber: String,
    banks: [bankSchema]
  });
  
const EmpresaModel = mongoose.models.Empresas || mongoose.model('Empresas', objetoSchema);

export default EmpresaModel;