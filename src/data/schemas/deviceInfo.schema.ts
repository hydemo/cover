import * as mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

export const DeviceInfoSchema = new mongoose.Schema(
  {
    // 窑井Id
    wellId: ObjectId,
    // 井盖Id
    coverId: ObjectId,
    // 设备id
    deviceId: String,
    // 设备名称
    deviceName: String,
  },
  { collection: 'DeviceInfo', versionKey: false, timestamps: true },
);
