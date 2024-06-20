import { Router } from 'express';
import { default as UserRouter } from './UserRouter';

const router: Router = Router();

router.use('/', UserRouter);

export default router;
