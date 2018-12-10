import { Document } from 'mongoose';

export interface IWarning extends Document {
  // 窑井Id
  readonly wellId: string;
  // 井盖Id
  readonly coverId: string;
  // 设备id
  readonly deviceId: string;
  // 警告类型
  readonly warningType: { type: string, enum: ['Battery', 'Open', 'Leak'], required: true };
  // 电量水平
  readonly batteryLevel: number;
  // 井盖是否打开
  readonly coverIsOpen: boolean;
  // 燃气是否泄漏
  readonly gasLeak: boolean;
  // 警告状态
  readonly isHandle: boolean;
}