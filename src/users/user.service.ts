import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { IUser } from './interfaces/user.interfaces';
import { CreateUserDTO } from './dto/creatUser.dto';
import { Pagination } from '../common/pagination.dto';
import { IList } from '../common/List.interface';
import { CryptoUtil } from '../utils/crypto.util';

@Injectable()
export class UserService {
  // 注入的UserModelToken要与users.providers.ts里面的key一致就可以
  constructor(
    @Inject('UserModelToken') private readonly userModel: Model<IUser>,
    @Inject(CryptoUtil) private readonly cryptoUtil: CryptoUtil,
  ) { }

  // 创建数据
  async create(createUserDTO: CreateUserDTO): Promise<IUser> {
    const creatUser = new this.userModel(createUserDTO);
    await creatUser.save();
    return creatUser;
  }

  // 查询全部数据
  async findAll(pagination: Pagination): Promise<IList<IUser>> {
    const reg = new RegExp(pagination.search, 'i');
    const search = [
      { name: reg },
      { email: reg },
    ];
    const list = await this.userModel
      .find({ $or: search })
      .limit(pagination.limit)
      .skip((pagination.offset - 1) * pagination.limit)
      .exec();
    const total = await this.userModel.countDocuments({ $or: search });
    return { list, total };
  }

  // 根据id查询
  async findById(_id: string): Promise<IUser> {
    return await this.userModel.findById(_id).exec();
  }

  // 根据sn查询
  async findByUserSn(userSn: string): Promise<IUser> {
    return await this.userModel.findOne({ userSn }).exec();
  }
  // 根据id修改
  async updateById(_id: string, user: CreateUserDTO) {
    return await this.userModel.findByIdAndUpdate(_id, user).exec();
  }
  // 根据id删除
  async deleteById(_id: string) {
    return await this.userModel.findByIdAndDelete(_id).exec();
  }
  // 根据id修改密码
  async resetPassword(_id: string, newPass: string) {
    const password = this.cryptoUtil.encryptPassword(newPass);
    return await this.userModel.findByIdAndUpdate(_id, { password }).exec();
  }
}