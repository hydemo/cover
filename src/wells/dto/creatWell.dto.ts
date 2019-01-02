import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString, IsNumber, ValidateNested, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { StatusDTO } from './status.dto';

export class CreateWellDTO {
  @IsString()
  @Type(() => String)
  @ApiModelProperty({ description: '窨井编号' })
  readonly wellSN: string;

  @IsMongoId()
  @IsOptional()
  @Type(() => String)
  @ApiModelPropertyOptional({ description: '业主id' })
  readonly ownerId?: string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  @ApiModelPropertyOptional({ description: '窨井类型' })
  readonly wellType?: string;

  @IsNumber()
  @IsOptional()
  @ApiModelPropertyOptional({ description: '井壁口径' })
  readonly wellCaliber?: string;

  @IsNumber()
  @IsOptional()
  @ApiModelPropertyOptional({ description: '井壁口径' })
  readonly coverCaliber?: string;

  @IsNumber()
  @IsOptional()
  @ApiModelPropertyOptional({ description: '窨井深度' })
  readonly wellDepth?: string;

  @IsNumber()
  @ApiModelPropertyOptional({ description: '经度' })
  readonly longitude?: string;

  @IsNumber()
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
  @ApiModelPropertyOptional({ description: '设备id' })
  readonly deviceId?: string;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  @ApiModelPropertyOptional({ description: '布防/撤防' })
  readonly isDefence?: boolean = true;
  readonly isDelete?: boolean;
}
