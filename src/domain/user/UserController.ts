import { NextFunction, Request, Response } from 'express';
import {
  GoogleLoginUserDTO,
  GoogleLoginUserResultDTO,
  LocalLoginUserDTO,
  LocalLoginUserResultDTO,
  SignupDTO,
  SignupResultDTO,
} from './UserDTO';
import UserService from './UserService';
import jwt from '../../global/utils/jwt';
import { StatusCodes } from 'http-status-codes';
import { success } from '../../global/constant/response';
import { RES_MSG } from '../../global/constant';

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const signupDTO: SignupDTO = req.body;

    const data = (await UserService.signup(signupDTO)) as SignupResultDTO;

    //토큰처리 함수로 만들어서
    const accessToken = jwt.sign({ _id: data._id });

    const { refreshToken, ...restData } = data;

    const result = {
      ...restData,
      accessToken: accessToken,
    };

    return res
      .status(StatusCodes.OK)
      .cookie('refreshToken', refreshToken)
      .send(success(StatusCodes.OK, RES_MSG.SIGNUP_SUCCESS, result));
  } catch (error) {
    return next(error);
  }
};

const loginWithLocal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const localLoginUserDTO: LocalLoginUserDTO = req.body;

    const data = (await UserService.loginWithLocal(localLoginUserDTO)) as LocalLoginUserResultDTO;

    //토큰처리 함수로 만들어서
    const accessToken = jwt.sign({ _id: data._id });

    // // let refreshToken: string;

    // // //? 다중로그인 처리 -> refresh token이 valid한 경우 refresh token은 다시 재발급받지 않음
    // // const isRefreshToken = await TokenService.isRefreshTokenValid(data.userType, data.userId);
    // // LOGGER.info(isRefreshToken);

    // // if (!isRefreshToken) {
    // //   //~ 재발급 필요
    // //   refreshToken = jwtUtils.signRefresh(data.userType, data.userId);

    // //   await redisClient.setEx(data.redisKey, 60 * 60 * 24 * 60, refreshToken); //! Redis에 refresh token 저장 + 60일 유효시간
    // // } else refreshToken = isRefreshToken; //~ 원래 존재하는 refresh token 반환
    const { refreshToken, ...restData } = data;

    const result = {
      ...restData,
      accessToken: accessToken,
    };
    return res
      .status(StatusCodes.OK)
      .cookie('refreshToken', refreshToken)
      .send(success(StatusCodes.OK, RES_MSG.SIGNIN_SUCCESS, result));
  } catch (error) {
    return next(error);
  }
};

const loginWithGoogle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const googleLoginUserDTO: GoogleLoginUserDTO = req.body;

    const data = (await UserService.loginWithGoogle(googleLoginUserDTO)) as GoogleLoginUserResultDTO;

    const accessToken = jwt.sign({ _id: data._id });
    const { refreshToken, ...restData } = data;

    const result = {
      ...restData,
      accessToken: accessToken,
    };

    return res
      .status(StatusCodes.OK)
      .cookie('refreshToken', refreshToken)
      .send(success(StatusCodes.OK, RES_MSG.SIGNIN_SUCCESS, result));
  } catch (error) {
    return next(error);
  }
};

const UserController = { loginWithLocal, loginWithGoogle, signup };

export default UserController;
