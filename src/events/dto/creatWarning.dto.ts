import { IsOptional, IsNumber, Min, Max, IsBoolean, IsString, IsEnum, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

export class WarningsDTO {
  @IsMongoId()
  @Type(() => String)
  @ApiModelProperty({ description: '窨井Id' })
  readonly wellId: string;

  @IsString()
  @Type(() => String)
  @ApiModelProperty({ description: '设备Id' })
  readonly deviceId: string;

  @IsString()
  @IsEnum(['Battery', 'Open', 'Leak'])
  @Type(() => String)
  @ApiModelProperty({ description: '警告类型' })
  readonly warningType: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  @Type(() => Number)
  @ApiModelProperty({ description: '电量' })
  readonly batteryLevel?: number;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  @ApiModelProperty({ description: '井盖打开' })
  readonly coverIsOpen?: boolean = false;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  @ApiModelProperty({ description: '井盖漏气' })
  readonly gasLeak?: boolean = false;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  @ApiModelProperty({ description: '是否处理' })
  readonly isHandle?: boolean = false;

  // 处理人
  readonly handler?: string;
  // 处理时间
  readonly handleTime?: Date;
  // 处理方式
  readonly handleType?: number;
}