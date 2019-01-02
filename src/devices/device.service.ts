import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { IDevice } from './interfaces/device.interfaces';
import { CreateDeviceDTO } from './dto/creatDevice.dto';
import { Pagination } from '../common/dto/pagination.dto';
import { IList } from '../common/interface/list.interface';
import { ApiErrorCode } from 'src/common/enum/api-error-code.enum';
import { ApiException } from 'src/common/expection/api.exception';
import { SimService } from 'src/sim/sim.service';

@Injectable()
export class DeviceService {
  // 注入的DeviceModelToken要与devices.providers.ts里面的key一致就可以
  constructor(
    @Inject('DeviceModelToken') private readonly deviceModel: Model<IDevice>,
    @Inject(SimService) private readonly simService: SimService,
  ) { }

  // 创建数据
  async create(createDeviceDTO: CreateDeviceDTO): Promise<IDevice> {
    const existing = await this.deviceModel.findOne({ deviceSn: createDeviceDTO.deviceSn, isDelete: false });
    if (existing) {
      throw new ApiException('设备序号已存在', ApiErrorCode.DEVICE_EXIST, 406);
    }
    const deleteOne = await this.deviceModel.findOne({ deviceSn: createDeviceDTO.deviceSn, isDelete: true });
    if (deleteOne) {
      return this.deviceModel.findByIdAndUpdate(deleteOne._id, { isDelete: false });
    }
    const creatDevice = new this.deviceModel(createDeviceDTO);
    await creatDevice.save();
    return creatDevice;
  }

  async findByCondition(condition: any, key: string): Promise<IDevice[]> {
    const simCondition = {
      $or: [{ cardNumber: new RegExp(key, 'i') }],
      isDelete: false,
    };
    const sims = await this.simService.findByCondition(simCondition);
    const simIds = sims.map(sim => sim._id);
    condition.$or.push({ simId: { $in: simIds } });
    condition.isDelete = false;
    const a = { $or: [{ simId: { $in: simIds } }] };
    return await this.deviceModel.find(condition);
  }

  // 查询全部数据
  async findAll(pagination: Pagination): Promise<IList<IDevice>> {
    const search = [];
    const condition: any = {};
    if (pagination.search) {
      const sea = JSON.parse(pagination.search);
      for (const key in sea) {
        if (key === 'base' && sea[key]) {
          search.push({ deviceSn: new RegExp(sea[key], 'i') });
          search.push({ deviceName: new RegExp(sea[key], 'i') });
          search.push({ deviceType: new RegExp(sea[key], 'i') });
          search.push({ hardwareVersion: new RegExp(sea[key], 'i') });
          search.push({ softwareVersion: new RegExp(sea[key], 'i') });
          search.push({ status: new RegExp(sea[key], 'i') });
          const simCondition = {
            $or: [{ cardNumber: new RegExp(sea[key], 'i') }],
            isDelete: false,
          };
          const sims = await this.simService.findByCondition(simCondition);
          const simIds = sims.map(sim => sim._id);
          search.push({ simId: { $in: simIds } });
        } else if (sea[key] === 0 || sea[key]) {
          condition[key] = sea[key];
        }
      }
      if (search.length) {
        condition.$or = search;
      }
    }
    condition.isDelete = false;
    const list = await this.deviceModel
      .find(condition)
      .limit(pagination.limit)
      .skip((pagination.offset - 1) * pagination.limit)
      .populate({ path: 'simId', model: 'Sim' })
      .lean()
      .exec();
    const total = await this.deviceModel.countDocuments(condition);
    return { list, total };
  }

  // 根据id查询
  async findById(_id: string): Promise<IDevice> {
    return await this.deviceModel.findById(_id).exec();
  }

  // 根据sn查询
  async findByDeviceSn(deviceSn: string): Promise<IDevice> {
    return await this.deviceModel.findOne({ deviceSn, isDelete: false }).exec();
  }
  // 根据id修改
  async updateById(_id: string, device: CreateDeviceDTO) {
    if (device.deviceSn) {
      const existing = await this.deviceModel
        .findOne({ _id: { $ne: _id }, deviceSn: device.deviceSn });
      if (existing) {
        throw new ApiException('设备序号已存在', ApiErrorCode.DEVICE_EXIST, 406);
      }
    }
    return await this.deviceModel.findByIdAndUpdate(_id, device).exec();
  }
  // 根据id删除
  async deleteById(_id: string) {
    return await this.deviceModel.findByIdAndUpdate(_id, { isDelete: true }).exec();
  }

  // 绑定旧sim卡
  async bindOldSim(_id: string, simId: string) {
    return await this.deviceModel.findByIdAndUpdate(_id, { simId });
  }
}