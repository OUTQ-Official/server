import { Router } from 'express';
import { default as userRouter } from './user';

const router: Router = Router();

router.use('/user', userRouter);

export default router;
