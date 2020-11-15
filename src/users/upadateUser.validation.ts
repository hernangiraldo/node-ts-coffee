import { body } from 'express-validator';

export default [
  body('fullName').optional(),
  body('img').optional().isBase64()
];