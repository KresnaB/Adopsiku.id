import Conversation from "../../model/conversation/conversationModel.js";
import ConditionReport from "../../model/report/ConditionReportModel.js";
import AdoptionRequest from "../../model/adoption/AdoptionRequestModel.js";
import Pet from "../../model/pet/petModel.js";

export const homeInfo = async (req, res) => {
  try {
    const pets = await Pet.find({ provider: req.params.id })
      .select("_id")
      .select("conditionReports");
    let offer = 0;

    for (const pet of pets) {
      const temp = await AdoptionRequest.countDocuments({ pet: pet._id });
      offer += temp;
    }

    const home = {
      offer: offer,
      Report: pets.conditionReports,
      pet: pets.length,
      conversation: "",
    };
    res.status(200).send(home);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err });
  }
};
