import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { IWell } from './interfaces/well.interfaces';
import { CreateWellDTO } from './dto/creatWell.dto';
import { Pagination } from '../common/dto/pagination.dto';
import { IList } from '../common/interface/list.interface';
import { DeviceService } from '../devices/device.service';
import { CoverService } from '../covers/cover.service';
import { CreateDeviceDTO } from '../devices/dto/creatDevice.dto';
import { CreateCoverDTO } from '../covers/dto/creatCover.dto';
import { IDevice } from '../devices/interfaces/device.interfaces';
import { ICover } from '../covers/interfaces/cover.interfaces';

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
  async findPage(pagination: Pagination): Promise<IList<IWell>> {
    const reg = new RegExp(pagination.search, 'i');
    const search = [
      { ownerId: reg },
      { ownerName: reg },
      { wellType: reg },
      { wellSN: reg },
      { longitude: reg },
      { latitude: reg },
      { location: reg },
    ];
    const list: IWell[] = await this.wellModel
      .find({ $or: search })
      .limit(pagination.limit)
      .skip((pagination.offset - 1) * pagination.limit)
      .exec();
    const total = await this.wellModel.countDocuments({ $or: search });
    return { list, total };
  }
  // 获取窑井完整列表
  async findAll(): Promise<IWell[]> {
    return await this.wellModel
      .find()
      .exec();
  }
  // 获取井盖打开列表
  async findOpen(): Promise<IWell[]> {
    return await this.wellModel
      .find({ 'status.coverIsOpen': true })
      .exec();
  }
  // 获取漏气列表
  async findLeak(): Promise<IWell[]> {
    return await this.wellModel
      .find({ 'status.gasLeak': true })
      .exec();
  }
  // 根据id查询
  async findById(_id: string): Promise<IWell> {
    return await this.wellModel.findById(_id).lean().exec();
  }
  // 根据deviceId查询
  async findByDeviceSn(deviceSn: string): Promise<IWell> {
    const device: IDevice = await this.deviceService.findByDeviceSn(deviceSn);
    return await this.wellModel.findOne({ deviceId: device._id }).exec();
  }
  // 根据id修改
  async updateById(_id: string, well: CreateWellDTO) {
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
    return await this.wellModel.findByIdAndDelete(_id).exec();
  }
  // 绑定已有设备
  async bindOldDevice(_id: string, deviceId: string) {
    return await this.wellModel.findByIdAndUpdate(_id, { deviceId });
  }
  // 绑定新设备
  async bindNewDevice(_id: string, device: CreateDeviceDTO) {
    const creatDevice: IDevice = await this.deviceService.create(device);
    return await this.wellModel.findByIdAndUpdate(_id, { deviceId: creatDevice._id });
  }
  // 绑定旧井盖
  async bindOldCover(_id: string, coverId: string) {
    return await this.wellModel.findByIdAndUpdate(_id, { coverId });
  }
  // 绑定新井盖
  async bindNewCover(_id: string, cover: CreateCoverDTO) {
    const creatCover: ICover = await this.coverService.create(cover);
    return await this.wellModel.findByIdAndUpdate(_id, { coverId: creatCover._id });
  }
}
