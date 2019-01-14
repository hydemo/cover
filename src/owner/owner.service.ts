import { Model } from 'mongoose';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { IOwner } from './interfaces/owner.interfaces';
import { CreateOwnerDTO } from './dto/creatOwner.dto';
import { Pagination } from '../common/dto/pagination.dto';
import { IList } from '../common/interface/list.interface';
import { ApiErrorCode } from '../common/enum/api-error-code.enum';
import { ApiException } from '../common/expection/api.exception';
import { WellService } from '../wells/well.service';

@Injectable()
export class OwnerService {
  // 注入的OwnerModelToken要与owners.providers.ts里面的key一致就可以
  constructor(
    @Inject('OwnerModelToken') private readonly ownerModel: Model<IOwner>,
    @Inject(forwardRef(() => WellService)) private readonly wellService: WellService,
  ) { }

  // 创建数据
  async create(createOwnerDTO: CreateOwnerDTO): Promise<IOwner> {
    const existing = await this.ownerModel.findOne({ ownerId: createOwnerDTO.ownerId, isDelete: false });
    if (existing) {
      throw new ApiException('业主ID已存在', ApiErrorCode.OWNER_EXIST, 406);
    }
    const deleteOne = await this.ownerModel.findOne({ ownerId: createOwnerDTO.ownerId, isDelete: true });
    if (deleteOne) {
      return this.ownerModel.findByIdAndUpdate(deleteOne._id, { isDelete: false });
    }
    const creatOwner = new this.ownerModel(createOwnerDTO);
    await creatOwner.save();
    return creatOwner;
  }

  async findByCondition(condition: any): Promise<IOwner[]> {
    condition.isDelete = false;
    return await this.ownerModel.find(condition);
  }

  // 查询全部数据
  async findAll(pagination: Pagination): Promise<IList<IOwner>> {
    const search = [];
    const condition: any = {};
    if (pagination.search) {
      const sea = JSON.parse(pagination.search);
      for (const key in sea) {
        if (key === 'base' && sea[key]) {
          search.push({ ownerId: new RegExp(sea[key], 'i') });
          search.push({ ownerName: new RegExp(sea[key], 'i') });
          search.push({ contact: new RegExp(sea[key], 'i') });
          search.push({ phone: new RegExp(sea[key], 'i') });
        } else if (sea[key] === 0 || sea[key]) {
          condition[key] = sea[key];
        }
      }
      if (search.length) {
        condition.$or = search;
      }
    }
    condition.isDelete = false;
    const list = await this.ownerModel
      .find(condition)
      .limit(pagination.limit)
      .skip((pagination.offset - 1) * pagination.limit)
      .exec();
    const total = await this.ownerModel.countDocuments(condition);
    return { list, total };
  }

  // 根据id查询
  async findById(_id: string): Promise<IOwner> {
    return await this.ownerModel.findById(_id).exec();
  }

  // 根据sn查询
  async findByOwnerSn(ownerSn: string): Promise<IOwner> {
    return await this.ownerModel.findOne({ ownerSn, isDelete: false }).exec();
  }
  // 根据id修改
  async updateById(_id: string, owner: CreateOwnerDTO) {
    if (owner.ownerId) {
      const existing = await this.ownerModel
        .findOne({ _id: { $ne: _id }, ownerId: owner.ownerId });
      if (existing) {
        throw new ApiException('业主ID已存在', ApiErrorCode.OWNER_EXIST, 406);
      }
    }
    return await this.ownerModel.findByIdAndUpdate(_id, owner).exec();
  }
  // 根据id删除
  async deleteById(_id: string) {
    await this.wellService.updateMany({ ownerId: _id }, { $unset: { ownerId: '' } });
    return await this.ownerModel.findByIdAndUpdate(_id, { isDelete: true }).exec();
  }
}