import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/domain/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';


@Entity({ name: 'tb_auth' })
export class AuthEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  @ApiProperty({ description: '회원일련번호', example: 'asfb1123' })
  userId: string;

  @Column({
    name: 'auth_refresh_token',
    unique: true,
    select: false,
    comment: '리프레쉬 토큰 값',
  })
  @ApiProperty({ description: '리프레쉬 토큰 값', example: 'asfb1123' })
  refreshToken: string;

  @CreateDateColumn({
    name: '토큰 생성일자',
    comment: '리프레쉬 토큰 생성일자',
  })
  @ApiProperty({
    description: '리프레쉬 토큰 생성일자',
    example: '20224-09-11',
  })
  createAt: Date;

  @UpdateDateColumn({ name: 'auth_update_at' })
  @ApiProperty({ description: '리프레쉬 토큰 수정일자', example: '2024-09-11' })
  updatedAt: Date;

  @CreateDateColumn({
    name: '토큰 만료일자',
    comment: '리프레쉬 토큰 만료일자',
  })
  @ApiProperty({
    description: '리프레쉬 토큰 만료일자',
    example: '2024-09-11',
  })
  expiredAt: Date;

  @OneToOne(() => UserEntity, (user) => user.auth)
  user: UserEntity;
}
