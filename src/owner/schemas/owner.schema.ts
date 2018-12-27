import * as mongoose from 'mongoose';

export const OwnerSchema = new mongoose.Schema(
  {
    // 业主id
    ownerId: String,
    // 业主名称
    ownerName: String,
    // 业主性质
    ownerProperty: String,
    // 法人
    legalPerson: String,
    // 联系人
    contact: String,
    // 联系电话
    phone: String,
    // 办公地址
    location: String,
    // 联系地址
    contactAddress: String,
    // 联系邮箱
    email: String,
  },
  { collection: 'Owner', versionKey: false, timestamps: true },
);
