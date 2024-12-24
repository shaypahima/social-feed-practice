import { Router } from "express";
import { getFeed, getAuthor } from "../controller/feedController.js";

const router = Router();

router.get('/posts', getFeed);

router.get('/post/:authorId', getAuthor);

export default router;