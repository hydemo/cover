import { Document } from 'mongoose';

export interface IUser extends Document {
  // 姓名
  readonly name: string;
  // 邮箱
  readonly email: string;
  // 角色
  readonly role: number;
  // 是否删除
  readonly isDelete?: boolean;
  // 区域
  readonly location?: string;
  // 密码
  password: string;
  //
  accessToken: string;
  avatar: string;
}