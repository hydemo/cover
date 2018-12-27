import * as mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

export const DeviceInfoSchema = new mongoose.Schema(
  {
    // 窨井Id
    wellId: ObjectId,
    // 设备id
    deviceId: String,
    // 设备名称
    deviceName: String,
  },
  { collection: 'DeviceInfo', versionKey: false, timestamps: true },
);
