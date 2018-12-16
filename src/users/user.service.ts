import { Model } from 'mongoose';
import { Inject, Injectable, HttpException } from '@nestjs/common';
import { IUser } from './interfaces/user.interfaces';
import { CreateUserDTO } from './dto/creatUsers.dto';
import { Pagination } from '../common/dto/pagination.dto';
import { IList } from '../common/interface/list.interface';
import { CryptoUtil } from '../utils/crypto.util';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  // 注入的UserModelToken要与users.providers.ts里面的key一致就可以
  constructor(
    @Inject('UserModelToken') private readonly userModel: Model<IUser>,
    @Inject(CryptoUtil) private readonly cryptoUtil: CryptoUtil,
    @Inject(JwtService) private readonly jwtService: JwtService,

  ) { }

  // 创建数据
  async create(createUserDTO: CreateUserDTO): Promise<IUser> {
    const existing = await this.userModel.findOne({ email: createUserDTO.email });
    if (existing) {
      throw new HttpException(`添加失败,邮箱已存在`, 404);
    }
    createUserDTO.password = await this.cryptoUtil.encryptPassword(createUserDTO.password);
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
      .select({ password: 0 })
      .exec();
    const total = await this.userModel.countDocuments({ $or: search });
    return { list, total };
  }

  // 根据id查询
  async findById(_id: string): Promise<IUser> {
    return await this.userModel.findById(_id).exec();
  }

  // 根据sn查询
  async findOneByEmail(email: string): Promise<IUser> {
    return await this.userModel.findOne({ email }).lean().exec();
  }
  // 根据id修改
  async updateById(_id: string, user: CreateUserDTO) {
    if (user.email) {
      const existing = await this.userModel.findOne({ _id: { $ne: _id }, email: user.email });
      if (existing) {
        throw new HttpException(`修改失败,邮箱已存在`, 404);
      }
    }
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