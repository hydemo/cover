import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsDate } from 'class-validator';
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

  @IsString()
  @IsOptional()
  @Type(() => String)
  @ApiModelPropertyOptional({ description: '设备类型' })
  readonly deviceType?: string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  @ApiModelPropertyOptional({ description: '硬件版本号' })
  readonly hardwareVersion?: string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  @ApiModelPropertyOptional({ description: '软件版本号' })
  readonly softwareVersion?: string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  @ApiModelPropertyOptional({ description: '硬件编号' })
  readonly hardwardSn?: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  @ApiModelPropertyOptional({ description: '安装时间' })
  readonly installTime?: Date;

  @IsString()
  @IsOptional()
  @Type(() => String)
  @ApiModelPropertyOptional({ description: '使用状态' })
  readonly status?: string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  @ApiModelPropertyOptional({ description: '硬件装配人员' })
  readonly hardwareInstaller?: string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  @ApiModelPropertyOptional({ description: '软件烧写人员' })
  readonly softwareWriter?: string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  @ApiModelPropertyOptional({ description: '安装人员' })
  readonly installer?: string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  @ApiModelPropertyOptional({ description: 'NB模组号' })
  readonly NBModuleNumber?: string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  @ApiModelPropertyOptional({ description: 'sim卡ID' })
  readonly simId?: string;

  readonly isDelete?: boolean;
}
