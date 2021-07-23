import mongoose from "mongoose";
import OfferTest from "./offerModelTest.js";
import CatTest from "./catModelTest.js"

// Our Base schema: these properties will be shared with our "real" schema
const CatOfferTest = OfferTest.discriminator('CatOfferTest', new mongoose.Schema({
    pet: CatTest
  },
),
);

export default CatOfferTest;
