import { Injectable } from '@nestjs/common';
import { Connect } from 'src/entities/connect.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ConnectRepository {
  private repository: Repository<Connect>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Connect);
  }

  async save(connect: Connect) {
    return await this.repository.save(connect);
  }

  async findOneBySeq(seq: number) {
    return await this.repository.findOne({
      where: {
        seq: seq,
      },
    });
  }

  async findAll() {
    return await this.repository.find();
  }
}
