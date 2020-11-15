import { Router } from 'express';
import { getUsers, saveUser, updateUserInfo, deleteUser, changeUserStatus } from './users.controller';
import registerUserValidation  from './registerUser.validation';
import upadateUserValidation from './upadateUser.validation';

const usersRouter: Router = Router();

usersRouter.get('/user', getUsers);
usersRouter.post('/user', registerUserValidation, saveUser);
usersRouter.patch('/user/:id', upadateUserValidation, updateUserInfo);
usersRouter.delete('/user/rm/:id', deleteUser);
usersRouter.delete('/user/:id', changeUserStatus);

export default usersRouter;