import { Document, ObjectId } from 'mongodb';
import mongoose, { Schema } from 'mongoose';

// const bcrypt = require('bcrypt');

type RegistrationTypes = 'local' | 'kakao' | 'google';

export interface UserSchemaTypes extends Document {
  email: string;
  password: string;
  username: string;
  registrationType: RegistrationTypes;
  refreshToken: string;
  portfolio_id_list: ObjectId[];
}

const userSchema = new mongoose.Schema<UserSchemaTypes>({
  email: { type: String, unique: true },
  password: { type: String, minLength: 8 },
  username: { type: String },
  registrationType: { type: String },
  refreshToken: { type: String },
  portfolio_id_list: { type: [String] },
});

export const UserModel = mongoose.model('User', userSchema);

export interface TokenSchemaTypes {
  refreshToken: string;
  userId: ObjectId;
}

const tokenSchema = new mongoose.Schema<TokenSchemaTypes>({
  refreshToken: { type: String, unique: true },
  userId: { type: Schema.ObjectId, unique: true },
});

export const TokenModel = mongoose.model('Token', tokenSchema);
