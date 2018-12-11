export interface IStatus {
  // 电量水平
  batteryLevel: number;
  // 井盖是否打开
  coverIsOpen: boolean;
  // 燃气是否泄漏
  gasLeak: boolean;
  // 光敏检测周期
  photoCheckPeriod: number;
  // 超声波频率检测周期
  freqCheckPeriod: number;
  // 位置检测周期
  distCheckPeriod: number;
  // 超声波频率
  frequency: number;
  // 超声波振幅
  amplitude: number;
  // 测距传感器数值
  distance: number;
  // 光敏器件电压值
  photoresistor: number;
}