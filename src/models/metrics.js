import mongoose from "mongoose";
const objSchema = new mongoose.Schema({
    id: String,
    name: String,
    data: [
        String
    ]
});

const MetricsModel = mongoose.models.metrics || mongoose.model('metrics', objSchema);
export default MetricsModel;