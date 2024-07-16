import { IsEmail, IsNotEmpty } from 'class-validator';
import { UserEntity } from 'src/entity/user.entity';

export class LoginRequestDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class SignupRequestDTO extends UserEntity {
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
