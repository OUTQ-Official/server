import jwt from '../../legacy/utils/jwt';
import UserDAL from './UserDAL';
import { GoogleLoginUserDTO, GoogleLoginUserResultDTO, LocalLoginUserDTO, LocalLoginUserResultDTO } from './UserDTO';
import bcrypt from 'bcrypt';

const loginWithLocal = async (loginDTO: LocalLoginUserDTO): Promise<LocalLoginUserResultDTO> => {
  try {
    //유저가입여부 확인
    const user = await UserDAL.getUserInfoByEmail(loginDTO.email);

    //ERROR -> 존재하지 않는유저
    if (!user) throw Error;
    // if (!user) throw new LoginIDNonExists(rm.INVALID_ID); //! 존재하지 않는 ID

    //비밀번호 체크
    const isMatch = await bcrypt.compare(loginDTO.password, user.password);

    //ERROR -> 비밀번호 불일치
    if (!isMatch) throw Error;

    //로그인 성공
    const result: LocalLoginUserResultDTO = {
      _id: user._id,
      username: user.username,
    };

    return result;
  } catch (error) {
    throw error;
  }
};

const loginWithGoogle = async (loginDTO: GoogleLoginUserDTO): Promise<GoogleLoginUserResultDTO> => {
  try {
    //유저가입여부 확인
    const user = await UserDAL.getUserInfoByEmail(loginDTO.email);

    //존재하지 않는경우 회원가입 시키기
    if (!user) {
      const newUser = await UserDAL.createUser({
        email: loginDTO.email,
        password: 'null-password',
        username: loginDTO.name,
        registrationType: 'google',
        portfolio_id_list: [],
        refreshToken: jwt.refresh(),
      });

      const result: GoogleLoginUserResultDTO = {
        _id: newUser._id,
        username: newUser.username,
      };
      return result;
    }
    
    //로그인 성공
    const result: GoogleLoginUserResultDTO = {
      _id: user._id,
      username: user.username,
    };
    return result;
  } catch (error) {
    throw error;
  }
};

const UserService = { loginWithLocal, loginWithGoogle };

export default UserService;
