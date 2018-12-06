import * as mongoose from 'mongoose';

export const DeviceSchema = new mongoose.Schema(
  {
    // 设备编号
    deviceSn: String,
    // 设备名称
    deviceName: String,
  },
);
