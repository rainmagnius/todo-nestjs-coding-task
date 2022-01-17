import { Model, Types } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Group, GroupDocument } from './schemas/group.schema';
import { UpdateGroupDto } from './dto/update-group.dto';
import { CreateGroupDto } from './dto/create-group.dto';

@Injectable()
export class GroupsService {
  constructor(@InjectModel(Group.name) private groupModel: Model<GroupDocument>) {}

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    const createdTask = new this.groupModel(createGroupDto);
    return createdTask.save();
  }

  async findAll(): Promise<Group[]> {
    return this.groupModel.find();
  }

  async findOne(id: string): Promise<any> {
    return await this.groupModel.findById(id);
  }

  async update(id: string, updateTaskDto: UpdateGroupDto): Promise<Group> {
    return await this.groupModel.findByIdAndUpdate(id, updateTaskDto, { new: true });
  }

  async remove(id: string): Promise<any> {
    return this.groupModel.deleteOne({ _id: id });
  }
}
