import { Router } from "express";
import { getFeed, getAuthor, createPost, deletePost } from "../controller/feedController.js";

const router = Router();

router.get('/posts', getFeed);

router.get('/post/:authorId', getAuthor);

router.post('/post', createPost);

router.delete('/post/:id', deletePost);

export default router;