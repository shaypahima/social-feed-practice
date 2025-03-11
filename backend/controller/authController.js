import User from '../model/user.js';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';


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

export const updateUserStatus = async (req, res, next) => {

  const { status } = req.body;
  //logged in user
  const user = await User.findOne();

  await user.updateStatus(status);
  res.status(200).json({ message: 'Status updated' });
}