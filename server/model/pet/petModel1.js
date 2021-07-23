import mongoose from "mongoose";

const petOptions = {
  discriminatorKey: "category", // our discriminator key, could be anything
  collection: "pets", // the name of our collection
};

const Pet1 = mongoose.model(
  "Pet",
  new mongoose.Schema(
    {
      name: { type: String, required: true },
      breeds: { type: [String], required: true },
      colors: { type: [String], required: true },
      age: { type: Number, required: true },
      gender: { type: Boolean },
      specialNeeds: { type: String, required: true },
      photos: { type: [String] },
    },
    petOptions
  )
);

export default Pet1;
