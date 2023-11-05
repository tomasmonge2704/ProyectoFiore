import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
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
  vatNumber: {
    type: String,
    required: true
  },
  emoji:{
    type:String
  }
});

const Clientmodel = mongoose.models.Client || mongoose.model('Client', clientSchema);
export default Clientmodel;
