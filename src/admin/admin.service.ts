import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { IAdmin } from './interfaces/admin.interfaces';
import { CreateAdminDTO } from './dto/creatAdmin.dto';
import { Pagination } from '../common/pagination.dto';
import { IList } from '../common/List.interface';
import { CryptoUtil } from '../utils/crypto.util';

@Injectable()
export class AdminService {
  // 注入的AdminModelToken要与admins.providers.ts里面的key一致就可以
  constructor(
    @Inject('AdminModelToken') private readonly adminModel: Model<IAdmin>,
    @Inject(CryptoUtil) private readonly cryptoUtil: CryptoUtil,
  ) { }

  // 创建数据
  async create(createAdminDTO: CreateAdminDTO): Promise<IAdmin> {
    const creatAdmin = new this.adminModel(createAdminDTO);
    await creatAdmin.save();
    return creatAdmin;
  }

  // 查询全部数据
  async findAll(pagination: Pagination): Promise<IList<IAdmin>> {
    const reg = new RegExp(pagination.search, 'i');
    const search = [
      { name: reg },
      { email: reg },
    ];
    const list = await this.adminModel
      .find({ $or: search })
      .limit(pagination.limit)
      .skip((pagination.offset - 1) * pagination.limit)
      .select({ password: 0 })
      .exec();
    const total = await this.adminModel.countDocuments({ $or: search });
    return { list, total };
  }

  // 根据id查询
  async findById(_id: string): Promise<IAdmin> {
    return await this.adminModel.findById(_id).exec();
  }

  // 根据sn查询
  async findByAdminSn(adminSn: string): Promise<IAdmin> {
    return await this.adminModel.findOne({ adminSn }).exec();
  }
  // 根据id修改
  async updateById(_id: string, admin: CreateAdminDTO) {
    return await this.adminModel.findByIdAndUpdate(_id, admin).exec();
  }
  // 根据id删除
  async deleteById(_id: string) {
    return await this.adminModel.findByIdAndDelete(_id).exec();
  }
  // 根据id修改密码
  async resetPassword(_id: string, newPass: string) {
    const password = this.cryptoUtil.encryptPassword(newPass);
    return await this.adminModel.findByIdAndUpdate(_id, { password }).exec();
  }
}