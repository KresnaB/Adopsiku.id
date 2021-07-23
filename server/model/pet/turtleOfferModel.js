import mongoose from "mongoose";
import Pet from "./petModel.js";

// Our Base schema: these properties will be shared with our "real" schemas
const Turtle = Pet.discriminator(
  "Turtle",
  new mongoose.Schema({
    size: { type: Number, required: true },
  })
);

export default Turtle;
