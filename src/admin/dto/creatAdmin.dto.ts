import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAdminDTO {
  @IsString()
  @Type(() => String)
  @ApiModelProperty({ description: '姓名' })
  readonly name: string;

  @IsString()
  @Type(() => String)
  @ApiModelProperty({ description: '姓名' })
  readonly email?: string;

  @IsString()
  @Type(() => String)
  @IsOptional()
  @ApiModelPropertyOptional({ description: '密码' })
  readonly password?: string;
}
