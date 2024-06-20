import { NextFunction, Request, Response } from 'express';
import jwt from '../../legacy/utils/jwt';
import { StatusCodes } from 'http-status-codes';
import { success } from '../../global/constant/response';
import { RES_MSG } from '../../global/constant';

const loginWithGoogle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code } = req.body;

    // const data = await UserService.loginWithGoogle(code);

    // return res.status(StatusCodes.OK).send(success(StatusCodes.OK, RES_MSG.SIGNIN_SUCCESS, result));
  } catch (error) {
    return next(error);
  }
};

const AuthController = { loginWithGoogle };

export default AuthController;
