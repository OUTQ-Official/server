import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyEntity } from './entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectModel } from '@nestjs/sequelize';
import { UsersService } from '../users/users.service';

@Injectable()
export class CompanyService {
  constructor(
    private userService: UsersService,
    @InjectModel(CompanyEntity)
    @InjectRepository(CompanyEntity)
    private companyRepository: Repository<CompanyEntity>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    const { ...restDto } = createCompanyDto;
    const newCompany = this.companyRepository.create({
      ...createCompanyDto,
    });

    return this.companyRepository.save(newCompany);
  }

  findAll() {
    return this.companyRepository.find();
  }

  findOne(companyId: string) {
    return this.companyRepository.findOne({});
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
