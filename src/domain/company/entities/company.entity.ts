import { UserEntity } from 'src/domain/users/entities/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tb_company' })
export class CompanyEntity {
  @PrimaryGeneratedColumn('increment', { name: 'cmp_id' })
  companyId: number;

  @Column({ name: 'cmp_name' })
  companyName: string;

  @Column({ name: 'cmp_code' })
  companyCode: number;

  @Column({ name: 'cmp_addr' })
  companyAddress: string;

  @Column({ name: 'cmp_desc' })
  companyDescription: string;

  @Column({ name: 'cmp_ctgry' })
  companyCategory: string;

  @Column({ name: 'cmp_rating' })
  companyRating: number;

  @Column({ name: 'cmp_auth_yn' })
  companyAuthYN: boolean;

  @OneToOne(() => UserEntity, (user) => user.company)
  user: UserEntity;
}
