import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCoverDTO {
  @IsString()
  @Type(() => String)
  @ApiModelProperty({ description: '编号' })
  readonly coverSN: string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  @ApiModelPropertyOptional({ description: '业主id' })
  readonly ownerId?: string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  @ApiModelPropertyOptional({ description: '业主姓名' })
  readonly ownerName?: string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  @ApiModelPropertyOptional({ description: '井盖材料' })
  readonly coverMaterial?: string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  @ApiModelPropertyOptional({ description: '井盖类型' })
  readonly coverType?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @ApiModelPropertyOptional({ description: '井盖大小' })
  readonly coverCaliber?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @ApiModelPropertyOptional({ description: '井盖开孔数量' })
  readonly holeNumber?: number;

  @IsString()
  @IsOptional()
  @Type(() => String)
  @ApiModelPropertyOptional({ description: '开孔位置' })
  readonly holeLocation?: string;
}
