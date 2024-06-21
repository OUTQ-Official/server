import { ObjectId } from 'mongoose';

export interface SignupDTO {
  email: string;
  password: string;
  username: string;
}

export interface SignupResultDTO {
  _id: ObjectId;
  username: string;
  refreshToken: string;
}

export interface LocalLoginUserDTO {
  email: string;
  password: string;
}

export interface LocalLoginUserResultDTO {
  _id: ObjectId;
  username: string;
  refreshToken: string;
}

export interface GoogleLoginUserDTO {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
}

export interface GoogleLoginUserResultDTO {
  _id: ObjectId;
  username: string;
  refreshToken: string;
}
