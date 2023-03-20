import mongoose from 'mongoose';

const Tool = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    toolType: { type: String, required: true },
    offers: { type: String, required: true },
    link: { type: String, required: true },
    trending: { type: String, required: true },
    price: { type: String || Number, required: true },
    photo: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

const toolModel = mongoose.model('Tool', Tool);

export default toolModel;