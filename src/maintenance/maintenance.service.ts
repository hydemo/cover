import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { IMaintenance } from './interfaces/maintenance.interfaces';
import { CreateMaintenanceDTO } from './dto/creatMaintenance.dto';
import { Pagination } from '../common/dto/pagination.dto';
import { IList } from '../common/interface/list.interface';
import { WellService } from '../wells/well.service';

@Injectable()
export class MaintenanceService {
  // 注入的MaintenanceModelToken要与maintenances.providers.ts里面的key一致就可以
  constructor(
    @Inject('MaintenanceModelToken') private readonly maintenanceModel: Model<IMaintenance>,
    @Inject(WellService) private readonly wellService: WellService,
  ) { }

  // 创建数据
  async create(createMaintenanceDTO: CreateMaintenanceDTO) {
    const creatMaintenance = new this.maintenanceModel(createMaintenanceDTO);
    await creatMaintenance.save();
    return creatMaintenance;
  }

  // 查询全部数据
  async findAll(pagination: Pagination): Promise<IList<IMaintenance>> {
    const reg = new RegExp(pagination.search, 'i');
    const list = await this.maintenanceModel
      .find()
      .limit(pagination.limit)
      .sort({ status: 1 })
      .skip((pagination.offset - 1) * pagination.limit)
      .populate({ path: 'wellId', model: 'Well' })
      .populate({ path: 'coverId', model: 'Cover' })
      .populate({ path: 'deviceId', model: 'Device' })
      .exec();
    const total = await this.maintenanceModel.countDocuments();
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
    await this.wellService.defenceById(maintenance.wellId);
  }

  // 反馈
  async feedbackMaintenance(_id: string, feedback: string) {
    await this.maintenanceModel
      .findByIdAndUpdate(_id, { feedbackTime: Date.now(), status: 2, feedback })
      .exec();
  }
}