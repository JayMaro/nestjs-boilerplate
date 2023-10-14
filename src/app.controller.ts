import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from './common/decorator/auth.decorator';

@ApiTags('APP')
@Controller()
@Public()
export class AppController {
  @Get('ping')
  ping(): string {
    return 'pong';
  }
}
