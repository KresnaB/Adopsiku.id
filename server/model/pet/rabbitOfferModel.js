import mongoose from "mongoose";
import Pet from "./petModel.js";

// Our Base schema: these properties will be shared with our "real" schemas
const Rabbit = Pet.discriminator(
  "Rabbit",
  new mongoose.Schema({
    source: { type: String, required: true },
    size: { type: Number, required: true },
    spayedNeutered: { type: Boolean, required: true },
    vaccinated: { type: Boolean, required: true },
  })
);

export default Rabbit;
