import { Document } from 'mongoose';

export interface IWell extends Document {
  // 业主id
  readonly ownerId: string;
  // 业主姓名
  readonly ownerName: string;
  // 窑井位置
  readonly coverId: string;
  // 窑井类型
  readonly wellType: string;
  // 窑井口径
  readonly wellCaliber: number;
  // 窑井深度
  readonly wellDepth: number;
  // 经度
  readonly longitude: string;
  // 纬度
  readonly latitude: string;
  // 位置
  readonly location: string;
}