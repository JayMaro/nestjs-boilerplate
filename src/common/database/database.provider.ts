import { DataSource } from 'typeorm';
import { constants } from '../constants';
import * as dotenv from 'dotenv';
import { Connect } from 'src/entities/connect.entity';
dotenv.config();

export const databaseProvider = [
  {
    provide: constants.DATA_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
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
      });

      return dataSource.initialize();
    },
  },
];
