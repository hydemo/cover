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
}