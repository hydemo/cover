import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { ISim } from './interfaces/sim.interfaces';
import { CreateSimDTO } from './dto/creatSim.dto';
import { Pagination } from '../common/dto/pagination.dto';
import { IList } from '../common/interface/list.interface';

@Injectable()
export class SimService {
  // 注入的SimModelToken要与sims.providers.ts里面的key一致就可以
  constructor(@Inject('SimModelToken') private readonly simModel: Model<ISim>) { }

  // 创建数据
  async create(createSimDTO: CreateSimDTO): Promise<ISim> {
    const creatSim = new this.simModel(createSimDTO);
    await creatSim.save();
    return creatSim;
  }

  // 查询全部数据
  async findAll(pagination: Pagination): Promise<IList<ISim>> {
    const reg = new RegExp(pagination.search, 'i');
    const search = [
      { cardNumber: reg },
    ];
    const list = await this.simModel
      .find({ $or: search })
      .limit(pagination.limit)
      .skip((pagination.offset - 1) * pagination.limit)
      .exec();
    const total = await this.simModel.countDocuments({ $or: search });
    return { list, total };
  }

  // 根据id查询
  async findById(_id: string): Promise<ISim> {
    return await this.simModel.findById(_id).exec();
  }

  // 根据sn查询
  async findBySimSn(simSn: string): Promise<ISim> {
    return await this.simModel.findOne({ simSn }).exec();
  }
  // 根据id修改
  async updateById(_id: string, sim: CreateSimDTO) {
    return await this.simModel.findByIdAndUpdate(_id, sim).exec();
  }
  // 根据id删除
  async deleteById(_id: string) {
    return await this.simModel.findByIdAndDelete(_id).exec();
  }
}