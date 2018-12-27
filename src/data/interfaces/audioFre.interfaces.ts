import { Document } from 'mongoose';

export interface IAudioFre extends Document {
  // 窨井Id
  readonly wellId: string;
  // 设备id
  readonly deviceId: string;
  // 超声波频率
  readonly frequency: number;
  // 超声波振幅
  readonly amplitude: number;
}