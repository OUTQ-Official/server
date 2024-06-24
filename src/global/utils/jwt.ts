import jsonwebtoken, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { ObjectId } from 'mongoose';
dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'jwt-secret_key';

interface JWTPayloadType extends JwtPayload {
  _id: ObjectId;
}

const sign = (payload: JWTPayloadType) => {
  try {
    return jsonwebtoken.sign(payload, JWT_SECRET_KEY, {
      algorithm: 'HS256',
      expiresIn: '2h',
    });
  } catch (error) {
    throw new Error(`[JWT/sign] Error : ${error}`);
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

const refresh = () => {
  try {
    return jsonwebtoken.sign({}, JWT_SECRET_KEY, {
      algorithm: 'HS256',
      expiresIn: '14d',
    });
  } catch (error) {
    throw new Error(`[JWT/refresh] Error : ${error}`);
  }
};

const refreshVerify = async (token: string, userId: string) => {
  // const getAsync = promisify(redisClient.get).bind(redisClient);
  // try {
  //   const data = await getAsync(userId); // refresh token 가져오기
  //   if (token === data) {
  //     try {
  //       jwt.verify(token, secret);
  //       return true;
  //     } catch (err) {
  //       return false;
  //     }
  //   } else {
  //     return false;
  //   }
  // } catch (err) {
  //   return false;
  // }
};

const jwt = {
  sign,
  verify,
  refresh,
  refreshVerify,
};

export default jwt;
