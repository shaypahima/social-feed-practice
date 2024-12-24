import express from "express";
import { getUser } from "../controller/authController.js";

const router = express.Router();

router.get('/user', getUser);

export default router;

