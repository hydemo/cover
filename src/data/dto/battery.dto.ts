import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString, IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class BatteryDTO {
  @IsMongoId()
  @Type(() => String)
  @ApiModelProperty({ description: '窨井Id' })
  readonly wellId: string;

  @IsString()
  @Type(() => String)
  @ApiModelProperty({ description: '设备id' })
  readonly deviceId: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  @Type(() => Number)
  @ApiModelProperty({ description: '电量水平' })
  readonly batteryLevel: number;
}
