import * as mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

export const WellSchema = new mongoose.Schema(
  {
    // 业主id
    ownerId: String,
    // 业主姓名
    ownerName: String,
    // 窑井位置
    coverId: ObjectId,
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
  },
  { collection: 'Well', versionKey: false, timestamps: true },
);
