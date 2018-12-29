import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { ICover } from './interfaces/cover.interfaces';
import { CreateCoverDTO } from './dto/creatCover.dto';
import { Pagination } from '../common/dto/pagination.dto';
import { IList } from '../common/interface/list.interface';

@Injectable()
export class CoverService {
  // 注入的CoverModelToken要与covers.providers.ts里面的key一致就可以
  constructor(@Inject('CoverModelToken') private readonly coverModel: Model<ICover>) { }

  // 创建数据
  async create(createCoverDTO: CreateCoverDTO): Promise<ICover> {
    const creatCover = new this.coverModel(createCoverDTO);
    await creatCover.save();
    return creatCover;
  }

  // 查询全部数据
  async findAll(pagination: Pagination): Promise<IList<ICover>> {
    const search = [];
    const condition: any = {};
    if (pagination.search) {
      const sea = JSON.parse(pagination.search);
      for (const key in sea) {
        if (key === 'base' && sea[key]) {
          search.push({ name: new RegExp(sea[key], 'i') });
          search.push({ email: new RegExp(sea[key], 'i') });
        } else if (sea[key] === 0 || sea[key]) {
          condition[key] = sea[key];
        }
      }
      if (search.length) {
        condition.$or = search;
      }
    }
    const list = await this.coverModel
      .find(condition)
      .limit(pagination.limit)
      .skip((pagination.offset - 1) * pagination.limit)
      .exec();
    const total = await this.coverModel.countDocuments(condition);
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