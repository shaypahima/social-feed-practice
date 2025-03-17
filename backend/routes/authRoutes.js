import express from "express";
import { validateUser } from "../middleware/validations.js";
import isAuth from "../middleware/is-auth.js";
import {
  getUser,
  signUp,
  login,
  updateUserStatus,
} from "../controller/authController.js";


const router = express.Router();

router.put('/signup', validateUser, signUp);

router.post('/login', login);

//temporary route to get user
router.get('/user', getUser);

router.post('/update-status', isAuth, updateUserStatus);

export default router;

