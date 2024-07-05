import { NextFunction, Request, Response } from 'express';
import jwt from '../../utils/jwt';

const checkPasswordForm = (req: Request, res: Response, next: NextFunction) => {
  try {
    //로직 추가
    next();
  } catch (error) {
    return next(error);
  }
};

const checkEmailForm = (req: Request, res: Response, next: NextFunction) => {
  try {
    //로직 추가
    next();
  } catch (error) {
    return next(error);
  }
};

//Token관련
const checkAccessToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = getAccessTokenFromHeader(req);

    if (jwt.isExpried(token)) throw new Error('[UserValidation/checkAccessToken] Error : 엑세스 토큰 만료');

    const decoded = jwt.verify(token);

    if (!decoded) throw new Error('[UserValidation/checkAccessToken] Error : 엑세스 토큰 decoded 오류');

    req.body = { ...decoded };
    next();
  } catch (error) {
    return next(error);
  }
};

const checkRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req);
    const { refreshToken } = req.cookies;
    console.log(refreshToken);

    // next();
  } catch (error) {
    return next(error);
  }
};

const UserValidation = {
  checkAccessToken,
  checkRefreshToken,
  checkPasswordForm,
  checkEmailForm,
};

export default UserValidation;

const getAccessTokenFromHeader = (req: Request) => {
  if (!req.headers.authorization) {
    throw new Error('[UserValidation/checkAccessToken] Error :토큰이 존재하지 않습니다.');
  }

  const [bearer, token] = req.headers.authorization?.split(' ');

  if (!token || bearer !== 'Bearer') {
    throw new Error('[UserValidation/checkAccessToken] Error : 요청시 Bearer 혹은 토큰 오류');
  }

  return token;
};
