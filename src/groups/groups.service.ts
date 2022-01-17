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

  async findAll(extended: boolean): Promise<Group[]> {
    if (extended) return this.groupModel.aggregate([{
      $lookup: {
        from: "tasks",
        localField: "_id",
        foreignField: "group",
        as: "tasks"
      }
    }]);
    return this.groupModel.find();
  }

  async findOne(id: string): Promise<any> {
    const result = await this.groupModel.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(id),
        }
      },
      {
        $lookup: {
          from: "tasks",
          localField: "_id",
          foreignField: "group",
          as: "tasks"
        }
      }
    ]);
    if (result.length > 0) return result[0];
    else throw new NotFoundException();
  }

  async update(id: string, updateTaskDto: UpdateGroupDto): Promise<Group> {
    const group = await this.groupModel.findByIdAndUpdate(id, updateTaskDto, { new: true });
    if (group === null) throw new NotFoundException();
    return group;
  }

  async remove(id: string): Promise<any> {
    return this.groupModel.deleteOne({ _id: id });
  }
}
