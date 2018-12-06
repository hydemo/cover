import * as mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

export const ConfigReportSchema = new mongoose.Schema(
  {
    // 窑井Id
    wellId: ObjectId,
    // 井盖Id
    coverId: ObjectId,
    // 设备序号
    deviceSn: String,
    // 设备名称
    deviceName: String,
    // 光敏检测周期
    photoCheckPeriod: { type: Number, min: 0, max: 330 },
    // 超声波频率检测周期
    freqCheckPeriod: { type: Number, min: 0, max: 255 },
    // 位置检测周期
    distCheckPeriod: { type: Number, min: 0, max: 255 },
  },
  { collection: 'ConfigReport', versionKey: false, timestamps: true },
);
