import { Router } from "express";
import { getFeed, getAuthor, createPost } from "../controller/feedController.js";

const router = Router();

router.get('/posts', getFeed);

router.get('/post/:authorId', getAuthor);

router.post('/post', createPost);

export default router;