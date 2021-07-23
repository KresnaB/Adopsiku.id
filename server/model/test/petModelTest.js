import mongoose from "mongoose";

const petOptions = {
  discriminatorKey: "category", // our discriminator key, could be anything
  collection: "petstest", // the name of our collection
};

const PetTest = mongoose.model(
  "PetTest",
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

export default PetTest;
