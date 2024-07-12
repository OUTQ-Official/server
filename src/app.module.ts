import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './domain/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './domain/auth/auth.module';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { TypeOrmConfigService } from './config/db.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'development' ? '.env.dev' : '.env.prod',
      load: [configuration],
      isGlobal: true,
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   // useExisting: TypeOrmConfigService,
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'postgres',
    //     host: configService.get(process.env.DB_HOST),
    //     port: configService.get(process.env.DB_PORT),
    //     username: configService.get(process.env.DB_USERNAME),
    //     password: configService.get(process.env.DB_PW),
    //     database: configService.get(process.env.DB_NAME),
    //     entities: ['src/**/*.entity.{.ts,.js}'],
    //     migrations: ['src/database/migrations/*.ts'],
    //     migrationsTableName: 'migrations',
    //     synchronize: false,
    //   }),
    //   inject: [ConfigService],
    // }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
