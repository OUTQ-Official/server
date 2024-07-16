import { UserEntity } from 'src/entity/user.entity';
import { setSeederFactory } from 'typeorm-extension';


setSeederFactory(UserEntity, (faker) => {
  const user = new UserEntity();
  user.email = "test@naver.com",


  return user;
});
