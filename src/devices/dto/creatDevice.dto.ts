import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDeviceDTO {
  @IsString()
  @Type(() => String)
  @ApiModelProperty({ description: '设备序号' })
  readonly deviceSn: string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  @ApiModelPropertyOptional({ description: '设备名称' })
  readonly deviceName?: string;
}
