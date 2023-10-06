import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Connect } from 'src/entities/connect.entity';
import { ConnectService } from './connect.service';
import { CreateConnectDto } from './dto/create-connect.dto';
import { UpdateConnectDto } from './dto/update-connect.dto';
import { ResponseFormat } from 'src/common/response.format';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('CONNECT')
@Controller('connect')
export class ConnectController {
  constructor(private connectService: ConnectService) {}

  @Get()
  @ApiOperation({ summary: '사용자의 모든 커넥트 항목 조회' })
  async findAll(): Promise<ResponseFormat<Connect[]>> {
    return new ResponseFormat(
      HttpStatus.OK,
      await this.connectService.findAll(),
      'ok',
    );
  }

  @Get('/:seq')
  @ApiOperation({ summary: '식별자로 커넥트 항목 조회' })
  async findOne(
    @Param('seq') connectSeq: number,
  ): Promise<ResponseFormat<Connect>> {
    return new ResponseFormat(
      HttpStatus.OK,
      await this.connectService.findOne(connectSeq),
      'ok',
    );
  }

  @Post()
  @ApiOperation({ summary: '커넥트 등록' })
  @ApiBody({
    type: CreateConnectDto,
  })
  async create(
    @Body() createConnectDto: CreateConnectDto,
  ): Promise<ResponseFormat<void>> {
    return new ResponseFormat(
      HttpStatus.CREATED,
      await this.connectService.create(createConnectDto),
      'ok',
    );
  }

  @Put('/:seq')
  @ApiOperation({ summary: '커넥트 수정' })
  async update(
    @Param('seq') connectSeq: number,
    @Body() updateConnectDto: UpdateConnectDto,
  ): Promise<ResponseFormat<void>> {
    return new ResponseFormat(
      HttpStatus.CREATED,
      await this.connectService.update(connectSeq, updateConnectDto),
      'ok',
    );
  }

  @Delete('/:seq')
  @ApiOperation({ summary: '커넥트 삭제' })
  async delete(
    @Param('seq') connectSeq: number,
  ): Promise<ResponseFormat<void>> {
    return new ResponseFormat(
      HttpStatus.CREATED,
      await this.connectService.delete(connectSeq),
      'ok',
    );
  }
}
