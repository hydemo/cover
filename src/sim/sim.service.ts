import { Model } from 'mongoose';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ISim } from './interfaces/sim.interfaces';
import { CreateSimDTO } from './dto/creatSim.dto';
import { Pagination } from '../common/dto/pagination.dto';
import { IList } from '../common/interface/list.interface';
import { ApiErrorCode } from '../common/enum/api-error-code.enum';
import { ApiException } from '../common/expection/api.exception';
import { DeviceService } from 'src/devices/device.service';

@Injectable()
export class SimService {
  // 注入的SimModelToken要与sims.providers.ts里面的key一致就可以
  constructor(
    @Inject('SimModelToken') private readonly simModel: Model<ISim>,
    @Inject(forwardRef(() => DeviceService)) private readonly deviceService: DeviceService,
  ) { }

  // 创建数据
  async create(createSimDTO: CreateSimDTO): Promise<ISim> {
    const existing = await this.simModel.findOne({ cardNumber: createSimDTO.cardNumber, isDelete: false });
    if (existing) {
      throw new ApiException('SIM卡号已存在', ApiErrorCode.SIM_EXIST, 406);
    }
    const deleteOne = await this.simModel.findOne({ cardNumber: createSimDTO.cardNumber, isDelete: true });
    if (deleteOne) {
      return this.simModel.findByIdAndUpdate(deleteOne._id, { isDelete: false });
    }
    const creatSim = new this.simModel(createSimDTO);
    await creatSim.save();
    return creatSim;
  }

  // 查询全部数据
  async findAll(pagination: Pagination): Promise<IList<ISim>> {
    const search = [];
    const condition: any = {};
    if (pagination.search) {
      const sea = JSON.parse(pagination.search);
      for (const key in sea) {
        if (key === 'base' && sea[key]) {
          search.push({ cardNumber: new RegExp(sea[key], 'i') });
          search.push({ operator: new RegExp(sea[key], 'i') });
          search.push({ tatalFlow: new RegExp(sea[key], 'i') });
          search.push({ tatalTariff: new RegExp(sea[key], 'i') });
          search.push({ status: new RegExp(sea[key], 'i') });
        } else if (sea[key] === 0 || sea[key]) {
          condition[key] = sea[key];
        }
      }
      if (search.length) {
        condition.$or = search;
      }
    }
    condition.isDelete = false;
    const list = await this.simModel
      .find(condition)
      .limit(pagination.limit)
      .skip((pagination.offset - 1) * pagination.limit)
      .exec();
    const total = await this.simModel.countDocuments(condition);
    return { list, total };
  }

  // 根据id查询
  async findById(_id: string): Promise<ISim> {
    return await this.simModel.findById(_id).exec();
  }

  async findByCondition(condition: any): Promise<ISim[]> {
    condition.isDelete = false;
    return await this.simModel.find(condition);
  }
  // 根据sn查询
  async findBySimSn(simSn: string): Promise<ISim> {
    return await this.simModel.findOne({ simSn, isDelete: false }).exec();
  }
  // 根据id修改
  async updateById(_id: string, sim: CreateSimDTO) {
    if (sim.cardNumber) {
      const existing = await this.simModel
        .findOne({ _id: { $ne: _id }, cardNumber: sim.cardNumber });
      if (existing) {
        throw new ApiException('SIM卡号已存在', ApiErrorCode.SIM_EXIST, 406);
      }
    }
    return await this.simModel.findByIdAndUpdate(_id, sim).exec();
  }
  // 根据id删除
  async deleteById(_id: string) {
    await this.deviceService.updateMany({ simId: _id }, { $unset: { simId: '' } });
    return await this.simModel.findByIdAndUpdate(_id, { isDelete: true }).exec();
  }
}