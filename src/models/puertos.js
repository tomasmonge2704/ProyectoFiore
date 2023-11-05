import mongoose from "mongoose";
const objSchema = new mongoose.Schema({
  port: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  region: {
    type: String,
  },
  pod:{
    type:String
  }
});

const PuertosModel = mongoose.models.puertos || mongoose.model('puertos', objSchema);
export default PuertosModel;
