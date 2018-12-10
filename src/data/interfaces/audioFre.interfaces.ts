import { Document } from 'mongoose';

export interface IAudioFre extends Document {
  // 窑井Id
  readonly wellId: string;
  // 井盖Id
  readonly coverId: string;
  // 设备id
  readonly deviceId: string;
  // 超声波频率
  readonly frequency: number;
  // 超声波振幅
  readonly amplitude: number;
}