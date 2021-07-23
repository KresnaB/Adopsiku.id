import express from "express";
import {
  register,
  getAdopterById,
  getAdopters,
  updateAdopter,
} from "../../../controller/user/Delete soon/adopterController.js";

const router = express.Router();

router.post("/register", register);
router.get("/:id", getAdopterById);
router.get("/", getAdopters);
router.put("/:id", updateAdopter);

export default router;
