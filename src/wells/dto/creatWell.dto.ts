import { ApiModelProperty } from '@nestjs/swagger';

export class CreateWellDTO {
  @ApiModelProperty({ description: '业主id' })
  readonly ownerId: string;

  @ApiModelProperty({ description: '业主姓名' })
  readonly ownerName: string;

  @ApiModelProperty({ description: '井盖编号' })
  readonly coverId: string;

  @ApiModelProperty({ description: '窑井类型' })
  readonly wellType: string;

  @ApiModelProperty({ description: '窑井口径' })
  readonly wellCaliber: number;

  @ApiModelProperty({ description: '窑井深度' })
  readonly wellDepth: number;

  @ApiModelProperty({ description: '经度' })
  readonly longitude: string;

  @ApiModelProperty({ description: '纬度' })
  readonly latitude: string;

  @ApiModelProperty({ description: '位置' })
  readonly location: string;
}
