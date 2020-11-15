import { Router } from 'express';
import usersRouter from '../users/users.routes';

const router: Router = Router();

router.use(usersRouter);

export default router;