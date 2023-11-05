import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  role:{
    type:String,
    required:true,
    default:'usuario'
  },
  password: {
    type: String,
    required: true
  },
  mail: {
    type: String,
    required: true,
    unique: true
  },
  avatar: {
    type: String,
    default: '/avatar.png'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});
const UserModel =  mongoose.models.Usuario || mongoose.model('Usuario', usuarioSchema);
export default UserModel;