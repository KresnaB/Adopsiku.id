import mongoose from "mongoose";
import Message from './messageSchema.js';
const ObjectId = mongoose.Types.ObjectId;

const conversationOptions = {
    collection: "conversation", // the name of our collection
  };
  
// User schema: these properties will be shared with our "real" schemas
const Conversation = mongoose.model(
  "Conversation",
  new mongoose.Schema(
    {
        participants: [{ type: ObjectId, ref: "User", required: true }],
        messages: [Message]
    },
    conversationOptions
  )
);

export default Conversation;
