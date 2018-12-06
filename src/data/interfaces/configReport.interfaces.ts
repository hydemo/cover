import { Document } from 'mongoose';

export interface IConfigReport extends Document {
  // 窑井Id
  readonly wellId: string;
  // 井盖Id
  readonly coverId: string;
  // 设备序号
  readonly deviceSn: string;
  // 设备名称
  readonly deviceName: string;
  // 光敏检测周期
  readonly photoCheckPeriod: number;
  // 超声波频率检测周期
  readonly freqCheckPeriod: number;
  // 位置检测周期
  readonly distCheckPeriod: number;
}