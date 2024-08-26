import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tb_company' })
export class CompanyEntity {
  @PrimaryGeneratedColumn('increment', { name: 'cmp_id' })
  companyId: string;
}
