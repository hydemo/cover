import * as mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

export const AlarmSchema = new mongoose.Schema(
  {
    // 窑井Id
    wellId: ObjectId,
    // 井盖Id
    coverId: ObjectId,
    // 设备序号
    deviceSn: String,
    // 设备名称
    deviceName: String,
    // 井盖是否打开
    coverIsOpen: Boolean,
    // 燃气是否泄漏
    gasLeak: Boolean,
  },
  { collection: 'Alarm', versionKey: false, timestamps: true },
);
