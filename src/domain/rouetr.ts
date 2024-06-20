import { Router } from 'express';
import { default as userRouter } from './user';
import { default as authRouter } from './auth';

const router: Router = Router();

router.use('/user', userRouter);
router.use('/auth', authRouter);

export default router;
