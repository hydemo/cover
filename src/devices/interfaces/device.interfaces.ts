import { Document } from 'mongoose';

export interface IDevice extends Document {
  // 设备编号
  readonly deviceSn: string;
  // 设备名称
  readonly deviceName: string;
}