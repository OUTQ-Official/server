import axios from 'axios';
import { NextFunction, Request, Response } from 'express';

const authorGoogleClient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code } = req.body;

    const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
    const body = {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_PW,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code',
    };

    const data = await axios.post(GOOGLE_TOKEN_URL, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    req.headers.accessToken = data.data?.access_token;
    next();
  } catch (error) {
    next(error);
  }
};

const authenGoogleClient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.headers.accessToken;

    if (!accessToken) throw new Error('[UserMiddleware/authenGoogleClient] Error : 구글 엑세스 토큰 발급실패');

    const GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v2/userinfo';

    const data = await axios.get(GOOGLE_USERINFO_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const googleUserInfo = data.data;

    req.body = { ...googleUserInfo };
    next();
  } catch (error) {
    next(error);
  }
};

const UserMiddleWare = { authorGoogleClient, authenGoogleClient };

export default UserMiddleWare;
