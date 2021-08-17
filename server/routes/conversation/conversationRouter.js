import express from "express";
import {
  createConversation,
  getUserConversations,
  getMessages,
  getArchives,
  sendMessage,
} from "../../controller/conversation/conversationController.js";

const router = express.Router();

router.get("/user/:id", getUserConversations);
router.post("/", createConversation);
router.get("/:id", getMessages);
router.get("/archives/:id", getArchives);
router.post("/:id", sendMessage);

export default router;
