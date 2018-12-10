import { Document } from 'mongoose';

export interface IBattery extends Document {
  // 窑井Id
  readonly wellId: string;
  // 井盖Id
  readonly coverId: string;
  // 设备id
  readonly deviceId: string;
  // 电量水平
  readonly batteryLevel: number;
}