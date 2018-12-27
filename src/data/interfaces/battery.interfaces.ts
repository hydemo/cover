import { Document } from 'mongoose';

export interface IBattery extends Document {
  // 窨井Id
  readonly wellId: string;
  // 设备id
  readonly deviceId: string;
  // 电量水平
  readonly batteryLevel: number;
}