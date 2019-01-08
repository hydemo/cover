import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class AlarmDTO {
  @IsMongoId()
  @Type(() => String)
  @ApiModelProperty({ description: '窨井Id' })
  readonly wellId: string;

  @IsString()
  @Type(() => String)
  @ApiModelProperty({ description: '设备Id' })
  readonly deviceId: string;

  @IsBoolean()
  @Type(() => Boolean)
  @ApiModelProperty({ description: '井盖是否打开' })
  readonly coverIsOpen: boolean = false;

  @IsBoolean()
  @Type(() => Boolean)
  @ApiModelProperty({ description: '燃气燃气是否泄漏' })
  readonly gasLeak: boolean = false;

  readonly createdAt?: any;
}
