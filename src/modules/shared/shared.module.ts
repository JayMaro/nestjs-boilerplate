import { Module } from '@nestjs/common';
import { ConnectModule } from '../connect/connect.module';

@Module({
  imports: [ConnectModule],
})
export class SharedModule {}
