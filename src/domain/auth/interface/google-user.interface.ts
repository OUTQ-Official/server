import { Request } from 'express';

export interface GoogleUserType {
  email: string;
  username: string;
}

export interface GoogleUserRequest extends Request {
  user: GoogleUserType;
}
