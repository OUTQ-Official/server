import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SingupUserType } from '../auth/interface/local-user.interface';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserEntity)
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findUserByEmail(email: string): Promise<UserEntity | null> {
    return this.usersRepository.findOneBy({ userEmail: email });
  }

  async findUserById(id: string): Promise<UserEntity | null> {
    return this.usersRepository.findOneBy({ userId: id });
  }

  async findUserAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  async getUserPasswordByEmail(email: string): Promise<string> {
    const { pwd } = await this.usersRepository
      .createQueryBuilder('tb_users')
      .where('email = :email', { email: email })
      .select('pwd')
      .getRawOne();

    return pwd;
  }

  async removeUser(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async createUser(body: SingupUserType): Promise<UserEntity> {
    const newUser = this.usersRepository.create(body);
    return this.usersRepository.save(newUser);
  }

  async updateUser(body: any) {
    const userId = 'testId';
    const user = this.findUserById(userId);

    const updateUser = {
      ...user,
      ...body,
    };

    return await this.usersRepository.save(updateUser);
  }
}
