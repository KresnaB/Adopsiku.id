import express from "express";
import {
  getTurtles,
  getTurtleById,
  createTurtleOffer,
  updateTurtleOffer,
  deleteTurtleOffer,
} from "../../controller/pet/To Be Deleted/turtleOfferController.js";

const router = express.Router();

router.get("/", getTurtles);
router.get("/:id", getTurtleById);
router.post("/", createTurtleOffer);
router.put("/:id", updateTurtleOffer);
router.delete("/:id", deleteTurtleOffer);

export default router;
