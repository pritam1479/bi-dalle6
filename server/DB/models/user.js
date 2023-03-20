import mongoose from "mongoose";

const user = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    roles: {
        type: String,
        default: "user"
    },
    allTools: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tool"
    }]

});

const userModel = mongoose.model('User', user);

export default userModel;