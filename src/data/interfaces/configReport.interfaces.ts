import { Document } from 'mongoose';

export interface IConfigReport extends Document {
  // 窨井Id
  readonly wellId: string;
  // 设备id
  readonly deviceId: string;
  // 光敏检测周期
  readonly photoCheckPeriod: number;
  // 超声波频率检测周期
  readonly freqCheckPeriod: number;
  // 位置检测周期
  readonly distCheckPeriod: number;
}