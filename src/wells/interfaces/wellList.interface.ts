import { IWell } from './well.interfaces';

export interface IWellList {
  // 列表
  readonly list: IWell[];
  // 总条目
  readonly total: number;
}