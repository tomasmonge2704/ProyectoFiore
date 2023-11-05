import mongoose from "mongoose";
const objSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const ForwarderModel = mongoose.models.forwarders || mongoose.model('forwarders', objSchema);
export default ForwarderModel;