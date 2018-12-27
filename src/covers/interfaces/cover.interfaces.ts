import { Document } from 'mongoose';

export interface ICover extends Document {
  // 编号
  readonly coverSN: string;
  // 业主id
  readonly ownerId: string;
  // 业主名称
  readonly ownerName: string;
  // 井盖材料
  readonly coverMaterial: string;
  // 井盖类型
  readonly coverType: string;
  // 井盖大小
  readonly coverCaliber: number;
  // 井盖开孔数量
  readonly holeNumber: number;
  // 开孔位置
  readonly holeLocation: string;
}