import { Document } from 'mongoose';

export interface IOwner extends Document {
  // 业主id
  readonly ownerId: string;
  // 业主名称
  readonly ownerName: string;
  // 业主性质
  readonly ownerProperty?: string;
  // 法人
  readonly legalPerson?: string;
  // 联系人
  readonly contact: string;
  // 联系电话
  readonly phone: string;
  // 办公地址
  readonly location?: string;
  // 联系地址
  readonly contactAddress?: string;
  // 联系邮箱
  readonly email?: string;
  // 是否删除
  readonly isDelete?: boolean;
}