import { Document } from 'mongoose';

export interface ISim extends Document {
  // 卡号
  readonly cardNumber: string;
  // 运营商
  readonly operator: string;
  // 资费开始时间
  readonly tariffStartTime?: Date;
  // 资费到期时间
  readonly tariffExpireTime?: Date;
  // 累计流量
  readonly tatalFlow?: string;
  // 累计资费
  readonly tatalTariff?: string;
  // 状态
  readonly status?: string;
  // 是否删除
  readonly isDelete?: boolean;
  readonly isBind?: boolean;
}