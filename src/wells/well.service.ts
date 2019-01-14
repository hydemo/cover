import { Model } from 'mongoose';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { IWell } from './interfaces/well.interfaces';
import { CreateWellDTO } from './dto/creatWell.dto';
import { Pagination } from '../common/dto/pagination.dto';
import { IList } from '../common/interface/list.interface';
import { DeviceService } from '../devices/device.service';
import { OwnerService } from '../owner/owner.service';
import { ApiErrorCode } from '../common/enum/api-error-code.enum';
import { ApiException } from '../common/expection/api.exception';

@Injectable()
export class WellService {
  // 注入的WellModelToken要与wells.providers.ts里面的key一致就可以
  constructor(
    @Inject('WellModelToken') private readonly wellModel: Model<IWell>,
    @Inject(forwardRef(() => DeviceService)) private readonly deviceService: DeviceService,
    @Inject(forwardRef(() => OwnerService)) private readonly ownerService: OwnerService,
  ) { }

  // 创建数据
  async create(createWellDTO: CreateWellDTO) {
    const existing = await this.wellModel.findOne({ wellSN: createWellDTO.wellSN, isDelete: false });
    if (existing) {
      throw new ApiException('窨井序号已存在', ApiErrorCode.WELL_EXIST, 406);
    }
    const deleteOne = await this.wellModel.findOne({ wellSN: createWellDTO.wellSN, isDelete: true });
    if (deleteOne) {
      return this.wellModel.findByIdAndUpdate(deleteOne._id, { isDelete: false });
    }
    const creatWell = new this.wellModel(createWellDTO);
    return await creatWell.save();
  }

  async findByCondition(condition: any): Promise<IWell[]> {
    condition.isDelete = false;
    return await this.wellModel.find(condition);
  }

  async updateMany(condition: any, update: any): Promise<any> {
    return await this.wellModel.updateMany(condition, update);
  }

  // 查询全部数据
  async findPage(pagination: Pagination): Promise<IList<IWell>> {
    const search = [];
    const condition: any = {};
    if (pagination.search) {
      const sea = JSON.parse(pagination.search);
      for (const key in sea) {
        if (key === 'base' && sea[key]) {
          search.push({ wellSN: new RegExp(sea[key], 'i') });
          search.push({ wellType: new RegExp(sea[key], 'i') });
          search.push({ location: new RegExp(sea[key], 'i') });
          const ownerCondition = {
            $or: [
              { ownerId: new RegExp(sea[key], 'i') },
              { ownerName: new RegExp(sea[key], 'i') },
            ],
          };
          const owners = await this.ownerService.findByCondition(ownerCondition);
          const ownerIds = owners.map(owner => owner._id);
          search.push({ ownerId: { $in: ownerIds } });
          const deviceCondition = {
            $or: [{ deviceSn: new RegExp(sea[key], 'i') }],
          };
          const devices = await this.deviceService.findByCondition(deviceCondition, sea[key]);
          const deviceIds = devices.map(device => device._id);
          search.push({ deviceId: { $in: deviceIds } });
        } else if (sea[key] === 0 || sea[key]) {
          condition[key] = sea[key];
        }
      }
      if (search.length) {
        condition.$or = search;
      }
    }
    condition.isDelete = false;
    const list: IWell[] = await this.wellModel
      .find(condition)
      .limit(pagination.limit)
      .skip((pagination.offset - 1) * pagination.limit)
      .populate({ path: 'ownerId', model: 'Owner' })
      .populate({
        path: 'deviceId', model: 'Device', populate: {
          path: 'simId', model: 'Sim',
        },
      })
      .exec();
    const total = await this.wellModel.countDocuments(condition);
    return { list, total };
  }
  // 获取窨井完整列表
  async findAll(): Promise<IWell[]> {
    return await this.wellModel
      .find({ isDelete: false })
      .exec();
  }
  // 获取井盖打开列表
  async findOpen(): Promise<IWell[]> {
    return await this.wellModel
      .find({ 'status.coverIsOpen': true, 'isDelete': false })
      .exec();
  }

  // 获取电量不足列表
  async findBattery(): Promise<IWell[]> {
    return await this.wellModel
      .find({ $where: 'this.status.batteryLevel <= this.batteryLimit', isDelete: false })
      .exec();
  }

  async findUnnormal(): Promise<IWell[]> {
    return await this.wellModel
      .find({
        isDelete: false,
        $or: [
          { $where: 'this.status.batteryLevel <= this.batteryLimit' },
          { 'status.coverIsOpen': true },
          { 'status.gasLeak': true },
        ],
      })
      .exec();
  }

  // 获取漏气列表
  async findLeak(): Promise<IWell[]> {
    return await this.wellModel
      .find({ 'status.gasLeak': true, 'isDelete': false })
      .exec();
  }
  // 根据id查询
  async findById(_id: string): Promise<IWell> {
    return await this.wellModel.findById(_id).lean().exec();
  }
  // 根据deviceId查询
  async findByDeviceId(deviceId: string): Promise<IWell> {
    return await this.wellModel.findOne({ deviceId, isDelete: false }).exec();
  }
  async getCounts() {
    const total = await this.wellModel.countDocuments({ isDelete: false });
    const open = await this.wellModel
      .countDocuments({ 'status.coverIsOpen': true, 'isDelete': false });
    const leak = await this.wellModel
      .countDocuments({ 'status.gasLeak': true, 'isDelete': false });
    const battery = await this.wellModel
      .count({ $where: 'this.status.batteryLevel <= this.batteryLimit', isDelete: false });
    return { open, battery, leak, normal: total - open - battery - leak };
  }
  // 根据id修改
  async updateById(_id: string, well: CreateWellDTO) {
    if (well.wellSN) {
      const existing = await this.wellModel
        .findOne({ _id: { $ne: _id }, wellSN: well.wellSN });
      if (existing) {
        throw new ApiException('窨井序号已存在', ApiErrorCode.WELL_EXIST, 406);
      }
    }
    return await this.wellModel.findByIdAndUpdate(_id, well).exec();
  }
  // 根据id布防
  async defenceById(_id: string) {
    return await this.wellModel.findByIdAndUpdate(_id, { isDefence: true }).exec();
  }
  // 根据id撤防
  async unDefenceById(_id: string) {
    return await this.wellModel.findByIdAndUpdate(_id, { isDefence: false }).exec();
  }
  // 根据id删除
  async deleteById(_id: string) {
    return await this.wellModel.findByIdAndUpdate(_id, { isDelete: true }).exec();
  }
  // 绑定已有设备
  async bindOldDevice(_id: string, deviceId: string) {
    const device = await this.deviceService.findById(deviceId);
    const well = await this.wellModel.findById(_id);
    await this.wellModel.findByIdAndUpdate(_id, { deviceId, batteryLimit: device.batteryLimit });
    await this.deviceService.updateById(well.deviceId, { isBind: false });
    return await this.deviceService.updateById(deviceId, { isBind: true });
  }
  // // 绑定新设备
  // async bindNewDevice(_id: string, device: CreateDeviceDTO) {
  //   const creatDevice: IDevice = await this.deviceService.create(device);
  //   return await this.wellModel.findByIdAndUpdate(_id, { deviceId: creatDevice._id });
  // }
  // 绑定旧井盖
  async bindOldOwner(_id: string, ownerId: string) {
    return await this.wellModel.findByIdAndUpdate(_id, { ownerId });
  }
  // 绑定新井盖
  // async bindNewOwner(_id: string, owner: CreateOwnerDTO) {
  //   const creatOwner: IOwner = await this.ownerService.create(owner);
  //   return await this.wellModel.findByIdAndUpdate(_id, { ownerId: creatOwner._id });
  // }

  async unbindOwner(_id: string) {
    return await this.wellModel.findByIdAndUpdate(_id, { $unset: { ownerId: '' } });
  }

  async unbindDevice(_id: string) {
    const well = await this.wellModel.findById(_id);
    await this.wellModel.findByIdAndUpdate(_id, { $unset: { deviceId: '', batteryLimit: '' } });
    return await this.deviceService.updateById(well.deviceId, { isBind: false });
  }
}
