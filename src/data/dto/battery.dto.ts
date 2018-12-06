import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString, IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class BatteryDTO {
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
  @Min(0)
  @Max(100)
  @Type(() => Number)
  @ApiModelProperty({ description: '电量水平' })
  readonly batteryLevel: number;
}
