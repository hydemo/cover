import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { Pagination } from '../common/pagination.dto';
import { IBattery } from './interfaces/battery.interfaces';
import { IAlarm } from './interfaces/alarm.interfaces';
import { IAudioFre } from './interfaces/audioFre.interfaces';
import { IDeviceInfo } from './interfaces/deviceInfo.interfaces';
import { IConfigReport } from './interfaces/configReport.interfaces';
import { IWellCover } from './interfaces/wellCover.interfaces';
import { IList } from '../common/List.interface';
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
      .skip((pagination.offset - 1) * pagination.limit)
      .exec();
    const total = await this.alarmModel.countDocuments();
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
  async findAllAudioFre(wellId: string, pagination: Pagination): Promise<IList<IAudioFre>> {
    const condition = { wellId };
    const list = await this.audioFreModel
      .find(condition)
      .limit(pagination.limit)
      .skip((pagination.offset - 1) * pagination.limit)
      .exec();
    const total = await this.audioFreModel.countDocuments();
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
  async findAllBattery(wellId: string, pagination: Pagination): Promise<IList<IBattery>> {
    const condition = { wellId };
    const list = await this.batteryModel
      .find(condition)
      .limit(pagination.limit)
      .skip((pagination.offset - 1) * pagination.limit)
      .exec();
    const total = await this.batteryModel.countDocuments();
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
      .limit(pagination.limit)
      .skip((pagination.offset - 1) * pagination.limit)
      .exec();
    const total = await this.configReportModel.countDocuments();
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
      .limit(pagination.limit)
      .skip((pagination.offset - 1) * pagination.limit)
      .exec();
    const total = await this.deviceInfoModel.countDocuments();
    return { list, total };
  }
  /**
   * 新增窑井信息历史记录
   * @param WellCoverDTO WellCover实体
   */
  async createWellCover(wellCoverDTO: WellCoverDTO) {
    const wellCover = new this.wellCoverModel(wellCoverDTO);
    return await wellCover.save();
  }
  /**
   * 获取窑井信息历史数据
   * @param pagination 分页
   */
  async findAllWellCover(wellId: string, pagination: Pagination): Promise<IList<IWellCover>> {
    const condition = { wellId };
    const list = await this.wellCoverModel
      .find(condition)
      .limit(pagination.limit)
      .skip((pagination.offset - 1) * pagination.limit)
      .exec();
    const total = await this.wellCoverModel.countDocuments();
    return { list, total };
  }
  // // 根据id修改
  // async updateBatteryById(_id, battery: BatteryDTO) {
  //   return await this.batteryMode.findByIdAndUpdate(_id, battery).exec();
  // }
  // // 根据id删除
  // async deleteBatteryById(_id) {
  //   return await this.batteryMode.findByIdAndDelete(_id).exec();
  // }
}