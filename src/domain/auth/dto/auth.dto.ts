import { IsEmail, IsNotEmpty } from 'class-validator';
import {
  USER_REGSTR_TYPE,
  USER_ROLE_TYPE,
} from 'src/domain/users/entities/user.entity';

export class LoginRequestDTO {
  @IsEmail()
  @IsNotEmpty()
  userEmail: string;

  @IsNotEmpty()
  userPwd: string;
}

export class LoginResponseDTO {
  @IsEmail()
  @IsNotEmpty()
  userEmail: string;

  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  accessToken: string;
}

export class SignupRequestDTO {
  @IsEmail()
  @IsNotEmpty()
  userEmail: string;

  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  userPwd: string;

  @IsNotEmpty()
  userRegstrType: USER_REGSTR_TYPE;

  @IsNotEmpty()
  companyName: string;

  @IsNotEmpty()
  companyPos: string;

  @IsNotEmpty()
  userRoleType: USER_ROLE_TYPE;

  @IsNotEmpty()
  userPhone: string;
}

export class SignupResponseDTO {
  @IsEmail()
  @IsNotEmpty()
  userEmail: string;

  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  userRegstrType: USER_REGSTR_TYPE;

  @IsNotEmpty()
  companyName: string;

  @IsNotEmpty()
  companyPos: string;

  @IsNotEmpty()
  userRoleType: USER_ROLE_TYPE;

  @IsNotEmpty()
  userPhone: string;
}
