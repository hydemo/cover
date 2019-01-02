import { Model } from 'mongoose';
import { Inject, Injectable, HttpException } from '@nestjs/common';
import { IUser } from './interfaces/user.interfaces';
import { CreateUserDTO } from './dto/creatUsers.dto';
import { Pagination } from '../common/dto/pagination.dto';
import { IList } from '../common/interface/list.interface';
import { CryptoUtil } from '../utils/crypto.util';
import { JwtService } from '@nestjs/jwt';
import { ApiErrorCode } from 'src/common/enum/api-error-code.enum';
import { ApiException } from 'src/common/expection/api.exception';

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
    const existing = await this.userModel.findOne({ email: createUserDTO.email, isDelete: false });
    if (existing) {
      throw new ApiException('邮箱已存在', ApiErrorCode.EMAIL_EXIST, 406);
    }
    const deleteOne = await this.userModel.findOne({ email: createUserDTO.email, isDelete: true });
    if (deleteOne) {
      return this.userModel.findByIdAndUpdate(deleteOne._id, { isDelete: false });
    }
    createUserDTO.password = await this.cryptoUtil.encryptPassword(createUserDTO.password);
    const creatUser = new this.userModel(createUserDTO);
    await creatUser.save();
    return creatUser;
  }

  async findByCondition(condition: any): Promise<IUser[]> {
    condition.isDelete = false;
    return await this.userModel.find(condition);
  }

  // 查询全部数据
  async findAll(pagination: Pagination): Promise<IList<IUser>> {
    const search = [];
    const condition: any = {};
    if (pagination.search) {
      const sea = JSON.parse(pagination.search);
      for (const key in sea) {
        if (key === 'base' && sea[key]) {
          search.push({ name: new RegExp(sea[key], 'i') });
          search.push({ email: new RegExp(sea[key], 'i') });
        } else if (sea[key] === 0 || sea[key]) {
          condition[key] = sea[key];
        }
      }
      if (search.length) {
        condition.$or = search;
      }
    }
    condition.isDelete = false;
    const list = await this.userModel
      .find(condition)
      .limit(pagination.limit)
      .skip((pagination.offset - 1) * pagination.limit)
      .select({ password: 0 })
      .exec();
    const total = await this.userModel.countDocuments(condition);
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
        throw new ApiException('邮箱已存在', ApiErrorCode.EMAIL_EXIST, 406);
      }
    }
    return await this.userModel.findByIdAndUpdate(_id, user).exec();
  }
  // 根据id删除
  async deleteById(_id: string) {
    return await this.userModel.findByIdAndUpdate(_id, { isDelete: true }).exec();
  }
  // 根据id修改密码
  async resetPassword(_id: string, newPass: string) {
    const password = this.cryptoUtil.encryptPassword(newPass);
    return await this.userModel.findByIdAndUpdate(_id, { password }).exec();
  }
  async upload(userId: string, filename: string) {
    const user = await this.userModel.findByIdAndUpdate(userId, { avatar: filename });
    delete user.password;
    return user;
  }
  async updateMe(_id: string, user: CreateUserDTO) {
    if (user.email) {
      const existing = await this.userModel.findOne({ _id: { $ne: _id }, email: user.email });
      if (existing) {
        throw new ApiException('邮箱已存在', ApiErrorCode.EMAIL_EXIST, 406);
      }
    }
    return await this.userModel.findByIdAndUpdate(_id, user).exec();
  }
}