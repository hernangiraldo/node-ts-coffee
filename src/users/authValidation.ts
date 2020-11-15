import { body } from 'express-validator';

export default [
  body('email').isEmail().normalizeEmail().notEmpty(),
  body('password').notEmpty(),
];