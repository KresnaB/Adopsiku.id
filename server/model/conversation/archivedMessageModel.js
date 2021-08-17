import mongoose from "mongoose";
import Message from "./messageSchema.js";
const ObjectId = mongoose.Types.ObjectId;

const archivedMessageOptions = {
  collection: "archivedmessage", // the name of our collection
};

// User schema: these properties will be shared with our "real" schemas
const ArchivedMessage = mongoose.model(
  "ArchivedMessage",
  new mongoose.Schema(
    {
      conversationId: { type: ObjectId, ref: "Conversation", required: true },
      count: { type: Number, default: 50, required: true },
      messages: [Message],
    },
    archivedMessageOptions
  )
);

export default ArchivedMessage;
