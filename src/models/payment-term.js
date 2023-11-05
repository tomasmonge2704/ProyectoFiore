import mongoose from "mongoose";

const objSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});
const PaymentTermModel = mongoose.models.paymentTerms || mongoose.model('paymentTerms', objSchema);
export default PaymentTermModel;