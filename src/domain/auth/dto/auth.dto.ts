import { IsEmail, IsNotEmpty } from 'class-validator';
import { UserModel } from 'src/domain/users/model/user.model';

export class LoginRequestDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class SignupRequestDTO extends UserModel {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  username: string;
}

export class SignupResponseDTO {
  email: string;
  password: string;
  username: string;
}
