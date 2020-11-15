import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import errorCodes from '../utils/errorCodes';
import { ErrorResponse } from '../utils/models/ErrorResponse';

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.get('authorization') || '';
  const token = authorization.split(' ')[1];
  const SEED = process.env.TOKEN_SEED || '';

  try {
    const decoded = jwt.verify(token, SEED) as any;
    req.headers.user = decoded.user;
    next();
  } catch(err) {
    const unauthorized = new ErrorResponse(errorCodes.unauthorized, 'Unauthorized');
    return res.status(401).json(unauthorized);
  }
}