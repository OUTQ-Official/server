import { Injectable } from '@nestjs/common';
import { LoginRequestDTO } from './dto/auth.dto';
import { GoogleUserType } from './interface/google-user.interface';
import { UsersService } from '../users/users.service';
import bcrypt from 'bcrypt';
import { UserModel } from '../users/model/user.model';
import { SingupUserType } from './interface/local-user.interface';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}
  async login(body: LoginRequestDTO) {
    const { email, password } = body;

    try {
      const user = await this.userService.findUserByEmail(email);
      console.log(user);

      const isMatch = bcrypt.compare(password, user.password);

      if (isMatch) {
        return user;
      }
    } catch (error) {
      console.log('error');
    }
  }

  async signup(body: SingupUserType) {
    try {
      const newUser = await this.userService.createUser(body);
      console.log(newUser);
      return newUser;
    } catch (error) {
      console.log(error);
    }
  }

  async loginWithGoogle(user: GoogleUserType) {
    console.log(user);
    // try {
    //   const findUser = await this.userService.findUserByEmail(user.email);
    // } catch (error) {}
  }
}
