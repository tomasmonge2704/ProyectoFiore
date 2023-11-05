import mongoose from "mongoose";
const objSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const PackingModel = mongoose.models.packing || mongoose.model('packing', objSchema);
export default PackingModel;