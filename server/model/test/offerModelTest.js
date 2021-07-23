import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

const offerOptions = {
  collection: "offerstest", // the name of our collection
  discriminatorKey: 'category',
};

const OfferTest = mongoose.model(
  "OfferTest",
  new mongoose.Schema(
    {
      provider: { type: ObjectId, ref: "User" },
      description: { type: String, required: true },
      adoptFee: { type: Number, required: true },
      reportDuration: { type: Number, default: 0, required: true },
      status: { type: String, default: "Dapat Diadopsi", required: true },
      createdAt: { type: Date },
    },
    offerOptions
  )
);

export default OfferTest;
