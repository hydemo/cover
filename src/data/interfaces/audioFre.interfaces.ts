import { Document } from 'mongoose';

export interface IAudioFre extends Document {
  // 窑井Id
  readonly wellId: string;
  // 井盖Id
  readonly coverId: string;
  // 设备序号
  readonly deviceSn: string;
  // 设备名称
  readonly deviceName: string;
  // 超声波频率
  readonly frequency: number;
  // 超声波振幅
  readonly amplitude: number;
}