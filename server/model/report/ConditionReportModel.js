import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

const reportOptions = {
  collection: "conditionreports", // the name of our collection
};

const ConditionReport = mongoose.model(
  "ConditionReport",
  new mongoose.Schema(
    {
      type: { type: Number, required: true },
      title: { type: String, required: true },
      photos: { type: [String], required: true },
      description: { type: String, required: true },
      status: { type: Boolean, required: true },
      createdAt: { type: Date },
    },
    reportOptions
  )
);

export default ConditionReport;
