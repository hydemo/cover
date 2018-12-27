import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOwnerDTO {
  @IsString()
  @Type(() => String)
  @ApiModelProperty({ description: '业主id' })
  readonly ownerId: string;

  @IsString()
  @Type(() => String)
  @ApiModelProperty({ description: '业主名称' })
  readonly ownerName: string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  @ApiModelPropertyOptional({ description: '业主性质' })
  readonly ownerProperty?: string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  @ApiModelPropertyOptional({ description: '法人' })
  readonly legalPerson?: string;

  @IsString()
  @Type(() => String)
  @ApiModelProperty({ description: '联系人' })
  readonly contact: string;

  @IsString()
  @Type(() => String)
  @ApiModelProperty({ description: '联系电话' })
  readonly phone: string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  @ApiModelPropertyOptional({ description: '办公地址' })
  readonly location?: string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  @ApiModelPropertyOptional({ description: '联系地址' })
  readonly contactAddress?: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  @Type(() => String)
  @ApiModelPropertyOptional({ description: '联系邮箱' })
  readonly email?: string;
}
