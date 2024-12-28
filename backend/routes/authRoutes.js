import express from "express";
import { getUser, updateUserStatus } from "../controller/authController.js";

const router = express.Router();

router.get('/user', getUser);

router.post('/update-status', updateUserStatus);

export default router;

