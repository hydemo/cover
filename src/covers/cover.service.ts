import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { ICover } from './interfaces/cover.interfaces';
import { CreateCoverDTO } from './dto/creatCover.dto';
import { PageFilter } from 'src/common/pageFilter.dto';
import { ICoverList } from './interfaces/coverList.interface';

@Injectable()
export class CoverService {
  // 注入的CoverModelToken要与covers.providers.ts里面的key一致就可以
  constructor(@Inject('CoverModelToken') private readonly coverModel: Model<ICover>) { }

  // 创建数据
  async create(createCoverDTO: CreateCoverDTO) {
    const creatCover = new this.coverModel(createCoverDTO);
    return await creatCover.save();
  }

  // 查询全部数据
  async findAll(pageFilter: PageFilter): Promise<ICoverList> {
    const page = Number(pageFilter.pageNumber);
    const pageSize = Number(pageFilter.pageSize);
    const list = await this.coverModel
      .find()
      .limit(pageSize)
      .skip((page - 1) * pageSize)
      .exec();
    const total = await this.coverModel.countDocuments();
    return { list, total };
  }

  // 根据id查询
  async findById(_id): Promise<ICover> {
    return await this.coverModel.findById(_id).exec();
  }
  // 根据id修改
  async updateById(_id, cover: ICover) {
    return await this.coverModel.findByIdAndUpdate(_id, cover).exec();
  }
  // 根据id删除
  async deleteById(_id) {
    return await this.coverModel.findByIdAndDelete(_id).exec();
  }
}