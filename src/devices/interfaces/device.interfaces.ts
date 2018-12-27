import { Document } from 'mongoose';

export interface IDevice extends Document {
  // 设备编号
  readonly deviceSn: string;
  // 设备名称
  readonly deviceName?: string;
  // 设备类型
  readonly deviceType?: string;
  // 硬件版本号
  readonly hardwareVersion?: string;
  // 软件版本号
  readonly softwareVersion?: string;
  // 硬件编号
  readonly hardwardSn?: string;
  // 安装时间
  readonly installTime?: Date;
  // 使用状态
  readonly status?: string;
  // 硬件装配人员
  readonly hardwareInstaller?: string;
  // 软件烧写人员
  readonly softwareWriter?: string;
  // 安装人员
  readonly installer?: string;
  // NB模组号
  readonly NBModuleNumber?: string;
  // sim卡ID
  readonly simId?: string;
}