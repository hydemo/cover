import { ICover } from './cover.interfaces';

export interface ICoverList {
  // 列表
  readonly list: ICover[];
  // 总条目
  readonly total: number;
}