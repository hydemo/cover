import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { IWell } from './interfaces/well.interfaces';
import { CreateWellDTO } from './dto/creatWell.dto';
import { PageFilter } from 'src/common/pageFilter.dto';
import { IWellList } from './interfaces/wellList.interface';

@Injectable()
export class WellService {
  // 注入的WellModelToken要与wells.providers.ts里面的key一致就可以
  constructor(@Inject('WellModelToken') private readonly wellModel: Model<IWell>) { }

  // 创建数据
  async create(createWellDTO: CreateWellDTO) {
    const creatWell = new this.wellModel(createWellDTO);
    return await creatWell.save();
  }

  // 查询全部数据
  async findAll(pageFilter: PageFilter): Promise<IWellList> {
    const page = Number(pageFilter.pageNumber);
    const pageSize = Number(pageFilter.pageSize);
    const list = await this.wellModel
      .find()
      .limit(pageSize)
      .skip((page - 1) * pageSize)
      .exec();
    const total = await this.wellModel.countDocuments();
    return { list, total };
  }

  // 根据id查询
  async findById(_id): Promise<IWell> {
    return await this.wellModel.findById(_id).exec();
  }
  // 根据id修改
  async updateById(_id, well: IWell) {
    return await this.wellModel.findByIdAndUpdate(_id, well).exec();
  }
  // 根据id删除
  async deleteById(_id) {
    return await this.wellModel.findByIdAndDelete(_id).exec();
  }
}