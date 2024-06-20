import { Router } from 'express';
import UserController from './UserController';

const router: Router = Router();

router.post('/login', UserController.loginWithLocal);

export default router;
