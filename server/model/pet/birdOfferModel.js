import mongoose from "mongoose";
import Pet from "./petModel.js";

// Our Base schema: these properties will be shared with our "real" schemas
const Bird = Pet.discriminator(
  "Bird",
  new mongoose.Schema({
    source: { type: String, required: true },
    size: { type: Number, required: true },
    chirping: { type: String, required: true },
    trained: { type: Boolean, required: true },
  })
);

export default Bird;
