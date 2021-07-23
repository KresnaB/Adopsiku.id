import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

const Message = new mongoose.Schema({ 
    sender: { type: ObjectId, ref: "User", required: true },
    receiver: { type: ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: new Date() }
});

export default Message;