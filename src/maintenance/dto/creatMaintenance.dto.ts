import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsDate, IsMongoId, IsNumber, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMaintenanceDTO {
  @IsString()
  @IsEnum(['Battery', 'Open', 'Leak'])
  @Type(() => String)
  @ApiModelProperty({ description: '维修类型' })
  readonly maintenanceType: string;

  @IsString()
  @Type(() => String)
  @ApiModelProperty({ description: '负责人' })
  readonly principal: string;

  @IsDate()
  @Type(() => Date)
  @ApiModelProperty({ description: '发生时间' })
  readonly occurTime: Date;

  @IsMongoId()
  @Type(() => String)
  @ApiModelProperty({ description: '警告id' })
  readonly warningId: string;

  @IsString()
  @Type(() => String)
  @ApiModelProperty({ description: '地点' })
  readonly location: string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  @ApiModelProperty({ description: '反馈报告' })
  readonly feedback?: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  @ApiModelProperty({ description: '响应时间' })
  readonly responseTime?: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  @ApiModelProperty({ description: '恢复时间' })
  readonly recoverTime?: Date;

  @IsNumber()
  @IsEnum([0, 1, 2])
  @Type(() => Number)
  @ApiModelProperty({ description: '状态' })
  readonly status: number;
}
