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

    const testUser = repository.create({
      id: 'testUser',
      email: 'test@email.com',
      password: 'password123!',
      username: '테스트 유저',
      refreshToken: 'Test Refresh Token',
      signupAt: new Date(),
    });

    repository.save(testUser);

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
