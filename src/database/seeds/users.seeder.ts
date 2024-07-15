import { UserModel } from 'src/domain/users/model/user.model';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class UserSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = dataSource.getRepository(UserModel);

    await repository.insert([
      {
        email: 'tes7076@naver.com',
        password: 'abc12345!',
        username: '홍명헌',
      },
    ]);
  }
}
