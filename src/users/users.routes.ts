import { Router } from 'express';
import { getUsers, saveUser, updateUserInfo, deleteUser, changeUserStatus } from './users.controller';
import { validateToken } from '../middlewares/auth';
import registerUserValidation  from './registerUser.validation';
import upadateUserValidation from './upadateUser.validation';
import loginValidation from './authValidation';
import { login } from './auth.controller';

const usersRouter: Router = Router();

usersRouter.get('/user', validateToken, getUsers);
usersRouter.post('/user', registerUserValidation, saveUser);
usersRouter.patch('/user/:id', upadateUserValidation, updateUserInfo);
usersRouter.delete('/user/rm/:id', deleteUser);
usersRouter.delete('/user/:id', changeUserStatus);

usersRouter.post('/user/login', loginValidation, login);

export default usersRouter;