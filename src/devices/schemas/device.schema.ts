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
    // 电量警告门限
    batteryLimit: { type: Number, min: 0, max: 400, default: 360 },
    // 是否删除
    isDelete: { type: Boolean, default: false },
    // sim卡ID
    simId: mongoose.Schema.Types.ObjectId,
    // 是否绑定
    isBind: { type: Boolean, default: false },
  },
  { collection: 'Device', versionKey: false, timestamps: true },
);
