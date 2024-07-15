import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Board } from '../../../entity/board.entity';

@Entity({ name: 'user' })
export class UserModel {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: string;

  @ApiProperty({ description: '유저 이메일', example: 'test123@naver.com' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ description: '유저 비밀번호', example: 'abc12345!' })
  @Column({ select: false })
  password: string;

  @ApiProperty({ description: '유저 이름', example: '홍명헌' })
  @Column({ unique: true })
  username: string;

  @ApiProperty({ description: '리프레쉬 토큰' })
  @Column({ unique: true })
  refreshToken: string;

  @ApiProperty({ description: '생성일', example: '2024-01-01' })
  @CreateDateColumn({ name: 'create-at' })
  signupAt: Date;

  @ApiProperty({ description: '작성한 게시글' })
  @OneToMany(() => Board, (board) => board.users)
  boards: Board[];
}
