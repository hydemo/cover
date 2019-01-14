import * as mongoose from 'mongoose';
import { StatusSchema } from './status.schema';

const ObjectId = mongoose.Schema.Types.ObjectId;

export const WellSchema = new mongoose.Schema(
  {
    // 窨井编号
    wellSN: { type: String, unique: true },
    // 业主id
    ownerId: ObjectId,
    // 窨井类型
    wellType: String,
    // 井壁口径
    wellCaliber: String,
    // 井盖口径
    coverCaliber: String,
    // 井盖材料
    coverMaterial: String,
    // 窨井深度
    wellDepth: String,
    // 经度
    longitude: String,
    // 纬度
    latitude: String,
    // 位置
    location: String,
    // 状态
    status: StatusSchema,
    // 设备Id
    deviceId: ObjectId,
    // 电量警告门限
    batteryLimit: { type: Number, min: 0, max: 400 },
    // 布防/撤防
    isDefence: { type: Boolean, default: true },
    // 是否删除
    isDelete: { type: Boolean, default: false },
  },
  { collection: 'Well', versionKey: false, timestamps: true },
);
