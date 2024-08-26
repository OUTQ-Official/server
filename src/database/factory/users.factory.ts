import { UserEntity } from 'src/entity/user.entity';
import { setSeederFactory } from 'typeorm-extension';

setSeederFactory(UserEntity, (faker) => {
  const user = new UserEntity();
  user.userId = faker.string.uuid();
  user.userEmail = faker.internet.email();
  user.userName = faker.internet.userName();
  user.userPwd = faker.internet.password();

  return user;
});
