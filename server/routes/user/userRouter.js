import express from "express";
import {
  getUsers,
  signin,
  getUserById,
  createUser,
  updateUser,
  googleSignIn,
} from "../../controller/user/userController.js";
import * as auth from "../../middleware/auth.js";
import {
  confirmation,
  resend,
} from "../../controller/user/emailConfirmation/emailConfirmation.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/register/:type", createUser);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.post("/signin", signin);
router.post("/googleSignIn", googleSignIn);
router.put("/confirmation/:token", confirmation);
router.post("/resend", resend);

export default router;
