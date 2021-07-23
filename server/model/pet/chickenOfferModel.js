import mongoose from "mongoose";
import Pet from "./petModel.js";

// Our Base schema: these properties will be shared with our "real" schemas
const Chicken = Pet.discriminator(
  "Chicken",
  new mongoose.Schema({
    crow: { type: String, required: true },
    source: { type: String, required: true },
    size: { type: Number, required: true },
  })
);

export default Chicken;
