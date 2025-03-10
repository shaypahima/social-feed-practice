import express from "express";
import { validateUser } from "../middleware/validations.js";
import {
  getUser,
  signUp,
  updateUserStatus,
} from "../controller/authController.js";


const router = express.Router();

router.put('/signup', validateUser, signUp);

router.get('/user', getUser);

router.post('/update-status', updateUserStatus);

export default router;

