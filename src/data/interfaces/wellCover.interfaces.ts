import { Document } from 'mongoose';

export interface IWellCover extends Document {
  // 窑井Id
  readonly wellId: string;
  // 井盖Id
  readonly coverId: string;
  // 设备id
  readonly deviceId: string;
  // 测距传感器数值
  readonly distance: number;
  // 光敏器件电压值
  readonly photoresistor: number;
}