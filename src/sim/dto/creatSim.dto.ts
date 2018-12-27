import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSimDTO {
  @IsString()
  @Type(() => String)
  @ApiModelProperty({ description: '卡号' })
  readonly cardNumber: string;

  @IsString()
  @Type(() => String)
  @ApiModelProperty({ description: '运营商' })
  readonly operator: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  @ApiModelPropertyOptional({ description: '资费开始时间' })
  readonly tariffStartTime?: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  @ApiModelPropertyOptional({ description: '资费到期时间' })
  readonly tariffExpireTime?: Date;

  @IsString()
  @IsOptional()
  @Type(() => String)
  @ApiModelPropertyOptional({ description: '累计流量' })
  readonly tatalFlow?: string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  @ApiModelPropertyOptional({ description: '累计资费' })
  readonly tatalTariff?: string;

  @IsString()
  @Type(() => String)
  @ApiModelPropertyOptional({ description: '累计资费' })
  readonly status?: string;
}
