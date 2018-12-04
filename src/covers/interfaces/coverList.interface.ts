import { Document } from 'mongoose';
import { ICover } from './cover.interfaces';

export interface ICoverList extends Document {
  // 列表
  readonly list: ICover[];
  // 总条目
  readonly total: number;
}