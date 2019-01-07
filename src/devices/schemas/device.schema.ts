import * as mongoose from 'mongoose';

export const DeviceSchema = new mongoose.Schema(
  {
    // 设备编号
    deviceSn: String,
    // 设备id
    deviceID: String,
    // 设备名称
    deviceName: String,
    // 设备类型
    deviceType: String,
    // 硬件版本号
    hardwareVersion: String,
    // 软件版本号
    softwareVersion: String,
    // 硬件编号
    hardwardSn: String,
    // 安装时间
    installTime: Date,
    // 使用状态
    status: String,
    // 硬件装配人员
    hardwareInstaller: String,
    // 软件烧写人员
    softwareWriter: String,
    // 安装人员
    installer: String,
    // NB模组号
    NBModuleNumber: String,
    // 是否删除
    isDelete: { type: Boolean, default: false },
    // sim卡ID
    simId: mongoose.Schema.Types.ObjectId,
  },
  { collection: 'Device', versionKey: false, timestamps: true },
);
