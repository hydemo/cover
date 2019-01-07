import { Model } from 'mongoose';
import { Inject, Injectable, HttpService } from '@nestjs/common';
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
import { DeviceService } from '../devices/device.service';
import { IDevice } from '../devices/interfaces/device.interfaces';

@Injectable()
export class EventService {
  constructor(
    @Inject('WarningModelToken') private readonly warningModel: Model<IWarning>,
    @Inject(DataService) private readonly dataService: DataService,
    @Inject(WellService) private readonly wellService: WellService,
    @Inject(DeviceService) private readonly deviceService: DeviceService,
    @Inject(MaintenanceService) private readonly maintenanceService: MaintenanceService,
    private readonly httpService: HttpService,
  ) { }


  async receiveDeviceInfoChange(deviceID: string, event: any) {
    const device: IDevice = await this.deviceService.findBydeviceID(deviceID)
    await this.deviceService.updateById(device._id, { NBModuleNumber: event.nodeId })
  }
  /**
   * 接收数据
   * @param EventsDTO event实体
   */
  async receiveData(deviceID: string, event: any) {
    const device: IDevice = await this.deviceService.findBydeviceID(deviceID)
    const well: IWell = await this.wellService.findByDeviceId(device._id);
    switch (event.serviceType) {
      case 'Battery':
        {
          const battery: BatteryDTO = {
            // 窑井Id
            wellId: well._id,
            // 设备id
            deviceId: well.deviceId,
            // 电量水平
            batteryLevel: event.data.batteryLevel,
          };
          await this.receiveBattery(battery);
        }
        break;
      case 'Alarm':
        {
          const alarm: AlarmDTO = {
            // 窑井Id
            wellId: well._id,
            // 设备id
            deviceId: well.deviceId,
            // 是否打开
            coverIsOpen: event.data.coverIsOpen,
            // 是否泄漏
            gasLeak: event.data.gasLeak,
          };
          await this.receiveAlarm(alarm);
        }
        break;
      case 'AudioFre':
        {
          const audioFre: AudioFreDTO = {
            // 窑井Id
            wellId: well._id,
            // 设备id
            deviceId: well.deviceId,
            // 超声波频率
            frequency: event.data.frequency,
            // 超声波振幅
            amplitude: event.data.amplitude,
          };
          await this.receiveAudioFre(audioFre);
        }
        break;
      case 'WellCover':
        {
          const wellCover: WellCoverDTO = {
            // 窑井Id
            wellId: well._id,
            // 设备id
            deviceId: well.deviceId,
            // 测距传感器数值
            distance: event.data.distance,
            // 光敏器件电压值
            photoresistor: event.data.photoresistor,
          };
          await this.receiveWellCover(wellCover);
        }
        break;
      case 'DeviceInfo':
        {
          const deviceInfo: DeviceInfoDTO = {
            // 窑井Id
            deviceID: deviceID,
            // 设备序号
            deviceSn: event.data.deviceSn,
            // 设备名称
            deviceName: event.data.deviceName
          };
          await this.receiveDeviceInfo(device._id, deviceInfo);
        }
        break;
      default:
        break;
    }
  }
  async getWarningList(pagination: Pagination): Promise<IList<IWarning>> {
    const condition: any = {};
    if (pagination.search) {
      const sea = JSON.parse(pagination.search);
      for (const key in sea) {
        if (key === 'batteryLevel' && sea[key]) {
          condition[key] = sea[key];
        } else if (key === 'warningType' && sea[key]) {
          condition[key] = sea[key];
        } else if (sea[key] === 0) {
          condition[key] = false;
        } else if (sea[key]) {
          condition[key] = true;
        }
      }
    }
    const list = await this.warningModel
      .find(condition)
      .limit(pagination.limit)
      .skip((pagination.offset - 1) * pagination.limit)
      .sort({ isHandle: 1, handleTime: -1 })
      .populate({ path: 'wellId', model: 'Well' })
      .populate({ path: 'deviceId', model: 'Device' })
      .populate({ path: 'handler', model: 'User' })
      .exec();
    const total = await this.warningModel.countDocuments(condition);
    return { list, total };
  }

  async bindPrincipal(id: string, userId: string, creatorId: string) {
    const warning: IWarning = await this.warningModel
      .findById(id)
      .exec();
    const maintenance: CreateMaintenanceDTO = {
      wellId: warning.wellId,
      deviceId: warning.deviceId,
      principal: userId,
      warningId: warning._id,
      maintenanceType: warning.warningType,
      occurTime: warning.createdAt,
      creatorId,
      status: 0,
    };
    await this.maintenanceService.create(maintenance);
    await this.warningModel.findByIdAndUpdate(id, {
      isHandle: true,
      handler: creatorId,
      handleTime: Date.now(),
      handleType: 0,
    });
  }

  async cancelWarning(id: string, creatorId: string) {
    await this.warningModel.findByIdAndUpdate(id, {
      isHandle: true,
      handler: creatorId,
      handleTime: Date.now(),
      handleType: 1,
    });
  }

  async countUnhandleWarning(): Promise<number> {
    return await this.warningModel.countDocuments({ isHandle: false });
  }

  async receiveBattery(battery: BatteryDTO) {
    const well: CreateWellDTO = await this.wellService.findById(battery.wellId);
    well.status.batteryLevel = battery.batteryLevel;
    await this.wellService.updateById(battery.wellId, well);
    await this.dataService.createBattery(battery);
    if (battery.batteryLevel < 20 && well.isDefence) {
      const warning: WarningsDTO = {
        wellId: battery.wellId,
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
    if (alarm.coverIsOpen && well.isDefence) {
      const warning: WarningsDTO = {
        wellId: alarm.wellId,
        deviceId: alarm.deviceId,
        warningType: 'Open',
        coverIsOpen: alarm.coverIsOpen,
        isHandle: false,
        batteryLevel: well.status.batteryLevel,
      };
      await this.create(warning);
    }
    if (alarm.gasLeak && well.isDefence) {
      const warning: WarningsDTO = {
        wellId: alarm.wellId,
        deviceId: alarm.deviceId,
        warningType: 'Leak',
        gasLeak: alarm.gasLeak,
        isHandle: false,
        batteryLevel: well.status.batteryLevel,
      };
      await this.create(warning);
    }
  }
  async receiveDeviceInfo(deviceId: string, data: DeviceInfoDTO) {
    await this.deviceService.updateById(deviceId, { deviceSn: data.deviceSn, })
    await this.dataService.createDeviceInfo(data);
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

  async getData(): Promise<any> {
    const result = await this.httpService.post('https://180.101.147.89:8743/iocm/app/sec/v1.1.0/login', {
      appId: 'GDHKNUr_4AXCUn_A7Vzo6W1NH7Qa',
      secret: '6UwnH2syFzd_oHpwgdeCtHcWPSca',
    }).toPromise();
    return await result;
    console.log(result, 'result');
  }

}