import express from "express";
import { getPosts, addPost, deletePost } from "../controllers/post.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", addPost);
router.delete("/:postID", deletePost);

export default router;