import { Module } from '@nestjs/common';
import { ConnectService } from './connect.service';
import { ConnectController } from './connect.controller';
import { ConnectRepository } from './connect.repository';

@Module({
  imports: [],
  controllers: [ConnectController],
  providers: [ConnectService, ConnectRepository],
})
export class ConnectModule {}
