import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    // 姓名
    name: String,
    // 头像
    avatar: String,
    // 邮箱
    email: { type: String, unique: true },
    // 密码
    password: String,
    // 角色
    role: { type: Number, enum: [0, 1, 2, 3] },
    // 联系电话
    phone: { type: String },
    // 是否删除
    isDelete: { type: Boolean, default: false },
    // 位置
    location: String,
  },
  { collection: 'User', versionKey: false, timestamps: true },
);
