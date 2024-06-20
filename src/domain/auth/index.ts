import { Router } from 'express';
import { default as AuthRouter } from './AuthRouter';

const router: Router = Router();

router.use('/', AuthRouter);

export default router;
