import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { CompanyEntity } from './entities/company.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/entities/user.entity';
import { JwtAccessStrategy } from '../auth/strategies/jwt-auth.strategy';
import { JwtAccessGuard } from '../auth/guard/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [CompanyController],
  imports: [TypeOrmModule.forFeature([UserEntity, CompanyEntity])],
  providers: [
    JwtAccessStrategy,
    JwtAccessGuard,
    CompanyService,
    UsersService,
    JwtService,
  ],
})
export class CompanyModule {}
