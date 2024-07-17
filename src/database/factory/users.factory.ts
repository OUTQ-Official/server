import { UserEntity } from 'src/entity/user.entity';
import { setSeederFactory } from 'typeorm-extension';

setSeederFactory(UserEntity, (faker) => {
  const user = new UserEntity();
  user.id = faker.string.uuid();
  user.email = faker.internet.email();
  user.username = faker.internet.userName();
  user.password = faker.internet.password();
  user.signupAt = faker.date.anytime();
  user.refreshToken = faker.string.uuid();

  return user;
});
