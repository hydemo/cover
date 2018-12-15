import * as mongoose from 'mongoose';
import { StatusSchema } from './status.schema';

const ObjectId = mongoose.Schema.Types.ObjectId;

export const WellSchema = new mongoose.Schema(
  {
    // 编号
    wellSN: String,
    // 业主id
    ownerId: String,
    // 业主姓名
    ownerName: String,
    // 窑井类型
    wellType: String,
    // 窑井口径
    wellCaliber: Number,
    // 窑井深度
    wellDepth: Number,
    // 经度
    longitude: String,
    // 纬度
    latitude: String,
    // 位置
    location: String,
    // 状态
    status: StatusSchema,
    // 窑井位置
    coverId: ObjectId,
    // 设备Id
    deviceId: ObjectId,
    // 布防/撤防
    isDefence: Boolean,
  },
  { collection: 'Well', versionKey: false, timestamps: true },
);
