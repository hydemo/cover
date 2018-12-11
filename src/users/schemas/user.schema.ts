import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    // 姓名
    name: String,
    // 邮箱
    email: String,
    // 密码
    password: String,
  },
  { collection: 'User', versionKey: false, timestamps: true },
);
