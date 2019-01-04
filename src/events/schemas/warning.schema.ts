import * as mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

export const WarningSchema = new mongoose.Schema(
  {
    // 窨井Id
    wellId: ObjectId,
    // 设备id
    deviceId: ObjectId,
    // 警告类型
    warningType: { type: String, enum: ['Battery', 'Open', 'Leak'], required: true },
    // 电量水平
    batteryLevel: Number,
    // 井盖是否打开
    coverIsOpen: { type: Boolean, default: false },
    // 燃气是否泄漏
    gasLeak: { type: Boolean, default: false },
    // 警告状态
    isHandle: { type: Boolean, default: false },
    // 处理人
    handler: ObjectId,
    // 处理时间
    handleTime: Date,
    // 处理方式
    handleType: { type: Number, enum: [0, 1] },
  },
  { collection: 'Warning', versionKey: false, timestamps: true },
);
