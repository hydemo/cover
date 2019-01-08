import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString, IsNumber, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class WellCoverDTO {
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
  @ApiModelProperty({ description: '测距传感器数值' })
  readonly distance: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @ApiModelProperty({ description: '光敏器件电压值' })
  readonly photoresistor: number;

  readonly createdAt?: any;
}
