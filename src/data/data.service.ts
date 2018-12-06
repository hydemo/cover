import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { ICover } from './interfaces/alarm.interfaces';
import { CreateCoverDTO } from './dto/alarm.dto';
import { Pagination } from 'src/common/pagination.dto';
import { ICoverList } from '../common/List.interface';
import { isNumber } from 'util';
import { IWell } from 'src/wells/interfaces/well.interfaces';

@Injectable()
export class DataService {
  // 注入的CoverModelToken要与covers.providers.ts里面的key一致就可以
  constructor(
    @Inject('CoverModelToken') private readonly coverModel: Model<ICover>,
  ) { }

  // 创建数据
  async create(createCoverDTO: CreateCoverDTO) {
    const creatCover = new this.coverModel(createCoverDTO);
    return await creatCover.save();
  }

  // 查询全部数据
  async findAll(pagination: Pagination): Promise<ICoverList> {
    const reg = new RegExp(pagination.search, 'i');
    const search = [
      { ownerId: reg },
      { ownerName: reg },
      { coverMaterial: reg },
      { coverType: reg },
      { holeLocation: reg },
    ];
    const list = await this.coverModel
      .find({ $or: search })
      .limit(pagination.limit)
      .skip((pagination.offset - 1) * pagination.limit)
      .exec();
    const total = await this.coverModel.countDocuments({ $or: search });
    return { list, total };
  }

  // 根据id查询
  async findById(_id): Promise<ICover> {
    return await this.coverModel.findById(_id).exec();
  }
  // 根据id修改
  async updateById(_id, cover: CreateCoverDTO) {
    return await this.coverModel.findByIdAndUpdate(_id, cover).exec();
  }
  // 根据id删除
  async deleteById(_id) {
    return await this.coverModel.findByIdAndDelete(_id).exec();
  }
}