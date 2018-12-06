import * as mongoose from 'mongoose';

export const CoverSchema = new mongoose.Schema(
  {
    // 编号
    coverSN: { type: String, required: true, unique: true },
    // 业主id
    ownerId: String,
    // 业主姓名
    ownerName: String,
    // 井盖材料
    coverMaterial: String,
    // 井盖类型
    coverType: String,
    // 井盖口径
    coverCaliber: Number,
    // 井盖开孔数量
    holeNumber: Number,
    // 开孔位置
    holeLocation: String,
  },
  { collection: 'Cover', versionKey: false, timestamps: true },
);
