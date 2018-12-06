import { Document } from 'mongoose';

export interface IAlarm extends Document {
  // 窑井Id
  readonly wellId: string;
  // 井盖Id
  readonly coverId: string;
  // 设备序号
  readonly deviceSn: string;
  // 设备名称
  readonly deviceName: string;
  // 井盖是否打开
  readonly coverIsOpen: boolean;
  // 燃气是否泄漏
  readonly gasLeak: boolean;
}