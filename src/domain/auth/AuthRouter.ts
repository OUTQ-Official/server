import { Router } from 'express';
import AuthController from './AuthController';
import AuthMiddleware from './AuthMiddleware';

const router: Router = Router();

router.post('/google', AuthMiddleware.authGoogleAccessToken, AuthController.loginWithGoogle);

export default router;
