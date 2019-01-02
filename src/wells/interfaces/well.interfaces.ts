import { Document } from 'mongoose';
import { IStatus } from './status.interfaces';

export interface IWell extends Document {
  // 窨井编号
  readonly wellSN: string;
  // 业主id
  readonly ownerId?: string;
  // 窨井类型
  readonly wellType?: string;
  // 井壁口径
  readonly wellCaliber?: string;
  // 井盖口径
  readonly coverCaliber?: string;
  // 窨井深度
  readonly wellDepth?: string;
  // 经度
  readonly longitude?: string;
  // 纬度
  readonly latitude?: string;
  // 位置
  readonly location?: string;
  // 状态
  readonly status: IStatus;
  // 设备Id
  readonly deviceId?: string;
  // 布防/撤防
  readonly isDefence?: boolean;
  // 是否删除
  readonly isDelete?: boolean;
}