import * as mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

export const BatterySchema = new mongoose.Schema(
  {
    // 窨井Id
    wellId: ObjectId,
    // 设备id
    deviceId: ObjectId,
    // 电量水平
    batteryLevel: { type: Number, min: 0, max: 400 },
  },
  { collection: 'Battery', versionKey: false, timestamps: true },
);
