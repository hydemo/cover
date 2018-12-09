import * as mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

export const WellCoverSchema = new mongoose.Schema(
  {
    // 窑井Id
    wellId: ObjectId,
    // 井盖Id
    coverId: ObjectId,
    // 设备序号
    deviceSn: String,
    // 设备名称
    deviceName: String,
    // 测距传感器数值
    distance: Number,
    // 光敏器件电压值
    photoresistor: Number,
  },
  { collection: 'WellCover', versionKey: false, timestamps: true },
);