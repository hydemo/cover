import * as mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

export const AudioFreSchema = new mongoose.Schema(
  {
    // 窨井Id
    wellId: ObjectId,
    // 设备id
    deviceId: ObjectId,
    // 超声波频率
    frequency: { type: Number, min: 0, max: 100 },
    // 超声波振幅
    amplitude: Number,
  },
  { collection: 'AudioFre', versionKey: false, timestamps: true },
);
