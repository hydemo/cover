import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString, IsNumber, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class AudioFreDTO {
  @IsMongoId()
  @Type(() => String)
  @ApiModelProperty({ description: '窑井Id' })
  readonly wellId: string;

  @IsMongoId()
  @Type(() => String)
  @ApiModelProperty({ description: '井盖Id' })
  readonly coverId: string;

  @IsString()
  @Type(() => String)
  @ApiModelProperty({ description: '设备序号' })
  readonly deviceSn: string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  @ApiModelPropertyOptional({ description: '设备名称' })
  readonly deviceName?: string;

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
