import * as mongoose from 'mongoose';

export const AdminSchema = new mongoose.Schema(
  {
    // 姓名
    name: String,
    // 邮箱
    email: String,
    // 密码
    password: String,
  },
  { collection: 'Admin', versionKey: false, timestamps: true },
);
