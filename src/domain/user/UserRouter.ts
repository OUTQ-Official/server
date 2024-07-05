import { Router } from 'express';
import UserController from './UserController';
import UserMiddleWare from './UserMiddleware';
import ValidationMiddleware from '../../global/middleware/validation';

const router: Router = Router();

router.post(
  '/signup',
  ValidationMiddleware.UserValidation.checkEmailForm,
  ValidationMiddleware.UserValidation.checkPasswordForm,
  UserController.signup
);
router.post('/login', UserController.loginWithLocal);
router.post(
  '/oauth/google',
  UserMiddleWare.authorGoogleClient,
  UserMiddleWare.authenGoogleClient,
  UserController.loginWithGoogle
);
router.get('/auth/refresh', ValidationMiddleware.UserValidation.checkRefreshToken, UserController.refreshAccessToken);

router.post('/profile', ValidationMiddleware.UserValidation.checkAccessToken);

export default router;
