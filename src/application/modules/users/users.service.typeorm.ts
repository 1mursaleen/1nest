import { Model } from 'mongoose';
import { DeepPartial, Repository } from 'typeorm';

import { EntityCondition } from '@/application/utils/types/entity-condition.type';
import { NullableType } from '@/application/utils/types/nullable.type';
import { IPaginationOptions } from '@/application/utils/types/pagination-options';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity.typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) protected model: Model<User>) {
    // super(model);
  }

  create(createProfileDto: CreateUserDto): Promise<User> {
    return this.model.create(createProfileDto);
  }

  findManyWithPagination(
    paginationOptions: IPaginationOptions,
  ): Promise<User[]> {
    return this.model.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  findOne(fields: EntityCondition<User>): Promise<NullableType<User>> {
    return this.model.findOne({
      where: fields,
    });
  }

  update(id: User['id'], payload: DeepPartial<User>): Promise<User> {
    return this.model.create({ id, ...payload });
  }

  async softDelete(id: User['id']): Promise<void> {
    const options = { new: true }; // Return the updated document

    const updatedDocument = await this.model.findByIdAndUpdate(
      id,
      {
        deletedAt: new Date(),
      },
      options,
    );

    // return updatedDocument || null;
  }
}
