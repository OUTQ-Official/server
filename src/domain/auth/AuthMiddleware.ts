import axios from 'axios';
import { NextFunction, Request, Response } from 'express';

const authGoogleAccessToken = async (req: Request, res: Response, next: NextFunction) => {
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

    req.headers.accessToken = data?.accessToken
  } catch (error) {
    next(error);
  }
};

const AuthMiddleware = { authGoogleAccessToken };

export default AuthMiddleware;
