import { IsEnum } from 'class-validator';
import { Type } from '../enum/connect.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateConnectDto {
  @ApiProperty()
  readonly price: number;
  @ApiProperty({
    enum: Type,
  })
  @IsEnum(Type)
  readonly type: Type;
  @ApiProperty()
  readonly weight: number;
  @ApiProperty()
  readonly thumbnailImgUrl: string;
  @ApiProperty()
  readonly frontImgUrl: string;
  @ApiProperty()
  readonly backImgUrl: string;
  @ApiProperty()
  readonly soundPackFlag: boolean;
}
