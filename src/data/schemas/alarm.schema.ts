import * as mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

export const AlarmSchema = new mongoose.Schema(
  {
    // 窨井Id
    wellId: ObjectId,
    // 设备id
    deviceId: ObjectId,
    // 井盖是否打开
    coverIsOpen: Boolean,
    // 燃气是否泄漏
    gasLeak: Boolean,
  },
  { collection: 'Alarm', versionKey: false, timestamps: true },
);
