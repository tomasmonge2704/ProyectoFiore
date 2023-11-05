import mongoose from "mongoose";
const proveedorSchema = new mongoose.Schema({
    family: {
      type: String,
      required: true
    },
    famili2: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  });

const ProductModel = mongoose.models.products || mongoose.model('products', proveedorSchema);
export default ProductModel;