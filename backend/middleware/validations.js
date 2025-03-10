import { body } from 'express-validator';

export const validatePost = [
  body('title').isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),
  body('content').isLength({ min: 5 }).withMessage('Content must be at least 10 characters'),
];

export const validateUser = [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters'),
];