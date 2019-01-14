import * as mongoose from 'mongoose';

export const SimSchema = new mongoose.Schema(
  {
    // 卡号
    cardNumber: String,
    // 运营商
    operator: String,
    // 资费开始时间
    tariffStartTime: Date,
    // 资费到期时间
    tariffExpireTime: Date,
    // 累计流量
    tatalFlow: String,
    // 累计资费
    tatalTariff: String,
    // 状态
    status: String,
    // 是否绑定
    isBind: { type: Boolean, default: false },
    // 是否删除
    isDelete: { type: Boolean, default: false },
  },
  { collection: 'Sim', versionKey: false, timestamps: true },
);
