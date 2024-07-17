import { Board } from 'src/entity/board.entity';

export interface SingupUserType {
  id: string;
  email: string;
  password: string;
  username: string;
  refreshToken: string;
  signupAt: Date;
  boards?: Board[];
}
