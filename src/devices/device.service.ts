import { Model } from 'mongoose';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { IDevice } from './interfaces/device.interfaces';
import { CreateDeviceDTO } from './dto/creatDevice.dto';
import { Pagination } from '../common/dto/pagination.dto';
import { IList } from '../common/interface/list.interface';
import { ApiErrorCode } from '../common/enum/api-error-code.enum';
import { ApiException } from '../common/expection/api.exception';
import { SimService } from '../sim/sim.service';
import { WellService } from 'src/wells/well.service';

@Injectable()
export class DeviceService {
  // 注入的DeviceModelToken要与devices.providers.ts里面的key一致就可以
  constructor(
    @Inject('DeviceModelToken') private readonly deviceModel: Model<IDevice>,
    @Inject(forwardRef(() => SimService)) private readonly simService: SimService,
    @Inject(forwardRef(() => WellService)) private readonly wellService: WellService,
  ) { }

  // 创建数据
  async create(createDeviceDTO: CreateDeviceDTO): Promise<IDevice> {
    const existing = await this.deviceModel.findOne({ deviceID: createDeviceDTO.deviceID, isDelete: false });
    if (existing) {
      throw new ApiException('设备ID已存在', ApiErrorCode.DEVICE_EXIST, 406);
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
  async findBydeviceID(deviceID: string): Promise<IDevice> {
    return await this.deviceModel.findOne({ deviceID, isDelete: false }).lean().exec();
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
      .sort({ status: 1 })
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

  async updateMany(condition: any, update: any): Promise<any> {
    return await this.deviceModel.updateMany(condition, update);
  }
  // 根据sn查询
  async findByDeviceSn(deviceSn: string): Promise<IDevice> {
    return await this.deviceModel.findOne({ deviceSn, isDelete: false }).exec();
  }
  // 根据id修改
  async updateById(_id: string, device: CreateDeviceDTO) {
    if (device.deviceSn) {
      const existing = await this.deviceModel
        .findOne({ _id: { $ne: _id }, deviceID: device.deviceID });
      if (existing) {
        throw new ApiException('设备序号已存在', ApiErrorCode.DEVICE_EXIST, 406);
      }
    }
    return await this.deviceModel.findByIdAndUpdate(_id, device).exec();
  }
  // 根据id删除
  async deleteById(_id: string) {
    await this.wellService.updateMany({ deviceId: _id }, { $unset: { deviceId: '' } });
    return await this.deviceModel.findByIdAndUpdate(_id, { isDelete: true }).exec();
  }

  // 绑定旧sim卡
  async bindOldSim(_id: string, simId: string) {
    const device = await this.deviceModel.findById(_id);
    await this.deviceModel.findByIdAndUpdate(_id, { simId });
    await this.simService.updateById(device.simId, { isBind: false });
    return await this.simService.updateById(simId, { isBind: true });
  }

  async unbindSim(_id: string) {
    const device = await this.deviceModel.findById(_id);
    await this.deviceModel.findByIdAndUpdate(_id, { $unset: { simId: '' } });
    return await this.simService.updateById(device.simId, { isBind: false });
  }
}