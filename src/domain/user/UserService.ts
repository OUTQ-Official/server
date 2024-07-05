import jwt from '../../global/utils/jwt';
import UserDAL from './UserDAL';
import {
  GoogleLoginUserDTO,
  GoogleLoginUserResultDTO,
  LocalLoginUserDTO,
  LocalLoginUserResultDTO,
  SignupDTO,
  SignupResultDTO,
} from './UserDTO';
import bcrypt from 'bcrypt';
import { TokenSchemaTypes } from './UserModel';

const signup = async (signupDTO: SignupDTO): Promise<SignupResultDTO> => {
  const salt = bcrypt.genSaltSync(10);

  try {
    const refreshToken = jwt.refresh({ email: signupDTO.email });
    const newUser = await UserDAL.createUser({
      email: signupDTO.email,
      password: bcrypt.hashSync(signupDTO.password, salt),
      username: signupDTO.username,
      registrationType: 'local',
      portfolio_id_list: [],
      refreshToken: refreshToken,
    });

    const tokenInfo: TokenSchemaTypes = {
      refreshToken: refreshToken,
      userId: newUser._id,
    };

    UserDAL.createTokenInfo(tokenInfo);

    const result: SignupResultDTO = {
      _id: newUser._id,
      username: newUser.username,
      refreshToken: newUser.refreshToken,
    };
    return result;
  } catch (error) {
    throw new Error(`[UserService/signup] Erorr : ${error}`);
  }
};

const loginWithLocal = async (loginDTO: LocalLoginUserDTO): Promise<LocalLoginUserResultDTO> => {
  try {
    const foundUser = await UserDAL.getUserInfoByEmail(loginDTO.email);

    if (!foundUser) throw new Error('[UserService/localWithLocal] Error : 존재하지 않는 회원');

    const isMatch = await bcrypt.compare(loginDTO.password, foundUser.password);

    if (!isMatch) throw new Error('[UserService/localWithLocal] Error : 비밀번호 불일치');

    const result: LocalLoginUserResultDTO = {
      _id: foundUser._id,
      username: foundUser.username,
      refreshToken: foundUser.refreshToken,
    };

    return result;
  } catch (error) {
    throw new Error(`[UserService/loginWithLocal] Erorr : ${error}`);
  }
};

const loginWithGoogle = async (loginDTO: GoogleLoginUserDTO): Promise<GoogleLoginUserResultDTO> => {
  try {
    //유저가입여부 확인
    let user = await UserDAL.getUserInfoByEmail(loginDTO.email);

    //존재하지 않는경우 회원가입 시키기
    if (!user) {
      const refreshToken = jwt.refresh({ email: loginDTO.email });

      const newUser = await UserDAL.createUser({
        email: loginDTO.email,
        password: 'null-password',
        username: loginDTO.name,
        registrationType: 'google',
        portfolio_id_list: [],
        refreshToken: refreshToken,
      });

      const tokenInfo: TokenSchemaTypes = {
        refreshToken: refreshToken,
        userId: newUser._id,
      };

      UserDAL.createTokenInfo(tokenInfo);
      user = { ...newUser };
    }

    //로그인 성공
    const result: GoogleLoginUserResultDTO = {
      _id: user._id,
      username: user.username,
      refreshToken: user.refreshToken,
    };
    return result;
  } catch (error) {
    throw new Error(`[UserService/loginWithGoogle] Erorr : ${error}`);
  }
};

//Token관련
const refreshAccessToken = async () => {};

const UserService = { loginWithLocal, loginWithGoogle, signup };

export default UserService;
