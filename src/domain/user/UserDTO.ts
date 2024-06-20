import { ObjectId } from 'mongoose';

export interface UserLoginDTO {
  email: string;
  password: string;
}

export interface UserLoginResultDTO {
  _id: ObjectId;
  username: string;
}
