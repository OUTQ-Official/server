import { Request } from 'express';

export interface GoogleUserType {
  email: string;
  username: string;
}

export interface GoogleUserRequestType extends Request {
  user: GoogleUserType;
}
