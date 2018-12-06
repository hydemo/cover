import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString, IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class ConfigReportDTO {
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
  @Max(330)
  @Type(() => Number)
  @ApiModelProperty({ description: '光敏检测周期' })
  readonly photoCheckPeriod: number;

  @IsNumber()
  @Min(0)
  @Max(255)
  @Type(() => Number)
  @ApiModelProperty({ description: '超声波频率检测周期' })
  readonly freqCheckPeriod: number;

  @IsNumber()
  @Min(0)
  @Max(255)
  @Type(() => Number)
  @ApiModelProperty({ description: '位置检测周期' })
  readonly distCheckPeriod: number;
}
