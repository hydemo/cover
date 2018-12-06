import { Document } from 'mongoose';
import { IStatus } from './status.interfaces';

export interface IWell extends Document {
  // 编号
  readonly wellSN: string;
  // 业主id
  readonly ownerId: string;
  // 业主姓名
  readonly ownerName: string;
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
  // 状态
  readonly status: IStatus;
  // 窑井位置
  readonly coverId: string;
  // 设备Id
  readonly deviceId: string;
}