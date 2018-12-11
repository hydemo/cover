import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDTO {
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
  @ApiModelProperty({ description: '密码' })
  readonly password: string;
}
