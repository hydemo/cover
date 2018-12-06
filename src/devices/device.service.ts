import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { IDevice } from './interfaces/device.interfaces';
import { CreateDeviceDTO } from './dto/creatDevice.dto';
import { Pagination } from 'src/common/pagination.dto';
import { IList } from '../common/List.interface';

@Injectable()
export class DeviceService {
  // 注入的DeviceModelToken要与devices.providers.ts里面的key一致就可以
  constructor(@Inject('DeviceModelToken') private readonly deviceModel: Model<IDevice>) { }

  // 创建数据
  async create(createDeviceDTO: CreateDeviceDTO) {
    const creatDevice = new this.deviceModel(createDeviceDTO);
    return await creatDevice.save();
  }

  // 查询全部数据
  async findAll(pagination: Pagination): Promise<IList<IDevice>> {
    const reg = new RegExp(pagination.search, 'i');
    const search = [
      { ownerId: reg },
      { ownerName: reg },
      { deviceMaterial: reg },
      { deviceType: reg },
      { holeLocation: reg },
    ];
    const list = await this.deviceModel
      .find({ $or: search })
      .limit(pagination.limit)
      .skip((pagination.offset - 1) * pagination.limit)
      .exec();
    const total = await this.deviceModel.countDocuments({ $or: search });
    return { list, total };
  }

  // 根据id查询
  async findById(_id): Promise<IDevice> {
    return await this.deviceModel.findById(_id).exec();
  }
  // 根据id修改
  async updateById(_id, device: CreateDeviceDTO) {
    return await this.deviceModel.findByIdAndUpdate(_id, device).exec();
  }
  // 根据id删除
  async deleteById(_id) {
    return await this.deviceModel.findByIdAndDelete(_id).exec();
  }
}