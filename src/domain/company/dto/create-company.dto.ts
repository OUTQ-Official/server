import { IsNotEmpty } from 'class-validator';
import { CompanyEntity } from '../entities/company.entity';

export class CreateCompanyDto extends CompanyEntity {
  @IsNotEmpty()
  companyName: string;

  @IsNotEmpty()
  companyCode: number;

  @IsNotEmpty()
  companyAddress: string;

  @IsNotEmpty()
  companyCategory: string;

  @IsNotEmpty()
  companyDescription: string;

  @IsNotEmpty()
  companyRating: number;

  @IsNotEmpty()
  companyAuthYN: boolean;
}
