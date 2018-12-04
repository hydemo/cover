import { ApiModelProperty } from '@nestjs/swagger';

export class CreateCoverDTO {
  @ApiModelProperty({ description: '业主id' })
  readonly ownerId: string;
  @ApiModelProperty({ description: '业主姓名' })
  readonly ownerName: string;
  @ApiModelProperty({ description: '窑井编号' })
  readonly wellId: string;
  @ApiModelProperty({ description: '井盖材料' })
  readonly coverMaterial: string;
  @ApiModelProperty({ description: '井盖类型' })
  readonly coverType: string;
  @ApiModelProperty({ description: '井盖大小' })
  readonly coverSize: number;
  @ApiModelProperty({ description: '井盖开孔数量' })
  readonly holeNumber: number;
  @ApiModelProperty({ description: '开孔位置' })
  readonly holeLocation: string;
  @ApiModelProperty({ description: '状态' })
  readonly status: number;
}
