import { Document } from 'mongoose';

export interface IDeviceInfo extends Document {
  // 窨井Id
  readonly deviceID: string;
  // 设备序号
  readonly deviceSn: string;
  // 设备名称
  readonly deviceName: string;
}