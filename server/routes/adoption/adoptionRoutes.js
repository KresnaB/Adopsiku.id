import express from "express";
import {
  applyAdoption,
  updateAdoption,
  cancelAdoption,
  getAdoptionByOffer,
  getAdoptionsByAdopter,
  getAdoptionDetail,
  updateAdoptionStatus,
  getAdoptionsByProvider,
} from "../../controller/adoption/AdoptionRequestController.js";

const router = express.Router();

router.post("/apply", applyAdoption);
router.get("/adopter/:id", getAdoptionsByAdopter);
router.get("/provider/:id", getAdoptionsByProvider);
router.put("/update/:id", updateAdoption);
router.delete("/cancel/:id", cancelAdoption);
router.get("/offer/:id", getAdoptionByOffer);
router.get("/detail/:id", getAdoptionDetail);
router.put("/updateStatus/:id", updateAdoptionStatus);

export default router;
