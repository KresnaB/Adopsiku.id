import express from "express";
import {
  createReport,
  updateReport,
  deleteReport,
  acceptReport,
  getReportByAdoption,
  getReportDetail,
  getReportsList,
  getPetByProvider,
} from "../../controller/report/ConditionReportController.js";

const router = express.Router();

router.post("/create/:id", createReport);
router.put("/update/:id", updateReport);
router.delete("/delete/:id", deleteReport);
router.get("/pet/:id", getPetByProvider);
router.get("/adoption/:id", getReportByAdoption);
router.get("/list/:id", getReportsList);
router.get("/detail/:id", getReportDetail);
router.put("/updatestatus/:id", acceptReport);

export default router;
