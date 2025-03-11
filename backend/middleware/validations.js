import { body } from 'express-validator';
import User from '../model/user.js';

export const validatePost = [
  body('title').isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),
  body('content').isLength({ min: 5 }).withMessage('Content must be at least 10 characters'),
];

export const validateUser = [
  body('email').isEmail()
    .withMessage('Please enter a valid email')
    .custom(async (value, { req }) => {
      const user = await User.findOne({ email: value });
      if (user) {
        return Promise.reject('E-mail already in use');
      }
    }
    ).normalizeEmail(),
  body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters'),
  body('firstName').trim().not().isEmpty().withMessage('First name is required'),
  body('lastName').trim().not().isEmpty().withMessage('Last name is required'),
];

