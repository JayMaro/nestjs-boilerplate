import { constants } from 'src/common/constants';
import { Connect } from 'src/entities/connect.entity';
import { DataSource } from 'typeorm';

export const ConnectRepository = [
  {
    provide: constants.CONNECT_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Connect),
    inject: [constants.DATA_SOURCE],
  },
];
