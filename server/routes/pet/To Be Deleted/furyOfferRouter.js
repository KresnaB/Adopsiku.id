import express from "express";
import {
  getFuries,
  getFuryById,
  createFuryOffer,
  updateFuryOffer,
  deleteFuryOffer,
} from "../../controller/pet/To Be Deleted/furyOfferController.js";

const router = express.Router();

router.get("/", getFuries);
router.get("/:id", getFuryById);
router.post("/", createFuryOffer);
router.put("/:id", updateFuryOffer);
router.delete("/:id", deleteFuryOffer);

export default router;
