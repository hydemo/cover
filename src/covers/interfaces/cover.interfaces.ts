import { Document } from 'mongoose';

export interface ICover extends Document {
  // 业主id
  readonly ownerId: string;
  // 业主姓名
  readonly ownerName: string;
  // 窑井编号
  readonly wellId: string;
  // 井盖材料
  readonly coverMaterial: string;
  // 井盖类型
  readonly coverType: string;
  // 井盖大小
  readonly coverSize: number;
  // 井盖开孔数量
  readonly holeNumber: number;
  // 开孔位置
  readonly holeLocation: string;
  // 状态 0：正常， 2:漏气， 1:打开
  readonly status: number;
}