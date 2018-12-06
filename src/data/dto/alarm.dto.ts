import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class AlarmDTO {
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

  @IsBoolean()
  @Type(() => Boolean)
  @ApiModelProperty({ description: '井盖是否打开' })
  readonly coverIsOpen: boolean = false;

  @IsBoolean()
  @Type(() => Boolean)
  @ApiModelProperty({ description: '燃气燃气是否泄漏' })
  readonly gasLeak: boolean = false;
}
