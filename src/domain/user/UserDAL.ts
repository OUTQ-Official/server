import { ObjectId } from 'mongoose';
import { TokenModel, TokenSchemaTypes, UserModel, UserSchemaTypes } from './UserModel';

//유저관련 함수

const createUser = async (userInfo: UserSchemaTypes): Promise<UserSchemaTypes> => {
  try {
    const user = await UserModel.create({
      ...userInfo,
    });
    return user;
  } catch (error) {
    throw new Error(`[UserDAL/createUser] Error :유저 DB저장 실패 : ${error}`);
  }
};

const getUserInfoById = async (id: ObjectId): Promise<UserSchemaTypes | null> => {
  try {
    const user = await UserModel.findById(id);

    return user;
  } catch (error) {
    throw new Error(`[UserDAL/getUserInfoById] Error :  ${error}`);
  }
};

const getUserInfoByEmail = async (email: string): Promise<UserSchemaTypes | null> => {
  try {
    const user = await UserModel.findOne({ email: email });

    return user;
  } catch (error) {
    throw new Error(`[UserDAL/getUserInfoByEmail] Error : ${error}`);
  }
};

//토큰 관련함수
const getTokenInfo = async (refreshToken: string): Promise<TokenSchemaTypes | null> => {
  try {
    const tokenInfo = await TokenModel.findOne({ refreshToken: refreshToken });
    return tokenInfo;
  } catch (error) {
    throw new Error(`[UserDAL/getTokenInfo] Error : ${error}`);
  }
};

const createTokenInfo = async (tokenInfo: TokenSchemaTypes): Promise<TokenSchemaTypes> => {
  try {
    const newToken = await TokenModel.create({
      ...tokenInfo,
    });
    return newToken;
  } catch (error) {
    throw new Error(`[UserDAL/createTokenInfo] Error : ${error}`);
  }
};

const UserDAL = {
  createUser,
  getUserInfoById,
  getUserInfoByEmail,
  getTokenInfo,
  createTokenInfo,
};

export default UserDAL;
