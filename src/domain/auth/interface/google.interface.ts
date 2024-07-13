import { Request } from 'express';

export interface GoogleUserType {
  email: string;
  username: string;
}

export interface GoogleRequest extends Request {
  user: GoogleUserType;
}
