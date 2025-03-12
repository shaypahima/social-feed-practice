import express from "express";
import { validateUser } from "../middleware/validations.js";
import {
  getUser,
  signUp,
  login,
  updateUserStatus,
} from "../controller/authController.js";


const router = express.Router();

router.put('/signup', validateUser, signUp);

router.post('/login', login);

router.get('/user', getUser);

router.post('/update-status', updateUserStatus);

export default router;

