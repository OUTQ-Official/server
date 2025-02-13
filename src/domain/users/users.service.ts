import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserEntity } from '../../entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SingupUserType } from '../auth/interface/local-user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserEntity)
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findUserByEmail(email: string): Promise<UserEntity | null> {
    return this.usersRepository.findOneBy({ email: email });
  }

  async findUserById(id: string): Promise<UserEntity | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async findUserAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  async getRefreshTokenByEmail(email: string): Promise<string> {
    const userEntity = await this.usersRepository.findOne({
      where: {
        email: email,
      },
      select: ['refreshToken'],
    });

    return userEntity.refreshToken;
  }

  async getUserPasswordByEmail(email: string): Promise<string> {
    const userEntity = await this.usersRepository.findOne({
      where: {
        email: email,
      },
      select: ['password'],
    });

    return userEntity.password;
  }

  async removeUser(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async createUser(body: SingupUserType): Promise<UserEntity> {
    const newUser = this.usersRepository.create(body);
    return this.usersRepository.save(newUser);
  }

  async updateUser() {}
}
