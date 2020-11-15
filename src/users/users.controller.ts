import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { EncryptDecryptPassword } from '../utils/encryptDecrypsPass';
import UserModel from "./user.schema";
import errorCodes from '../utils/errorCodes';
import { ErrorResponse } from '../utils/models/ErrorResponse';
import { iUserUpdate } from './interfaces/iUserUpdate.interface';
import { iUser } from './interfaces/iUser.interface';
import { eRole } from './enums/eRole.enum';
import { iContentToken } from '../utils/interfaces/iContentToken.interface';

export const getUsers = async (req: Request, res: Response) => {
  const payload = req.get('user') as unknown as iContentToken;

  if (payload.role === eRole.USER) {
    const unauthorized = new ErrorResponse(errorCodes.unauthorized, 'Unauthorized');
    return res.status(401).json(unauthorized);
  }

  const page = Number(req.query.page) || 0;
  const size = Number(req.query.size) || 2;

  try {
     const users = await UserModel
      .find({ status: true }, 'fullName role email img')
      .skip(page * size)
      .limit(size)
      .exec()
     res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
}

export const saveUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullName, email, password, img, role: _role, status, google } = req.body;
  const pass = new EncryptDecryptPassword(password);
  const role = !!_role ? _role : eRole.USER;
  const user: iUser = {
    fullName,
    email,
    password: pass.encryptPass(),
    role,
    ...(img ? { img } : {}),
    ...(status ? { status } : {}),
    ...(google ? { google } : {})
  };

  try {
    const createdUser = await UserModel.create(user);
    res.status(201).json(createdUser);
  } catch (err) {
    if (err?.code === 11000) {
      const registered = new ErrorResponse(errorCodes.emailRegistered,'Registered email!' )
      return res.status(409).json(registered);
    }

    const general = new ErrorResponse(errorCodes.registerFailed, 'We had an error registering the user')
    res.status(500).json(general);
  }
}

export const updateUserInfo = async (req: Request<{id: number}>, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const id = req.params.id;
  const { fullName, img } = req.body;

  const update: iUserUpdate = {
    ...(fullName ? { fullName } : {}),
    ...(img ? { img } : {}),
  }

  try {
    const user = await UserModel.findByIdAndUpdate(id, update, { new: true, runValidators: true });
    res.json(user);
  } catch(err) {
    const general = new ErrorResponse(errorCodes.failUpdatingUser, 'We had an error updating the user');
    res.status(500).json(general);
  }
}

export const deleteUser = async (req: Request<{id: number}>, res: Response) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findByIdAndRemove(id);

    if (!user) throw null;

    res.json()
  } catch (err) {
    if (!err) {
      const noUser = new ErrorResponse(errorCodes.noExistUser, `User doesn't exist`);
      return res.status(404).json(noUser);
    }

    const general = new ErrorResponse(errorCodes.failDeletingUser, 'We had an error deleting the user');
    res.status(500).json(general);
  }
}

export const changeUserStatus = async(req: Request<{id: number}>, res: Response) => {
  const id = req.params.id;

  const changeStatus = {
    status: false
  };

  try {
    await UserModel.findByIdAndUpdate(id, changeStatus);
    res.json();
  } catch(err) {
    const general = new ErrorResponse(errorCodes.failUpdatingUser, 'We had an error updating the user');
    res.status(500).json(general);
  }
}