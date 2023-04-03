import express from "express";
import { getCheckedIns } from "../controllers/checkedIn.js";

const router = express.Router();

router.get("/", getCheckedIns);

export default router;
