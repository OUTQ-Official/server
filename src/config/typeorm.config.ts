import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { loadEnv } from './evn.config';
import { dataSourceOptions } from 'src/database/data-source';

loadEnv();

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const typeOrmOptions: TypeOrmModuleOptions = {
      ...dataSourceOptions,
      autoLoadEntities: true,
    };

    return typeOrmOptions;
  }
}

export default new DataSource(dataSourceOptions);
