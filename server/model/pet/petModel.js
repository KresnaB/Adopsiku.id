import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

const petOptions = {
  discriminatorKey: "category", // our discriminator key, could be anything
  collection: "pets", // the name of our collection
};

// User schema: these properties will be shared with our "real" schemas
const Pet = mongoose.model(
  "Pet",
  new mongoose.Schema(
    {
      provider: { type: ObjectId, ref: "User", required: true },
      name: { type: String, required: true },
      breeds: { type: [String], required: true },
      colors: { type: [String], required: true },
      age: { type: Number, required: true },
      gender: { type: Boolean, required: true },
      specialNeeds: { type: String, required: true },
      photos: { type: [String], required: true },
      description: { type: String, required: true },
      adoptFee: { type: Number, required: true },
      reportDuration: { type: Number, default: 0, required: true },
      satuan: { type: String },
      status: { type: Number, default: 0, required: true },
      createdAt: { type: Date },
      adoptedAt: { type: Date },
      nextNotif: { type: Date },
      conditionReports: [{ type: ObjectId, ref: "ConditionReport" }],
    },
    petOptions
  )
);

export default Pet;
