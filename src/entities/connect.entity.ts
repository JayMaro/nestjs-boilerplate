import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CreateConnectDto } from 'src/modules/connect/dto/create-connect.dto';
import { UpdateConnectDto } from 'src/modules/connect/dto/update-connect.dto';
import { Type } from 'src/modules/connect/enum/connect.enum';

@Entity('connect')
export class Connect extends BaseEntity {
  @PrimaryGeneratedColumn()
  seq: number;
  @Column({ name: 'price' })
  price: number;
  @Column({ type: 'enum', name: 'type', enum: Type })
  type: Type;
  @Column({ name: 'weight' })
  weight: number;
  @Column({ name: 'thumbnail_img_url' })
  thumbnailImgUrl: string;
  @Column({ name: 'front_img_url' })
  frontImgUrl: string;
  @Column({ name: 'back_img_url' })
  backImgUrl: string;
  @Column({ name: 'sound_pack_flag' })
  soundPackFlag: boolean;

  private constructor(
    price: number,
    type: Type,
    weight: number,
    thumbnailImgUrl: string,
    frontImgUrl: string,
    backImgUrl: string,
    soundPackFlag: boolean,
  ) {
    super();
    this.price = price;
    this.type = type;
    this.weight = weight;
    this.thumbnailImgUrl = thumbnailImgUrl;
    this.frontImgUrl = frontImgUrl;
    this.backImgUrl = backImgUrl;
    this.soundPackFlag = soundPackFlag;
  }

  public static of(createConnectDto: CreateConnectDto) {
    return new Connect(
      createConnectDto.price,
      createConnectDto.type,
      createConnectDto.weight,
      createConnectDto.thumbnailImgUrl,
      createConnectDto.frontImgUrl,
      createConnectDto.backImgUrl,
      createConnectDto.soundPackFlag,
    );
  }

  public update(updateConnectDto: UpdateConnectDto) {
    if (updateConnectDto.price !== undefined) {
      this.price = updateConnectDto.price;
    }
    if (updateConnectDto.type !== undefined) {
      this.type = updateConnectDto.type;
    }
    if (updateConnectDto.weight !== undefined) {
      this.weight = updateConnectDto.weight;
    }
    if (updateConnectDto.thumbnailImgUrl !== undefined) {
      this.thumbnailImgUrl = updateConnectDto.thumbnailImgUrl;
    }
    if (updateConnectDto.frontImgUrl !== undefined) {
      this.frontImgUrl = updateConnectDto.frontImgUrl;
    }
    if (updateConnectDto.backImgUrl !== undefined) {
      this.backImgUrl = updateConnectDto.backImgUrl;
    }
    if (updateConnectDto.soundPackFlag !== undefined) {
      this.soundPackFlag = updateConnectDto.soundPackFlag;
    }
  }
}
