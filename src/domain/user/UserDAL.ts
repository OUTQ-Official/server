import { ObjectId } from 'mongoose';
import UserModel, { UserSchemaTypes } from './UserModel';

const createUser = async (userInfo: UserSchemaTypes): Promise<UserSchemaTypes> => {
  try {
    const user = await UserModel.create({
      ...userInfo,
    });
    return user;
  } catch (error) {
    throw error;
  }
};

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
