import { Injectable, NotFoundException } from '@nestjs/common';
import { Connect } from 'src/entities/connect.entity';
import { CreateConnectDto } from './dto/create-connect.dto';
import { UpdateConnectDto } from './dto/update-connect.dto';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { ConnectRepository } from './connect.repository';

@Injectable()
export class ConnectService {
  constructor(
    private readonly connectRepository: ConnectRepository,
    @InjectPinoLogger(ConnectService.name)
    private readonly logger: PinoLogger,
  ) {}

  async create(createConnectDto: CreateConnectDto) {
    this.logger.info('create connect');
    const connect = Connect.of(createConnectDto);
    connect.regAdminSeq = 1;
    connect.updateAdminSeq = 1;
    await this.connectRepository.save(connect);
  }

  async findOne(seq: number): Promise<Connect> {
    this.logger.info('findOne connect');
    return await this.connectRepository.findOneBySeq(seq);
  }

  async findAll(): Promise<Connect[]> {
    this.logger.info('findAll connect');
    return await this.connectRepository.findAll();
  }

  async update(connectSeq: number, updateConnectDto: UpdateConnectDto) {
    this.logger.info('update connect');
    const connect = await this.findOne(connectSeq);
    if (!connect) {
      throw new NotFoundException('해당 항목이 존재하지 않습니다.');
    }
    connect.update(updateConnectDto);
    connect.updateAdminSeq = 1;
    await this.connectRepository.save(connect);
  }

  async delete(connectSeq: number) {
    this.logger.info('delete connect');
    const connect = await this.findOne(connectSeq);
    connect.useFlag = false;
    await this.connectRepository.save(connect);
  }
}
