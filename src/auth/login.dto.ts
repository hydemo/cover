import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';

export class LoginDTO {

  @IsEmail({}, { message: '邮箱格式不正确' })
  @Type(() => String)
  @ApiModelProperty({ description: '邮箱' })
  readonly email: string;

  @IsString()
  @Type(() => String)
  @ApiModelProperty({ description: '密码' })
  password: string;
}
