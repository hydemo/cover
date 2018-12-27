import { Document } from 'mongoose';

export interface IAlarm extends Document {
  // 窨井Id
  readonly wellId: string;
  // 设备id
  readonly deviceId: string;
  // 井盖是否打开
  readonly coverIsOpen: boolean;
  // 燃气是否泄漏
  readonly gasLeak: boolean;
}