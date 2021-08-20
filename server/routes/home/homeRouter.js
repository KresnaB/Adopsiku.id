import express from "express";
import { homeInfo } from "../../controller/home/home.js";

const router = express.Router();

router.get("/:id", homeInfo);

export default router;
