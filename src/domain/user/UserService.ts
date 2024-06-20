import UserDAL from './UserDAL';
import { UserLoginDTO, UserLoginResultDTO } from './UserDTO';
import bcrypt from 'bcrypt';

const loginWithLocal = async (loginDTO: UserLoginDTO): Promise<UserLoginResultDTO> => {
  try {
    //유저가입여부 확인
    const user = await UserDAL.getUserInfoByEmail(loginDTO.email);
    console.log(user);

    //ERROR -> 존재하지 않는유저
    if (!user) throw Error;
    // if (!user) throw new LoginIDNonExists(rm.INVALID_ID); //! 존재하지 않는 ID

    //비밀번호 체크
    const isMatch = await bcrypt.compare(loginDTO.password, user.password);

    //ERROR -> 비밀번호 불일치
    if (!isMatch) throw Error;

    //로그인 성공
    const result: UserLoginResultDTO = {
      _id: user._id,
      username: user.username,
    };

    return result;
  } catch (error) {
    throw error;
  }
};

const loginWithGoogle = async (code: string) => {
  
};

const UserService = { loginWithLocal, loginWithGoogle };

export default UserService;
