import mongoose from "mongoose";
import Pet from "./petModel.js";

// Our Base schema: these properties will be shared with our "real" schemas
const Cat = Pet.discriminator(
  "Cat",
  new mongoose.Schema({
    source: { type: String, required: true },
    size: { type: Number, required: true },
    furLength: { type: String },
    spayedNeutered: { type: Boolean, required: true },
    vaccinated: { type: Boolean, required: true },
    trained: { type: Boolean, required: true },
  })
);

export default Cat;
