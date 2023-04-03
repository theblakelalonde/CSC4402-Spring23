import express from "express";
import { getSearchQuery } from "../controllers/search.js";

const router = express.Router();

router.get("/", getSearchQuery);

export default router;
