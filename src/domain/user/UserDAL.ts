import { ObjectId } from 'mongoose';
import UserModel, { UserSchemaTypes } from './UserModel';

const createUser = async () => {};

const getUserInfoById = async (id: ObjectId): Promise<UserSchemaTypes | null> => {
  try {
    const user = await UserModel.findById(id);

    return user;
  } catch (error) {
    throw error;
  }
};

const getUserInfoByEmail = async (email: string): Promise<UserSchemaTypes | null> => {
  try {
    const user = await UserModel.findOne({ email: email });

    return user;
  } catch (error) {
    throw error;
  }
};

const UserDAL = {
  createUser,
  getUserInfoById,
  getUserInfoByEmail,
};

export default UserDAL;
