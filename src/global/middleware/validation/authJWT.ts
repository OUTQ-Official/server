import { NextFunction, Request, Response } from 'express';
import jwt from '../../utils/jwt';

export const validateAccessToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      throw new Error('[validation/authJWT/validateAccessToken] Error :토큰이 존재하지 않습니다.');
    }

    const [bearer, token] = req.headers.authorization?.split(' ');

    if (token && bearer === 'Bearer') {
      const decoded = jwt.verify(token);

      if (!decoded) throw new Error('[validation/authJWT/validateAccessToken] Error : 엑세스 토큰 decoded 오류');

      req.body = { ...decoded };
      next();
    } else {
      throw new Error('[validation/authJWT/validateAccessToken] Error : 요청시 Bearer 혹은 토큰 오류');
    }
  } catch (error) {
    return next(error);
  }
};
