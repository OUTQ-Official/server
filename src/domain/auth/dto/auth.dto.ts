import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginRequestDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class SignupRequestDTO {
  email: string;
  password: string;
  username: string;
}

export class SignupResponseDTO {
  email: string;
  password: string;
  username: string;
}

export class OauthLoginRequestDTO {
  @IsNotEmpty()
  code: string;
}
