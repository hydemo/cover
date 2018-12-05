import { ApiModelProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCoverDTO {
  @IsString()
  @IsOptional()
  @Type(() => String)
  @ApiModelProperty({ description: '业主id' })
  readonly ownerId: string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  @ApiModelProperty({ description: '业主姓名' })
  readonly ownerName: string;

  @IsMongoId()
  @IsOptional()
  @Type(() => String)
  @ApiModelProperty({ description: '窑井编号' })
  readonly wellId: string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  @ApiModelProperty({ description: '井盖材料' })
  readonly coverMaterial: string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  @ApiModelProperty({ description: '井盖类型' })
  readonly coverType: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @ApiModelProperty({ description: '井盖大小' })
  readonly coverCaliber: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @ApiModelProperty({ description: '井盖开孔数量' })
  readonly holeNumber: number;

  @IsString()
  @IsOptional()
  @Type(() => String)
  @ApiModelProperty({ description: '开孔位置' })
  readonly holeLocation: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @ApiModelProperty({ description: '状态' })
  readonly status: number;
}
