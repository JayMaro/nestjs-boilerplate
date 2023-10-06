import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { constants } from 'src/common/constants';
import { Connect } from 'src/entities/connect.entity';
import { Repository } from 'typeorm';
import { CreateConnectDto } from './dto/create-connect.dto';
import { UpdateConnectDto } from './dto/update-connect.dto';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class ConnectService {
  constructor(
    @Inject(constants.CONNECT_REPOSITORY)
    private connectRepository: Repository<Connect>,
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
    return await this.connectRepository.findOne({
      where: {
        seq: seq,
      },
    });
  }

  async findAll(): Promise<Connect[]> {
    this.logger.info('findAll connect');
    return await this.connectRepository.find();
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
