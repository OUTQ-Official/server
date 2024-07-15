import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './model/user.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SingupUserType } from '../auth/interface/local-user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel)
    @InjectRepository(UserModel)
    private usersRepository: Repository<UserModel>,
  ) {}
  async findUserByEmail(email: string): Promise<UserModel | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async findUserById(id: string) {
    return this.usersRepository.findOneBy({ id });
  }

  async findUserAll(): Promise<UserModel[]> {
    return this.usersRepository.find();
  }

  async removeUser(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async createUser(body: SingupUserType): Promise<UserModel> {
    return this.usersRepository.create(body);
  }

  async updateUser() {}
}
