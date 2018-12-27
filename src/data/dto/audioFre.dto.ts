import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString, IsNumber, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class AudioFreDTO {
  @IsMongoId()
  @Type(() => String)
  @ApiModelProperty({ description: '窨井Id' })
  readonly wellId: string;

  @IsString()
  @Type(() => String)
  @ApiModelProperty({ description: '设备id' })
  readonly deviceId: string;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiModelProperty({ description: '超声波频率' })
  readonly frequency: number;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiModelProperty({ description: '超声波振幅' })
  readonly amplitude: number;
}
