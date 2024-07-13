import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  async findUserByEmail(email: string) {
    return 'email';
  }

  async findUserByUserId(userId: string) {
    return 'userId';
  }

  async createUser() {}

  async updateUser() {}
}
