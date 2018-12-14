import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { StatusDTO } from './status.dto';

export class CreateWellDTO {
  @IsString()
  @Type(() => String)
  @ApiModelProperty({ description: '编号' })
  readonly wellSN: string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  @ApiModelPropertyOptional({ description: '业主id' })
  readonly ownerId?: string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  @ApiModelPropertyOptional({ description: '业主姓名' })
  readonly ownerName?: string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  @ApiModelPropertyOptional({ description: '窑井类型' })
  readonly wellType?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @ApiModelPropertyOptional({ description: '窑井口径' })
  readonly wellCaliber?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @ApiModelPropertyOptional({ description: '窑井深度' })
  readonly wellDepth?: number;

  @IsString()
  @Type(() => String)
  @ApiModelPropertyOptional({ description: '经度' })
  readonly longitude?: string;

  @IsString()
  @Type(() => String)
  @ApiModelPropertyOptional({ description: '纬度' })
  readonly latitude?: string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  @ApiModelPropertyOptional({ description: '位置' })
  readonly location?: string;

  @ValidateNested()
  @Type(() => StatusDTO)
  @ApiModelPropertyOptional({ description: '井盖状态' })
  readonly status?: StatusDTO = {};

  @IsMongoId()
  @IsOptional()
  @Type(() => String)
  @ApiModelPropertyOptional({ description: '井盖id' })
  readonly coverId?: string;

  @IsMongoId()
  @IsOptional()
  @Type(() => String)
  @ApiModelPropertyOptional({ description: '设备id' })
  readonly deviceId?: string;
}
