import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { IWell } from './interfaces/well.interfaces';
import { CreateWellDTO } from './dto/creatWell.dto';
import { Pagination } from '../common/pagination.dto';
import { IList } from '../common/List.interface';
import { DeviceService } from '../devices/device.service';
import { CoverService } from '../covers/cover.service';

@Injectable()
export class WellService {
  // 注入的WellModelToken要与wells.providers.ts里面的key一致就可以
  constructor(
    @Inject('WellModelToken') private readonly wellModel: Model<IWell>,
    private readonly deviceService: DeviceService,
    private readonly coverService: CoverService,
  ) { }

  // 创建数据
  async create(createWellDTO: CreateWellDTO) {
    const creatWell = new this.wellModel(createWellDTO);
    return await creatWell.save();
  }

  // 查询全部数据
  async findAll(pagination: Pagination): Promise<IList<IWell>> {
    const list: IWell[] = await this.wellModel
      .find()
      .limit(pagination.limit)
      .skip((pagination.offset - 1) * pagination.limit)
      .exec();
    const total = await this.wellModel.countDocuments();
    return { list, total };
  }

  // 根据id查询
  async findById(_id): Promise<IWell> {
    return await this.wellModel.findById(_id).exec();
  }
  // 根据id修改
  async updateById(_id, well: CreateWellDTO) {
    return await this.wellModel.findByIdAndUpdate(_id, well).exec();
  }
  // 根据id删除
  async deleteById(_id) {
    return await this.wellModel.findByIdAndDelete(_id).exec();
  }
}