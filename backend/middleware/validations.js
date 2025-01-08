import { body, validationResult } from 'express-validator';

export const validatePost = [
  body('title').isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),
  body('content').isLength({ min: 5 }).withMessage('Content must be at least 10 characters'),
];
