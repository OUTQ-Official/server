import { ApiProperty } from '@nestjs/swagger';
import { AuthEntity } from 'src/domain/auth/entities/auth.entity';
import { CompanyEntity } from 'src/domain/company/entities/company.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum USER_REGSTR_TYPE {
  LOCAL = 'local',
  GOOGLE = 'google',
  KAKAO = 'kakao',
}

export enum USER_ROLE_TYPE {
  CLIENT = 'client',
  PRODUCTOR = 'productor',
}

@Entity({ name: 'tb_users' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  @ApiProperty({ description: '회원일련번호', example: 'asfb1123' })
  userId: string;

  @Column({ name: 'email', unique: true, type: 'varchar' })
  @ApiProperty({ description: '이메일', example: 'test123@naver.com' })
  userEmail: string;

  @Column({ name: 'name', type: 'varchar' })
  @ApiProperty({ description: '이름', example: '홍길동' })
  userName: string;

  @Column({ name: 'pwd', select: false })
  @ApiProperty({ description: '비밀번호', example: 'abc12345!' })
  userPwd: string;

  @Column({ name: 'regstr_type' })
  @ApiProperty({ description: '가입유형', example: 'kakao' })
  userRegstrType: USER_REGSTR_TYPE;

  @Column({ name: 'company_name' })
  @ApiProperty({ description: '회사명', example: 'Track1' })
  companyName: string;

  @Column({ name: 'company_pos' })
  @ApiProperty({ description: '직책', example: '사원' })
  companyPos: string;

  @Column({ name: 'role_type' })
  @ApiProperty({ description: '유저 타입', example: 'client' })
  userRoleType: USER_ROLE_TYPE;

  @Column({ name: 'phone' })
  @ApiProperty({ description: '핸드폰번호', example: '010-0000-0000' })
  userPhone: string;

  @CreateDateColumn({ name: 'create_at', select: false, comment: '생성일' })
  @ApiProperty({ description: '생성일', example: '2024-09-11' })
  createdAt: Date;

  @CreateDateColumn({ name: 'update_at', select: false, comment: '생성일' })
  @ApiProperty({ description: '수정일', example: '2024-09-11' })
  updateAt: Date;

  @OneToOne(() => AuthEntity, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  auth: AuthEntity;

  @OneToOne(() => CompanyEntity, {})
  @JoinColumn()
  company: CompanyEntity;
}
