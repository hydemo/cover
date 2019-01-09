import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { Pagination } from '../common/dto/pagination.dto';
import { IBattery } from './interfaces/battery.interfaces';
import { IAlarm } from './interfaces/alarm.interfaces';
import { IAudioFre } from './interfaces/audioFre.interfaces';
import { IDeviceInfo } from './interfaces/deviceInfo.interfaces';
import { IConfigReport } from './interfaces/configReport.interfaces';
import { IWellCover } from './interfaces/wellCover.interfaces';
import { IList } from '../common/interface/list.interface';
import { BatteryDTO } from './dto/battery.dto';
import { AlarmDTO } from './dto/alarm.dto';
import { AudioFreDTO } from './dto/audioFre.dto';
import { ConfigReportDTO } from './dto/configReport.dto';
import { DeviceInfoDTO } from './dto/deviceInfo.dto';
import { WellCoverDTO } from './dto/wellCover.dto';

@Injectable()
export class DataService {
  constructor(
    @Inject('AlarmModelToken') private readonly alarmModel: Model<IAlarm>,
    @Inject('AudioFreModelToken') private readonly audioFreModel: Model<IAudioFre>,
    @Inject('BatteryModelToken') private readonly batteryModel: Model<IBattery>,
    @Inject('DeviceInfoModelToken') private readonly deviceInfoModel: Model<IDeviceInfo>,
    @Inject('ConfigReportModelToken') private readonly configReportModel: Model<IConfigReport>,
    @Inject('WellCoverModelToken') private readonly wellCoverModel: Model<IWellCover>,
  ) { }

  /**
   * 新增警报历史记录
   * @param AlarmDTO Alarm实体
   */
  async createAlarm(alarmDTO: AlarmDTO) {
    const alarm = new this.alarmModel(alarmDTO);
    return await alarm.save();
  }
  /**
   * 获取警报历史数据
   * @param pagination 分页
   */
  async findAllAlarm(wellId: string, pagination: Pagination): Promise<IList<IAlarm>> {
    const condition = { wellId };
    const list = await this.alarmModel
      .find(condition)
      .limit(pagination.limit)
      .sort({ createdAt: -1 })
      .skip((pagination.offset - 1) * pagination.limit)
      .exec();
    const total = await this.alarmModel.countDocuments(condition);
    return { list, total };
  }
  /**
   * 新增超声波历史记录
   * @param AudioFreDTO AudioFre实体
   */
  async createAudioFre(audioFreDTO: AudioFreDTO) {
    const audioFre = new this.audioFreModel(audioFreDTO);
    return await audioFre.save();
  }
  /**
   * 获取超声波历史数据
   * @param pagination 分页
   */
  async findAudioFre(wellId: string, pagination: Pagination): Promise<IList<IAudioFre>> {
    const condition = { wellId };
    const list = await this.audioFreModel
      .find(condition)
      .sort({ createdAt: -1 })
      .limit(pagination.limit)
      .skip((pagination.offset - 1) * pagination.limit)
      .populate({ path: 'wellId', model: 'Well' })
      .populate({ path: 'deviceId', model: 'Device' })
      .exec();
    const total = await this.audioFreModel.countDocuments(condition);
    return { list, total };
  }
  /**
   * 新增电量历史记录
   * @param BatteryDTO Battery实体
   */
  async createBattery(batteryDTO: BatteryDTO) {
    const battery = new this.batteryModel(batteryDTO);
    return await battery.save();
  }
  /**
   * 获取电量历史数据
   * @param pagination 分页
   */
  async findBattery(wellId: string, pagination: Pagination): Promise<IList<IBattery>> {
    const condition = { wellId };
    const list = await this.batteryModel
      .find(condition)
      .sort({ createdAt: -1 })
      .limit(pagination.limit)
      .skip((pagination.offset - 1) * pagination.limit)
      .populate({ path: 'wellId', model: 'Well' })
      .populate({ path: 'deviceId', model: 'Device' })
      .exec();
    const total = await this.batteryModel.countDocuments(condition);
    return { list, total };
  }
  /**
   * 新增配置报告历史记录
   * @param ConfigReportDTO ConfigReport实体
   */
  async createConfigReport(configReportDTO: ConfigReportDTO) {
    const configReport = new this.configReportModel(configReportDTO);
    return await configReport.save();
  }
  /**
   * 获取配置报告历史数据
   * @param pagination 分页
   */
  async findAllConfigReport(wellId: string, pagination: Pagination): Promise<IList<IConfigReport>> {
    const condition = { wellId };
    const list = await this.configReportModel
      .find(condition)
      .sort({ createdAt: -1 })
      .limit(pagination.limit)
      .skip((pagination.offset - 1) * pagination.limit)
      .exec();
    const total = await this.configReportModel.countDocuments(condition);
    return { list, total };
  }
  /**
   * 新增设备信息历史记录
   * @param DeviceInfoDTO DeviceInfo实体
   */
  async createDeviceInfo(deviceInfoDTO: DeviceInfoDTO) {
    const deviceInfo = new this.deviceInfoModel(deviceInfoDTO);
    return await deviceInfo.save();
  }
  /**
   * 获取设备信息历史数据
   * @param pagination 分页
   */
  async findAllDeviceInfo(wellId: string, pagination: Pagination): Promise<IList<IDeviceInfo>> {
    const condition = { wellId };
    const list = await this.deviceInfoModel
      .find(condition)
      .sort({ createdAt: -1 })
      .limit(pagination.limit)
      .skip((pagination.offset - 1) * pagination.limit)
      .exec();
    const total = await this.deviceInfoModel.countDocuments(condition);
    return { list, total };
  }
  /**
   * 新增窨井信息历史记录
   * @param WellCoverDTO WellCover实体
   */
  async createWellCover(wellCoverDTO: WellCoverDTO) {
    const wellCover = new this.wellCoverModel(wellCoverDTO);
    return await wellCover.save();
  }
  /**
   * 获取窨井信息历史数据
   * @param pagination 分页
   */
  async findWellCover(wellId: string, pagination: Pagination): Promise<IList<IWellCover>> {
    const condition = { wellId };
    const list = await this.wellCoverModel
      .find(condition)
      .sort({ createdAt: -1 })
      .limit(pagination.limit)
      .skip((pagination.offset - 1) * pagination.limit)
      .populate({ path: 'wellId', model: 'Well' })
      .populate({ path: 'deviceId', model: 'Device' })
      .exec();
    const total = await this.wellCoverModel.countDocuments(condition);
    return { list, total };
  }
  /**
   * 获取电量历史数据
   */
  async findBatteryAll(wellId: string): Promise<IList<IBattery>> {
    const condition = { wellId };
    const list = await this.batteryModel
      .find(condition)
      .exec();
    const total = await this.batteryModel.countDocuments(condition);
    return { list, total };
  }

  /**
   * 获取窨井信息历史数据不分页
   */
  async findWellCoverAll(wellId: string): Promise<IList<IWellCover>> {
    const condition = { wellId };
    const list = await this.wellCoverModel
      .find(condition)
      .exec();
    const total = await this.wellCoverModel.countDocuments(condition);
    return { list, total };
  }

  /**
   * 获取超声波历史数据
   */
  async findAudioFreAll(wellId: string): Promise<IList<IAudioFre>> {
    const condition = { wellId };
    const list = await this.audioFreModel
      .find(condition)
      .exec();
    const total = await this.audioFreModel.countDocuments(condition);
    return { list, total };
  }
}