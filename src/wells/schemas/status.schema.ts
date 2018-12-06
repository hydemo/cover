import * as mongoose from 'mongoose';

export const StatusSchema = new mongoose.Schema(
  {
    // 电量水平
    batteryLevel: Number,
    // 井盖是否打开
    coverIsOpen: Boolean,
    // 燃气是否泄漏
    gasLeak: Boolean,
    // 光敏检测周期
    photoCheckPeriod: Number,
    // 超声波频率检测周期
    freqCheckPeriod: Number,
    // 位置检测周期
    distCheckPeriod: Number,
    // 超声波频率
    frequency: Number,
    // 超声波振幅
    amplitude: Number,
    // 测距传感器数值
    distance: Number,
    // 光敏器件电压值
    photoresistor: Number,
  },
);
