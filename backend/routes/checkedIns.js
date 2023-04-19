import express from "express";
import { getCheckedIns, addCheckedIns } from "../controllers/checkedIn.js";

const router = express.Router();

router.get("/", getCheckedIns);
router.post("/", addCheckedIns);

export default router;
