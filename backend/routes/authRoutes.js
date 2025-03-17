import express from "express";
import { validateUser } from "../middleware/validations.js";
import isAuth from "../middleware/is-auth.js";
import {
  getUserData,
  signUp,
  login,
} from "../controller/authController.js";


const router = express.Router();

router.put('/signup', validateUser, signUp);

router.post('/login', login);

router.get('/user-data', isAuth, getUserData);


export default router;

