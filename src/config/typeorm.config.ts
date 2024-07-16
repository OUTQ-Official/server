import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { loadEnv } from './evn.config';
import { SeederOptions } from 'typeorm-extension';

loadEnv();
export const typeOrmAsyncConfig: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
  entities: ['src/**/*.entity.{.ts,.js}'],
  migrations: ['src/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
  synchronize: false,
  seeds: ['src/database/seeds/**/*.{js,ts}'],
};

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const options: TypeOrmModuleOptions = {
      ...typeOrmAsyncConfig,
      autoLoadEntities: true,
    };

    return options;
  }
}

export default new DataSource(typeOrmAsyncConfig);
