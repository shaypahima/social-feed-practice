import { Router } from "express";
import {
  getFeed,
  getAuthor,
  createPost,
  deletePost,
  updatePost
} from "../controller/feedController.js";
import { validatePost } from "../middleware/validations.js";
import isAuth from "../middleware/is-auth.js";

const router = Router();

// Get all posts
router.get("/posts", isAuth, getFeed);

// Get a specific author's posts
router.get("/post/:authorId" ,getAuthor);

// Create a new post (with validation)
router.post("/post", isAuth, validatePost, createPost);

router.put("/post/:id", isAuth, updatePost);

// Delete a post by ID
router.delete("/post/:id", isAuth, deletePost);

export default router;
