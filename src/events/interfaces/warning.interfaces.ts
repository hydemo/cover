import { Document } from 'mongoose';

export interface IWarning extends Document {
  // 窨井Id
  readonly wellId: string;
  // 设备id
  readonly deviceId: string;
  // 警告类型
  readonly warningType: string;
  // 电量水平
  readonly batteryLevel: number;
  // 井盖是否打开
  readonly coverIsOpen: boolean;
  // 燃气是否泄漏
  readonly gasLeak: boolean;
  // 警告状态
  readonly isHandle: boolean;
  // 创建时间
  readonly createdAt: Date;
  // 处理人
  readonly handler?: string;
  // 处理时间
  readonly handleTime?: Date;
  // 处理方式
  readonly handleType?: number;
}