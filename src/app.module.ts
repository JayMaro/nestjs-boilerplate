import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SharedModule } from './modules/shared/shared.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './common/http-exception.filter';
import { LoggerModule } from 'nestjs-pino';
import { Connect } from './entities/connect.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST!,
      port: 3306,
      username: process.env.DB_USERNAME!,
      password: process.env.DB_PASSWORD!,
      database: process.env.DB_SCHEMA!,
      synchronize: false,
      logging: true,
      entities: [Connect],
      subscribers: [],
      migrations: [],
    }),
    LoggerModule.forRoot(),
    SharedModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
