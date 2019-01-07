import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEnum, IsEmail, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDTO {
  @IsString()
  @Type(() => String)
  @ApiModelProperty({ description: '姓名' })
  readonly name: string;

  @IsEmail({}, { message: '邮箱格式不正确' })
  @Type(() => String)
  @ApiModelProperty({ description: '邮箱' })
  readonly email: string;

  @IsNumber()
  @IsEnum([0, 1, 2, 3])
  @Type(() => Number)
  @ApiModelProperty({ description: '角色' })
  readonly role: number;

  @IsString()
  @Type(() => String)
  @ApiModelPropertyOptional({ description: '密码' })
  password: string;

  @IsString()
  @Type(() => String)
  @ApiModelProperty({ description: '区域' })
  readonly location: string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  @ApiModelProperty({ description: '联系电话' })
  readonly phone?: string;

  accessToken: string;

  readonly isDelete?: boolean;
}
