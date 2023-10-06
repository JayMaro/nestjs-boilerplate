import { Module } from '@nestjs/common';
import { ConnectService } from './connect.service';
import { ConnectController } from './connect.controller';
import { ConnectRepository } from './connect.repository';
import { DatabaseModule } from 'src/common/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ConnectController],
  providers: [ConnectService, ...ConnectRepository],
})
export class ConnectModule {}
