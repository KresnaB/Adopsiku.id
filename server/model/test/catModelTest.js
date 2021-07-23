import mongoose from "mongoose";
import PetTest from "./petModelTest.js";

// Our Base schema: these properties will be shared with our "real" schemas
const CatTest = OfferTest.discriminator(
  "CatTest",
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

export default CatTest;
