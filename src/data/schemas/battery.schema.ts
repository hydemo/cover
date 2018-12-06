import * as mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

export const BatterySchema = new mongoose.Schema(
  {
    // 窑井Id
    wellId: ObjectId,
    // 井盖Id
    coverId: ObjectId,
    // 设备序号
    deviceSn: String,
    // 设备名称
    deviceName: String,
    // 电量水平
    batteryLevel: { type: Number, min: 0, max: 100 },
  },
  { collection: 'Battery', versionKey: false, timestamps: true },
);
