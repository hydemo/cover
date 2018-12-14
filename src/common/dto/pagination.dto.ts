import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class Pagination {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @ApiModelPropertyOptional({ type: Number, example: 1 })
  @Type(() => Number)
  readonly offset?: number = 1;
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @ApiModelPropertyOptional({ type: Number, example: 10 })
  @Type(() => Number)
  readonly limit?: number = 10;
  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional({ type: String, example: '' })
  @Type(() => String)
  readonly search?: string = '';
}
