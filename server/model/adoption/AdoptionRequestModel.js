import mongoose from "mongoose";
import Commitment from "./Commitment.js";
import Experience from "./Experience.js";
import HouseCondition from "./HouseCondition.js";

const ObjectId = mongoose.Types.ObjectId;

const adoptionOptions = {
  collection: "adoptionrequests", // the name of our collection
};

const AdoptionRequest = mongoose.model(
  "AdoptionRequest",
  new mongoose.Schema(
    {
      pet: { type: ObjectId, ref: "Pet", required: true },
      adopter: { type: ObjectId, ref: "User", required: true },
      houseCondition: HouseCondition,
      commitment: Commitment,
      experience: Experience,
      status: { type: Number, default: 0, required: true },
      createdAt: { type: Date },
    },
    adoptionOptions
  )
);

export default AdoptionRequest;
