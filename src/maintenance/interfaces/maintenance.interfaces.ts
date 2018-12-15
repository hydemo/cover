import { Document } from 'mongoose';

export interface IMaintenance extends Document {
  // 窑井Id
  readonly wellId: string;
  // 井盖Id
  readonly coverId: string;
  // 设备id
  readonly deviceId: string;
  // 维修类型
  readonly maintenanceType: string;
  // 负责人
  readonly principal: string;
  // 发生时间
  readonly occurTime: Date;
  // 警告id
  readonly warningId: string;
  // 地点
  readonly location: string;
  // 反馈报告
  readonly feedback: string;
  // 响应时间
  readonly responseTime: Date;
  // 恢复时间
  readonly recoverTime: Date;
  // 状态
  readonly status: number;
}