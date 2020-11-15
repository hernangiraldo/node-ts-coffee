import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import UserModel from "./user.schema";
import { EncryptDecryptPassword } from '../utils/encryptDecrypsPass';
import { ErrorResponse } from '../utils/models/ErrorResponse';
import errorCodes from '../utils/errorCodes';
import jwt from 'jsonwebtoken';
import { iContentToken } from '../utils/interfaces/iContentToken.interface';

export const login = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) throw { code: 1 }

    const pass = new EncryptDecryptPassword(password);
    const isUser = pass.decryptPass(user.password);
    if (!isUser) throw { code: 1 }

    const { _id, role, fullName } = user;
    const payload: iContentToken = {
      _id,
      role: role
    };

    const access_token = jwt.sign(
      { user: payload },
      process.env.TOKEN_SEED || '',
      { expiresIn: process.env.TOKEN_EXPIRE }
    );

    res.json({
      user: { email, fullName },
      access_token
    });
  } catch(err) {
    if (err?.code === 1) {
      const noExist = new ErrorResponse(errorCodes.userPassInvalid, 'Invalid user or password');
      return res.json(noExist);
    }

    const general = new ErrorResponse(errorCodes.failLogin, 'We had a login error');
    res.status(500).json(general);

  }
}