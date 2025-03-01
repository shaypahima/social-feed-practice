import { Router } from "express";
import {
  getFeed,
  getAuthor,
  createPost,
  deletePost,
  updatePost
} from "../controller/feedController.js";
import { validatePost } from "../middleware/validations.js";

const router = Router();

// Get all posts
router.get("/posts", getFeed);

// Get a specific author's posts
router.get("/post/:authorId", getAuthor);

// Create a new post (with validation)
router.post("/post", validatePost, createPost);

router.put("/post/:id", updatePost);

// Delete a post by ID
router.delete("/post/:id", deletePost);

export default router;
