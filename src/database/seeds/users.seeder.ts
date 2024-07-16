import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { DataSource, Repository } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

@Injectable()
export default class UserSeeder implements Seeder {
  private readonly logger = new Logger(UserSeeder.name);

  constructor(
    @InjectModel(UserEntity)
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    // this.logger.log(this.usersRepository);
    // try {
    //   // await factory(UserEntity)().create({
    //   //   id: '1',
    //   //   email: 'tes7076@naver.com',
    //   //   password: 'abc12345!',
    //   //   username: '홍명헌',
    //   //   refreshToken: 'abc',
    //   //   signupAt: new Date(),
    //   // });
    //   this.usersRepository.create({
    //     id: '2',
    //     email: 'tes7076@naver.com',
    //     password: 'password!',
    //     username: '홍명헌 테스트',
    //     refreshToken: 'refreshToken',
    //     signupAt: new Date(),
    //   });
    // } catch (error) {
    //   this.logger.log(error);
    // }

    const repository = dataSource.getRepository(UserEntity);

    await repository.insert([
      {
        id: '2',
        email: 'tes7076@naver.com',
        password: 'password!',
        username: '홍명헌 테스트',
        refreshToken: 'refreshToken',
        signupAt: new Date(),
      },
    ]);
  }
}
``;
