import * as mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

export const MaintenanceSchema = new mongoose.Schema(
  {
    // 维修类型
    maintenanceType: { type: String, enum: ['Battery', 'Open', 'Leak'], required: true },
    // 负责人
    principal: String,
    // 发生时间
    occurTime: Date,
    // 警告id
    warningId: ObjectId,
    // 窑井Id
    wellId: ObjectId,
    // 井盖Id
    coverId: ObjectId,
    // 设备id
    deviceId: ObjectId,
    // 地点
    location: String,
    // 反馈报告
    feedback: String,
    // 响应时间
    responseTime: Date,
    // 恢复时间
    recoverTime: Date,
    // 状态
    status: { type: Number, enum: [0, 1, 2], default: 0 },
  },
  { collection: 'Maintenance', versionKey: false, timestamps: true },
);
