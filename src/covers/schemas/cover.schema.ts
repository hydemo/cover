import * as mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

export const CoverSchema = new mongoose.Schema(
  {
    // 业主id
    ownerId: String,
    // 业主姓名
    ownerName: String,
    // 窑井编号
    wellId: String,
    // 井盖材料
    coverMaterial: String,
    // 井盖类型
    coverType: String,
    // 井盖大小
    coverSize: Number,
    // 井盖开孔数量
    holeNumber: Number,
    // 开孔位置
    holeLocation: String,
    // 状态 0：正常， 2:漏气， 1:打开
    status: Number,
  },
  { collection: 'Users', versionKey: false, timestamps: true },
);
