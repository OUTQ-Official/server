import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'board' })
export class Board {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ApiProperty({ description: '유저 아이디', example: 'user_id' })
  @Column({ unique: true })
  userId: string;

  @ApiProperty({ description: '내용' })
  @Column()
  contents: string;

  @ApiProperty({ description: '수정일' })
  @CreateDateColumn({ name: 'update-at' })
  updateAt: Date;

  @ApiProperty({ description: '생성일' })
  @CreateDateColumn({ name: 'create-at' })
  createAt: Date;

  // @ApiProperty({ description: '유저정보' })
  // @ManyToOne(() => UserEntity)
  // @JoinColumn({ name: 'userId' })
  // users: UserEntity;
}
