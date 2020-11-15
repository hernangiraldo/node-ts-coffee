import { body } from 'express-validator';

export default [
  body('fullName').notEmpty(),
  body('email').isEmail().normalizeEmail().notEmpty(),
  body('password').notEmpty(),
  body('img').optional().isBase64(),
  body('role').optional().matches(/^USER$|^ADMIN$|^SUPER_ADMIN$|^BUSINESS_ADMIN$/),
  body('status').optional().isBoolean(),
  body('google').optional().isBoolean()
];