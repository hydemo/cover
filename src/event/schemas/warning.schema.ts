import * as mongoose from 'mongoose';

export const WarningSchema = new mongoose.Schema(
  {
    // 警告类型
    warningType: { type: String, enum: ['battery', 'open', 'leak'], required: true },
    // 电量水平
    batteryLevel: Number,
    // 井盖是否打开
    coverIsOpen: Boolean,
    // 燃气是否泄漏
    gasLeak: Boolean,
    // 警告状态
    isHandle: { type: Boolean, default: false },
  },
  { collection: 'DeviceInfo', versionKey: false, timestamps: true },
);
