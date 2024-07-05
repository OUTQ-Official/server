import jsonwebtoken, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { ObjectId } from 'mongoose';
import { TokenModel } from '../../domain/user/UserModel';
dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'jwt-secret_key';

interface AccessTokenPayloadType extends JwtPayload {
  _id: ObjectId;
}

interface RefreshTokenPayloadType extends JwtPayload {
  email: string;
}

const sign = (payload: AccessTokenPayloadType) => {
  try {
    return jsonwebtoken.sign(payload, JWT_SECRET_KEY, {
      algorithm: 'HS256',
      expiresIn: '1m',
    });
  } catch (error) {
    throw new Error(`[JWT/sign] Error : ${error}`);
  }
};

const isExpried = (token: string) => {
  try {
    verify(token);
    return false;
  } catch (error) {
    if ((error as VerifyErrors).message === '[JWT/verify] Error : TokenExpiredError: jwt expired') {
      return true;
    }
    throw new Error(`[JWT/isExpried] Error : ${error}`);
  }
};

const verify = (token: string) => {
  try {
    const decoded = jsonwebtoken.verify(token, JWT_SECRET_KEY) as JwtPayload;

    return decoded;
  } catch (error) {
    throw new Error(`[JWT/verify] Error : ${error}`);
  }
};

const refresh = (payload: RefreshTokenPayloadType) => {
  try {
    return jsonwebtoken.sign({ payload }, JWT_SECRET_KEY, {
      algorithm: 'HS256',
      expiresIn: '14d',
    });
  } catch (error) {
    throw new Error(`[JWT/refresh] Error : ${error}`);
  }
};

const refreshVerify = async (token: string) => {
  try {
    const foundToken = await TokenModel.findOne({ refreshToken: token });

    console.log(foundToken);
  } catch (error) {}
};

const jwt = {
  sign,
  verify,
  refresh,
  refreshVerify,
  isExpried,
};

export default jwt;
