import mongoose from "mongoose";
const objSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const MaritimaModel = mongoose.models.shippingLine || mongoose.model('shippingLine', objSchema);
export default MaritimaModel;