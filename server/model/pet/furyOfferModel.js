import mongoose from "mongoose";
import Pet from "./petModel.js";

// Our Base schema: these properties will be shared with our "real" schemas
const Fury = Pet.discriminator("Fury", new mongoose.Schema({}));

export default Fury;
