import { CookieOptions } from 'express';
import config from '.';

export const cookieConfigs: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'none',
  domain:
    config.env === 'production' ? 'https://port-0-server-lxk7tq5gd024dbe3.sel5.cloudtype.app' : 'http://localhost:8080',
  path: '/',
  maxAge: 60 * 24 * 60 * 60 * 1000,
};

export const clearCookieInfo = {
  httpOnly: true,
  secure: true,
  sameSite: 'none',
  domain:
    config.env === 'production' ? 'https://port-0-server-lxk7tq5gd024dbe3.sel5.cloudtype.app' : 'http://localhost:8080',
  path: '/',
};
