import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber, Min, Max, IsBoolean, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class StatusDTO {
  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  @Type(() => Number)
  @ApiModelPropertyOptional({ description: '电量水平' })
  batteryLevel: number;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  @ApiModelPropertyOptional({ description: '井盖是否打开' })
  coverIsOpen?: boolean = false;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  @ApiModelPropertyOptional({ description: '燃气燃气是否泄漏' })
  gasLeak?: boolean = false;

  @IsNumber()
  @Min(0)
  @Max(330)
  @IsOptional()
  @Type(() => Number)
  @ApiModelPropertyOptional({ description: '光敏检测周期' })
  photoCheckPeriod: number;

  @IsNumber()
  @Min(0)
  @Max(255)
  @IsOptional()
  @Type(() => Number)
  @ApiModelPropertyOptional({ description: '超声波频率检测周期' })
  freqCheckPeriod: number;

  @IsNumber()
  @Min(0)
  @Max(255)
  @IsOptional()
  @Type(() => Number)
  @ApiModelPropertyOptional({ description: '位置检测周期' })
  distCheckPeriod: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  @ApiModelPropertyOptional({ description: '超声波频率' })
  frequency: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  @ApiModelPropertyOptional({ description: '超声波振幅' })
  amplitude: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  @ApiModelPropertyOptional({ description: '测距传感器数值' })
  distance: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  @ApiModelPropertyOptional({ description: '光敏器件电压值' })
  photoresistor: number;
}
