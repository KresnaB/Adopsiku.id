import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

const offerOptions = {
  collection: "offers", // the name of our collection
};

const Offer = mongoose.model(
  "Offer",
  new mongoose.Schema(
    {
      provider: { type: ObjectId, ref: "User" },
      pet: { type: ObjectId, ref: "Pet" },
      description: { type: String, required: true },
      adoptFee: { type: Number, required: true },
      reportDuration: { type: Number, default: 0, required: true },
      status: { type: String, default: "Dapat Diadopsi", required: true },
      createdAt: { type: Date },
    },
    offerOptions
  )
);

export default Offer;
