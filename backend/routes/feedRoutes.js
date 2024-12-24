import { Router } from "express";
import { getFeed } from "../controller/feedController.js";

const router = Router();

router.get('/posts', getFeed);

export default router;