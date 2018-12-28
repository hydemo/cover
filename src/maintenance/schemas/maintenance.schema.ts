import * as mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

export const MaintenanceSchema = new mongoose.Schema(
  {
    // 维修类型
    maintenanceType: { type: String, enum: ['Battery', 'Open', 'Leak'], required: true },
    // 负责人
    principal: ObjectId,
    // 发生时间
    occurTime: Date,
    // 警告id
    warningId: ObjectId,
    // 窨井Id
    wellId: ObjectId,
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
    // 反馈时间
    feedbackTime: Date,
    // 接警人
    creatorId: ObjectId,
    // 状态
    status: { type: Number, enum: [0, 1, 2, 3], default: 0 },
  },
  { collection: 'Maintenance', versionKey: false, timestamps: true },
);
