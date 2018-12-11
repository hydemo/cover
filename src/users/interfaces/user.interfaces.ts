import { Document } from 'mongoose';

export interface IUser extends Document {
  // 姓名
  readonly name: string;
  // 邮箱
  readonly email: string;
  // 密码
  readonly password: string;
}