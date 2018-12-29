import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { IOwner } from './interfaces/owner.interfaces';
import { CreateOwnerDTO } from './dto/creatOwner.dto';
import { Pagination } from '../common/dto/pagination.dto';
import { IList } from '../common/interface/list.interface';

@Injectable()
export class OwnerService {
  // 注入的OwnerModelToken要与owners.providers.ts里面的key一致就可以
  constructor(@Inject('OwnerModelToken') private readonly ownerModel: Model<IOwner>) { }

  // 创建数据
  async create(createOwnerDTO: CreateOwnerDTO): Promise<IOwner> {
    const creatOwner = new this.ownerModel(createOwnerDTO);
    await creatOwner.save();
    return creatOwner;
  }

  async findByCondition(condition: any): Promise<IOwner[]> {
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
    return await this.ownerModel.findOne({ ownerSn }).exec();
  }
  // 根据id修改
  async updateById(_id: string, owner: CreateOwnerDTO) {
    return await this.ownerModel.findByIdAndUpdate(_id, owner).exec();
  }
  // 根据id删除
  async deleteById(_id: string) {
    return await this.ownerModel.findByIdAndDelete(_id).exec();
  }
}