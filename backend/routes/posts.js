import express from "express";
import { getPosts, addPost } from "../controllers/post.js";

const router = express.Router()

router.get("/", getPosts)
router.get("/", addPost)

export default router