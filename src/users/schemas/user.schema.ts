import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    // 姓名
    name: String,
    // 头像
    avatar: String,
    // 邮箱
    email: String,
    // 密码
    password: String,
    // 角色
    role: { type: Number, enum: [0, 1, 2] },
  },
  { collection: 'User', versionKey: false, timestamps: true },
);
