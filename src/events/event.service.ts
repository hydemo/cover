import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { EventsDTO } from './dto/event.dto';
import { DataService } from '../data/data.service';
import { WellService } from '../wells/well.service';
import { IWarning } from './interfaces/warning.interfaces';
import { IWell } from '../wells/interfaces/well.interfaces';
import { BatteryDTO } from '../data/dto/battery.dto';
import { WarningsDTO } from './dto/creatWarning.dto';
import { AlarmDTO } from '../data/dto/alarm.dto';
import { DeviceInfoDTO } from '../data/dto/deviceInfo.dto';
import { AudioFreDTO } from '../data/dto/audioFre.dto';
import { WellCoverDTO } from '../data/dto/wellCover.dto';
import { Pagination } from '../common/dto/pagination.dto';
import { IList } from '../common/interface/list.interface';
import { CreateWellDTO } from '../wells/dto/creatWell.dto';
import { MaintenanceService } from '../maintenance/maintenance.service';
import { CreateMaintenanceDTO } from '../maintenance/dto/creatMaintenance.dto';

@Injectable()
export class EventService {
  constructor(
    @Inject('WarningModelToken') private readonly warningModel: Model<IWarning>,
    private readonly dataService: DataService,
    private readonly wellService: WellService,
    private readonly maintenanceService: MaintenanceService,
  ) { }

  /**
   * 接收数据
   * @param EventsDTO event实体
   */
  async receiveData(event: EventsDTO) {
    const well: IWell = await this.wellService.findByDeviceSn(event.deviceSn);
    switch (event.serviceType) {
      case 'Battery':
        {
          const battery: BatteryDTO = {
            // 窑井Id
            wellId: well._id,
            // 井盖Id
            coverId: well.coverId,
            // 设备id
            deviceId: well.deviceId,
            // 电量水平
            batteryLevel: event.batteryLevel,
          };
          await this.receiveBattery(battery);
        }
        break;
      case 'Alarm':
        {
          const alarm: AlarmDTO = {
            // 窑井Id
            wellId: well._id,
            // 井盖Id
            coverId: well.coverId,
            // 设备id
            deviceId: well.deviceId,
            // 是否打开
            coverIsOpen: event.coverIsOpen,
            // 是否泄漏
            gasLeak: event.gasLeak,
          };
          await this.receiveAlarm(alarm);
        }
        break;
      case 'AudioFre':
        {
          const audioFre: AudioFreDTO = {
            // 窑井Id
            wellId: well._id,
            // 井盖Id
            coverId: well.coverId,
            // 设备id
            deviceId: well.deviceId,
            // 超声波频率
            frequency: event.frequency,
            // 超声波振幅
            amplitude: event.amplitude,
          };
          await this.receiveAudioFre(audioFre);
        }
        break;
      case 'WellCover':
        {
          const wellCover: WellCoverDTO = {
            // 窑井Id
            wellId: well._id,
            // 井盖Id
            coverId: well.coverId,
            // 设备id
            deviceId: well.deviceId,
            // 测距传感器数值
            distance: event.distance,
            // 光敏器件电压值
            photoresistor: event.photoresistor,
          };
          await this.receiveWellCover(wellCover);
        }
        break;
      case 'DeviceInfo':
        {
          const deviceInfo: DeviceInfoDTO = {
            // 窑井Id
            wellId: well._id,
            // 井盖Id
            coverId: well.coverId,
            // 设备序号
            deviceSn: event.deviceSn,
            // 设备名称
            deviceName: event.deviceName,
          };
          await this.receiveDeviceInfo(deviceInfo);
        }
        break;
      default:
        break;
    }
  }
  async getWarningList(pagination: Pagination): Promise<IList<IWarning>> {
    const condition = { isHandle: false };
    const list = await this.warningModel
      .find(condition)
      .limit(pagination.limit)
      .skip((pagination.offset - 1) * pagination.limit)
      .sort({ createdAt: -1 })
      .exec();
    const total = await this.warningModel.countDocuments(condition);
    return { list, total };
  }

  async bindPrincipal(id: string, name: string) {
    const warning: IWarning = await this.warningModel
      .findById(id)
      .exec();
    const well: CreateWellDTO = await this.wellService.findById(warning.wellId);
    const maintenance: CreateMaintenanceDTO = {
      principal: name,
      warningId: warning._id,
      location: well.location,
      maintenanceType: warning.warningType,
      occurTime: warning.createdAt,
      status: 0,
    };
    return await this.maintenanceService.create(maintenance);
  }

  async receiveBattery(battery: BatteryDTO) {
    const well: CreateWellDTO = await this.wellService.findById(battery.wellId);
    well.status.batteryLevel = battery.batteryLevel;
    await this.wellService.updateById(battery.wellId, well);
    await this.dataService.createBattery(battery);
    if (battery.batteryLevel < 20) {
      const warning: WarningsDTO = {
        wellId: battery.wellId,
        coverId: battery.coverId,
        deviceId: battery.deviceId,
        warningType: 'Battery',
        batteryLevel: battery.batteryLevel,
        isHandle: false,
      };
      await this.create(warning);
    }
  }
  async receiveAlarm(alarm: AlarmDTO) {
    await this.dataService.createAlarm(alarm);
    const well: CreateWellDTO = await this.wellService.findById(alarm.wellId);
    well.status.coverIsOpen = alarm.coverIsOpen;
    well.status.gasLeak = alarm.gasLeak;
    await this.wellService.updateById(alarm.wellId, well);
    if (alarm.coverIsOpen) {
      const warning: WarningsDTO = {
        wellId: alarm.wellId,
        coverId: alarm.coverId,
        deviceId: alarm.deviceId,
        warningType: 'Open',
        coverIsOpen: alarm.coverIsOpen,
        isHandle: false,
      };
      await this.create(warning);
    }
    if (alarm.gasLeak) {
      const warning: WarningsDTO = {
        wellId: alarm.wellId,
        coverId: alarm.coverId,
        deviceId: alarm.deviceId,
        warningType: 'Leak',
        gasLeak: alarm.gasLeak,
        isHandle: false,
      };
      await this.create(warning);
    }
  }
  async receiveDeviceInfo(deviceInfo: DeviceInfoDTO) {
    await this.dataService.createDeviceInfo(deviceInfo);
  }
  async receiveWellCover(wellCover: WellCoverDTO) {
    const well: CreateWellDTO = await this.wellService.findById(wellCover.wellId);
    well.status.distance = wellCover.distance;
    well.status.photoresistor = wellCover.photoresistor;
    await this.wellService.updateById(wellCover.wellId, well);
    await this.dataService.createWellCover(wellCover);
  }
  async receiveAudioFre(audioFre: AudioFreDTO) {
    const well: CreateWellDTO = await this.wellService.findById(audioFre.wellId);
    well.status.amplitude = audioFre.amplitude;
    well.status.frequency = audioFre.frequency;
    await this.wellService.updateById(audioFre.wellId, well);
    await this.dataService.createAudioFre(audioFre);
  }
  // 创建数据
  async create(warning: WarningsDTO) {
    const creatWarning = new this.warningModel(warning);
    await creatWarning.save();
  }

}