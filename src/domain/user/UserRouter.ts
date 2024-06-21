import { Router } from 'express';
import UserController from './UserController';
import UserMiddleWare from './UserMiddleware';
import ValidationMiddleware from '../../global/middleware/validation';

const router: Router = Router();

router.post('/signup', UserController.signup);
router.post('/login', UserController.loginWithLocal);
router.post(
  '/oauth/google',
  UserMiddleWare.authorGoogleClient,
  UserMiddleWare.authenGoogleClient,
  UserController.loginWithGoogle
);
router.get('/refresh');

router.post('/profile', ValidationMiddleware.AuthJWT.validateAccessToken);

export default router;
