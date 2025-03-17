import User from '../model/user.js';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config'



export const signUp = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  try {

    const hashedPassword = await bcrypt.hash(password, 12);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array(), 'errors');
      return res.status(422).json({ message: errors.array()[0].msg });
    }
    const newUser = {
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
      posts: [],
    }
    const user = new User(newUser);
    await user.save();
    res.status(201).json({ message: 'User created' });

  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }

}

export const getUser = async (req, res, next) => {
  const user = await User.findOne();
  res.status(200).json({ user });
}

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const userEmail = await User.findOne({
      email,
    });
    if (!userEmail) {
      const error = new Error('A user with this email could not be found.');
      error.statusCode = 401;
      throw error;
    }
    const isEqual = await bcrypt.compare(password, userEmail.password);
    if (!isEqual) {
      const error = new Error('Wrong password!');
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign({
      email: userEmail.email,
      userId: userEmail._id.toString(),
    },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.status(200).json({ token, userId: userEmail._id.toString() });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}


export const updateUserStatus = async (req, res, next) => {
  const { status } = req.body;
  const { userId } = req;
  //logged in user
  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }
    user.status = status;
    await user.save();
    res.status(200).json({ message: 'User status updated' });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }

}