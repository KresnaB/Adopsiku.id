import express from "express";
import {
  getPets,
  getPetById,
  createPet,
  updatePet,
  getPetsByProviderID,
  deletePet,
  updatePetStatus,
  setReportDuration,
  getProviderPets
} from "../../controller/pet/petController.js";

const router = express.Router();

router.get("/", getPets);
router.get("/:id", getPetById);
router.post("/:type", createPet);
router.put("/:id", updatePet);
router.get("/prov/:id", getPetsByProviderID);
router.delete("/:provid/:id", deletePet);
router.put("/status/:id/", updatePetStatus);
router.get("/providerProfile/:id", getProviderPets);
router.put("/reportduration/:id/", setReportDuration);

export default router;
