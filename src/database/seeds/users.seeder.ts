import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { DataSource, Repository } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

@Injectable()
export default class UserSeeder implements Seeder {
  constructor(
    @InjectModel(UserEntity)
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = dataSource.getRepository(UserEntity);

    const userFactory = factoryManager.get(UserEntity);
    await userFactory.saveMany(5);

    // await repository.insert([
    //   {
    //     id: '2',
    //     email: 'tes7076@naver.com',
    //     password: 'password!',
    //     username: '홍명헌 테스트',
    //     refreshToken: 'refreshToken',
    //     signupAt: new Date(),
    //   },
    // ]);
  }
}
``;
