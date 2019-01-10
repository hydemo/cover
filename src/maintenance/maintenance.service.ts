import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { IMaintenance } from './interfaces/maintenance.interfaces';
import { CreateMaintenanceDTO } from './dto/creatMaintenance.dto';
import { Pagination } from '../common/dto/pagination.dto';
import { IList } from '../common/interface/list.interface';
import { WellService } from '../wells/well.service';
import { UserService } from '../users/user.service';
import { DeviceService } from '../devices/device.service';

@Injectable()
export class MaintenanceService {
  // 注入的MaintenanceModelToken要与maintenances.providers.ts里面的key一致就可以
  constructor(
    @Inject('MaintenanceModelToken') private readonly maintenanceModel: Model<IMaintenance>,
    @Inject(WellService) private readonly wellService: WellService,
    @Inject(UserService) private readonly userService: UserService,
    @Inject(DeviceService) private readonly deviceService: DeviceService,
  ) { }

  // 创建数据
  async create(createMaintenanceDTO: CreateMaintenanceDTO) {
    const creatMaintenance = new this.maintenanceModel(createMaintenanceDTO);
    await creatMaintenance.save();
    return creatMaintenance;
  }

  // 查询全部数据
  async findAll(pagination: Pagination, userId: string): Promise<IList<IMaintenance>> {
    const condition: any = {};
    condition.principal = userId;
    const list = await this.maintenanceModel
      .find(condition)
      .limit(pagination.limit)
      .sort({ status: 1, occurTime: -1 })
      .skip((pagination.offset - 1) * pagination.limit)
      .populate({ path: 'wellId', model: 'Well' })
      .populate({ path: 'deviceId', model: 'Device' })
      .populate({ path: 'principal', model: 'User' })
      .populate({ path: 'creatorId', model: 'User' })
      .exec();
    const total = await this.maintenanceModel.countDocuments(condition);
    return { list, total };
  }

  // 查询全部数据
  async findAllCms(pagination: Pagination): Promise<IList<IMaintenance>> {
    const search = [];
    const condition: any = {};
    if (pagination.search) {
      const sea = JSON.parse(pagination.search);
      for (const key in sea) {
        if (key === 'base' && sea[key]) {
          search.push({ location: new RegExp(sea[key], 'i') });
          const wellCondition = {
            $or: [{ wellSN: new RegExp(sea[key], 'i') }],
          };
          const wells = await this.wellService.findByCondition(wellCondition);
          const wellIds = wells.map(well => well._id);
          search.push({ wellId: { $in: wellIds } });
          const deviceCondition = {
            $or: [{ deviceSn: new RegExp(sea[key], 'i') }],
          };
          const devices = await this.deviceService.findByCondition(deviceCondition, sea[key]);
          const deviceIds = devices.map(device => device._id);
          search.push({ deviceId: { $in: deviceIds } });
          const userCondition = {
            $or: [{ name: new RegExp(sea[key], 'i') }],
          };
          const users = await this.userService.findByCondition(userCondition);
          const userIds = users.map(user => user._id);
          search.push({ principal: { $in: userIds } });
        } else if (sea[key] === 0 || sea[key]) {
          condition[key] = sea[key];
        }
      }
      if (search.length) {
        condition.$or = search;
      }
    }
    const list = await this.maintenanceModel
      .find(condition)
      .limit(pagination.limit)
      .sort({ status: -1, creadedAt: -1 })
      .skip((pagination.offset - 1) * pagination.limit)
      .populate({ path: 'wellId', model: 'Well' })
      .populate({ path: 'deviceId', model: 'Device' })
      .populate({ path: 'principal', model: 'User' })
      .populate({ path: 'creatorId', model: 'User' })
      .exec();
    const total = await this.maintenanceModel.countDocuments(condition);
    return { list, total };
  }

  // 响应
  async unDefence(_id: string) {
    const maintenance: CreateMaintenanceDTO = await this.maintenanceModel
      .findById(_id)
      .lean()
      .exec();
    await this.maintenanceModel
      .findByIdAndUpdate(_id, { responseTime: Date.now(), status: 1 })
      .exec();
    await this.wellService.unDefenceById(maintenance.wellId);
  }

  // 布防
  async defence(_id: string) {
    const maintenance: CreateMaintenanceDTO = await this.maintenanceModel
      .findById(_id)
      .lean()
      .exec();
    await this.maintenanceModel
      .findByIdAndUpdate(_id, { recoverTime: Date.now(), status: 2 })
      .exec();
    await this.wellService.defenceById(maintenance.wellId);
  }

  // 反馈
  async feedbackMaintenance(_id: string, feedback: string) {
    await this.maintenanceModel
      .findByIdAndUpdate(_id, { feedbackTime: Date.now(), status: 3, feedback })
      .exec();
  }
}