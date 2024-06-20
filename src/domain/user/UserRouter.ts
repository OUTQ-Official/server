import { Router } from 'express';
import UserController from './UserController';
import UserMiddleWare from './UserMiddleware';

const router: Router = Router();

router.post('/login', UserController.loginWithLocal);
router.post(
  '/oauth/google',
  UserMiddleWare.authorGoogleClient,
  UserMiddleWare.authenGoogleClient,
  UserController.loginWithGoogle
);

export default router;
