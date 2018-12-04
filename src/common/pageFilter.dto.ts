import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class PageFilter {
  @IsNumber()
  @ApiModelProperty({ type: Number, example: 1 })
  pageNumber: number;
  @IsNumber()
  @ApiModelProperty({ type: Number, example: 10 })
  pageSize: number;
}
