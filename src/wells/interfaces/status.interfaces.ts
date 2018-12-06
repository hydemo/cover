export interface IStatus {
  // 电量水平
  readonly batteryLevel: number;
  // 井盖是否打开
  readonly coverIsOpen: boolean;
  // 燃气是否泄漏
  readonly gasLeak: boolean;
  // 光敏检测周期
  readonly photoCheckPeriod: number;
  // 超声波频率检测周期
  readonly freqCheckPeriod: number;
  // 位置检测周期
  readonly distCheckPeriod: number;
  // 超声波频率
  readonly frequency: number;
  // 超声波振幅
  readonly amplitude: number;
  // 测距传感器数值
  readonly distance: number;
  // 光敏器件电压值
  readonly photoresistor: number;
}