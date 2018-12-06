import * as mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

export const AudioFreSchema = new mongoose.Schema(
  {
    // 窑井Id
    wellId: ObjectId,
    // 井盖Id
    coverId: ObjectId,
    // 设备序号
    deviceSn: String,
    // 设备名称
    deviceName: String,
    // 超声波频率
    frequency: { type: Number, min: 0, max: 100 },
    // 超声波振幅
    amplitude: Number,
  },
  { collection: 'AudioFre', versionKey: false, timestamps: true },
);
