import { Document } from 'mongoose';

export interface IAlarm extends Document {
  // 窑井Id
  readonly wellId: string;
  // 井盖Id
  readonly coverId: string;
  // 设备id
  readonly deviceId: string;
  // 井盖是否打开
  readonly coverIsOpen: boolean;
  // 燃气是否泄漏
  readonly gasLeak: boolean;
}